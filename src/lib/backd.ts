import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Ierc20FullFactory } from "@backdfund/protocol/typechain/Ierc20FullFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { StakerVaultFactory } from "@backdfund/protocol/typechain/StakerVaultFactory";
import { TopUpAction } from "@backdfund/protocol/typechain/TopUpAction";
import { TopUpActionFactory } from "@backdfund/protocol/typechain/TopUpActionFactory";
import { TopUpActionFeeHandlerFactory } from "@backdfund/protocol";
import { BigNumber, ContractTransaction, ethers, providers, Signer, utils } from "ethers";
import fromEntries from "fromentries";

import { UnsupportedNetwork } from "../app/errors";
import { getPrices as getPricesFromCoingecko } from "./coingecko";
import { getPrices as getPricesFromBinance } from "./binance";
import {
  ETH_DECIMALS,
  ETH_DUMMY_ADDRESS,
  INFINITE_APPROVE_AMMOUNT,
  MILLISECONDS_PER_YEAR,
  DEFAULT_SCALE,
  DEPOSIT_SLIPPAGE,
} from "./constants";
import { bigNumberToFloat } from "./numeric";
import { ScaledNumber } from "./scaled-number";
import {
  Address,
  AllowanceQuery,
  Balances,
  Pool,
  Position,
  Prices,
  PlainPosition,
  Token,
  transformPool,
  PlainWithdrawalFees,
  PlainLoan,
  LendingProtocol,
  Optional,
  PlainActionFees,
  ActionFees,
  toPlainActionFees,
} from "./types";
import { lendingProviders } from "./lending-protocols";
import poolMetadata from "./data/pool-metadata";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPoolInfo(address: Address): Promise<Pool>;
  getLoanPosition(protocol: LendingProtocol, address?: Address): Promise<Optional<PlainLoan>>;
  getPositions(): Promise<PlainPosition[]>;
  getActionFees(): Promise<PlainActionFees>;
  registerPosition(pool: Pool, position: Position): Promise<ContractTransaction>;
  removePosition(
    account: Address,
    protocol: string,
    unstake?: boolean
  ): Promise<ContractTransaction>;
  getBalance(address: Address, account?: Address): Promise<ScaledNumber>;
  getBalances(addresses: Address[], account?: Address): Promise<Balances>;
  getAllowance(token: Token, spender: Address, account?: string): Promise<ScaledNumber>;
  getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>>;
  getWithdrawalFees(pools: Pool[]): Promise<PlainWithdrawalFees>;
  getPrices(symbol: string[]): Promise<Prices>;
  approve(token: Token, spender: Address, amount: ScaledNumber): Promise<ContractTransaction>;
  deposit(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction>;
  withdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction>;
  unstake(vaultAddress: Address, amount: ScaledNumber): Promise<ContractTransaction>;

  listSupportedProtocols(): Promise<string[]>;

  provider: providers.Provider;
  topupActionAddress: string;
}

export class Web3Backd implements Backd {
  private controller: Controller;

  private topupAction: TopUpAction;

  private chainId: number;

  constructor(private _provider: Signer | providers.Provider, private options: BackdOptions) {
    this.chainId = options.chainId;
    const contracts = this.getContracts();

    // eslint-disable-next-line dot-notation
    this.controller = ControllerFactory.connect(contracts["Controller"][0], _provider);
    // eslint-disable-next-line dot-notation
    this.topupAction = TopUpActionFactory.connect(contracts["TopUpAction"][0], _provider);
    // eslint-disable-next-line dot-notation
    this.topupAction = TopUpActionFactory.connect(contracts["TopUpAction"][0], _provider);
  }

  get topupActionAddress(): string {
    return this.topupAction.address;
  }

  get provider(): providers.Provider {
    const provider = this._provider;
    if (provider instanceof Signer) {
      if (!provider.provider) throw Error("Provider is null");
      return provider.provider;
    }
    return provider;
  }

  private getContracts(): Record<string, string[]> {
    switch (this.chainId) {
      case 42:
        return contracts["42"];
      case 1337:
        return contracts["1337"];
      default:
        throw new UnsupportedNetwork(this.chainId);
    }
  }

  currentAccount(): Promise<string> {
    const signer = this._provider;
    if (signer instanceof Signer) {
      return signer.getAddress();
    }
    return Promise.resolve("");
  }

  async listPools(): Promise<Pool[]> {
    const markets = await this.controller.allPools();
    return Promise.all(markets.map((v: any) => this.getPoolInfo(v)));
  }

  async getTokenInfo(tokenAddress: Address): Promise<Token> {
    if (tokenAddress === ETH_DUMMY_ADDRESS) {
      return { address: tokenAddress, name: "Ether", symbol: "ETH", decimals: ETH_DECIMALS };
    }
    const token = Ierc20FullFactory.connect(tokenAddress, this._provider);
    const [name, symbol, decimals] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
    ]);
    return { address: tokenAddress, name, symbol, decimals };
  }

  async getPoolInfo(address: Address): Promise<Pool> {
    const pool = LiquidityPoolFactory.connect(address, this._provider);
    const [
      name,
      lpTokenAddress,
      underlyingAddress,
      totalAssets,
      exchangeRate,
      maxWithdrawalFee,
      minWithdrawalFee,
      feeDecreasePeriod,
    ] = await Promise.all([
      pool.name(),
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.exchangeRate(),
      pool.getMaxWithdrawalFee(),
      pool.getMinWithdrawalFee(),
      pool.getWithdrawalFeeDecreasePeriod(),
    ]);
    const [lpToken, underlying, stakerVaultAddress] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
      this.controller.getStakerVault(lpTokenAddress),
    ]);

    let apy = null;
    const metadata = poolMetadata[underlying.symbol];
    if (metadata && metadata.deployment[this.chainId.toString()]) {
      const deployedtime = metadata.deployment[this.chainId.toString()].time;
      const compoundExponent =
        MILLISECONDS_PER_YEAR / (new Date().getTime() - deployedtime.getTime());
      const unscaledApy = Number(new ScaledNumber(exchangeRate).toString()) ** compoundExponent - 1;
      apy = ScaledNumber.fromUnscaled(unscaledApy).value;
    }

    const rawPool = {
      name,
      underlying,
      lpToken,
      apy,
      address,
      totalAssets,
      exchangeRate,
      stakerVaultAddress,
      maxWithdrawalFee,
      minWithdrawalFee,
      feeDecreasePeriod,
    };
    return transformPool(rawPool, bigNumberToFloat);
  }

  async getWithdrawalFees(pools: Pool[]): Promise<PlainWithdrawalFees> {
    const account = await this.currentAccount();
    const promises = pools.map((pool: Pool) => {
      const poolFactory = LiquidityPoolFactory.connect(pool.address, this._provider);
      const ONE = ScaledNumber.fromUnscaled(1, pool.underlying.decimals).value;
      return poolFactory.getWithdrawalFee(account, ONE);
    });

    const withdrawalFees = await Promise.all(promises);

    return fromEntries(
      pools.map((pool: Pool, index: number) => {
        const ONE = ScaledNumber.fromUnscaled(1, pool.underlying.decimals);
        const withdrawalFee = new ScaledNumber(withdrawalFees[index], pool.underlying.decimals);
        const percent = withdrawalFee.div(ONE);
        return [pool.address, percent.toPlain()];
      })
    );
  }

  async getLoanPosition(protocol: LendingProtocol, address: Address): Promise<Optional<PlainLoan>> {
    return lendingProviders[protocol].getPosition(address, this._provider);
  }

  async getPositions(): Promise<PlainPosition[]> {
    const account = await this.currentAccount();
    const rawPositions = await this.topupAction.listPositions(account);
    return Promise.all(rawPositions.map((v: any) => this.getPositionInfo(v)));
  }

  async getActionFees(): Promise<PlainActionFees> {
    const feeHandlerAddress = await this.topupAction.getFeeHandler();
    const feeHandler = TopUpActionFeeHandlerFactory.connect(feeHandlerAddress, this._provider);

    /* We can change to this when the latest protocol code is deployed to Kovan */
    // const [totalBn, keeperFractionBn, treasuryFractionBn] = await Promise.all([
    //   this.topupAction.getActionFee(),
    //   feeHandler.getKeeperFeeFraction(),
    //   feeHandler.getTreasuryFeeFraction(),
    // ]);
    const [totalBn, keeperFractionBn] = await Promise.all([
      this.topupAction.getActionFee(),
      feeHandler.getKeeperFeeFraction(),
    ]);
    const treasuryFractionBn = BigNumber.from(3).mul(DEFAULT_SCALE).div(10);
    const total = new ScaledNumber(totalBn);
    const keeperFraction = new ScaledNumber(keeperFractionBn).mul(total);
    const treasuryFraction = new ScaledNumber(treasuryFractionBn).mul(total);

    const actionfees: ActionFees = {
      total,
      keeperFraction,
      treasuryFraction,
      lpFraction: ScaledNumber.fromUnscaled(1).sub(keeperFraction).sub(treasuryFraction).mul(total),
    };

    return toPlainActionFees(actionfees);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getPositionInfo(rawPosition: any): Promise<PlainPosition> {
    const token = Ierc20FullFactory.connect(rawPosition.record.depositToken, this._provider);
    const decimals = await token.decimals();
    const position: PlainPosition = {
      protocol: ethers.utils.parseBytes32String(rawPosition.protocol),
      actionToken: rawPosition.record.actionToken,
      depositToken: rawPosition.record.depositToken,
      account: rawPosition.account,
      threshold: new ScaledNumber(rawPosition.record.threshold, decimals).toPlain(),
      singleTopUp: new ScaledNumber(rawPosition.record.singleTopUpAmount, decimals).toPlain(),
      maxTopUp: new ScaledNumber(rawPosition.record.totalTopUpAmount, decimals).toPlain(),
      maxGasPrice: new ScaledNumber(rawPosition.record.maxGasPrice, 9).toPlain(),
    };
    return position;
  }

  async registerPosition(pool: Pool, position: Position): Promise<ContractTransaction> {
    const { decimals } = pool.underlying;
    const scale = BigNumber.from(10).pow(decimals);
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const rawExchangeRate = await poolContract.exchangeRate();
    const protocol = utils.formatBytes32String(position.protocol);
    const depositAmount = position.maxTopUp.value.mul(rawExchangeRate).div(scale);

    const gasEstimate = await this.topupAction.estimateGas.register(
      position.account,
      protocol,
      position.threshold.value,
      pool.lpToken.address,
      depositAmount,
      pool.underlying.address,
      position.singleTopUp.value,
      position.maxTopUp.value,
      position.maxGasPrice.value
    );
    const gasLimit = gasEstimate.mul(12).div(10);
    return this.topupAction.register(
      position.account,
      protocol,
      position.threshold.value,
      pool.lpToken.address,
      depositAmount,
      pool.underlying.address,
      position.singleTopUp.value,
      position.maxTopUp.value,
      position.maxGasPrice.value,
      {
        gasLimit,
      }
    );
  }

  async removePosition(
    account: Address,
    protocol: string,
    unstake = true
  ): Promise<ContractTransaction> {
    const gasEstimate = await this.topupAction.estimateGas.resetPosition(
      account,
      utils.formatBytes32String(protocol),
      unstake
    );
    const gasLimit = gasEstimate.mul(12).div(10);
    return this.topupAction.resetPosition(account, utils.formatBytes32String(protocol), unstake, {
      gasLimit,
    });
  }

  async getAllowance(
    token: Pick<Token, "address" | "decimals">,
    spender: Address,
    account?: string
  ): Promise<ScaledNumber> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (token.address === ETH_DUMMY_ADDRESS) {
      return ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT);
    }
    const tokenContract = Ierc20FullFactory.connect(token.address, this._provider);
    const rawAllowance = await tokenContract.allowance(account, spender);
    return new ScaledNumber(rawAllowance, token.decimals);
  }

  async getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>> {
    const allowances = await Promise.all(
      queries.map((q) => this.getAllowance(q.token, q.spender, q.onBehalfOf))
    );
    const result: Record<string, Balances> = {};
    queries.forEach((query, index) => {
      if (!result[query.token.address]) {
        result[query.token.address] = {};
      }
      result[query.token.address][query.spender] = allowances[index];
    });
    return result;
  }

  async approve(
    token: Token,
    spender: Address,
    amount: ScaledNumber
  ): Promise<ContractTransaction> {
    const tokenContract = Ierc20FullFactory.connect(token.address, this._provider);
    return tokenContract.approve(spender, amount.value);
  }

  async deposit(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const value = pool.underlying.address === ETH_DUMMY_ADDRESS ? amount.value : 0;
    const minTokenAmount = amount.div(pool.exchangeRate).mul(DEPOSIT_SLIPPAGE);
    return poolContract["depositFor(address,uint256,uint256)"](
      await this.currentAccount(),
      amount.value,
      minTokenAmount.value,
      { value }
    );
  }

  async withdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const minRedeemAmount = amount.mul(pool.exchangeRate).mul(DEPOSIT_SLIPPAGE);
    return poolContract["redeem(uint256,uint256)"](amount.value, minRedeemAmount.value);
  }

  async unstake(vault: Address, amount: ScaledNumber): Promise<ContractTransaction> {
    const vaultContract = StakerVaultFactory.connect(vault, this._provider);
    return vaultContract.unstake(amount.value);
  }

  async getBalance(address: string, account?: string): Promise<ScaledNumber> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (address === ETH_DUMMY_ADDRESS) {
      return new ScaledNumber(await this.provider.getBalance(account));
    }
    const token = Ierc20FullFactory.connect(address, this._provider);
    const decimals = await token.decimals();
    const rawBalance = await token.balanceOf(account);
    return new ScaledNumber(rawBalance, decimals);
  }

  async getBalances(addresses: string[], account?: string): Promise<Balances> {
    const promises = addresses.map((a) => this.getBalance(a, account));
    const balances = await Promise.all(promises);
    return fromEntries(addresses.map((a, i) => [a, balances[i]]));
  }

  async getPrices(symbols: string[]): Promise<Prices> {
    return getPricesFromCoingecko(symbols)
      .catch((_e) => getPricesFromBinance(symbols))
      .catch((e) => {
        throw new Error(`failed to fetch prices: ${e.message}`);
      });
  }

  async listSupportedProtocols(): Promise<string[]> {
    const protocols = await this.topupAction.getSupportedProtocols();
    return protocols.map((p) => utils.parseBytes32String(p));
  }
}
