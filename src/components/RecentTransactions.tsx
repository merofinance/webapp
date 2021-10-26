import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useWeb3Updated } from "../app/hooks/use-web3-updated";
import { AppDispatch } from "../app/store";
import externalLink from "../assets/ui/gradient-external-link.svg";
import failure from "../assets/ui/status/failure.svg";
import pending from "../assets/ui/status/pending.svg";
import success from "../assets/ui/status/success.svg";
import { ScaledNumber } from "../lib/scaled-number";
import { shortenAddress } from "../lib/text";
import { TransactionInfo } from "../lib/types";
import { getEtherscanTransactionLink } from "../lib/web3";
import { clearTransactions, selectTransactions } from "../state/transactionsSlice";
import { spinAnimation } from "../styles/animations/SpinAnimation";
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

const ClearButton = styled.button`
  cursor: pointer;
`;

const Clear = styled(GradientText)`
  font-size: 1.2rem;
  line-height: 1.8rem;
  font-weight: 500;
  letter-spacing: 0.46px;
`;

const Transactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const Status = styled.img`
  height: 1.4rem;
  animation: ${(props: StatusProps) => (props.pending ? spinAnimation : "none")} 1s linear infinite;
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

const RecentTransactions = (): JSX.Element => {
  const { t } = useTranslation();
  const { chainId } = useWeb3React();
  const dispatch: AppDispatch = useDispatch();
  const update = useWeb3Updated();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(clearTransactions());
  }, [update]);

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
    if (tx.description.action === "Register" || tx.description.action === "Remove") {
      const { position } = tx.description.args;
      return `${shortenAddress(position.account, 8)} ${position.protocol}`;
    }
    throw Error("errors.transactionType");
  };

  return (
    <StyledRecentTransactions>
      <HeaderContainer>
        <Header>{t("walletConnect.details.recentTransactions")}</Header>
        {transactions.length > 0 && (
          <ClearButton id="account-details-clear" onClick={() => dispatch(clearTransactions())}>
            <Clear>{t("walletConnect.details.clear")}</Clear>
          </ClearButton>
        )}
      </HeaderContainer>
      {transactions.length === 0 && <Empty>{t("walletConnect.details.empty")}</Empty>}
      <Transactions id="account-details-transactions">
        {transactions.slice(0, 4).map((tx: TransactionInfo) => (
          <Transaction key={tx.hash}>
            <Status
              src={tx.confirmations === 0 ? pending : tx.status === 1 ? success : failure}
              pending={tx.confirmations === 0}
            />
            <Type>{tx.description.action}</Type>
            <Details>{getDetails(tx)}</Details>
            <Link
              href={getEtherscanTransactionLink(chainId, tx.hash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink src={externalLink} />
            </Link>
          </Transaction>
        ))}
      </Transactions>
    </StyledRecentTransactions>
  );
};

export default RecentTransactions;
