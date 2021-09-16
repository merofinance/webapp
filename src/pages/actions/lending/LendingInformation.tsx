import React from "react";
import { useSelector } from "react-redux";
import Information from "../../../components/Information";
import { selectAave, selectCompound } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";

const LendingInformation = (): JSX.Element => {
  const aave = useSelector(selectAave);
  const compound = useSelector(selectCompound);
  const ethPrice = useSelector(selectEthPrice);

  return (
    <Information
      header="Lending Information"
      rows={[
        {
          label: "Supply Balance",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
          value:
            !aave || !aave.totalCollateralETH.toUsdValue
              ? "---"
              : aave.totalCollateralETH.toUsdValue(ethPrice),
        },
        {
          label: "Borrow Balance",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
          value: "$7,000",
        },
        {
          label: "Health Factor",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
          value: "1.3",
        },
      ]}
    />
  );
};

export default LendingInformation;
