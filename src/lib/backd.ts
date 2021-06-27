import contracts from "@backdfund/protocol/build/deployments/map.json";
import { Controller } from "@backdfund/protocol/typechain/Controller";
import { ControllerFactory } from "@backdfund/protocol/typechain/ControllerFactory";
import { Ierc20FullFactory } from "@backdfund/protocol/typechain/Ierc20FullFactory";
import { LiquidityPoolFactory } from "@backdfund/protocol/typechain/LiquidityPoolFactory";
import { StakerVaultFactory } from "@backdfund/protocol/typechain/StakerVaultFactory";
import { TopUpAction } from "@backdfund/protocol/typechain/TopUpAction";
import { TopUpActionFactory } from "@backdfund/protocol/typechain/TopUpActionFactory";
import { BigNumber, ContractTransaction, ethers, providers, Signer, utils } from "ethers";
import { getPrices } from "./coingecko";
import { DEFAULT_SCALE, ETH_DECIMALS, ETH_DUMMY_ADDRESS } from "./constants";
import { bigNumberToFloat, floatToBigNumber, scale } from "./numeric";
import {
  Address,
  AllowanceQuery,
  Balances,
  Pool,
  Position,
  Prices,
  Token,
  transformPool,
  transformPosition,
} from "./types";

export type BackdOptions = {
  chainId: number;
};

export interface Backd {
  currentAccount(): Promise<Address>;
  listPools(): Promise<Pool[]>;
  getPoolInfo(address: Address): Promise<Pool>;
  getPositions(): Promise<Position[]>;
  registerPosition(pool: Pool, position: Position): Promise<ContractTransaction>;
  removePosition(account: Address, protocol: string): Promise<ContractTransaction>;
  getBalance(address: Address, account?: Address): Promise<number>;
  getBalances(addresses: Address[], account?: Address): Promise<Balances>;
  getAllowance(token: Token, spender: Address, account?: string): Promise<number>;
  getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>>;
  getPrices(symbol: string[]): Promise<Prices>;
  approve(token: Token, spender: Address, amount: number): Promise<ContractTransaction>;
  deposit(pool: Pool, amount: number): Promise<ContractTransaction>;
  withdraw(poolAddress: Address, amount: number): Promise<ContractTransaction>;
  unstake(vaultAddress: Address, amount: number): Promise<ContractTransaction>;

  listSupportedProtocols(): Promise<string[]>;

  provider: providers.Provider;
  topupActionAddress: string;
}

export class Web3Backd implements Backd {
  private controller: Controller;
  private topupAction: TopUpAction;

  constructor(private _provider: Signer | providers.Provider, private options: BackdOptions) {
    const contracts = this.getContracts(options.chainId);

    this.controller = ControllerFactory.connect(contracts["Controller"][0], _provider);
    this.topupAction = TopUpActionFactory.connect(contracts["TopUpAction"][0], _provider);
  }

  get topupActionAddress(): string {
    return this.topupAction.address;
  }

  get provider(): providers.Provider {
    const provider = this._provider;
    if (provider instanceof Signer) {
      return provider.provider!!;
    }
    return provider;
  }

  private getContracts(chainId: number): Record<string, string[]> {
    switch (chainId) {
      case 1337:
        return contracts["1337"];
      default:
        throw new Error("Wrong network selected, please use a development network");
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
    const markets = await this.controller.allMarkets();
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
    const [name, lpTokenAddress, underlyingAddress, totalAssets, rawApy, exchangeRate] =
      await Promise.all([
        pool.name(),
        pool.getLpToken(),
        pool.getUnderlying(),
        pool.totalUnderlying(),
        pool.computeAPY(),
        pool.currentExchangeRate(),
      ]);
    const [lpToken, underlying, stakerVaultAddress] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
      this.controller.getStakerVault(lpTokenAddress),
    ]);
    const apy = rawApy.sub(scale(1));

    const rawPool = {
      name,
      underlying,
      lpToken,
      apy,
      address,
      totalAssets,
      exchangeRate,
      stakerVaultAddress,
    };
    return transformPool(rawPool, bigNumberToFloat);
  }

  async getPositions(): Promise<Position[]> {
    const account = await this.currentAccount();
    const rawPositions = await this.topupAction.listPositions(account);
    return rawPositions.map((rawPosition) => {
      return transformPosition(
        {
          protocol: ethers.utils.parseBytes32String(rawPosition.protocol),
          actionToken: rawPosition.record.actionToken,
          depositToken: rawPosition.record.depositToken,
          account: rawPosition.account,
          threshold: rawPosition.record.threshold,
          singleTopUp: rawPosition.record.singleTopUpAmount,
          totalTopUp: rawPosition.record.totalTopUpAmount,
          maxGasPrice: rawPosition.record.maxGasPrice.toNumber(),
        },
        bigNumberToFloat
      );
    });
  }

  async registerPosition(pool: Pool, position: Position): Promise<ContractTransaction> {
    const decimals = pool.underlying.decimals;
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const rawExchangeRate = await poolContract.currentExchangeRate();
    const protocol = utils.formatBytes32String(position.protocol);
    const rawPosition = transformPosition(position, (v) => floatToBigNumber(v, decimals));
    const depositAmount = rawPosition.totalTopUp.mul(rawExchangeRate).div(DEFAULT_SCALE);

    // TODO: allow to customize maxGasPrice, currently 200Gwei
    const maxGasPrice = BigNumber.from(200).mul(BigNumber.from(10).pow(9));

    return this.topupAction.register(
      position.account,
      protocol,
      rawPosition.threshold,
      pool.lpToken.address,
      depositAmount,
      pool.underlying.address,
      rawPosition.singleTopUp,
      rawPosition.totalTopUp,
      maxGasPrice
    );
  }

  removePosition(account: Address, protocol: string): Promise<ContractTransaction> {
    return this.topupAction.resetPosition(account, utils.formatBytes32String(protocol));
  }

  async getAllowance(
    token: Pick<Token, "address" | "decimals">,
    spender: Address,
    account?: string
  ): Promise<number> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (token.address === ETH_DUMMY_ADDRESS) {
      return Math.pow(10, 20);
    }
    const tokenContract = Ierc20FullFactory.connect(token.address, this._provider);
    const rawAllowance = await tokenContract.allowance(account, spender);
    return bigNumberToFloat(rawAllowance, token.decimals);
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

  async approve(token: Token, spender: Address, amount: number): Promise<ContractTransaction> {
    const tokenContract = Ierc20FullFactory.connect(token.address, this._provider);
    const scaledAmount = floatToBigNumber(amount, token.decimals);
    return tokenContract.approve(spender, scaledAmount);
  }

  async deposit(pool: Pool, amount: number): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const scaledAmount = floatToBigNumber(amount);
    const value = pool.underlying.address === ETH_DUMMY_ADDRESS ? scaledAmount : 0;
    return poolContract.deposit(scaledAmount, { value });
  }

  async withdraw(pool: Address, amount: number): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool, this._provider);
    const scaledAmount = floatToBigNumber(amount);
    return poolContract.redeem(scaledAmount);
  }

  async unstake(vault: Address, amount: number): Promise<ContractTransaction> {
    const vaultContract = StakerVaultFactory.connect(vault, this._provider);
    const scaledAmount = floatToBigNumber(amount);
    return vaultContract.unstake(scaledAmount);
  }

  async getBalance(address: string, account?: string): Promise<number> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (address === ETH_DUMMY_ADDRESS) {
      return this.provider.getBalance(account).then(bigNumberToFloat);
    }
    const token = Ierc20FullFactory.connect(address, this._provider);
    const rawBalance = await token.balanceOf(account);
    return bigNumberToFloat(rawBalance);
  }

  async getBalances(addresses: string[], account?: string): Promise<Balances> {
    const promises = addresses.map((a) => this.getBalance(a, account));
    const balances = await Promise.all(promises);
    return Object.fromEntries(addresses.map((a, i) => [a, balances[i]]));
  }

  async getPrices(symbols: string[]): Promise<Prices> {
    return getPrices(symbols).catch((e) => {
      throw new Error(`failed to fetch prices: ${e.message}`);
    });
  }

  async listSupportedProtocols(): Promise<string[]> {
    const protocols = await this.topupAction.getSupportedProtocols();
    return protocols.map((p) => utils.parseBytes32String(p));
  }
}
