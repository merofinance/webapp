import { ethers } from "ethers";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useBackd } from "../../../app/hooks/use-backd";
import BasicInput from "../../../components/BasicInput";
import { spinAnimation } from "../../../styles/animations/SpinAnimation";
import pending from "../../../assets/ui/status/pending.svg";
import RowSelector from "../../../components/RowSelector";
import { selectEthPrice } from "../../../state/poolsListSlice";
import { Loan } from "../../../lib/types";
import { fetchLoans, selectLoans } from "../../../state/lendingSlice";
import { RowOptionType } from "../../../components/RowOption";
import { AppDispatch } from "../../../app/store";

const StyledLoanSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface HeaderProps {
  topMargin: boolean;
}

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  margin-bottom: 3rem;
  margin-top: ${(props: HeaderProps) => (props.topMargin ? "5rem" : "0")};
  @media (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    margin-top: ${(props: HeaderProps) => (props.topMargin ? "3rem" : "0")};
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

interface LoadingProps {
  show: boolean;
}

const Loading = styled.img`
  width: 2.2rem;
  animation: ${spinAnimation} 1s linear infinite;
  display: ${(props: LoadingProps) => (props.show ? "block" : "none")};
  margin-left: 1rem;
`;

const NotFound = styled.div`
  font-weight: 500;
  color: var(--error);
  margin-top: 0.6rem;
  margin-left: 1.3rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

interface Props {
  value: string;
  setValue: (value: string, newAddress: string) => void;
  hasExistingLoans: boolean;
}

const LoanSearch = ({ value, setValue, hasExistingLoans }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const ethPrice = useSelector(selectEthPrice);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const loans = useSelector(selectLoans(address));
  const [retrieved, setRetrieved] = useState(false);

  const hasLoans = loans.length > 0;

  const getLoans = async (newaddress: string) => {
    if (!backd || !ethers.utils.isAddress(newaddress)) return;
    setLoading(true);
    await dispatch(fetchLoans({ backd, address: newaddress }));
    setRetrieved(true);
    setLoading(false);
  };

  const options: RowOptionType[] = loans.map((loan: Loan) => {
    return {
      value: loan.protocol,
      id: `loan-search-row-${loan.protocol.toLowerCase()}`,
      columns: [
        {
          label: t("actions.suggestions.topup.labels.protocol"),
          value: loan.protocol,
        },
        {
          label: t("actions.suggestions.topup.labels.healthFactor"),
          value: loan.healthFactor.toCryptoString(),
        },
        {
          label: t("actions.suggestions.topup.labels.totalCollateral"),
          value: loan.totalCollateralETH.toCompactUsdValue(ethPrice),
        },
        {
          label: t("actions.suggestions.topup.labels.totalLoan"),
          value: loan.totalDebtETH.toCompactUsdValue(ethPrice),
        },
      ],
    };
  });

  return (
    <StyledLoanSearch>
      <Header id="loan-search-header" topMargin={hasExistingLoans}>
        {hasExistingLoans
          ? t("actions.topup.stages.loan.search")
          : t("actions.topup.stages.loan.enterAddress")}
      </Header>
      <InputContainer>
        <BasicInput
          id="loan-search"
          value={address}
          setValue={(value: string) => {
            getLoans(value);
            setAddress(value);
          }}
          placeholder="e.g. 0x09...A98E"
          error={
            address && !ethers.utils.isAddress(address)
              ? t("actions.topup.fields.address.invalid")
              : ""
          }
        />
        <Loading id="loan-search-spinner" src={pending} show={loading} />
      </InputContainer>
      {retrieved && !hasLoans && <NotFound>{t("actions.topup.stages.loan.notFound")}</NotFound>}
      {retrieved && hasLoans && (
        <RowSelector
          options={options}
          value={value}
          setValue={(value: string) => setValue(value, address)}
        />
      )}
    </StyledLoanSearch>
  );
};

export default LoanSearch;
