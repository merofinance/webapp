import React from "react";
import styled from "styled-components";
import GradientText from "../../components/styles/GradientText";
import { Header2, Header3, Header6, Paragraph } from "../../components/styles/Headers";

const StyledLitepaperPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Header3)`
  text-align: left;
  margin-top: 8rem;
`;

const SubHeader = styled(Header6)`
  text-align: left;
  margin-top: 4rem;
  margin-bottom: 1rem;
`;

const LitepaperPage = () => {
  return (
    <StyledLitepaperPage>
      <Header2>Backd: Litepaper</Header2>
      <Header>Introduction</Header>
      <Paragraph>
        Over-collateralization is one of the most critical pillars of DeFi. The pseudonymous nature
        of Ethereum requires agents to over-collateralize loans as a means to protect the loan
        issuer (lending protocols) from suffering losses in case the loan is defaulted on. However,
        high volatility in cryptoasset prices requires over-collateralized loans to be further
        secured via a liquidation mechanism. Liquidations protect lenders from suffering losses in
        case the collateral to debt ratio falls below some threshold, at which a borrower’s
        collateral is seized and sold off at a discount to repay the borrower’s debt. While from a
        lending protocol’s point of view, liquidations allow the protocol to remain
        over-collateralized as a whole, borrowers suffer from penalty fees incurred through
        collateral auctions. In the end, it is the borrower’s responsibility to ensure that the
        ratio of the value of the locked collateral to the value of the borrowed funds remains
        sufficiently high. However, depositing excess collateral bears a trade-off. While a higher
        collateral to debt ratio reduces liquidation risk, it comes at an opportunity cost of being
        unable to be employed for interest generating purposes elsewhere.
      </Paragraph>
      <Paragraph>
        In a perfect world for borrowers, lending protocols would accept various interest-bearing LP
        tokens as collateral. Imagine being able to use 3CRV, aDAI, yCRV, as well as much lesser
        known and less liquid LP tokens to borrow against. While this would be great for a borrower,
        it is extremely risky for lending protocols, especially for less known and illiquid LP
        tokens. An LP token of a new protocol offering very lucrative APYs cannot be used as
        collateral due to the risk of the LP token becoming worthless. Recall that the collateral
        risk is taken on by the lending protocol, not the borrower. Hence, borrowers are left with
        the task of balancing liquidation risk by maintaining higher levels of excess collateral and
        allocating funds to other interest earning opportunities. Imagine if borrowers could lower
        their excess collateral amounts, earn interest on other protocols and not lose the
        protection against getting liquidated, all while lending protocols are completely shielded
        from any additional risk.
      </Paragraph>
      <Paragraph>
        In this paper, we introduce backd, an Ethereum-based protocol that annihilates the
        aforementioned opportunity cost of depositing excess collateral by offering interest earning
        liquidation protection. The backd protocol can be used by any liquidity provider (LP) to
        earn interest on deposits via yield-farming strategies. Furthermore, LPs can register their
        funds as “back up collateral” for other protocols but farm yield and earn interest until
        funds are actually needed for collateral top ups.
      </Paragraph>
      <Header>A Different Type of Yield Farm</Header>
      <Paragraph>
        The backd protocol is in some sense similar to typical yield farming protocols, as it also
        employs yield farming strategies to generate interest for LPs. However, unlike existing
        yield farming protocols, backd allows LPs to use their holdings as back up collateral on
        other protocols, such as Aave or Compound. This serves a single purpose: LPs with
        over-collateralized loans on supported protocols can earn higher interest on their
        collateral through backd, while not increasing their liquidation risk. For example, a backd
        LP that has a loan from Compound can register his Compound position to be topped up with his
        backd deposits. Thereby, an LP is able to earn backd APYs until the funds are needed to
        increase his collateral for liquidation protection.
      </Paragraph>
      <Paragraph>
        Let’s look at how LPs earn interest on backd and how deposits on backd may be utilized as
        back up collateral.
      </Paragraph>
      <SubHeader>Earnings for LPs</SubHeader>
      <Paragraph>
        In order to understand backd, it is important to understand how LPs earn interest. The backd
        protocol utilizes single-asset crypto pools, into which any liquidity provider may deposit
        the pool’s underlying asset in exchange for pool-specific LP tokens. The pool deposits are
        allocated to a pool-specific vault before being employed to a yield-farming strategy.
        Strategy profits can be harvested and are shared between the LPs of a pool, as well as the
        strategist. Furthermore, LPs earn fees from collateral top ups that other LPs may pay for as
        part of the liquidation protection that backd offers. All generated earnings compound as
        unrealized interest from a strategy is retained by the pool (i.e., the total underlying
        appreciates over the total supply of a pool’s LP tokens). Furthermore, LPs receive
        protocol-specific rewards on a per block basis for the liquidity they’ve provided and will
        be able to participate in backd governance.
      </Paragraph>
      <SubHeader>Liquidation Protection</SubHeader>
      <Paragraph>
        backd offers functionality that allows LPs to use their deposits as back up collateral for
        other (supported) protocols. For instance, an LP that has borrowed funds from Compound and
        Aave can register his positions for liquidation protection. Thereby part of the LPs backd
        deposits will be automatically used as back up collateral should his collateral to debt
        ratio on the registered protocols fall below some threshold. When registering a position an
        LP has to specify (i) the address (e.g. his address) to register, (ii) the name of the
        protocol, as well as (iii) the health factor at which a collateral top up should occur.
        Furthermore, one has to specify the (iv) incremental and (v) total top up amounts. Once a
        position has been successfully registered, it may be incrementally topped up once its health
        factor drops below the specified threshold. For example, an LP may register his collateral
        on Compound to be topped up by increments of 1000 DAI each time his Compound health factor
        falls below 1.05 for a maximum top up total of 5000 DAI.
      </Paragraph>
      <Header>The backd Top Up Mechanism</Header>
      <Paragraph>
        Perhaps one of the biggest questions at this point is: how do collateral top ups work? As
        previously explained, health factors need to be monitored across protocols in order to
        determine whether registered positions are eligible for top up. This task is computationally
        infeasible to be performed on-chain and thus backd relies on so-called backd keepers,
        external agents that report eligible top up positions to the backd smart contract. Anyone
        may act as a backd keeper and monitor health factors across protocols for registered backd
        positions. For efficiency requirements, this is will have to be an automated process.
        Similar to how liquidation bots, backd incentivizes the creation of top up bots. Keepers
        which report borrowers for top ups successfully receive a percentage fee charged on the top
        up amount, while they also get reimbursed for the gas cost. An additional fee charged on the
        top up amount is shared between the LPs of the pool.
      </Paragraph>
      <Paragraph>
        Note that as LPs specify the health factor at which collateral top ups occur, they are
        incentivized to set a factor that lies above the protocol’s liquidation threshold in order
        to avoid bidding wars between both liquidation and top up bots. Nonetheless, priority gas
        auctions may occur between backd keepers for top ups.
      </Paragraph>
      <SubHeader>Collateral top ups</SubHeader>
      <Paragraph>
        Collateral top ups occur in incremental amounts specified by the LP when the top up position
        is first registered. Incremental top ups may occur as long as the total top up amount is
        greater or equal to the single top up amount and as long as the position to be topped up is
        indeed eligible.
      </Paragraph>
      <SubHeader>Supported Protocols</SubHeader>
      <Paragraph>
        On backd v1, LPs may use deposits as back up collateral on Aave and Compound. However, this
        can easily be extended via backd governance in the future. To add support for a new
        protocol, all it takes is to implement, deploy and add a new protocol handler which contains
        the logic for measuring the health factor of a position and for depositing funds as
        collateral.
      </Paragraph>
      <SubHeader>Fees</SubHeader>
      <Paragraph>
        When a position is topped up, a fixed percentage fee is charged on the top up amount and
        distributed among the LPs of the pool in which the position was registered.
      </Paragraph>
      <Header>Components</Header>
      <Paragraph>
        The backd protocol consists of several key components, perhaps most notably liquidity pools,
        vaults and strategies. Let’s briefly examine each of these in a bit more detail:
      </Paragraph>
      <ul>
        <li>
          <Paragraph>
            Liquidity pools: When an LP deposits funds on backd, he has to choose a single asset
            liquidity pool to deposit into. If an LP wants some (or all) of his deposits to be used
            as back up collateral on some other protocol, he can register his top up positions via
            the pool’s registry. A liquidity pool maintains a running total of the deposits which
            are registered as back up collateral. A pool allocates deposits that are not registered
            as back up collateral, plus a proportion of the registered back up collateral to a
            pool-specific vault.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Vaults: Each liquidity pool has a vault, which handles all deposit and withdrawal
            interaction with a strategy. For backd v1, single strategy vaults are supported. Vaults
            contain a target allocation factor, which specifies the ratio of Vault deposits that
            should be allocated to the associated strategy. Hence, a vault typically holds an amount
            of idle funds for reduced gas costs.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Strategies: A strategy contains the logic for yield-farming using the funds which it is
            being allocated from the vault. The performance of a strategy is tracked by the
            depositing vault and allocations are rebalanced according to the vault parameters (e.g.
            debt limits). Profits can be harvest and any unrealized profits are compounded by the
            strategy. The protocol charges a performance fee on strategy profits. Part of this fee
            is paid to a strategy’s strategist in LP tokens. The remainder of the performance fee is
            directed to the protocol’s treasury, which is essentially controlled by governance.
          </Paragraph>
        </li>
      </ul>
      <Paragraph>
        For backd v1, strategies and vaults are unique to a liquidity pool and therefore pools exist
        in isolation of one another. For a more technical overview of each backd component check out
        the official{" "}
        <a href="">
          <GradientText>docs</GradientText>
        </a>
        .
      </Paragraph>
      <Header>Understanding Liquidity Pools</Header>
      <Paragraph>Liquidity pools on backd differ in several ways from one another.</Paragraph>
      <ul>
        <li>
          <Paragraph>
            Assets: Pools are single-asset pools. Furthermore, for backd v1, there will be only one
            pool per asset type to prevent liquidity fragmentation.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Parameterization: Pools are very customizable. For instance, each pool has a required
            reserve ratio, which specifies the percentage of the backing funds that need to remain
            idle in the pool, i.e., funds which cannot be allocated to strategies but are reserved
            solely for the purpose of top ups. Intuitively, a lower reserve ratio comes with higher
            expected earnings (as more funds are allocated to a strategy), at the cost of increased
            insolvency risk, i.e., insufficient funds available for top up. Furthermore, pools can
            differ in terms of fees charged on top ups and strategy performance.
          </Paragraph>
        </li>
        <li>
          <Paragraph>
            Strategy: The yield farming strategy used by a pool may differ to the ones used by other
            pools. However, strategies can be activated, deactivated and replaced by governance.
          </Paragraph>
        </li>
      </ul>
      <Header>Governance</Header>
      <Paragraph>
        The backd protocol will rely on a decentralized governance scheme, which will be introduced
        shortly after the launch of backd v1. The protocol offers a lot of room for
        parameterization, such as required reserve ratios for pools, strategy allocation weights,
        reserve requirement weights for vaults or LP and keeper fees. Furthermore, new pools and
        strategies can be added via governance. This allows other DeFi protocols to propose a
        strategy (or pool), which allocates liquidity to their protocol. Ultimately, this enables
        LPs to use existing yield-farming protocols, while also benefitting from the option to use
        their holdings as back up collateral through backd.
      </Paragraph>
      <Paragraph>
        Disclaimer: there will not be a governance token sale, so please do not fall for scams.
      </Paragraph>
      <Header>Roadmap</Header>
      <Paragraph>
        For backd v1, we implement three core pools, namely for DAI, USDC and ETH. Hence, any LP can
        earn interest from depositing any of these assets, as well as use their pool holdings as
        back up collateral on Aave or Compound. The v1 core pools’ strategies are built upon Curve
        for earning interest and will be subject to backd getting whitelisted by the Curve DAO.
      </Paragraph>
      <Paragraph>
        Shortly after the v1 launch, backd governance will be released, which will introduce a range
        of new incentives for backd LPs. This will empower LPs to vote on the addition of new pools
        and strategies, as well as make important parameter changes for the protocol (e.g. adjust
        the risk level of a pool).
      </Paragraph>
      <Paragraph>
        As backd sits in a position between topping up collateral on other protocols and investing
        funds for high returns, future strategies should be designed to integrate other DeFi
        protocols. We encourage Furthermore, liquidation protection can easily go beyond lending
        protocols to other over-collateralized positions, such as Maker vaults.
      </Paragraph>
    </StyledLitepaperPage>
  );
};

export default LitepaperPage;
