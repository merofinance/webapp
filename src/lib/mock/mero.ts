import { BigNumber, ContractTransaction, providers } from "ethers";
import fromEntries from "fromentries";
import { PlainScaledNumber, ScaledNumber } from "scaled-number";

import { Pool } from "..";
import { Mero } from "../mero";
import { GWEI_DECIMALS } from "../constants";
import {
  Address,
  AllowanceQuery,
  Balances,
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
  PlainPool,
} from "../types";
import { balances, makeContractTransaction, masterAccount, pools, positions } from "./data";

export default class MockMero implements Mero {
  private allowances: Record<string, Balances> = {};

  get provider(): providers.Provider {
    return providers.getDefaultProvider();
  }

  getChainId(): number {
    return 1;
  }

  currentAccount(): Promise<Address> {
    return Promise.resolve(masterAccount);
  }

  listPools(): Promise<PlainPool[]> {
    return Promise.resolve(
      pools.map((pool) =>
        transformPool(pool, (v: Optional<BigNumber> | undefined) => new ScaledNumber(v).toPlain())
      )
    );
  }

  listOldPools(): Promise<PlainPool[]> {
    return Promise.resolve(
      pools.map((pool) =>
        transformPool(pool, (v: Optional<BigNumber> | undefined) => new ScaledNumber(v).toPlain())
      )
    );
  }

  getPoolInfo(address: Address): Promise<PlainPool> {
    const pool = pools.find((pool) => pool.address === address);
    if (!pool) throw Error("No pool found for address");
    return Promise.resolve(
      transformPool(pool, (v: Optional<BigNumber> | undefined) => new ScaledNumber(v).toPlain())
    );
  }

  getLoanPosition(protocol: LendingProtocol, address?: Address): Promise<Optional<PlainLoan>> {
    return Promise.resolve({
      protocol: LendingProtocol.Aave,
      totalCollateralETH: new ScaledNumber().toPlain(),
      totalDebtETH: new ScaledNumber().toPlain(),
      availableBorrowsETH: new ScaledNumber().toPlain(),
      currentLiquidationThreshold: new ScaledNumber().toPlain(),
      healthFactor: new ScaledNumber().toPlain(),
    });
  }

  getAllowance(token: Token, spender: Address, account?: string): Promise<ScaledNumber> {
    return Promise.resolve(this.allowances[token.address][spender] || new ScaledNumber());
  }

  getAllowances(queries: AllowanceQuery[]): Promise<Record<string, Balances>> {
    return Promise.resolve(this.allowances);
  }

  getBalance(pool: Address, account?: Address): Promise<ScaledNumber> {
    const number = pool in balances ? balances[pool] : BigNumber.from(0);
    return Promise.resolve(new ScaledNumber(number));
  }

  getGasBankBalance(): Promise<PlainScaledNumber> {
    return Promise.resolve(new ScaledNumber().toPlain());
  }

  getWithdrawalFees(pools: Pool[]): Promise<PlainWithdrawalFees> {
    return Promise.resolve({});
  }

  getEstimatedGasUsage(): Promise<PlainScaledNumber> {
    return Promise.resolve(ScaledNumber.fromUnscaled(1000, GWEI_DECIMALS).toPlain());
  }

  async deposit(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(pool.address, account);
  }

  async oldWithdraw(pool: Pool, amount: ScaledNumber): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(pool.address, account);
  }

  async withdraw(
    pool: Pool,
    amount: ScaledNumber,
    withdrawalFee: ScaledNumber
  ): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(pool.address, account);
  }

  async unstake(poolAddress: Address, amount: ScaledNumber): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(poolAddress, account);
  }

  async approve(
    token: Token,
    spender: Address,
    amount: ScaledNumber
  ): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    if (!this.allowances[token.address]) {
      this.allowances[token.address] = {};
    }
    this.allowances[token.address][spender] = amount;
    return makeContractTransaction(token.address, account);
  }

  async migrate(poolAddress: string): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(poolAddress, account);
  }

  async migrateAll(poolAddresses: string[]): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(poolAddresses[0], account);
  }

  async getBalances(pools: Address[], account?: Address): Promise<Balances> {
    const balances = await Promise.all(pools.map((p) => this.getBalance(p, account)));
    return fromEntries(pools.map((p, i) => [p, balances[i]]));
  }

  getPrices(symbols: string[]): Promise<Prices> {
    return Promise.resolve(fromEntries(symbols.map((symbol) => [symbol, 3])));
  }

  getPositions(): Promise<PlainPosition[]> {
    return Promise.resolve(positions);
  }

  getActionFees(): Promise<PlainActionFees> {
    const actionFees: ActionFees = {
      total: ScaledNumber.fromUnscaled(0.03),
      keeperFraction: ScaledNumber.fromUnscaled(0.01),
      treasuryFraction: ScaledNumber.fromUnscaled(0.01),
      lpFraction: ScaledNumber.fromUnscaled(0.01),
    };
    return Promise.resolve(toPlainActionFees(actionFees));
  }

  get topupActionAddress(): string {
    return "0x38d6f612D116dBc1411E977A5D77E02bBae58e63";
  }

  get poolMigrationZapAddres(): string {
    return "0x38d6f612D116dBc1411E977A5D77E02bBae58e63";
  }

  listSupportedProtocols(): Promise<string[]> {
    return Promise.resolve(["Aave", "Compound"]);
  }

  async registerPosition(
    pool: Pool,
    position: Position,
    value: BigNumber
  ): Promise<ContractTransaction> {
    const account = await this.currentAccount();
    return makeContractTransaction(this.topupActionAddress, account);
  }

  async removePosition(
    account: Address,
    protocol: string,
    unstake?: boolean
  ): Promise<ContractTransaction> {
    return makeContractTransaction(this.topupActionAddress, account);
  }
}
