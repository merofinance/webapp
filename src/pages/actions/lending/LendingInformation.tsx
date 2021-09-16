import React from "react";
import Information from "../../../components/Information";

const LendingInformation = (): JSX.Element => {
  return (
    <Information
      header="Lending Information"
      rows={[
        {
          label: "Supply Balance",
          tooltip:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
          value: "$10,000",
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
