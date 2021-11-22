import { LendingProtocol, LendingProtocolProvider } from "../types";
import { AaveProvider } from "./aave-provider";
import { CompoundProvider } from "./compound-provider";

export const lendingProviders: Record<LendingProtocol, LendingProtocolProvider> = {
  [LendingProtocol.Aave]: new AaveProvider(),
  [LendingProtocol.Compound]: new CompoundProvider(),
};
