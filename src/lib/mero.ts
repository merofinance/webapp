import {
  AddressProvider,
  AddressProvider__factory as AddressProviderFactory,
  MeroTriHopCvx__factory as MeroTriHopCvxFactory,
  Controller__factory as ControllerFactory,
  ICurveSwap__factory as CurveFactory,
  GasBank,
  GasBank__factory as GasBankFactory,
  IERC20Full__factory as Ierc20FullFactory,
  IStrategy__factory as IStrategyFactory,
  IChainlinkOracleProvider__factory as OracleProviderFactory,
  LiquidityPool__factory as LiquidityPoolFactory,
  StakerVault__factory as StakerVaultFactory,
  TopUpActionFeeHandler__factory as TopUpActionFeeHandlerFactory,
  PoolMigrationZap__factory as PoolMigrationZapFactory,
  TopUpAction__factory as TopUpActionFactory,
  Vault__factory as VaultFactory,
  Controller,
  TopUpAction,
  PoolMigrationZap,
} from "@merofinance/protocol";
import contracts from "@merofinance/protocol/config/deployments/map.json";
import { BigNumber, ContractTransaction, ethers, providers, Signer, utils } from "ethers";
import fromEntries from "fromentries";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";
import { UnsupportedNetwork } from "../app/errors";
import { Apy, getApys } from "./apys";
import { getPrices as getPricesFromCoingecko } from "./coingecko";
import {
  SLIPPAGE_TOLERANCE,
  ETH_DECIMALS,
  ZERO_ADDRESS,
  GAS_BUFFER,
  GWEI_DECIMALS,
  INFINITE_APPROVE_AMMOUNT,
  oldPools,
  oldAddressProviders,
  DUMMY_ETH_ADDRESS,
} from "./constants";
import { oldPoolApys } from "./data/pool-metadata";
import { lendingProviders } from "./lending-protocols";
import { makeContractTransaction, positions as mockPositions } from "./mock/data";
import { encodeAddress } from "./text";
import {
  ActionFees,
  Address,
  AllowanceQuery,
  Balances,
  LendingProtocol,
  Optional,
  PlainActionFees,
  PlainLoan,
  PlainPool,
  PlainPosition,
  PlainWithdrawalFees,
  Pool,
  Position,
  Prices,
  StrategyInfo,
  Token,
  toPlainActionFees,
} from "./types";

export type MeroOptions = {
  chainId: number;
};

export interface Mero {
  getChainId(): number;
  currentAccount(): Promise<Address>;
  listPools(): Promise<PlainPool[]>;
  listOldPools(): Promise<PlainPool[]>;
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
  getPrices(symbol: Token[]): Promise<Prices>;
  approve(token: Token, spender: Address, amount: ScaledNumber): Promise<ContractTransaction>;
  deposit(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction>;
  migrate(poolAddress: string): Promise<ContractTransaction>;
  migrateAll(poolAddresses: string[]): Promise<ContractTransaction>;
  oldWithdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction>;
  withdraw(
    pool: Pool,
    amount: ScaledNumber,
    withdrawalFee: ScaledNumber
  ): Promise<ContractTransaction>;
  unstake(vaultAddress: Address, amount: ScaledNumber): Promise<ContractTransaction>;

  listSupportedProtocols(): Promise<string[]>;

  provider: providers.Provider;
  topupActionAddress: Optional<string>;
  poolMigrationZapAddres: string;
}

export class Web3Mero implements Mero {
  private controller: Controller;

  private topupAction: TopUpAction | undefined;

  private addressProvider: AddressProvider;

  private gasBank: GasBank | undefined;

  private poolMigrationZap: PoolMigrationZap;

  private chainId: number;

  constructor(private _provider: Signer | providers.Provider, private options: MeroOptions) {
    this.chainId = options.chainId;
    const contracts = this.getContracts();

    // eslint-disable-next-line dot-notation
    this.controller = ControllerFactory.connect(contracts.Controller[0], _provider);
    this.poolMigrationZap = PoolMigrationZapFactory.connect(
      contracts.PoolMigrationZap[0], // eslint-disable-line dot-notation
      _provider
    );
    // eslint-disable-next-line dot-notation
    if (contracts.TopUpAction && contracts.TopUpAction.length > 0)
      this.topupAction = TopUpActionFactory.connect(contracts.TopUpAction[0], _provider);
    // eslint-disable-next-line dot-notation
    if (contracts.GasBank && contracts.GasBank.length > 0)
      this.gasBank = GasBankFactory.connect(contracts.GasBank[0], _provider);
    this.addressProvider = AddressProviderFactory.connect(
      contracts.AddressProvider[0], // eslint-disable-line dot-notation
      _provider
    );
  }

  get topupActionAddress(): Optional<string> {
    return this.topupAction ? this.topupAction.address : null;
  }

  get poolMigrationZapAddres(): string {
    return this.poolMigrationZap.address;
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
    const [markets, apys] = await Promise.all([this.addressProvider.allPools(), getApys()]);
    return Promise.all(markets.map((v: any) => this.getPoolInfo(v, apys)));
  }

  async listOldPools(): Promise<PlainPool[]> {
    const markets = oldPools[this.chainId];
    return Promise.all(markets.map((v: any) => this.getOldPoolInfo(v)));
  }

  async getTokenInfo(tokenAddress: Address): Promise<Token> {
    if (tokenAddress === ZERO_ADDRESS) {
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
    if (tokenAddress === ZERO_ADDRESS) return ETH_DECIMALS;
    const token = Ierc20FullFactory.connect(tokenAddress, this._provider);
    return token.decimals();
  }

  async getPoolInfo(address: Address, apys?: Apy[]): Promise<PlainPool> {
    if (!apys) apys = await getApys();
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
      harvestable,
      vaultAddress,
      isPaused,
    ] = await Promise.all([
      pool.name(),
      pool.getLpToken(),
      pool.getUnderlying(),
      pool.totalUnderlying(),
      pool.exchangeRate(),
      pool.maxWithdrawalFee(),
      pool.minWithdrawalFee(),
      pool.withdrawalFeeDecreasePeriod(),
      this.getHarvestable(address),
      pool.vault(),
      pool.isPaused(),
    ]);

    const vaultShutdown = vaultAddress === ZERO_ADDRESS;

    const vault = VaultFactory.connect(vaultAddress, this._provider);
    const [lpToken, underlying, stakerVaultAddress, strategyAddress] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
      this.addressProvider.getStakerVault(lpTokenAddress),
      vaultShutdown ? Promise.resolve(ZERO_ADDRESS) : vault.strategy(),
    ]);

    const strategyInfo = await this.getStrategyInfo(strategyAddress, underlying.symbol);

    const apy = (apys.find((apy: Apy) => apy.pool === address)?.apy || 0) / 100;

    return {
      name,
      underlying,
      lpToken,
      apy: apy ? ScaledNumber.fromUnscaled(apy).toPlain() : null,
      address,
      totalAssets: new ScaledNumber(totalAssets, underlying.decimals).toPlain(),
      exchangeRate: new ScaledNumber(exchangeRate).toPlain(),
      stakerVaultAddress,
      maxWithdrawalFee: new ScaledNumber(maxWithdrawalFee).toPlain(),
      minWithdrawalFee: new ScaledNumber(minWithdrawalFee).toPlain(),
      feeDecreasePeriod: new ScaledNumber(feeDecreasePeriod, 0).toPlain(),
      harvestable: new ScaledNumber(harvestable, underlying.decimals).toPlain(),
      strategyInfo,
      isPaused,
    };
  }

  async getStrategyInfo(address: Address, underlyingSymbol: string): Promise<StrategyInfo | null> {
    if (address === ZERO_ADDRESS) return null;
    const strategy = MeroTriHopCvxFactory.connect(address, this._provider);
    const name = await strategy.name();

    // Handling the TriHop strategy
    if (name === "MeroTriHopCvx") {
      const [curvePoolAddress, curveIndex] = await Promise.all([
        strategy.curvePool(),
        strategy.curveIndex(),
      ]);
      const curvePool = CurveFactory.connect(curvePoolAddress, this._provider);
      const [hopTokenAddress, tokenAddress] = await Promise.all([
        curvePool.coins(curveIndex),
        curvePool.coins(BigNumber.from(1).sub(curveIndex)),
      ]);
      const hopToken = Ierc20FullFactory.connect(hopTokenAddress, this._provider);
      const token = Ierc20FullFactory.connect(tokenAddress, this._provider);
      const [hopTokenSymbol, tokenSymbol] = await Promise.all([hopToken.symbol(), token.symbol()]);
      const description = `Deposits ${underlyingSymbol} as single sided liquidity to mint ${hopTokenSymbol}. Then deposits ${hopTokenSymbol} into the Curve ${tokenSymbol}-${hopTokenSymbol} Pool. Then stakes the LP Token in Convex Finance to earn CRV & CVX rewards which are sold for ${underlyingSymbol} and deposited back into the pool.`;
      return {
        name,
        address,
        description,
      };
    }

    // Handling the Bi and ETH strategy
    if (name === "MeroBiCvx" || name === "MeroEthCvx") {
      const [curvePoolAddress, curveIndex] = await Promise.all([
        strategy.curvePool(),
        strategy.curveIndex(),
      ]);
      const curvePool = CurveFactory.connect(curvePoolAddress, this._provider);
      const tokenAddress = await curvePool.coins(BigNumber.from(1).sub(curveIndex));
      const token = Ierc20FullFactory.connect(tokenAddress, this._provider);
      const tokenSymbol = await token.symbol();
      const description = `Deposits ${underlyingSymbol} into the Curve ${tokenSymbol}-${underlyingSymbol} Pool. Then stakes the LP Token in Convex Finance to earn CRV & CVX rewards which are sold for ${underlyingSymbol} and deposited back into the pool.`;
      return {
        name,
        address,
        description,
      };
    }

    return null;
  }

  async getOldPoolInfo(address: Address): Promise<PlainPool> {
    const pool = LiquidityPoolFactory.connect(address, this._provider);
    const [name, lpTokenAddress, underlyingAddress, totalAssets, exchangeRate, isPaused] =
      await Promise.all([
        pool.name(),
        pool.getLpToken(),
        pool.getUnderlying(),
        pool.totalUnderlying(),
        pool.exchangeRate(),
        pool.isPaused(),
      ]);

    const oldAddressProvider = AddressProviderFactory.connect(
      oldAddressProviders[this.chainId], // eslint-disable-line dot-notation
      this.provider
    );
    const [lpToken, underlying, stakerVaultAddress] = await Promise.all([
      this.getTokenInfo(lpTokenAddress),
      this.getTokenInfo(underlyingAddress),
      oldAddressProvider.getStakerVault(lpTokenAddress),
    ]);

    const apy = oldPoolApys[pool.address].toPlain();

    return {
      name,
      underlying,
      lpToken,
      apy,
      address,
      totalAssets: new ScaledNumber(totalAssets, underlying.decimals).toPlain(),
      exchangeRate: new ScaledNumber(exchangeRate).toPlain(),
      stakerVaultAddress,
      maxWithdrawalFee: ScaledNumber.fromUnscaled(0).toPlain(),
      minWithdrawalFee: ScaledNumber.fromUnscaled(0).toPlain(),
      feeDecreasePeriod: ScaledNumber.fromUnscaled(0, 0).toPlain(),
      harvestable: ScaledNumber.fromUnscaled(0, underlying.decimals).toPlain(),
      strategyInfo: null,
      isPaused,
    };
  }

  async getHarvestable(poolAddress: Address): Promise<BigNumber> {
    const pool = LiquidityPoolFactory.connect(poolAddress, this._provider);
    const vaultAddress = await pool.vault();
    if (vaultAddress === ZERO_ADDRESS) return BigNumber.from(0);
    const vault = VaultFactory.connect(vaultAddress, this._provider);
    const strategyAddress = await vault.strategy();
    if (strategyAddress === ZERO_ADDRESS) return BigNumber.from(0);
    const strategy = IStrategyFactory.connect(strategyAddress, this._provider);
    return strategy.harvestable();
  }

  async getWithdrawalFees(pools: Pool[]): Promise<PlainWithdrawalFees> {
    const account = await this.currentAccount();

    interface WithdrawalFeeMeta {
      timeToWait: BigNumber;
      feeRatio: BigNumber;
      lastActionTimestamp: BigNumber;
    }

    const promises = pools.map((pool: Pool) => {
      const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
      return poolContract.withdrawalFeeMetas(account);
    });

    const withdrawalFeeMetas: WithdrawalFeeMeta[] = await Promise.all(promises);

    return fromEntries(
      pools.map((pool: Pool, index: number) => {
        const { timeToWait, feeRatio, lastActionTimestamp } = withdrawalFeeMetas[index];
        const now = Math.floor(Date.now() / 1000);
        const start = Number(lastActionTimestamp.toString());
        const elapsed = now - start;
        const delay = Number(timeToWait.toString());
        const ratio = Number(feeRatio.toString());
        const minFee = pool.minWithdrawalFee.toNumber();
        if (elapsed >= delay || minFee > ratio) {
          return [pool.address, pool.minWithdrawalFee.toPlain()];
        }
        const withdrawalFee = ratio - (ratio - minFee) * (elapsed / delay);
        const fee = ScaledNumber.fromPlain({ value: withdrawalFee.toString(), decimals: 18 });
        return [pool.address, fee.toPlain()];
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
    const feeHandlerAddress = await this.topupAction.feeHandler();
    const feeHandler = TopUpActionFeeHandlerFactory.connect(feeHandlerAddress, this._provider);

    const [totalBn, keeperFractionBn, treasuryFractionBn] = await Promise.all([
      this.topupAction.actionFee(),
      feeHandler.keeperFeeFraction(),
      feeHandler.treasuryFeeFraction(),
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
    return new ScaledNumber(await this.topupAction.estimatedGasUsage(), GWEI_DECIMALS).toPlain();
  }

  async registerPosition(
    pool: Pool,
    position: Position,
    value: BigNumber
  ): Promise<ContractTransaction> {
    if (!this.topupAction) return makeContractTransaction("", "");

    const protocol = utils.formatBytes32String(position.protocol);
    const account = encodeAddress(position.account);

    const record = {
      threshold: position.threshold.value,
      priorityFee: position.priorityFee.value,
      maxFee: position.maxGasPrice.value,
      actionToken: pool.underlying.address,
      depositToken: pool.lpToken.address,
      singleTopUpAmount: position.singleTopUp.value,
      totalTopUpAmount: position.maxTopUp.value,
      depositTokenBalance: ScaledNumber.fromUnscaled(0).value,
      registeredAt: Date.now(),
      extra: utils.formatBytes32String("false"),
    };

    const gasEstimate = await this.topupAction.estimateGas.register(account, protocol, 0, record, {
      value,
    });
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return this.topupAction.register(account, protocol, 0, record, {
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
      encodeAddress(account),
      utils.formatBytes32String(protocol),
      unstake
    );
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return this.topupAction.resetPosition(
      encodeAddress(account),
      utils.formatBytes32String(protocol),
      unstake,
      {
        gasLimit,
      }
    );
  }

  async getAllowance(
    token: Pick<Token, "address" | "decimals">,
    spender: Address,
    account?: string
  ): Promise<ScaledNumber> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (token.address === ZERO_ADDRESS) {
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
    const gasEstimate = await tokenContract.estimateGas.approve(spender, amount.value);
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return tokenContract.approve(spender, amount.value, { gasLimit });
  }

  async deposit(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const value = pool.underlying.address === ZERO_ADDRESS ? amount.value : 0;
    const minTokenAmount = amount
      .div(pool.exchangeRate)
      .mul(ScaledNumber.fromUnscaled(SLIPPAGE_TOLERANCE, amount.decimals));
    const gasEstimate = await poolContract.estimateGas.depositAndStake(
      amount.value,
      minTokenAmount.value,
      {
        value,
      }
    );
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return poolContract.depositAndStake(amount.value, minTokenAmount.value, {
      value,
      gasLimit,
    });
  }

  async migrate(poolAddress: string): Promise<ContractTransaction> {
    const gasEstimate = await this.poolMigrationZap.estimateGas.migrate(poolAddress);
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return this.poolMigrationZap.migrate(poolAddress, {
      gasLimit,
    });
  }

  async migrateAll(poolAddresses: string[]): Promise<ContractTransaction> {
    const gasEstimate = await this.poolMigrationZap.estimateGas.migrateAll(poolAddresses);
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return this.poolMigrationZap.migrateAll(poolAddresses, {
      gasLimit,
    });
  }

  async oldWithdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const gasEstimate = await poolContract.estimateGas["redeem(uint256)"](amount.value);
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return poolContract["redeem(uint256)"](amount.value, {
      gasLimit,
    });
  }

  async withdraw(
    pool: Pool,
    amount: ScaledNumber,
    withdrawalFee: ScaledNumber
  ): Promise<ContractTransaction> {
    const poolContract = LiquidityPoolFactory.connect(pool.address, this._provider);
    const gasEstimate = await poolContract.estimateGas.unstakeAndRedeem(
      amount.value,
      BigNumber.from(0)
    );
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return poolContract.unstakeAndRedeem(amount.value, BigNumber.from(0), {
      gasLimit,
    });
  }

  async unstake(vault: Address, amount: ScaledNumber): Promise<ContractTransaction> {
    const vaultContract = StakerVaultFactory.connect(vault, this._provider);
    const gasEstimate = await vaultContract.estimateGas.unstake(amount.value);
    const gasLimit = gasEstimate.mul(GAS_BUFFER).div(10);
    return vaultContract.unstake(amount.value, { gasLimit });
  }

  async getBalance(address: string, account?: string): Promise<ScaledNumber> {
    if (!account) {
      account = await this.currentAccount();
    }
    if (address === ZERO_ADDRESS) {
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
    if (!this.gasBank) return ScaledNumber.fromUnscaled(0).toPlain();
    const balance = await this.gasBank.balanceOf(await this.currentAccount());
    return new ScaledNumber(balance).toPlain();
  }

  async getPricesFromOracle(tokens: Token[]): Promise<Prices> {
    // Oracle doesn't exist on testnet. Just returning some dummy values.
    if (this.chainId !== 1) {
      const result: Prices = {};
      tokens.forEach((token, i) => {
        if (token.address === ZERO_ADDRESS) {
          result[token.symbol] = 1_300;
        } else {
          result[token.symbol] = 1;
        }
      });
      return result;
    }

    const contracts = this.getContracts();
    if (!contracts.ChainlinkOracleProvider || contracts.ChainlinkOracleProvider.length === 0) {
      throw new Error(`failed to fetch prices`);
    }
    const address = contracts.ChainlinkOracleProvider[0];
    const oracleProvider = OracleProviderFactory.connect(address, this._provider);
    const prices = await Promise.all(
      tokens.map((token) => {
        // Chailink wants this address instead of the zero address for ETH
        const address = token.address === ZERO_ADDRESS ? DUMMY_ETH_ADDRESS : token.address;
        return oracleProvider.getPriceUSD(address);
      })
    );
    const result: Prices = {};
    tokens.forEach((token, i) => {
      result[token.symbol] = new ScaledNumber(prices[i], 18).toNumber();
    });
    return result;
  }

  async getPrices(tokens: Token[]): Promise<Prices> {
    const prices = await getPricesFromCoingecko(tokens.map((t) => t.symbol))
      .catch((_e) => this.getPricesFromOracle(tokens))
      .catch((e) => {
        throw new Error(`failed to fetch prices: ${e.message}`);
      });
    return prices;
  }

  async listSupportedProtocols(): Promise<string[]> {
    if (!this.topupAction) return [];

    const protocols = await this.topupAction.getSupportedProtocols();
    return protocols.map((p) => utils.parseBytes32String(p));
  }
}
