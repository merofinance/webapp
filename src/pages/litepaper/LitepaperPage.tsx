import React from "react";
import styled from "styled-components";
import { Header1, Header2, Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";

const StyledLitepaperPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 770px;
  margin: auto;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const Header = styled(Header2)`
  text-align: left;
  margin-top: 8rem;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const List = styled.ul`
  margin-left: 3rem;
  font-size: 20rem;
  list-style-type: none;
`;

const Item = styled.li`
  position: relative;

  :before {
    content: "";
    position: absolute;
    top: 0.8rem;
    left: -2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: var(--main);
  }
`;

const Bold = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const LitepaperPage = () => {
  return (
    <StyledLitepaperPage>
      <Seo
        title="Backd Litepaper"
        description="DeFi collateralized debt positions made capital efficient (reactive liquidity)"
      />
      <Header1>Backd Litepaper</Header1>
      <Header>Introduction</Header>
      <Paragraph>
        Backd is an Ethereum based protocol designed to increase the capital efficiency of borrowing
        assets in DeFi. Unlike other DeFi protocols, Backd liquidity pools react to market
        conditions and users’ needs. In other words, users can optimize their debt positions by
        depositing assets into Backd pools which are then automatically deployed to where they are
        the most efficient.
      </Paragraph>
      <Paragraph>
        The Backd protocol solves the problem borrowers of over-collateralized loans in DeFi are
        faced with: the higher the amount of excess collateral posted, the higher the opportunity
        cost of not being able to earn interest on these funds elsewhere. At the same time, low
        collateral-to-debt ratios result in higher liquidation risk to the borrower. Hence,
        borrowers are left with the non-trivial and potentially very costly challenge of manually
        allocating deposits across protocols, optimizing for high interest and low liquidation risk.
      </Paragraph>
      <Paragraph>
        A solution is offered by Backd, which introduces the concept of reactive liquidity, whereby
        deposits are automatically shifted between protocols depending on the state of
        over-collateralized loans and the profitability of yield generating opportunities. More
        specifically, a liquidity provider (LP) on Backd is able to register deposits as “backup
        collateral”. Thereby the deposited funds can earn interest through yield farming strategies
        until needed to increase the user’s collateral-to-debt ratio on different protocols during
        times of market volatility.
      </Paragraph>
      <Header>Liquidity Pools</Header>
      <Paragraph>
        Through the combination of collateral top ups and yield-farming strategies, Backd enables
        novel multi-utility liquidity pools. This empowers borrowers to increase the capital
        efficiency of their positions while better managing liquidation risk. Backd achieves this
        through the administration of single-asset liquidity pools. Users who deposit funds into a
        pool (liquidity providers) receive Backd LP tokens which can be registered for collateral
        top ups (liquidation protection) and staked to earn further rewards. Furthermore, as
        collateral top ups occur, LPs receive a share of the collateral top up fees, in addition to
        any net profits harvested from a pool’s strategy.
      </Paragraph>
      <Paragraph>
        Liquidity pools function in isolation from one another with each asset having its own pool.
        Backd will launch with liquidity pools for DAI, USDC, and ETH. In order to ensure that a
        sufficient amount of the underlying asset is available for collateral top ups, each pool
        maintains a required reserve ratio. This ratio defines the percentage of total pool assets
        which cannot be utilized by yield farming strategies and remain idle at all times. This
        allows the protocol to invariably execute collateral top ups, while reducing the transaction
        cost of withdrawals (including top ups).
      </Paragraph>
      <Paragraph>Liquidity pools on Backd differ in several ways from one another:</Paragraph>
      <List>
        <Item>
          <Paragraph>
            <Bold>Assets:</Bold> Pools are single-asset pools. Furthermore, for Backd v1, there will
            be only one pool per asset to prevent liquidity fragmentation.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Bold>Parameterization:</Bold> Pools are very customizable. For instance, each pool has
            a required reserve ratio, which specifies the percentage of the backing funds that need
            to remain idle in the pool, i.e., funds which cannot be allocated to strategies but are
            reserved solely for the purpose of top ups. Intuitively, a lower reserve ratio comes
            with higher expected earnings (as more funds are allocated to a strategy), at the cost
            of increased insolvency risk, i.e., insufficient funds available for top up.
            Furthermore, pools can differ in terms of fees charged on top ups and strategy
            performance.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Bold>Strategy:</Bold> The yield farming strategy used by a pool may differ to the ones
            used by other pools.
          </Paragraph>
        </Item>
      </List>

      <Header>Collateral Top Ups</Header>
      <Paragraph>
        All Backd LPs have the option to register their LP tokens as backup collateral. Top up
        registration is personalized to the user by allowing individuals to select the parameters
        that best serve their borrow positions and risk tolerance. The parameters required to
        register a top up position are:
      </Paragraph>

      <List>
        <Item>
          <Paragraph>Protocol (that the loan is on, e.g. Compound)</Paragraph>
        </Item>
        <Item>
          <Paragraph>Ethereum address that should be topped up</Paragraph>
        </Item>
        <Item>
          <Paragraph>Health factor threshold at which a top up should occur</Paragraph>
        </Item>
        <Item>
          <Paragraph>Top up increments (the value of a single collateral top up)</Paragraph>
        </Item>
        <Item>
          <Paragraph>Maximum allocation (the total amount that may be topped up)</Paragraph>
        </Item>
      </List>
      <Paragraph>
        Once registered, the user will continue to earn yield on the registered funds until a
        collateral top up is triggered. A collateral top up refers to using funds to increase the
        collateral for a particular borrow position. When this occurs, liquidity is shifted from
        Backd to the respective protocol, the collateralization ratio of the topped up position
        increases, and in turn mitigates liquidation risk. Collateral top up eligibility is
        determined by the health factor of registered positions and is reported by Backd keepers.
      </Paragraph>

      <Header>Backd Keepers</Header>
      <Paragraph>
        Keepers are an integral part of Backd’s collateral top up mechanism. A keeper is an
        off-chain bot that monitors Backd top up registrations and reports eligible collateral top
        ups to the Backd smart contract. The Backd smart contract handles users’ funds and executes
        top ups by injecting capital into registered collateral. Keepers collect a percentage of the
        generated top up fee every time they report an eligible top up. In addition to this, keepers
        are also distributed Backd rewards in proportion to the top up value they have executed.
        Anyone can operate an off-chain keeper bot for Backd.
      </Paragraph>
      <Header>Yield-farming</Header>
      <Paragraph>
        Each Backd pool employs a yield farming strategy using external protocols. As yield is
        generated through a pool’s strategy and top up fees, the pool’s LP token appreciates,
        distributing the earnings to the pool’s liquidity providers. Similar to collateral top ups,
        yield farming strategies are subject to a performance fee, which is split between their
        creator (i.e. the strategist) and a reserve fund.
      </Paragraph>
      <Header>Components</Header>
      <Paragraph>
        The Backd protocol consists of several key components. Let’s briefly examine each of these
        in a bit more detail:
      </Paragraph>
      <Paragraph>
        <Bold>Liquidity pools:</Bold> When LPs deposit funds on Backd, they have to chose a
        single-asset pool to deposit into. If an LP wants some (or all) of their deposits to be used
        as backup collateral on some other protocol, they can register their top up positions via
        the pool’s registry. A liquidity pool maintains a running total of the deposits which are
        registered as backup collateral. A pool allocates deposits that are not registered as backup
        collateral, plus a proportion of the registered backup collateral to a pool-specific vault.
      </Paragraph>
      <Paragraph>
        <Bold>Vaults:</Bold> Each liquidity pool has a vault, which handles all deposit and
        withdrawal interaction with a strategy. For backd v1, single strategy vaults are supported.
        Vaults contain a target allocation factor, which specifies the ratio of Vault deposits that
        should be allocated to the associated strategy. Hence, a vault typically holds an amount of
        idle funds for reduced gas costs.
      </Paragraph>
      <Paragraph>
        <Bold>Strategies:</Bold> A strategy contains logic for yield-farming using the funds
        allocated from the vault. The performance of a strategy is tracked by the depositing vault
        and allocations are rebalanced according to the vault parameters (e.g. debt limits). Profits
        can be harvested and any unrealized profits are compounded by the strategy. The protocol
        charges a performance fee on strategy profits. Part of this fee is paid to a strategy’s
        strategist in LP tokens. The remainder of the performance fee is directed to the Backd
        treasury.
      </Paragraph>
      <Paragraph>
        <Bold>Top Up Handlers:</Bold> These are the contracts that contain the logic for performing
        a collateral top up for a particular protocol, such as Aave.
      </Paragraph>
      <Paragraph>
        <Bold>Keepers:</Bold> As on-chain monitoring is not feasible on Ethereum, Backd relies on
        off-chain keepers to report registered positions eligible for top up. An open source out of
        the box Backd keeper implementation will made available prior launch. However, it is
        encouraged that operators of Backd keepers further improve upon the initial keeper version
        (or create their own).
      </Paragraph>
      <Header>Governance</Header>
      <Paragraph>
        Backd will rely on a decentralized governance scheme, which will be introduced after the
        protocol launch. The protocol offers a lot of room for parameterization, such as required
        reserve ratios for pools, strategy allocation weights, reserve requirement weights for
        vaults or LP and keeper fees. Furthermore, new pools, strategies and supported protocols can
        be added via governance.
      </Paragraph>
      <Paragraph>
        <Bold>
          Disclaimer: a Backd governance token does not exist at this point, so please do not fall
          for scams.
        </Bold>
      </Paragraph>
    </StyledLitepaperPage>
  );
};

export default LitepaperPage;
