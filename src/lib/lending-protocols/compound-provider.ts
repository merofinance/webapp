import { providers, Signer } from "ethers";

import { Address, LendingProtocol, LendingProtocolProvider, PlainLoan, Optional } from "../types";
import { ScaledNumber } from "../scaled-number";

// The Compound Web API is used here instead of their contracts to get the data
// The contracts do not have a clean API for this data, resulting in several calls which can be messy and slow
export class CompoundProvider implements LendingProtocolProvider {
  async getPosition(
    address: Address,
    provider: Signer | providers.Provider
  ): Promise<Optional<PlainLoan>> {
    const COMPOUND_API = "https://api.compound.finance/api/v2/account";
    const account = address;

    // Only Mainnet is supported by the API
    const response = await fetch(`${COMPOUND_API}?addresses[]=${account}`);

    const data = await response.json();
    if (!data.accounts || data.accounts.length === 0) return null;

    const accountData = data.accounts[0];
    const collateral = ScaledNumber.fromUnscaled(accountData.total_collateral_value_in_eth.value);
    const debt = ScaledNumber.fromUnscaled(accountData.total_borrow_value_in_eth.value);
    return Promise.resolve({
      protocol: LendingProtocol.Compound,
      totalCollateralETH: collateral.toPlain(),
      totalDebtETH: debt.toPlain(),
      availableBorrowsETH: new ScaledNumber().toPlain(), // Not returned by API, set as 0 as not needed in UI at the moment
      currentLiquidationThreshold: new ScaledNumber().toPlain(), // Not returned by API, set as 0 as not needed in UI at the moment
      healthFactor: debt.isZero()
        ? new ScaledNumber().toPlain()
        : collateral.div(debt).gt(ScaledNumber.fromUnscaled(100))
        ? ScaledNumber.fromUnscaled(100).toPlain()
        : collateral.div(debt).toPlain(),
    });
  }
}
