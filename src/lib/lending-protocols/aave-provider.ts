import { providers, Signer } from "ethers";

import { Address, LendingProtocol, LendingProtocolProvider, Optional, PlainLoan } from "../types";
import { LendingPoolFactory } from "../contracts/aave/LendingPool";
import { ScaledNumber } from "../scaled-number";

export class AaveProvider implements LendingProtocolProvider {
  async getPosition(
    address: Address,
    provider: Signer | providers.Provider
  ): Promise<Optional<PlainLoan>> {
    const account = address;
    const lendingPoolContract = LendingPoolFactory.connect(provider);
    const userAccountData = await lendingPoolContract.getUserAccountData(account);

    if (new ScaledNumber(userAccountData.totalCollateralETH).isZero()) return null;

    return {
      protocol: LendingProtocol.Aave,
      totalCollateralETH: new ScaledNumber(userAccountData.totalCollateralETH).toPlain(),
      totalDebtETH: new ScaledNumber(userAccountData.totalDebtETH).toPlain(),
      availableBorrowsETH: new ScaledNumber(userAccountData.availableBorrowsETH).toPlain(),
      currentLiquidationThreshold: ScaledNumber.fromUnscaled("1", 4)
        .div(new ScaledNumber(userAccountData.currentLiquidationThreshold, 4))
        .toPlain(),
      healthFactor: new ScaledNumber(userAccountData.healthFactor).gt(
        ScaledNumber.fromUnscaled(100)
      )
        ? ScaledNumber.fromUnscaled(100).toPlain()
        : new ScaledNumber(userAccountData.healthFactor).toPlain(),
    };
  }
}
