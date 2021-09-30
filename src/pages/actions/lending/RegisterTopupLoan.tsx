import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

import ContentSection from "../../../components/ContentSection";
import Button from "../../../components/Button";
import BackButton from "../../../components/BackButton";
import RowSelector, { RowOptionType } from "../../../components/RowSelector";
import { selectAave, selectCompound } from "../../../state/lendingSlice";
import { selectEthPrice } from "../../../state/poolsListSlice";

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin-bottom: 1.6rem;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisterTopupLoan = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { account } = useWeb3React();
  const aave = useSelector(selectAave);
  const compound = useSelector(selectCompound);
  const ethPrice = useSelector(selectEthPrice);
  const [protocol, setProtocol] = useState("");

  // TODO Change these in state to a list and use mapping to gen the options
  const hasAave = aave?.totalCollateralETH?.isZero && !aave.totalCollateralETH.isZero();
  const hasCompound = compound?.totalCollateralETH?.isZero && !compound.totalCollateralETH.isZero();

  const getOptions = () => {
    const options: RowOptionType[] = [];
    if (hasAave && aave)
      options.push({
        value: "Aave",
        columns: [
          {
            label: t("actions.suggestions.topup.labels.protocol"),
            value: "Aave",
          },
          {
            label: t("actions.suggestions.topup.labels.healthFactor"),
            value: aave.healthFactor.toCryptoString(),
          },
          {
            label: t("actions.suggestions.topup.labels.totalCollateral"),
            value: aave.totalCollateralETH.toUsdValue(ethPrice),
          },
          {
            label: t("actions.suggestions.topup.labels.totalLoan"),
            value: aave.totalDebtETH.toUsdValue(ethPrice),
          },
        ],
      });
    if (hasCompound && compound)
      options.push({
        value: "Compound",
        columns: [
          {
            label: t("actions.suggestions.topup.labels.protocol"),
            value: "Compound",
          },
          {
            label: t("actions.suggestions.topup.labels.healthFactor"),
            value: compound.healthFactor.toCryptoString(),
          },
          {
            label: t("actions.suggestions.topup.labels.totalCollateral"),
            value: compound.totalCollateralETH.toUsdValue(ethPrice),
          },
          {
            label: t("actions.suggestions.topup.labels.totalLoan"),
            value: compound.totalDebtETH.toUsdValue(ethPrice),
          },
        ],
      });
    return options;
  };

  return (
    <Container>
      <BackButton />
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="2/4"
        content={
          <Content>
            <Header>{t("actions.topup.stages.loan.header")}</Header>
            <SubHeader>{t("actions.topup.stages.loan.subHeader")}</SubHeader>
            <RowSelector
              options={getOptions()}
              value={protocol}
              setValue={(value: string) => setProtocol(value)}
            />
            {/* TODO Disabled state */}
            <ButtonContainer>
              <Button
                primary
                medium
                width="44%"
                text={t("components.continue")}
                click={() => history.push(`/actions/register/topup/${account}/${protocol}`)}
              />
            </ButtonContainer>
          </Content>
        }
      />
    </Container>
  );
};

export default RegisterTopupLoan;
