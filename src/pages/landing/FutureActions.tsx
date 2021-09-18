import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { Header2, Header4, Header5 } from "../../styles/Headers";
import arrow from "../../assets/ui/pink-arrow.svg";
import uniswap from "../../assets/actions/uniswap.svg";
import limit from "../../assets/actions/limit.svg";
import inbalance from "../../assets/actions/inbalance.svg";
import nfts from "../../assets/actions/nfts.svg";
import propose from "../../assets/actions/propose.svg";

type ActionType = {
  image: string;
  header: string;
  description: string;
};

const actions: ActionType[] = [
  {
    image: uniswap,
    header: "futureActions.actions.uniswap.header",
    description: "futureActions.actions.uniswap.description",
  },
  {
    image: limit,
    header: "futureActions.actions.limitOrders.header",
    description: "futureActions.actions.limitOrders.description",
  },
  {
    image: inbalance,
    header: "futureActions.actions.curveImbalance.header",
    description: "futureActions.actions.curveImbalance.description",
  },
  {
    image: nfts,
    header: "futureActions.actions.nfts.header",
    description: "futureActions.actions.nfts.description",
  },
  {
    image: propose,
    header: "futureActions.actions.propose.header",
    description: "futureActions.actions.propose.description",
  },
];

const StyledFutureActions = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 713px) {
    margin: var(--mobile-section-margin);
  }
`;

const Navigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const ArrowButton = styled.button`
  margin-left: 2.4rem;
`;

interface ArrowProps {
  left?: boolean;
  disabled: boolean;
}

const Arrow = styled.img`
  width: 3.8rem;
  cursor: pointer;
  transition: opacity 0.3s, filter 0.3s;

  opacity: ${(props: ArrowProps) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props: ArrowProps) => (props.disabled ? "none" : "auto")};
  transform: ${(props: ArrowProps) => (props.left ? "rotate(180deg)" : "none")};

  :hover {
    filter: brightness(1.2);
  }
`;

const ActionsContainer = styled.div`
  position: relative;
  height: 38.4rem;
  width: 100%;
  overflow: hidden;
`;

interface ActionProps {
  right: boolean;
  containerWidth: string;
}

const Actions = styled.div`
  display: flex;
  position: absolute;
  transition: all 0.6s;
  left: 0;
  transform: translateX(
    calc(${(props: ActionProps) => (props.right ? props.containerWidth : "100%")} - 100%)
  );
`;

const Card = styled.div`
  position: relative;
  flex: 1;
  margin: 0 0.8rem;
  background-color: rgba(34, 31, 55, 0.6);
  border-radius: 1.4rem;
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);
  padding-bottom: 5.3rem;
  height: 38.4rem;
  width: 40rem;

  @media (max-width: 713px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 1.2rem;
  }
`;

const Image = styled.img`
  padding: 0.9rem;
  margin-bottom: 4rem;
  height: 10.8rem;
`;

const Header = styled(Header5)`
  text-align: left;
  margin-bottom: 1rem;

  @media (max-width: 713px) {
    margin-bottom: 1.4rem;
  }
`;

const Body = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  @media (max-width: 713px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const FutureActions = (): JSX.Element => {
  const { t } = useTranslation();
  const [right, setRight] = useState(false);
  const actionsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <StyledFutureActions>
      <Header2>{t("futureActions.header")}</Header2>
      <Header4>{t("futureActions.subHeader")}</Header4>
      <Navigation>
        <ArrowButton onClick={() => setRight(false)}>
          <Arrow src={arrow} disabled={!right} left />
        </ArrowButton>
        <ArrowButton onClick={() => setRight(true)}>
          <Arrow src={arrow} disabled={right} />
        </ArrowButton>
      </Navigation>
      <ActionsContainer ref={actionsContainerRef}>
        <Actions
          right={right}
          containerWidth={
            actionsContainerRef.current ? `${actionsContainerRef.current.clientWidth}px` : "100%"
          }
        >
          {actions.map((action: ActionType) => (
            <Card key={action.header}>
              <div>
                <Image src={action.image} />
              </div>
              <Header>{t(action.header)}</Header>
              <Body>{t(action.description)}</Body>
            </Card>
          ))}
        </Actions>
      </ActionsContainer>
    </StyledFutureActions>
  );
};

export default FutureActions;
