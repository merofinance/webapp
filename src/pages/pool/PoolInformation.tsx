import React from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";

import Information from "../../components/Information";
import { Pool } from "../../lib";
import { selectPrice } from "../../state/selectors";
import { formatPercent, numberToCompactCurrency } from "../../lib/numeric";
import etherscan from "../../assets/ui/etherscan.svg";
import memo from "../../assets/ui/memo.svg";
import { getEtherscanAddressLink } from "../../lib/web3";

interface Props {
  pool: Pool;
}

const PoolInformation = ({ pool }: Props): JSX.Element => {
  const price = useSelector(selectPrice(pool));
  const { chainId } = useWeb3React();
  const locked = pool.totalAssets * price;

  return (
    <Information
      header="Pool Information"
      rows={[
        {
          label: "Pool TVL",
          tooltip: "The market capitalization of assets held in the pool (total value locked)",
          value: numberToCompactCurrency(locked),
        },
        {
          label: "APY",
          tooltip: "The current annual percent yield earned by pool LPs",
          value: formatPercent(pool.apy),
        },
        {
          label: "Strategy",
          tooltip: "The current protocol funds are allocated to for yield farming strategies",
          value: pool.name,
          details: [
            {
              icon: etherscan,
              label: "View Contract",
              link: getEtherscanAddressLink(chainId, pool.address),
            },
            {
              icon: memo,
              label: "Read more",
              link: "https://docs.backd.fund/protocol-architecture/pools/strategies",
            },
          ],
        },
      ]}
    />
  );
};

export default PoolInformation;
