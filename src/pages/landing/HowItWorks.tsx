import React, { useState } from "react";
import styled from "styled-components";
import { Header3 } from "../../components/styles/Headers";
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
    </StyledHowItWorks>
  );
};

export default HowItWorks;
