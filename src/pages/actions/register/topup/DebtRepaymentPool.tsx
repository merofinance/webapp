import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentSection from "../../../../components/ContentSection";
import Button from "../../../../components/Button";
import RowSelector from "../../../../components/RowSelector";
import { selectPool, selectPools } from "../../../../state/poolsListSlice";
import { Pool } from "../../../../lib";
import Asset from "../../../../components/Asset";
import { RowOptionType } from "../../../../components/RowOption";
import { DEBT_REPAYMENT_ACTION_ROUTE } from "../../../../lib/constants";
import TopupPoolDeposits from "./TopupPoolDeposits";
import TopupPoolTvl from "./TopupPoolTvl";
import {
  selectUsersPoolLpUnlocked,
  selectUsersTotalUsdUnlocked,
} from "../../../../state/valueSelectors";
import { useNavigateToTop } from "../../../../app/hooks/use-navigate-to-top";
import { selectLoans } from "../../../../state/lendingSlice";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  font-weight: 600;
  letter-spacing: 0.25px;

  font-size: 2.2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 1.6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-top: 6rem;
  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const DebtRepaymentPool = (): JSX.Element => {
  const { t } = useTranslation();
  const { address, protocol } = useParams<"address" | "protocol">();
  const navigate = useNavigateToTop();
  const pools = useSelector(selectPools);
  const usersTotalUsdUnlocked = useSelector(selectUsersTotalUsdUnlocked);
  const [poolName, setPoolName] = useState("");
  const pool = useSelector(selectPool(poolName));
  const usersPoolLpUnlocked = useSelector(selectUsersPoolLpUnlocked(pool));
  const loans = useSelector(selectLoans(address));
  const protocolLoan = loans?.find((loan) => loan.protocol === protocol);

  const hasDeposits = !usersTotalUsdUnlocked?.isZero();

  const options: RowOptionType[] = pools
    ? pools
        .filter((pool) => protocolLoan?.borrowedTokens.includes(pool.underlying.symbol))
        .map((pool: Pool) => {
          return {
            value: pool.lpToken.symbol.toLowerCase(),
            id: `${pool.underlying.symbol.toLowerCase()}-pool-option`,
            columns: [
              {
                label: t("headers.asset"),
                value: <Asset tiny token={pool.underlying} />,
              },
              {
                label: t("headers.deposits"),
                value: <TopupPoolDeposits pool={pool} />,
              },
              {
                label: t("headers.apy"),
                value: pool.apy ? pool.apy.toPercent() : null,
              },
              {
                label: t("headers.tvl"),
                value: <TopupPoolTvl pool={pool} />,
              },
            ],
          };
        })
    : [];

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.debtRepayment.header")}
        nav={t("actions.register.step", { step: "3/4" })}
      >
        <Header id="register-topup-pool-header">
          {hasDeposits
            ? t("actions.debtRepayment.stages.pool.header")
            : t("actions.debtRepayment.stages.pool.noDepositsHeader")}
        </Header>
        {!hasDeposits && <SubHeader>{t("actions.debtRepayment.stages.pool.subHeader")}</SubHeader>}
        <RowSelector
          value={poolName}
          setValue={(value: string) => setPoolName(value)}
          options={options}
        />
        <ButtonContainer>
          <Button
            id="register-topup-pool-button"
            primary
            medium
            width="30rem"
            click={() => {
              if (usersPoolLpUnlocked && usersPoolLpUnlocked?.isZero())
                navigate(
                  `${DEBT_REPAYMENT_ACTION_ROUTE}/deposit/${poolName}/${address}/${protocol}`
                );
              else navigate(`${DEBT_REPAYMENT_ACTION_ROUTE}/${address}/${protocol}/${poolName}`);
            }}
            disabled={!pool}
            hoverText={t("actions.debtRepayment.stages.pool.incomplete")}
          >
            {t("components.continue")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
};

export default DebtRepaymentPool;
