import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import chevron from "../../assets/ui/chevron.svg";
import Asset from "../../components/Asset";
import GradientText from "../../components/styles/GradientText";

const Row = styled.tr`
  height: 7.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  background-color: #141128;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 1.7rem;
  cursor: pointer;

  :hover {
    background-color: #1a1438;
  }
`;

const Data = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.4rem;
  letter-spacing: 0.15px;
`;

const Apy = styled(GradientText)`
  font-weight: 900;
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 0.15px;
`;

const ChevronData = styled.td`
  width: 2.4rem;
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

type Props = {
  asset: "eth" | "usdc" | "dai";
};

const PoolsRow = (props: Props) => {
  const history = useHistory();
  return (
    <Row onClick={() => history.push(`/pool/b${props.asset}`)}>
      <Data>
        <Asset asset={props.asset} />
      </Data>
      <Data>
        <Apy>5.2%</Apy>
      </Data>
      <Data>$3.34m</Data>
      <Data>$0.00</Data>
      <ChevronData>
        <Chevron src={chevron} />
      </ChevronData>
    </Row>
  );
};

export default PoolsRow;
