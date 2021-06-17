import React, { useState } from "react";
import styled from "styled-components";
import { Header3, Header5 } from "../../components/styles/Headers";
import Radio, { RadioOptionType } from "../../components/Radio";

const categories: RadioOptionType[] = [
  {
    label: "earn yeild",
    value: "earn",
  },
  {
    label: "earn & protect",
    value: "protect",
  },
];

type CardType = {
  number: string;
  header: string;
  body: string;
};

const cardsList: CardType[][] = [
  [
    {
      number: "01",
      header: "Deposit Liquidity",
      body: "Deposit funds into Backd liquidity pools and receive pool LP tokens.",
    },
    {
      number: "02",
      header: "Earn yield",
      body: "Earn compounded yield from strategy profits and protocol fees as LP tokens appreciate over the underlying tokens.",
    },
    {
      number: "03",
      header: "Stake to earn rewards",
      body: "Stake your pool LP tokens to receive Backd rewards.",
    },
    {
      number: "04",
      header: "Unstake any time",
      body: "Unstake your LP tokens or claim your Backd rewards at any time.",
    },
  ],
  [
    {
      number: "01",
      header: "Deposit Liquidity",
      body: "Deposit funds into Backd liquidity pools and receive pool LP tokens.",
    },
    {
      number: "02",
      header: "Register loan on-chain",
      body: "Register Compound or Aave loans on-chain to receive collateral top-ups, and stake your pool LP tokens to earn Backd rewards.",
    },
    {
      number: "03",
      header: "Protect & Earn",
      body: "Earn compounded yield and protocol fees as the LP token appreciates, while keepers monitor your loan and transfer your capital to avoid liquidation.",
    },
    {
      number: "04",
      header: "Unstake any time",
      body: "Unregister or update a position, withdraw LP tokens or claim Backd rewards at any time.",
    },
  ],
];

const StyledHowItWorks = styled.div`
  width: 100%;
  margin: var(--section-margin);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

type CardContainerType = {
  show: boolean;
};

const CardContainer = styled.div`
  width: 100%;
  display: ${(props: CardContainerType) => (props.show ? "flex" : "none")};
  margin: 2.5rem 0;
`;

const Card = styled.div`
  flex: 1;
  margin: 0 0.8rem;
  background-color: rgba(34, 31, 55, 0.6);
  border-radius: 1.4rem;
  padding: 2.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(8px);
`;

const Number = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin-bottom: 1.4rem;
`;

const Body = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
`;

const Header = styled(Header5)`
  text-align: left;
  margin-bottom: 1rem;
`;

const HowItWorks = () => {
  const [category, setCategory] = useState("earn");

  return (
    <StyledHowItWorks>
      <Header3>how it works</Header3>
      <Radio
        options={categories}
        active={category}
        setOption={(value: string) => setCategory(value)}
      />
      {cardsList.map((cards: CardType[], index: number) => (
        <CardContainer
          show={categories.map((a: RadioOptionType) => a.value).indexOf(category) === index}
        >
          {cards.map((card: CardType) => (
            <Card>
              <Number>{card.number}</Number>
              <Header>{card.header}</Header>
              <Body>{card.body}</Body>
            </Card>
          ))}
        </CardContainer>
      ))}
    </StyledHowItWorks>
  );
};

export default HowItWorks;
