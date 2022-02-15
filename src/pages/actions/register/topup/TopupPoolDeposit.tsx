import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ContentSection from "../../../../components/ContentSection";
import Button from "../../../../components/Button";
import { selectTokenBalance } from "../../../../state/selectors";
import { selectPool } from "../../../../state/poolsListSlice";
import { TOPUP_ACTION_ROUTE } from "../../../../lib/constants";
import PoolDeposit from "../../../pool/PoolDeposit";
import { ScaledNumber } from "../../../../lib/scaled-number";

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: 0.25px;
`;

const SubHeader = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  opacity: 0.8;
  margin-top: 1.6rem;
  margin-bottom: 6rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const TopupPoolDeposit = (): JSX.Element => {
  const { t } = useTranslation();
  const { address, protocol, poolName } = useParams<"address" | "protocol" | "poolName">();
  const navigate = useNavigate();
  const pool = useSelector(selectPool(poolName));
  const lpBalance = useSelector(selectTokenBalance(pool?.lpToken.address));

  if (!pool) {
    navigate("/");
    throw Error("Pool not found");
  }

  const hasSufficientBalance = () => {
    if (!lpBalance) return false;
    return lpBalance.gt(new ScaledNumber());
  };

  return (
    <Container>
      <ContentSection
        header={t("actions.register.header")}
        subHeader={t("actions.topup.label")}
        nav="3/4"
      >
        <Header id="register-topup-pool-deposit">
          {t("actions.topup.stages.pool.deposit.header", { asset: pool.underlying.symbol })}
        </Header>
        <SubHeader>
          {t("actions.topup.stages.pool.deposit.subHeader", { asset: pool.underlying.symbol })}
        </SubHeader>
        <PoolDeposit compact pool={pool} />
        <ButtonContainer>
          <Button
            id="register-topup-pool-deposit-button"
            primary
            medium
            width="30rem"
            click={() => {
              if (address && protocol && poolName)
                navigate(`${TOPUP_ACTION_ROUTE}/${address}/${protocol}/${poolName.toLowerCase()}`);
              else navigate(-1);
            }}
            disabled={!pool || !hasSufficientBalance()}
            hoverText={t("actions.topup.stages.pool.deposit.incomplete", {
              asset: pool?.underlying.symbol,
            })}
          >
            {t("components.continue")}
          </Button>
        </ButtonContainer>
      </ContentSection>
    </Container>
  );
};

export default TopupPoolDeposit;
