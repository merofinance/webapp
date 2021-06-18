import React from "react";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import PoolsOverview from "./PoolsOverview";

const StyledPoolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
        content={<p>test</p>}
      />
      <PoolsOverview />
    </StyledPoolsPage>
  );
};

export default PoolsPage;
