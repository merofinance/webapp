import React from "react";
import styled from "styled-components";
import Button from "../../components/styles/Button";

const Table = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 5.5rem;

  th:last-child {
    flex: 2;
  }

  td:last-child {
    flex: 2;
  }
`;

const Row = styled.tr`
  height: 7.2rem;
  display: flex;
  justify-content: space-between;
  margin: 0.4rem 0;
  background-color: #141128;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 5.5rem;

  th:last-child {
    flex: 2;
  }

  td:last-child {
    flex: 2;
    justify-content: flex-end;
  }
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
`;

const Data = styled.td`
  display: flex;
  flex: 1;
  align-items: center;
`;

const PoolsList = () => {
  return (
    <Table>
      <HeaderRow>
        <Header>Asset</Header>
        <Header>APY</Header>
        <Header>TVL</Header>
        <Header>Your Balance</Header>
        <Header></Header>
      </HeaderRow>
      <Row>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>
          <Button text="button" click={() => console.log("meow")} />
        </Data>
      </Row>
      <Row>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>Data</Data>
        <Data>
          <Button text="button" click={() => console.log("meow")} />
        </Data>
      </Row>
    </Table>
  );
};

export default PoolsList;
