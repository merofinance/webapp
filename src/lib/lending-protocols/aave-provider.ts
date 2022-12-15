import { Contract, providers, Signer } from "ethers";
import { ScaledNumber } from "scaled-number";

import { Address, LendingProtocol, LendingProtocolProvider, Optional, PlainLoan } from "../types";
import { LendingPoolFactory } from "../contracts/aave/LendingPool";
import POOL_METADATA from "../data/pool-metadata";

export class AaveProvider implements LendingProtocolProvider {
  async getPosition(
    address: Address,
    provider: Signer | providers.Provider
  ): Promise<Optional<PlainLoan>> {
    try {
      const lendingPoolContract = LendingPoolFactory.connect(provider);
      const userAccountData = await lendingPoolContract.getUserAccountData(address);

      if (new ScaledNumber(userAccountData.totalCollateralETH).isZero()) return null;

      const borrowedData = await Promise.all(
        POOL_METADATA.map(async (metadata) => {
          const abi = ["function balanceOf(address owner) external view returns (uint256)"];
          const stableToken = new Contract(metadata.aaveStableDebtToken, abi, provider);
          const variableToken = new Contract(metadata.aaveVariableDebtToken, abi, provider);
          const [stableBalance, variableBalance] = await Promise.all([
            stableToken.balanceOf(address),
            variableToken.balanceOf(address),
          ]);
          return {
            symbol: metadata.symbol,
            stableBalance: new ScaledNumber(stableBalance),
            variableBalance: new ScaledNumber(variableBalance),
          };
        })
      );

      const borrowedTokens = borrowedData
        .filter((data) => !data.stableBalance.isZero() || !data.variableBalance.isZero())
        .map((data) => data.symbol);

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
        borrowedTokens,
      };
    } catch {
      return null;
    }
  }
}
