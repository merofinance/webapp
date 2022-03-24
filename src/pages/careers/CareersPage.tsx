import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import Radio from "../../components/Radio";
import Seo from "../../components/Seo";
import { Header1, Header5, Paragraph } from "../../styles/Headers";
import Career from "./Career";
import { careers, CareerType, departments } from "./careers";

const StyledCareersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 770px;
`;

const Header = styled(Header5)`
  width: 100%;
  text-align: left;
  margin-top: 8rem;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const Positions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 10rem;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.7rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    div:nth-child(2) {
      display: none;
    }
    div:nth-child(4) {
      display: none;
    }
  }
`;

const PositionHeader = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 700;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ChevronHeader = styled.div`
  width: 2.4rem;

  @media (max-width: 600px) {
    width: 0.4rem;
  }
`;

const CareersPage = (): JSX.Element => {
  const [filter, setFilter] = useState("");
  const { isMobile } = useDevice();
  const { t } = useTranslation();

  return (
    <StyledCareersPage>
      <Seo title={t("metadata.careers.title")} description={t("metadata.careers.description")} />
      <Header1>Backd Careers</Header1>
      <Paragraph>
        Backd is a yield aggregation and liquidity delegation protocol on Ethereum. Backd relies on
        different yield-generating strategies, which allocate liquidity to various protocols in
        order to generate competitive returns. Additionally, liquidity providers are able to specify
        a set of market conditions on which part of their liquidity will get automatically delegated
        or used for a specific purpose (for example, to top up an over-collateralized loan).
      </Paragraph>
      <Paragraph>
        While Decentralized Finance (DeFi) offers a lot of potential for building capital efficient
        products, often times capital is not used efficiently. Furthermore, automation of workflows
        is still rather limited in DeFi. Backd aims to solve that. By offering a suite of actions,
        which empower users to automate how their funds should be used, Backd enables users to earn
        yield on their capital until funds are needed elsewhere.
      </Paragraph>
      <Header>Why Backd?</Header>
      <Paragraph>
        We are building an extraordinary team. We are also very friendly and easy to get along with.
        We love to build cool products, ship fast and stay with the newest trends in DeFi. If you
        are passionate about DeFi, enjoy working with others and solving challenging engineering
        problems then this role could be a great fit.
      </Paragraph>
      <Header>Open positions at Backd</Header>
      <Positions>
        <Radio
          hideDisabled={isMobile}
          options={[
            {
              label: "All departments",
              value: "",
            },
            ...departments.map((d) => {
              return {
                label: d,
                value: d,
                disabledText: careers.some(({ department }) => department === d)
                  ? ""
                  : "No roles available",
              };
            }),
          ]}
          active={filter}
          setOption={(value: string) => setFilter(value)}
        />
        <HeaderRow>
          <PositionHeader>Role</PositionHeader>
          <PositionHeader>Department</PositionHeader>
          <PositionHeader>Type</PositionHeader>
          <PositionHeader>Location</PositionHeader>
          <ChevronHeader />
        </HeaderRow>
        {careers
          .filter((career: CareerType) => (!filter ? true : career.department === filter))
          .map((career: CareerType, index: number) => (
            <Career key={index} career={career} />
          ))}
        <Paragraph style={{ marginTop: "5rem" }}>
          Don't see a role for you but would like to apply? Drop us an email at: jobs@backd.fund
        </Paragraph>
      </Positions>
    </StyledCareersPage>
  );
};

export default CareersPage;
