import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BasicInput from "../../../components/BasicInput";

const StyledLoanSearch = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-top: 5rem;
  margin-bottom: 3rem;
`;

const LoanSearch = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");

  return (
    <StyledLoanSearch>
      <Header>{t("actions.topup.stages.loan.search")}</Header>
      <BasicInput
        value={address}
        setValue={(value: string) => setAddress(value)}
        placeholder="e.g. 0x09...A98E"
      />
    </StyledLoanSearch>
  );
};

export default LoanSearch;
