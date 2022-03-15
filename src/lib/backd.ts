import contracts from "@backdfund/protocol/config/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Ierc20FullFactory } from "@backdfund/protocol/typechain/Ierc20FullFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { StakerVaultFactory } from "@backdfund/protocol/typechain/StakerVaultFactory";
import { TopUpAction } from "@backdfund/protocol/typechain/TopUpAction";
import { TopUpActionFactory } from "@backdfund/protocol/typechain/TopUpActionFactory";
import { VaultFactory } from "@backdfund/protocol/typechain/VaultFactory";
import { IStrategyFactory } from "@backdfund/protocol/typechain/IStrategyFactory";
import {
  AddressProvider,
  AddressProviderFactory,
  BkdTriHopCvxFactory,
  GasBank,
  GasBankFactory,
  TopUpActionFeeHandlerFactory,
} from "@backdfund/protocol";
import { BigNumber, ContractTransaction, ethers, providers, Signer, utils } from "ethers";
import fromEntries from "fromentries";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";

import { UnsupportedNetwork } from "../app/errors";
import { getPrices as getPricesFromCoingecko } from "./coingecko";
import { getPrices as getPricesFromBinance } from "./binance";
import {
  ETH_DECIMALS,
  ETH_DUMMY_ADDRESS,
  INFINITE_APPROVE_AMMOUNT,
  MILLISECONDS_PER_YEAR,
  DEPOSIT_SLIPPAGE,
  GWEI_DECIMALS,
} from "./constants";
import {
  Address,
  AllowanceQuery,
  Balances,
  Pool,
  Position,
  Prices,
  PlainPosition,
  Token,
  PlainWithdrawalFees,
  PlainLoan,
  LendingProtocol,
  Optional,
  PlainActionFees,
  ActionFees,
  toPlainActionFees,
  PlainPool,
} from "./types";
import { lendingProviders } from "./lending-protocols";
import poolMetadata from "./data/pool-metadata";
import { positions as mockPositions, makeContractTransaction } from "./mock/data";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  getChainId(): number;
  currentAccount(): Promise<Address>;
  listPools(): Promise<PlainPool[]>;
  getPoolInfo(address: Address): Promise<PlainPool>;
  getLoanPosition(protocol: LendingProtocol, address?: Address): Promise<Optional<PlainLoan>>;
  getPositions(): Promise<PlainPosition[]>;
  getActionFees(): Promise<PlainActionFees>;
  getEstimatedGasUsage(): Promise<PlainScaledNumber>;
  registerPosition(pool: Pool, position: Position, value: BigNumber): Promise<ContractTransaction>;
  removePosition(
    account: Address,
    protocol: string,
    unstake?: boolean
  ): Promise<ContractTransaction>;
  getBalance(address: Address, account?: Address): Promise<ScaledNumber>;
  getBalances(addresses: Address[], account?: Address): Promise<Balances>;
  getGasBankBalance(): Promise<PlainScaledNumber>;
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
  topupActionAddress: Optional<string>;
}

export class Web3Backd implements Backd {
  private controller: Controller;

  private topupAction: TopUpAction | undefined;

  private addressProvider: AddressProvider;

  private gasBank: GasBank;

  private chainId: number;

  constructor(private _provider: Signer | providers.Provider, private options: BackdOptions) {
    this.chainId = options.chainId;
    const contracts = this.getContracts();

    // eslint-disable-next-line dot-notation
    this.controller = ControllerFactory.connect(contracts.Controller[0], _provider);
    // eslint-disable-next-line dot-notation
    if (contracts.TopUpAction && contracts.TopUpAction.length > 0)
      this.topupAction = TopUpActionFactory.connect(contracts.TopUpAction[0], _provider);
    // eslint-disable-next-line dot-notation
    this.gasBank = GasBankFactory.connect(contracts.GasBank[0], _provider);
    this.addressProvider = AddressProviderFactory.connect(
      contracts.AddressProvider[0], // eslint-disable-line dot-notation
      _provider
    );
  }

  get topupActionAddress(): Optional<string> {
    return this.topupAction ? this.topupAction.address : null;
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
      case 1:
        return contracts["1"];
      default:
        throw new UnsupportedNetwork();
    }
  }

  getChainId(): number {
    return this.chainId;
  }

  currentAccount(): Promise<string> {
    const signer = this._provider;
    if (signer instanceof Signer) {
      return signer.getAddress();
    }
    return Promise.resolve("");
  }

  async listPools(): Promise<PlainPool[]> {
    const markets = await this.addressProvider.allPools();
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

  async getTokenDecimals(tokenAddress: Address): Promise<number> {
    if (tokenAddress === ETH_DUMMY_ADDRESS) return ETH_DECIMALS;
    const token = Ierc20FullFactory.connect(tokenAddress, this._provider);
    return token.decimals();
  }

  async getPoolInfo(address: Address): Promise<PlainPool> {
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
      depositCap,
      harvestable,
      vaultAddress,
    ] = await Promise.all([
      pool.name(),
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.exchangeRate(),
      pool.getMaxWithdrawalFee(),
      pool.getMinWithdrawalFee(),
      pool.getWithdrawalFeeDecreasePeriod(),
      pool.depositCap(),
      this.getHarvestable(address),
      pool.getVault(),
    ]);

    const vault = VaultFactory.connect(vaultAddress, this._provider);
    const [lpToken, underlying, stakerVaultAddress, strategyAddress] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
      this.addressProvider.getStakerVault(lpTokenAddress),
      vault.getStrategy(),
    ]);

    const strategy = BkdTriHopCvxFactory.connect(strategyAddress, this._provider);
    // const strategyName = strategy.name();
    const strategyName = "TEST NAME"; // TODO Change this

    let apy = null;
    const metadata = poolMetadata[underlying.symbol];
    if (metadata && metadata.deployment[this.chainId.toString()]) {
      const deployedtime = metadata.deployment[this.chainId.toString()].time;
      const compoundExponent =
        MILLISECONDS_PER_YEAR / (new Date().getTime() - deployedtime.getTime());
      const scaledTotalAssets = new ScaledNumber(totalAssets, underlying.decimals);
      const lpBalance = scaledTotalAssets.div(new ScaledNumber(exchangeRate));
      const balanceAfterHarvest = scaledTotalAssets.add(
        new ScaledNumber(harvestable, underlying.decimals)
      );
      const exchangeRateAfterHarvest = balanceAfterHarvest.div(lpBalance);
      const unscaledApy = Number(exchangeRateAfterHarvest.toString()) ** compoundExponent - 1;
      if (unscaledApy >= 0) apy = ScaledNumber.fromUnscaled(unscaledApy).value;
    }

    return {
      name,
      underlying,
      lpToken,
      apy: apy ? new ScaledNumber(apy).toPlain() : null,
      address,
      totalAssets: new ScaledNumber(totalAssets, underlying.decimals).toPlain(),
      exchangeRate: new ScaledNumber(exchangeRate).toPlain(),
      stakerVaultAddress,
      maxWithdrawalFee: new ScaledNumber(maxWithdrawalFee).toPlain(),
      minWithdrawalFee: new ScaledNumber(minWithdrawalFee).toPlain(),
      feeDecreasePeriod: new ScaledNumber(feeDecreasePeriod, 0).toPlain(),
      depositCap: new ScaledNumber(depositCap, underlying.decimals).toPlain(),
      harvestable: new ScaledNumber(harvestable, underlying.decimals).toPlain(),
      strategyAddress,
      strategyName,
    };
  }

  async getHarvestable(poolAddress: Address): Promise<BigNumber> {
    const pool = LiquidityPoolFactory.connect(poolAddress, this._provider);
    const vaultAddress = await pool.getVault();
    const vault = VaultFactory.connect(vaultAddress, this._provider);
    const strategyAddress = await vault.getStrategy();
    const strategy = IStrategyFactory.connect(strategyAddress, this._provider);
    return strategy.harvestable();
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
    if (!this.topupAction) return [];
    const account = await this.currentAccount();
    const rawPositions = await this.topupAction.getUserPositions(account);
    return Promise.all(rawPositions.map((v: any) => this.getPositionInfo(v)));
  }

  async getActionFees(): Promise<PlainActionFees> {
    if (!this.topupAction)
      return {
        total: new ScaledNumber().toPlain(),
        keeperFraction: new ScaledNumber().toPlain(),
        treasuryFraction: new ScaledNumber().toPlain(),
        lpFraction: new ScaledNumber().toPlain(),
      };
    const feeHandlerAddress = await this.topupAction.getFeeHandler();
    const feeHandler = TopUpActionFeeHandlerFactory.connect(feeHandlerAddress, this._provider);

    const [totalBn, keeperFractionBn, treasuryFractionBn] = await Promise.all([
      this.topupAction.getActionFee(),
      feeHandler.getKeeperFeeFraction(),
      feeHandler.getTreasuryFeeFraction(),
    ]);
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
    if (!this.topupAction) return mockPositions[0];
    const positionInfo = await this.topupAction.getPosition(
      await this.currentAccount(),
      rawPosition.account,
      rawPosition.protocol
    );
    const [actionTokenDecimals, depositTokenDecimals] = await Promise.all([
      this.getTokenDecimals(positionInfo.actionToken),
      this.getTokenDecimals(positionInfo.depositToken),
    ]);
    const position: PlainPosition = {
      protocol: ethers.utils.parseBytes32String(rawPosition.protocol),
      actionToken: positionInfo.actionToken,
      depositToken: positionInfo.depositToken,
      account: rawPosition.account,
      threshold: new ScaledNumber(positionInfo.threshold).toPlain(),
      singleTopUp: new ScaledNumber(positionInfo.singleTopUpAmount, actionTokenDecimals).toPlain(),
      maxTopUp: new ScaledNumber(positionInfo.totalTopUpAmount, actionTokenDecimals).toPlain(),
      priorityFee: new ScaledNumber(positionInfo.priorityFee, GWEI_DECIMALS).toPlain(),
      maxGasPrice: new ScaledNumber(positionInfo.maxFee, GWEI_DECIMALS).toPlain(),
      depositTokenBalance: new ScaledNumber(
        positionInfo.depositTokenBalance,
        depositTokenDecimals
      ).toPlain(),
    };
    return position;
  }

  async getEstimatedGasUsage(): Promise<PlainScaledNumber> {
    if (!this.topupAction) return new ScaledNumber().toPlain();
    return new ScaledNumber(await this.topupAction.getEstimatedGasUsage(), GWEI_DECIMALS).toPlain();
  }

  async registerPosition(
    pool: Pool,
    position: Position,
    value: BigNumber
  ): Promise<ContractTransaction> {
    if (!this.topupAction) return makeContractTransaction("", "");

    const { decimals } = pool.underlying;
    const scale = BigNumber.from(10).pow(decimals);
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const rawExchangeRate = await poolContract.exchangeRate();
    const protocol = utils.formatBytes32String(position.protocol);
    const depositAmount = position.maxTopUp.value.mul(rawExchangeRate).div(scale);

    const record = {
      threshold: position.threshold.value,
      priorityFee: position.priorityFee.value,
      maxFee: position.maxGasPrice.value,
      actionToken: pool.underlying.address,
      depositToken: pool.lpToken.address,
      singleTopUpAmount: position.singleTopUp.value,
      totalTopUpAmount: position.maxTopUp.value,
      depositTokenBalance: ScaledNumber.fromUnscaled(0).value,
      repayDebt: false,
    };

    const gasEstimate = await this.topupAction.estimateGas.register(
      position.account,
      protocol,
      depositAmount,
      record,
      {
        value,
      }
    );
    const gasLimit = gasEstimate.mul(12).div(10);
    return this.topupAction.register(position.account, protocol, depositAmount, record, {
      gasLimit,
      value,
    });
  }

  async removePosition(
    account: Address,
    protocol: string,
    unstake = true
  ): Promise<ContractTransaction> {
    if (!this.topupAction) return makeContractTransaction("", "");

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
    const minTokenAmount = amount
      .div(pool.exchangeRate)
      .mul(ScaledNumber.fromUnscaled(DEPOSIT_SLIPPAGE, amount.decimals));
    return poolContract["depositFor(address,uint256,uint256)"](
      await this.currentAccount(),
      amount.value,
      minTokenAmount.value,
      { value }
    );
  }

  async withdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const minRedeemAmount = amount
      .mul(pool.exchangeRate)
      .mul(ScaledNumber.fromUnscaled(DEPOSIT_SLIPPAGE, amount.decimals));
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
    const [decimals, rawBalance] = await Promise.all([
      await token.decimals(),
      await token.balanceOf(account),
    ]);
    return new ScaledNumber(rawBalance, decimals);
  }

  async getBalances(addresses: string[], account?: string): Promise<Balances> {
    const promises = addresses.map((a) => this.getBalance(a, account));
    const balances = await Promise.all(promises);
    return fromEntries(addresses.map((a, i) => [a, balances[i]]));
  }

  async getGasBankBalance(): Promise<PlainScaledNumber> {
    const balance = await this.gasBank.balanceOf(await this.currentAccount());
    return new ScaledNumber(balance).toPlain();
  }

  async getPrices(symbols: string[]): Promise<Prices> {
    return getPricesFromCoingecko(symbols)
      .catch((_e) => getPricesFromBinance(symbols))
      .catch((e) => {
        throw new Error(`failed to fetch prices: ${e.message}`);
      });
  }

  async listSupportedProtocols(): Promise<string[]> {
    if (!this.topupAction) return [];

    const protocols = await this.topupAction.getSupportedProtocols();
    return protocols.map((p) => utils.parseBytes32String(p));
  }
}
