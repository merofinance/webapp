import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import { TransactionInfo } from "../lib/types";
import { selectTransactions } from "../state/transactionsSlice";
import { GradientText } from "../styles/GradientText";

const StyledRecentTransactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.6rem;
  background-color: rgba(10, 6, 33, 0.15);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const RecentTransactions = () => {
  const { t } = useTranslation();
  const transactions = useSelector(selectTransactions);

  return (
    <StyledRecentTransactions>
      <HeaderContainer>
        <Header>{t("walletConnect.details.change")}</Header>
        <Clear>{t("walletConnect.details.clear")}</Clear>
      </HeaderContainer>
      {transactions.map((transaction: TransactionInfo) => (
        <Transaction>
          <Status />
          <Text>meow</Text>
          <Text>meow</Text>
          <LaunchIcon
            fontSize="medium"
            style={{ fill: "var(--secondary)", transform: "translateY(0px)" }}
          />
        </Transaction>
      ))}
    </StyledRecentTransactions>
  );
};

export default RecentTransactions;
