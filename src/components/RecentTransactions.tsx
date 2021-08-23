import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { TransactionInfo } from "../lib/types";
import { selectTransactions } from "../state/transactionsSlice";
import { GradientText } from "../styles/GradientText";

const StyledRecentTransactions = styled.div`
  width: calc(100% + 3.2rem);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.6rem;
  background-color: rgba(10, 6, 33, 0.15);
  margin-top: 0.3rem;
  transform: translate(-1.6rem, 2.1rem);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const Header = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.15px;
`;

const Clear = styled(GradientText)`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.46px;
`;

const Transaction = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
`;

const Status = styled.img`
  width: 1.3rem;
`;

const Text = styled.div`
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 500;
`;

const Empty = styled.div`
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 500;
  opacity: 0.6;
  margin-top: 0.8rem;
`;

const RecentTransactions = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);

  return (
    <StyledRecentTransactions>
      <HeaderContainer>
        <Header>{t("walletConnect.details.recentTransactions")}</Header>
        {transactions.length > 0 && <Clear>{t("walletConnect.details.clear")}</Clear>}
      </HeaderContainer>
      {transactions.length === 0 && <Empty>{t("walletConnect.details.empty")}</Empty>}
      {transactions.map((transaction: TransactionInfo) => (
        <Transaction>
          <Status />
          <Text>meow</Text>
          <Text>meow</Text>
          <LaunchIcon
            fontSize="medium"
            style={{ fill: "var(--gradient)", transform: "translateY(0px)" }}
          />
        </Transaction>
      ))}
    </StyledRecentTransactions>
  );
};

export default RecentTransactions;
