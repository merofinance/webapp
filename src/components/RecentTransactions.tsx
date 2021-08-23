import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import externalLink from "../assets/ui/gradient-external-link.svg";
import { TransactionInfo } from "../lib/types";
import { clearTransactions, selectTransactions } from "../state/transactionsSlice";
import { GradientText } from "../styles/GradientText";
import { ETHERSCAN_URL } from "../lib/constants";
import pending from "../assets/ui/status/pending.svg";
import success from "../assets/ui/status/success.svg";
import failure from "../assets/ui/status/failure.svg";
import { ScaledNumber } from "../lib/scaled-number";
import { shortenAddress } from "../lib/text";
import { AppDispatch } from "../app/store";

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

const ClearButton = styled.button`
  cursor: pointer;
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

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const Status = styled.img`
  height: 1.4rem;
  animation: ${(props: StatusProps) => (props.pending ? spin : "none")} 1s linear infinite;
`;

const Type = styled.div`
  margin-left: 0.7rem;
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 500;
  flex: 1;
`;

const Details = styled.div`
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.15px;
  font-weight: 500;
  flex: 2.2;
`;

const Link = styled.a``;

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
  const dispatch: AppDispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  console.log(transactions);

  const getDetails = (tx: TransactionInfo) => {
    if (!tx.description.args) return "";
    if (tx.description.action === "Deposit" || tx.description.action === "Withdraw") {
      const { args } = tx.description;
      const token = args.pool.underlying.symbol;
      const tokenValue = ScaledNumber.fromPlain(args.amount);
      return `${tokenValue.toCryptoString()} ${token}`;
    }
    if (tx.description.action === "Approve") {
      return tx.description.args.token.symbol;
    }
    if (tx.description.action === "Register") {
      const { position } = tx.description.args;
      return `${shortenAddress(position.account, 8)} ${position.protocol}`;
    }
    if (tx.description.action === "Remove") {
      const { position } = tx.description.args;
      return `${shortenAddress(position.account, 8)} ${position.protocol}`;
    }
    throw Error("Transaction type not supported");
  };

  return (
    <StyledRecentTransactions>
      <HeaderContainer>
        <Header>{t("walletConnect.details.recentTransactions")}</Header>
        {transactions.length > 0 && (
          <ClearButton onClick={() => dispatch(clearTransactions())}>
            <Clear>{t("walletConnect.details.clear")}</Clear>
          </ClearButton>
        )}
      </HeaderContainer>
      {transactions.length === 0 && <Empty>{t("walletConnect.details.empty")}</Empty>}
      {transactions.slice(0, 4).map((tx: TransactionInfo) => (
        <Transaction key={tx.hash}>
          <Status
            src={tx.confirmations === 0 ? pending : tx.status === 1 ? success : failure}
            pending={tx.confirmations === 0}
          />
          <Type>{tx.description.action}</Type>
          <Details>{getDetails(tx)}</Details>
          <Link href={`${ETHERSCAN_URL}${tx.hash}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink src={externalLink} />
          </Link>
        </Transaction>
      ))}
    </StyledRecentTransactions>
  );
};

export default RecentTransactions;
