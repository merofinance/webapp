import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import InfoCard from "../../components/InfoCard";
import { Pool } from "../../lib";
import { selectDepositedPools } from "../../state/poolsListSlice";
import Loader from "../../components/Loader";
import { selectBalance } from "../../state/selectors";
import { useDevice } from "../../app/hooks/use-device";
import YourDepositsRow from "./YourDepositsRow";
import Gasbank from "./GasBank";

const LoaderContainer = styled.div`
  margin-bottom: 1rem;
`;

const SubHeader = styled.div`
  font-weight: 600;
  letter-spacing: 0.46px;
  opacity: 0.8;

  font-size: 1.5rem;
  margin-bottom: 0.7rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const EmptyText = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
  width: 100%;
`;

const Total = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-top: 0.4rem;
  width: 100%;
  text-align: right;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const YourDeposits = (): JSX.Element => {
  const { t } = useTranslation();
  const { isDesktop } = useDevice();
  const balance = useSelector(selectBalance());
  const depositedPools = useSelector(selectDepositedPools);

  return (
    <InfoCard
      id="your-deposits"
      collapsible
      defaultOpen={isDesktop}
      header={t("actions.deposits.header")}
      maxHeight={`${5 * (depositedPools?.length || 2) + 20}rem`}
    >
      {!depositedPools && (
        <>
          <LoaderContainer>
            <Loader button />
          </LoaderContainer>
          <LoaderContainer>
            <Loader button />
          </LoaderContainer>
        </>
      )}
      {depositedPools && depositedPools.length === 0 && (
        <EmptyText id="your-deposits-empty">{t("actions.deposits.empty")}</EmptyText>
      )}
      {depositedPools && depositedPools.length > 0 && (
        <>
          <SubHeader>{t("actions.deposits.poolsSubheader")}</SubHeader>
          {depositedPools.map((pool: Pool) => (
            <YourDepositsRow key={pool.name} pool={pool} />
          ))}
          <Total id="your-deposits-total">
            {balance ? `= ${balance.toUsdValue(1)}` : <Loader />}
          </Total>
        </>
      )}
      <Gasbank />
    </InfoCard>
  );
};

export default YourDeposits;
