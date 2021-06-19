import React from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import PoolsOverview from "./PoolsOverview";
import PoolsRow from "./PoolsRow";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
`;

const Table = styled.table`
  width: 100%;
`;

const HeaderRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;
`;

const Header = styled.th`
  flex: 1;
  text-align: left;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
`;

const ChevronHeader = styled.th`
  width: 2.4rem;
`;

const PoolsPage = () => {
  return (
    <StyledPoolsPage>
      <ContentSection
        header="All pools"
        statistics={[
          {
            header: "Your deposits",
            value: "$0.00",
            tooltip:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          },
          {
            header: "Locked in position",
            value: "$0.00",
            tooltip:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          },
          {
            header: "Rewards accrued",
            value: "$0.00",
            tooltip:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
          },
        ]}
        content={
          <Table>
            <HeaderRow>
              <Header>Asset</Header>
              <Header>APY</Header>
              <Header>TVL</Header>
              <Header>Your deposits</Header>
              <ChevronHeader />
            </HeaderRow>
            <PoolsRow asset={"eth"} />
            <PoolsRow asset={"usdc"} />
            <PoolsRow asset={"dai"} />
          </Table>
        }
      />
      <PoolsOverview />
    </StyledPoolsPage>
  );
};

export default PoolsPage;
