import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Position, Pool } from "../../lib/types";
import { selectPrice, selectPools } from "../../state/poolsListSlice";
import chevron from "../../assets/ui/chevron.svg";
import { selectActiveSuggestion, SuggestionType } from "../../state/helpSlice";
import Loader from "../../components/Loader";
import TopupAction from "./register/topup/TopupAction";

const StyledRegisteredAction = styled.button`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #2b293d;
  background-color: rgba(20, 17, 40, 1);
  border-radius: 1.4rem;
  padding: 1.3rem 1.4rem;
  cursor: pointer;

  transition: background-color 0.3s;
  :hover {
    background-color: #1a1438;
  }

  margin-top: 1rem;
  @media (max-width: 600px) {
    margin-top: 0.6rem;
  }
`;

interface ColumnProps {
  hideMobile?: boolean;
}

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 600px) {
    display: ${(props: ColumnProps) => (props.hideMobile ? "none" : "flex")};
  }
`;

const Header = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  opacity: 0.6;

  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
`;

interface ValueProps {
  hideOnSnapshot?: boolean;
}

const Value = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: ${(props: ValueProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

const ChevronData = styled.div`
  width: 2.4rem;

  @media (max-width: 600px) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

interface Props {
  position: Position;
}

const RegisteredAction = ({ position }: Props): JSX.Element => {
  const { t } = useTranslation();
  const pools = useSelector(selectPools);
  const implement = useSelector(selectActiveSuggestion);
  const pool = pools
    ? pools.filter((pool: Pool) => pool.lpToken.address === position.depositToken)[0]
    : null;
  const price = useSelector(selectPrice(pool));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (
      implement &&
      implement.type === SuggestionType.POSITION_LOW &&
      implement.data === position.protocol.toLowerCase()
    )
      setOpen(true);
    return () => {
      setOpen(false);
    };
  }, [implement]);

  return (
    <>
      <StyledRegisteredAction
        id={`registered-action-${position.protocol.toLowerCase()}`}
        onClick={() => setOpen(true)}
      >
        <Column>
          <Header>{t("actions.registered.columns.type")}</Header>
          <Value>{t("actions.topup.label")}</Value>
        </Column>
        <Column>
          <Header>{t("actions.registered.columns.locked")}</Header>
          <Value hideOnSnapshot>
            {price ? position.maxTopUp.toCompactUsdValue(price) : <Loader />}
          </Value>
        </Column>
        <Column hideMobile>
          <Header>{t("actions.suggestions.topup.labels.protocol")}</Header>
          <Value>{position.protocol}</Value>
        </Column>
        <Column hideMobile>
          <Header>{t("actions.topup.fields.threshold.label")}</Header>
          <Value>{position.threshold.toCryptoString()}</Value>
        </Column>
        <ChevronData>
          <Chevron src={chevron} alt="right arrow" />
        </ChevronData>
      </StyledRegisteredAction>
      {pool && (
        <TopupAction show={open} close={() => setOpen(false)} position={position} pool={pool} />
      )}
    </>
  );
};

export default RegisteredAction;
