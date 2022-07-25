import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Grow } from "@material-ui/core";

import { useDevice } from "../../app/hooks/use-device";
import { Header2, Header4, Header5 } from "../../styles/Headers";
import arrow from "../../assets/ui/pink-arrow.svg";
import uniswap from "../../assets/actions/uniswap.png";
import limit from "../../assets/actions/limit.png";
import inbalance from "../../assets/actions/inbalance.png";
import nfts from "../../assets/actions/nfts.png";
import propose from "../../assets/actions/propose.png";

interface ActionType {
  image: string;
  header: string;
  description: string;
}

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

interface ActionsProps {
  slide: number;
}

const Actions = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  justify-items: center;
  grid-column-gap: 1.6rem;
  transform: translateY(${(props: ActionsProps) => `-${38.4 * props.slide}rem`});

  @media (max-width: 713px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  flex: 1;
  background-color: rgba(34, 31, 55, 0.6);
  border-radius: 1.4rem;
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  merorop-filter: blur(8px);
  padding-bottom: 5.3rem;
  height: 38.4rem;
  width: 100%;
  max-width: 40rem;

  @media (max-width: 713px) {
    flex-direction: column;
    margin: 0;
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
  const { width } = useDevice();
  const [slide, setSlide] = useState(0);
  const [zoomIn, setZoomIn] = useState(true);
  const rows = width > 1431 ? 3 : width > 895 ? 2 : 1;
  const isMin = slide === 0;
  const isMax = slide === Math.ceil(actions.length / rows) - 1;

  const changeSlide = (slide: number) => {
    setZoomIn(false);
    setTimeout(() => {
      setSlide(slide);
      setZoomIn(true);
    }, 500);
  };

  return (
    <StyledFutureActions>
      <Header2>{t("futureActions.header")}</Header2>
      <Header4>{t("futureActions.subHeader")}</Header4>
      <Navigation>
        <ArrowButton
          onClick={() => {
            if (isMin) return;
            changeSlide(slide - 1);
          }}
        >
          <Arrow src={arrow} disabled={isMin} left />
        </ArrowButton>
        <ArrowButton
          onClick={() => {
            if (isMax) return;
            changeSlide(slide + 1);
          }}
        >
          <Arrow src={arrow} disabled={isMax} />
        </ArrowButton>
      </Navigation>
      <ActionsContainer>
        <Actions slide={slide}>
          {actions.map((action: ActionType, index: number) => (
            <Grow
              key={action.header}
              in={zoomIn}
              style={{ transformOrigin: "0 0 0" }}
              {...(zoomIn ? { timeout: ((index % rows) + 1) * 300 } : {})}
            >
              <Card key={action.header}>
                <div>
                  <Image src={action.image} />
                </div>
                <Header>{t(action.header)}</Header>
                <Body>{t(action.description)}</Body>
              </Card>
            </Grow>
          ))}
        </Actions>
      </ActionsContainer>
    </StyledFutureActions>
  );
};

export default FutureActions;
