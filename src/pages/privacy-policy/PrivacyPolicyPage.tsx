import styled from "styled-components";
import { Header1, Header2, Header3, Header5, Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";
import { MAIN_LINK } from "../../lib/links";

const StyledPrivacyPolicyPage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 770px;
  margin: auto;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const Header = styled(Header5)`
  text-align: left;
  margin-top: 8rem;

  @media (max-width: 600px) {
    margin-top: 4rem;
  }
`;

const SubHeader = styled(Header2)`
  text-align: left;
  margin-top: 3rem;
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

const Link = styled.a`
  font-weight: 400;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;
  text-decoration: underline;

  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;

const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <StyledPrivacyPolicyPage>
      <Seo title="Mero Privacy Policy" description="The privacy policy for Mero" />
      <Header1>Mero - Privacy Policy</Header1>
      <Header>Introduction</Header>
      <Paragraph>
        We respect your privacy and are committed to protecting your personal data. This privacy
        notice will inform you as to how we look after your personal data and tell you about your
        privacy rights and how the law protects you. Your use of the website, and all of our other
        properties, products, and services (the “Services”) is subject to this Policy as well as our{" "}
        <Link href="tos" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </Link>
      </Paragraph>
      <Paragraph>
        Please use the Glossary to understand the meaning of some of the terms used in this privacy
        notice.
      </Paragraph>
      <Header>Important information and who we are</Header>
      <SubHeader>Controller</SubHeader>
      <Paragraph>
        Reactive Labs Ltd, a company incorporated in the Cayman Islands, and its subsidiaries, is
        the controller and responsible for your personal data (collectively referred to as the
        Company, "we", "us" or "our" in this privacy notice).
      </Paragraph>
      <Paragraph>
        Personal data for our website (
        <Link href={MAIN_LINK} target="_blank" rel="noopener noreferrer">
          www.mero.finance/
        </Link>
        ) is processed in the United Kingdom via our subsidiary Aurora Labs Ltd.
      </Paragraph>
      <Paragraph>
        You have the right to make a complaint at any time to the Information Commissioner's Office
        (ICO), the UK supervisory authority for data protection issues (www.ico.org.uk). We would,
        however, appreciate the chance to deal with your concerns before you approach the ICO so
        please contact us in the first instance.
      </Paragraph>
      <SubHeader>About Mero</SubHeader>
      <Paragraph>
        We have outlined below a bit more information about our protocol and how protocol users can
        interact with it.
      </Paragraph>
      <Paragraph>
        Mero is a protocol on Ethereum that automates asset efficiency (the “Protocol”). Ethereum
        users may deposit supported tokens into Mero’s liquidity pools. These are smart contracts
        that contain the logic for handling deposits and withdrawals of a particular token. The
        deposits get allocated to different Decentralized Finance (DeFi) protocols on Ethereum to
        earn interest (for example, to Curve Finance to earn CRV tokens). All received interest is
        sold for the underlying asset of the pool and gets auto-compounded. Additionally to earning
        interest, users may specify market triggers on which their deposits should be used in an
        automated and trustless way for other actions. For instance, a user of Mero is able to
        register deposits as “backup collateral”, whereby funds can be used to increase the user’s
        collateral-to-debt ratio on different lending protocols in times of market volatility, while
        interest is earned until these funds are needed for collateral top ups. On Mero liquidity
        gets shifted to where it is needed when it is needed, thereby maximizing capital efficiency
        for users.
      </Paragraph>
      <Paragraph>
        The general user of the Protocol will be an Ethereum account that holds ERC20 tokens or the
        native currency ETH (“Protocol Users”). There are two things that Protocol Users can do:
        deposit liquidity to earn interest and, additionally, register their funds to be used by
        actions that get triggered by market conditions. Protocol Users can deposit and withdraw
        funds as they wish and register their deposits for specific actions simply by interacting
        with Mero’s smart contracts in a trustless and permissionless way.
      </Paragraph>
      <SubHeader>Changes to the privacy notice and your duty to inform us of changes</SubHeader>
      <Paragraph>This version was last updated on 10/03/2023.</Paragraph>
      <Paragraph>
        It is important that the personal data we hold about you is accurate and current. Please
        keep us informed if your personal data changes during your relationship with us.
      </Paragraph>
      <SubHeader>Third-party links</SubHeader>
      <Paragraph>
        Our website may include links to third-party websites, plug-ins and applications. Clicking
        on those links or enabling those connections may allow third parties to collect or share
        data about you. We do not control these third-party websites and are not responsible for
        their privacy statements. When you leave our website, we encourage you to read the privacy
        notice of every website you visit.
      </Paragraph>

      <Header>The data we collect about you</Header>
      <Paragraph>
        Privacy is central to everything we do at the Company. We aspire to be transparent about
        what little data we do collect. We do not maintain user accounts and do not collect and
        store personal data, such as your name or internet protocol (“IP”) address. When you
        interact with the Services, we collect only:
      </Paragraph>
      <SubHeader>Publicly-available blockchain data</SubHeader>
      <Paragraph>
        When you connect your non-custodial blockchain wallet to the Services, we may collect and
        log your publicly-available blockchain address for analytics and/or security purposes. Note
        that blockchain addresses are publicly-available data that are not created or assigned by us
        or any central party. They do not allow us to identify you personally.
      </Paragraph>
      <SubHeader>Information from other sources</SubHeader>
      <Paragraph>
        We may receive information about your wallet address or transactions made through the
        Services from our service providers in order to comply with our legal obligations and
        prevent the use of our Services in connection with fraudulent or other illicit activities.
      </Paragraph>
      <SubHeader>Survey or usability information</SubHeader>
      <Paragraph>
        If you participate in a survey or usability study with us, we will record any information
        you directly provide to us
      </Paragraph>
      <SubHeader>Correspondence</SubHeader>
      <Paragraph>
        We will receive any communications and information you provide directly to us via email,
        customer support, social media, or another support channel (such as Twitter or Discord).
      </Paragraph>
      <Paragraph>
        You may choose to voluntarily provide other information to us that we have not solicited
        from you, and, in such instances, you are solely responsible for such information.
      </Paragraph>
      <Paragraph>
        We do not collect any Special Categories of Personal Data about you (this includes details
        about your race or ethnicity, religious or philosophical beliefs, sex life, sexual
        orientation, political opinions, trade union membership, information about your health and
        genetic and biometric data). Nor do we collect any information about criminal convictions
        and offences.
      </Paragraph>
      <SubHeader>If you fail to provide personal data</SubHeader>
      <Paragraph>
        Where we need to collect personal data by law, or under the terms of a contract we have with
        you and you fail to provide that data when requested, we may not be able to perform the
        contract we have or are trying to enter into with you (for example, to provide you with
        goods or services). In this case, we may have to cancel a product or service you have with
        us but we will notify you if this is the case at the time.
      </Paragraph>
      <Header>How we use your personal data</Header>
      <Paragraph>
        We use the data we collect in accordance with your instructions, including any applicable
        terms in our{" "}
        <Link href="tos" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </Link>
        , and as required by law. We may also use data:
      </Paragraph>
      <List>
        <Item>
          <Paragraph>
            for providing, maintaining, customizing and improving our Services and features of our
            Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            for providing customer support and answering inquiries about the Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            to protect against, investigate, and stop fraudulent, unauthorized, or illegal activity.
            We may also use it to address security risks, solve potential security issues such as
            bugs, enforce our agreements, and protect our users and Company.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            as needed or requested by regulators, government entities, and law enforcement to comply
            with applicable laws and regulations.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            to compile aggregated data that helps us learn more about how users use the Services and
            where we can improve your experience.
          </Paragraph>
        </Item>
      </List>
      <SubHeader>Third-party marketing</SubHeader>
      <Paragraph>
        We will get your express opt-in consent before we share your personal data with any company
        outside our group of companies for marketing purposes.
      </Paragraph>
      <SubHeader>Opting out</SubHeader>
      <Paragraph>
        You can ask us or third parties to stop sending you marketing messages at any time by
        contacting us at any time.
      </Paragraph>
      <Paragraph>
        Where you opt out of receiving marketing messages, this will not apply to personal data
        provided to us as a result of a product/service purchase, warranty registration,
        product/service experience or other transactions.
      </Paragraph>
      <SubHeader>Change of purpose</SubHeader>
      <Paragraph>
        If we need to use your personal data for an unrelated purpose, we will notify you and we
        will explain the legal basis which allows us to do so.
      </Paragraph>
      <Header>Disclosures of your personal data</Header>
      <List>
        <Item>
          <Paragraph>Internal Third Parties as set out in the Glossary.</Paragraph>
        </Item>
        <Item>
          <Paragraph>External Third Parties as set out in the Glossary.</Paragraph>
        </Item>
      </List>
      <Paragraph>
        We require all third parties to respect the security of your personal data and to treat it
        in accordance with the law. We do not allow our third-party service providers to use your
        personal data for their own purposes and only permit them to process your personal data for
        specified purposes and in accordance with our instructions.
      </Paragraph>
      <Header>International transfers</Header>
      <Paragraph>
        Some of our external third parties may be based outside the European Economic Area (EEA) so
        the processing of your personal data may involve a transfer of data outside the EEA.
      </Paragraph>
      <Paragraph>
        Whenever we transfer your personal data out of the EEA, we ensure a similar degree of
        protection is afforded to it by ensuring at least one of the following safeguards is
        implemented:
      </Paragraph>
      <List>
        <Item>
          <Paragraph>
            We will only transfer your personal data to countries that have been deemed to provide
            an adequate level of protection for personal data by the European Commission.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Where we use certain service providers, we may use specific contracts approved by the
            European Commission which give personal data the same protection it has in Europe.
          </Paragraph>
        </Item>
      </List>
      <Header>Data security</Header>
      <Paragraph>
        We have put in place appropriate security measures to prevent your personal data from being
        accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In
        addition, we limit access to your personal data to those employees, agents, contractors and
        other third parties who have a business need to know. They will only process your personal
        data on our instructions and they are subject to a duty of confidentiality.
      </Paragraph>
      <Header>Data retention</Header>
      <Paragraph>
        We will only retain your personal data for as long as necessary to fulfill the purposes we
        collected it for, including for the purposes of satisfying any legal, accounting, or
        reporting requirements.
      </Paragraph>
      <Paragraph>
        To determine the appropriate retention period for personal data, we consider the amount,
        nature, and sensitivity of the personal data, the potential risk of harm from unauthorised
        use or disclosure of your personal data, the purposes for which we process your personal
        data and whether we can achieve those purposes through other means, and the applicable legal
        requirements.
      </Paragraph>
      <Paragraph>
        In some circumstances you can ask us to delete your data and in some circumstances we may
        anonymise your personal data (so that it can no longer be associated with you) for research
        or statistical purposes in which case we may use this information indefinitely without
        further notice to you.
      </Paragraph>
      <Header>Your legal rights</Header>
      <Paragraph>
        Under certain circumstances, you have rights under data protection laws in relation to your
        personal data. Please click on the links below to the ICO’s website to find out more about
        these rights:
      </Paragraph>
      <List>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/your-data-matters/your-right-to-get-copies-of-your-data/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request access to your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-rectification/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request correction of your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-erasure/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request erasure of your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-object/#:~:text=Individuals%20have%20the%20absolute%20right,authority%20vested%20in%20you%3B%20or"
              target="_blank"
              rel="noopener noreferrer"
            >
              Object to processing of your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-restrict-processing/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request restriction of processing your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-data-portability/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request transfer of your personal data.
            </Link>
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            <Link
              href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/consent/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Right to withdraw consent.
            </Link>
          </Paragraph>
        </Item>
      </List>
      <SubHeader>What we may need from you</SubHeader>
      <Paragraph>
        We may need to request specific information from you to help us confirm your identity and
        ensure your right to access your personal data (or to exercise any of your other rights).
        This is a security measure to ensure that personal data is not disclosed to any person who
        has no right to receive it. We may also contact you to ask you for further information in
        relation to your request to speed up our response.
      </Paragraph>
      <SubHeader>Time limit to respond</SubHeader>
      <Paragraph>
        We try to respond to all legitimate requests within one month. Occasionally it may take us
        longer than a month if your request is particularly complex or you have made a number of
        requests. In this case, we will notify you and keep you updated.
      </Paragraph>
      <Header>Glossary</Header>
      <SubHeader>Lawful Basis</SubHeader>
      <Header3>Legitimate Interest</Header3>
      <Paragraph>
        means the interest of our business in conducting and managing our business to enable us to
        give you the best service/product and the best and most secure experience. We make sure we
        consider and balance any potential impact on you (both positive and negative) and your
        rights before we process your personal data for our legitimate interests. We do not use your
        personal data for activities where our interests are overridden by the impact on you (unless
        we have your consent or are otherwise required or permitted to by law).
      </Paragraph>
      <SubHeader>Third Parties</SubHeader>
      <Header3>Internal Third Parties</Header3>
      <Paragraph>
        Other companies in our corporate group who may act as joint controllers or processors and
        who may be based inside or outside the EU.
      </Paragraph>
      <Header3>External Third Parties</Header3>
      <List>
        <Item>
          <Paragraph>
            Service providers who may act as processors based inside or outside the EU and who
            provide IT, system administration and other services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Professional advisers who may act as processors including lawyers, bankers, auditors and
            insurers based inside or outside the EU who provide consultancy, banking, legal,
            insurance and accounting services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            HM Revenue & Customs, regulators and other authorities who may act as processors based
            inside or outside the EU who require reporting of processing activities in certain
            circumstances.
          </Paragraph>
        </Item>
      </List>
    </StyledPrivacyPolicyPage>
  );
};

export default PrivacyPolicyPage;
