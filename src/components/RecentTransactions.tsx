import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import externalLink from "../assets/ui/gradient-external-link.svg";
import { TransactionInfo } from "../lib/types";
import { selectTransactions } from "../state/transactionsSlice";
import { GradientText } from "../styles/GradientText";
import { ETHERSCAN_URL } from "../lib/constants";
import pending from "../assets/ui/status/pending.svg";
import success from "../assets/ui/status/success.svg";
import failure from "../assets/ui/status/failure.svg";

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
  margin: 0.7rem 0;
`;

interface StatusProps {
  pending: boolean;
}

const still = keyframes`
	0% {
		transform: none;
	}
`;

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const Status = styled.img`
  width: 1.3rem;
  animation: ${(props: StatusProps) => (props.pending ? spin : still)} 1s linear infinite;
`;

const Text = styled.div`
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 500;
`;

const ExternalLink = styled.img`
  width: 1.2rem;
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

  console.log(transactions);

  return (
    <StyledRecentTransactions>
      <HeaderContainer>
        <Header>{t("walletConnect.details.recentTransactions")}</Header>
        {transactions.length > 0 && <Clear>{t("walletConnect.details.clear")}</Clear>}
      </HeaderContainer>
      {transactions.length === 0 && <Empty>{t("walletConnect.details.empty")}</Empty>}
      {transactions.slice(0, 4).map((tx: TransactionInfo) => (
        <Transaction>
          <Status
            src={tx.confirmations === 0 ? pending : tx.status === 1 ? success : failure}
            pending={tx.confirmations === 0}
          />
          <Text>meow</Text>
          <Text>meow</Text>
          <a href={`${ETHERSCAN_URL}${tx.hash}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink src={externalLink} />
          </a>
        </Transaction>
      ))}
    </StyledRecentTransactions>
  );
};

export default RecentTransactions;
