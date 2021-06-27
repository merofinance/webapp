import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import chevron from "../../assets/ui/chevron.svg";
import Asset from "../../components/Asset";
import Button from "../../components/styles/Button";
import GradientText from "../../components/styles/GradientText";

type RowProps = {
  preview?: boolean;
};

const Row = styled.tr`
  height: ${(props: RowProps) => (props.preview ? "5.6rem" : "7.2rem")};
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

type DataProps = {
  right?: boolean;
};

const Data = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.4rem;
  letter-spacing: 0.15px;
  justify-content: ${(props: DataProps) => (props.right ? "flex-end" : "flex-start")};
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
  preview?: boolean;
};

const PoolsRow = (props: Props) => {
  const history = useHistory();

  return (
    <Row onClick={() => history.push(`/pool/b${props.asset}`)} preview={props.preview}>
      <Data>
        <Asset asset={props.asset} />
      </Data>
      <Data>
        <Apy>5.2%</Apy>
      </Data>
      <Data>$3.34m</Data>
      {!props.preview && (
        <>
          <Data>$0.00</Data>

          <ChevronData>
            <Chevron src={chevron} />
          </ChevronData>
        </>
      )}
      {props.preview && (
        <Data right>
          <Button text="deposit" background="#141128" />
        </Data>
      )}
    </Row>
  );
};

export default PoolsRow;
