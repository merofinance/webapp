import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useBackd } from "../../app/hooks/use-backd";
import { fetchState } from "../../state/poolsListSlice";
import Seo from "../../components/Seo";
import { useWeb3Updated } from "../../app/hooks/use-web3-updated";
import Radio from "../../components/Radio";
import LendingAction from "./lending/LendingAction";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const backd = useBackd();
  const dispatch = useDispatch();
  const updated = useWeb3Updated();

  const [tab, setTab] = useState("lending");

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchState(backd));
  }, [updated]);

  return (
    <StyledPoolsPage>
      <Seo title="Backd Actions" description="TODO" />
      <Radio
        options={[
          {
            label: t("actions.lending.header"),
            value: "lending",
          },
          {
            label: t("actions.limitOrders.header"),
            value: "limit",
            disabledText: t("components.comingSoon"),
          },
        ]}
        active={tab}
        setOption={(value: string) => setTab(value)}
      />
      <LendingAction />
    </StyledPoolsPage>
  );
};

export default ActionsPage;
