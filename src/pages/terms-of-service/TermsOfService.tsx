import styled from "styled-components";
import { Header1, Header2, Header5, Paragraph } from "../../styles/Headers";
import Seo from "../../components/Seo";
import { MAIN_LINK } from "../../lib/links";

const StyledTermsOfServicePage = styled.div`
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

const TermsOfServicePage = (): JSX.Element => {
  return (
    <StyledTermsOfServicePage>
      <Seo title="Mero Terms of Service" description="The Terms of Service for Mero" />
      <Header1>Mero - Terms of Service</Header1>
      <Paragraph>Last Modified: 25/04/2023</Paragraph>
      <Paragraph>
        MERO IS A DEFI BLOCKCHAIN PROTOCOL. BEFORE INTERACTING WITH THE MERO PROTOCOL OR ANY OF THE
        SERVICES ASSOCIATED WITH MERO, YOU SHOULD KNOW, UNDERSTAND AND ACCEPT THE RISKS ASSOCIATED
        WITH BLOCKCHAIN, CRYPTOCURRENCY, AND DECENTRALIZED FINANCE IN GENERAL. THIS DOCUMENT
        CONTAINS VERY IMPORTANT INFORMATION REGARDING THESE RISKS AND YOUR RIGHTS AND OBLIGATIONS,
        AS WELL AS CONDITIONS, LIMITATIONS, AND EXCLUSIONS THAT MIGHT APPLY TO YOU AND YOUR RIGHTS.
        PLEASE READ IT CAREFULLY.
      </Paragraph>
      <Paragraph>
        THESE TERMS REQUIRE THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES,
        RATHER THAN JURY TRIALS OR CLASS ACTIONS.
      </Paragraph>
      <Paragraph>
        BY USING THE WEBSITE OR OUR SERVICES, YOU ACCEPT AND ARE BOUND BY THESE TERMS AND
        CONDITIONS.
      </Paragraph>
      <Paragraph>
        YOU MAY NOT USE OUR WEBSITE OR SERVICES IF YOU: (A) DO NOT AGREE TO THESE TERMS; (B) ARE NOT
        THE OLDER OF: (i) AT LEAST EIGHTEEN (18) YEARS OF AGE; OR (ii) LEGAL AGE TO FORM A BINDING
        CONTRACT; OR (C) ARE PROHIBITED FROM ACCESSING OR USING THIS WEBSITE OR ANY OF THIS
        WEBSITE’S FUNCTIONALITIES BY THESE TERMS OR BY APPLICABLE LAW.
      </Paragraph>
      <Header>Acceptance of These Terms of Service.</Header>
      <Paragraph>
        These terms of service are entered into by and between you (“you” or the “User”) and
        Reactive Labs, a Cayman Islands registered company (the “Company,” “we,” “our,” or “us”).
        The following terms and conditions, together with any documents they expressly incorporate
        by reference (collectively, these “Terms of Service” or this “Agreement”), govern the User’s
        access to and use of{" "}
        <Link href={MAIN_LINK} target="_blank" rel="noreferrer">
          https://mero.finance/
        </Link>{" "}
        and its sub-pages including any content or functionality offered on or through the
        website-hosted user interface (the “Interface,” or collectively with other{" "}
        <Link href={MAIN_LINK} target="_blank" rel="noreferrer">
          https://mero.finance/
        </Link>{" "}
        sub-pages, the “Website”).
      </Paragraph>
      <Paragraph>
        The User must read these Terms of Service carefully before using the Website (including the
        Interface). By using the Website or the Interface, the User accepts and agrees to be bound
        and abide by these Terms of Service and our{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        , incorporated herein by reference. If the User does not want to agree to these Terms of
        Use, the{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        , or any documents that are incorporated herein by reference, the User must not access the
        Website or use the Interface.
      </Paragraph>
      <Paragraph>
        The Website is offered and available to users who are eighteen (18) years of age or older.
        By using this Website, the User represents and warrants that the User is at least the higher
        of legal age to form a binding contract with the Company in the User’s applicable
        jurisdiction or eighteen (18) years of age, and meets all of the foregoing eligibility
        requirements.
      </Paragraph>
      <Paragraph>
        Further, by using this Website, the User represents and warrants that the User is not a
        citizen or resident of, nor is located in any country against which the United States has
        sanctioned or embargoed or where the use of the Website is otherwise illegal or
        impermissible, whether by rule, statute, regulation, bylaw, court adjudication or order,
        protocol, administrative statement, code, decree, or other directive, requirement or
        guideline, whether applicable on the Company, the Website, the Interface, the Protocol (as
        defined herein), or on the User (or any combination of the foregoing) by an authority with
        valid and enforceable jurisdiction (“Applicable Laws”). If you do not meet all of these
        requirements, you must not access or use the Website.
      </Paragraph>
      <Header>The Services & the Protocol</Header>
      <Paragraph>
        The Website’s services (the “Services”) provides a web or mobile-based means of access to
        (a) a decentralized protocol on various public blockchains, including but not limited to
        Ethereum, that allows users (“Participants”) to earn yield on deposited funds (the "Mero
        protocol" or the "Protocol").
      </Paragraph>
      <Paragraph>
        The Protocol is intended to be provided and operate in a decentralized manner, meaning that
        the Company has no ability to control, modify, prevent, stop, amend, or adjust interactions
        or transactions after they are submitted to the Protocol, whether or not through the
        Interface. Further, the Interface is not the only method that individuals or parties may
        interact with, contribute to, access, or otherwise affect the Protocol. Thus, the Services
        (including the Website and the Interface) are distinct from the Protocol. The Interface is a
        web-based means of accessing the Protocol. The Protocol itself is composed of open-source or
        source-available self-executing smart contracts that are deployed on the Ethereum
        blockchain. Neither the Company nor any of its subsidiaries control or operate any version
        of the Protocol on any blockchain network. By using the Interface, you understand that you
        are not buying or selling digital assets from us and that we do not operate any liquidity
        pools on the Protocol or control liquidity allocation or trades on the protocol. When Mero
        users pay fees for actions, withdrawals or on earned yield, those fees accrue to liquidity
        providers for the Protocol and external keeper bots. As a general matter, liquidity
        providers should be seen as independent third parties, however the Company, like any other
        Participant, may participate as a liquidity provider in the Protocol’s liquidity pools.
      </Paragraph>
      <Paragraph>
        You are expected to be familiar with the Protocol and the risks it represents (including
        without limitation the possibility of your digital assets being forfeited according to the
        Protocol’s rules or being lost for any other reason) before accessing it (whether accessed
        via the Interface or otherwise). YOU ACKNOWLEDGE AND AGREE THAT YOUR USE OR INTERACTION WITH
        THE PROTOCOL IS AT YOUR OWN RISK AND THE COMPANY WAIVES ALL LIABILITY OR RESPONSIBILITY, AND
        MAKES NO WARRANTIES, RELATED TO THE PROTOCOL, WHETHER OR NOT THE PROTOCOL IS ACCESSED VIA
        OUR SERVICES.
      </Paragraph>
      <Header>Blockchain Fees.</Header>
      <Paragraph>
        Your full use and enjoyment of the Services (whether or not by using the Interface) may
        require you to pay transactional fees required by their underlying blockchain or distributed
        ledger service, or by the Protocol itself, that are designed to encourage their intended use
        among the Protocol’s participants (“Blockchain Fees”). These Blockchain Fees are not levied
        directly by the Company, but rather are determined by your use of the Services and the rules
        placed by corresponding Protocol and underlying blockchain communities at large. You
        acknowledge that the Company has no control over Blockchain Fees, (including without
        limitation their applicability, payment, amounts, transmission, transmission, intended
        operation, and effectiveness) whether related to your use of the Services or otherwise, and
        agree that in no event will the Company be responsible to you or any other part for the
        payment, repayment, refund, disbursement, indemnity, or for any other aspect of your use or
        transmission of Blockchain Fees. For further information regarding blockchain technology,
        digital assets and the associated risks, see the Section below entitled Nature of
        Blockchain; Assumption of Risk; Waiver of Claims.
      </Paragraph>
      <Header>Accessing the Website & User Security.</Header>
      <Paragraph>
        We reserve the right to withdraw or amend the Website (including the Interface), and any
        other Services or material we provide on the Website, in our sole discretion without notice.
        We will not be liable if for any reason all or any part of the Website, the Interface, the
        Protocol, or any of the Services are unavailable at any time or for any period. From time to
        time, we may restrict access to some parts of the Website, or the entire Website, to
        Participants.
      </Paragraph>
      <Paragraph>The User is responsible for both:</Paragraph>
      <List>
        <Item>
          <Paragraph>
            Making all arrangements necessary for the User to have access to the Website and the
            Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Ensuring that all persons who access the Website or the Services through the User’s
            internet connection are aware of these Terms of Service and comply with them.
          </Paragraph>
        </Item>
      </List>
      <Paragraph>
        To access certain Services or some of the resources offered on the Website, the User may be
        asked to provide certain registration details or other information. Other Services or
        resources offered on the Website (such as the Interface) may require the User to utilize
        certain Web3 capabilities, such a digital asset wallet capable of interacting with the
        User’s web browser or relevant blockchain nodes (“Web3 Utilities”). It is a condition of the
        User’s use of the Website and the Services that the User only operate such Web3 Utilities
        with a private key(s) that the User created or has the direct, explicit permission of the
        party who created the relevant private key(s). The User agrees that all information it
        provides to interact with the Website, Interface, Services, or otherwise, including but not
        limited to through the use of any interactive features on the Website (such as registration
        information) is correct, current, and complete, and is governed by our{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        . The User consents to all actions we take with respect to the User’s information as is
        consistent with our{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        .{" "}
      </Paragraph>
      <Paragraph>
        If the User utilizes a Web3 Utility that relies on a separate username, password, private
        key, or any other piece of information as part of its security procedures, the User must
        treat such information as confidential, and the User must not disclose that information to
        any other person or entity. The User also acknowledges that any identity linked to its Web3
        Utility is personal to the User and agrees not to provide any other person with access to
        such identity. The User also agrees to ensure that it will lock or otherwise prevent its
        Web3 Utility from unauthorized use on this Website or the Services at the end of each
        session. The User should use particular caution when accessing the Website or the Services
        from a public or shared computer so that others are not able to view or record the User’s
        username, password, private key, or other personal information. In the event the User’s Web3
        credentials are compromised, the User acknowledges and understands that all of its related
        digital assets may be compromised as well, and waives any and all responsibility of and
        liability against the Company related to any losses in any such event.
      </Paragraph>
      <Paragraph>
        We have the right to block any IP address from accessing the Website at any time in our sole
        discretion for any or no reason, including if, in our opinion, the User or that identity has
        violated any provision of these Terms of Service.
      </Paragraph>
      <Header>Prohibited Uses.</Header>
      <Paragraph>
        The User may access or use the Website and the Services only for lawful purposes and in
        accordance with these Terms of Service. The User agrees not to use or access the Website or
        the Services:
      </Paragraph>
      <List>
        <Item>
          <Paragraph>
            In any way that violates any applicable federal, state, local, or international law or
            regulation (including, without limitation, any laws regarding the export of data or
            software to and from the U.S. or other countries).
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of
            the Website or the Services, or which, as determined by us, may harm the Company or
            Participants, or expose them to liability.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            If they are a citizen of or otherwise accessing the Website from the nations of Belarus,
            Burma, China, Cuba, Democratic Republic of Congo, Iran, Iraq, Liberia, North Korea,
            Sudan, Syria, and Zimbabwe, or if the User is otherwise listed as a Specially Designated
            National by the United States Office of Foreign Asset Control (“OFAC”) (collectively,
            “Prohibited Jurisdictions”).
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            If doing so is illegal or impermissible according to any Applicable Laws.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            To cause the Services, any of the Services’ underlying blockchain networks or
            technologies, or any other functionality with which the Services interact to work other
            than as intended.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            To take any action that may be reasonably construed as fraud, deceit, or manipulation.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            To damage the reputation of the Company or impair any of the Company’s legal rights or
            interests.
          </Paragraph>
        </Item>
      </List>
      <Paragraph>Additionally, the User agrees not to:</Paragraph>
      <List>
        <Item>
          <Paragraph>
            Be likely to deceive or defraud, or attempt to deceive or defraud, any person, including
            (without limitation) providing any false, inaccurate, or misleading information (whether
            directly through the Services or through an external means that affects the Protocol)
            with the intent to unlawfully obtain the property of another or to provide knowingly or
            recklessly false information, including in any way that causes inaccuracy among the
            content on the Website or on the Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use the Services to manipulate or defraud any decentralized exchange protocol (“DEX”),
            decentralized finance (“DeFi”) protocol, oracle system, the Protocol, or blockchain
            network, or the users thereof.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Cause needless annoyance, inconvenience, or anxiety, or be likely to unreasonably upset,
            embarrass, alarm, or annoy any other person.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Engage in any activity or behavior that violates any applicable law, rule, or regulation
            concerning, or otherwise damages, the integrity of the Website or the Services, or any
            other service or software which relies on the Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use the Website in any manner that could disable, overburden, damage, impair, or
            interfere with any other party’s use of the Website, including the ability to engage in
            real time activities through the Website or with the Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use any robot, spiderbot, or other similar automatic device, process, or means to access
            the Website for any purpose, including monitoring or copying any of the material on the
            Website.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use any manual process to copy any of the material on the Website, or for any other
            purpose not expressly authorized in these Terms of Service, without our prior written
            consent.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use any device, software, or routine that interferes with the proper working of the
            Website or the Services.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Circumnavigate, by any means (including using a VPN or any other privacy or
            anonymization tools or techniques), any restriction we may have implemented to prohibit
            impermissible access to citizens and residents of, or Participants physically located
            in, any Prohibited Jurisdiction.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is
            malicious or technologically harmful to the Website, the Services, the Participants, any
            underlying blockchain, or any of the Service’s related utilities or functionalities.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of
            the Website, the server on which the Website is stored, or any server, computer, or
            database connected to the Website, including any underlying blockchain.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Violate the legal rights (including the rights of publicity and privacy) of others or
            contain any material that could give rise to any civil or criminal liability under
            applicable laws or regulations or that otherwise may be in conflict with these Terms of
            Use and our{" "}
            <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>
            .
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Attack the Website, the Services, the Protocol, any of the Services’ underlying
            blockchain networks or technologies, or any other functionality with which the Services
            interact via a denial-of-service attack or a distributed denial-of-service attack.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Otherwise interfere with or attempt to interfere with the proper working of the Website
            or the Services in any way.
          </Paragraph>
        </Item>
      </List>
      <Header>Monitoring & Enforcement; Termination.</Header>
      <Paragraph>We have the right to:</Paragraph>
      <List>
        <Item>
          <Paragraph>
            Take appropriate legal action, including without limitation, referral to law
            enforcement, for any illegal or unauthorized use of the Website or the Protocol.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Terminate or suspend your access to all or part of the Website for any or no reason,
            including without limitation, any violation of these Terms of Service.
          </Paragraph>
        </Item>
      </List>
      <Paragraph>
        Without limiting the foregoing, we have the right to cooperate fully with any law
        enforcement authorities or court order requesting or directing us to disclose the identity
        or other information of anyone posting any materials on or through the Website.
      </Paragraph>
      <Paragraph>
        BY USING THE WEBSITE, PROTOCOL, OR THE SERVICES, YOU WAIVE AND HOLD HARMLESS THE COMPANY AND
        ITS AFFILIATES, LICENSEES, AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION
        TAKEN BY ANY OF THE FOREGOING PARTIES DURING, OR TAKEN AS A CONSEQUENCE OF, INVESTIGATIONS
        BY EITHER SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
      </Paragraph>
      <Paragraph>
        However, we cannot review interactions or activities before they are executed through the
        Website, and, given the nature of blockchain and functionalities like those offered via the
        Services, cannot ensure prompt removal or rectification of objectionable interactions or
        activities after they have been executed. Accordingly, the User agrees that we assume no
        liability for any action or inaction regarding transmissions, communications, transactions,
        blockchain operations, or content provided by any Participant or third party, including any
        that may cause a malfunction or inaccuracy on the Website or among the Services. We have no
        liability or responsibility to anyone for any other party’s performance or nonperformance of
        the activities described in this Section, nor for any harms or damages created by others’
        interactions with any blockchain underlying the Services or reliance on the information or
        content presented on the Website.
      </Paragraph>
      <Header>Changes to These Terms of Service.</Header>
      <Paragraph>
        We may revise and update these Terms of Service from time to time in our sole discretion.
        All changes are effective immediately when we post them and apply to all access to and use
        of the Website thereafter. However, any changes to the dispute resolution provisions set out
        in the Section entitled Governing Law & Jurisdiction below will not apply to any disputes
        for which the parties have actual notice before the date the change is posted on the
        Website.
      </Paragraph>
      <Paragraph>
        The User’s continued use of the Website or the Services following the posting of revised
        Terms of Service means that the User accepts and agrees to the changes. The User is expected
        to check this page each time it accesses this Website or the Interface, so it is aware of
        any changes as they are binding on the User.
      </Paragraph>
      <Header>Intellectual Property Rights.</Header>
      <Paragraph>
        Except any open-source software or other material incorporated the Website or the Services,
        the Website and its entire contents, features, and functionality (including but not limited
        to all information, software, text, displays, images, video, and audio, and the design,
        selection, and arrangement thereof) are owned by the Company, its licensors, or other
        providers of such material and are protected by United States and international copyright,
        trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        The User must not reproduce, distribute, modify, create derivative works of, publicly
        display, publicly perform, republish, download, store, or transmit any of the material on
        our Website, except as follows:
      </Paragraph>
      <List>
        <Item>
          <Paragraph>
            The User’s computer may temporarily store copies of such materials in RAM incidental to
            the User’s accessing and viewing those materials.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            The User may store files that are automatically cached by the User’s web browser for
            display enhancement purposes.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            For any open-source materials provided on the Website or through the Services, the User
            may perform any activities only as is consistent with the open-source license applicable
            to such materials.
          </Paragraph>
        </Item>
      </List>
      <Paragraph>The User must not:</Paragraph>
      <List>
        <Item>
          <Paragraph>Modify copies of any materials from this Website.</Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Use any illustrations, photographs, video or audio sequences, or any graphics separately
            from the accompanying text.
          </Paragraph>
        </Item>
        <Item>
          <Paragraph>
            Delete or alter any copyright, trademark, or other proprietary rights notices from
            copies of materials from this Website.
          </Paragraph>
        </Item>
      </List>
      <Paragraph>
        If the User wishes to make any use of material on the Website other than that set out in
        this Section, it should address its request to{" "}
        <Link href="mailto:legal@mero.finance" target="_blank" rel="noopener noreferrer">
          legal@mero.finance
        </Link>
        .
      </Paragraph>
      <Paragraph>
        If the User prints, copies, modifies, downloads, or otherwise uses or provides any other
        person with access to any part of the Website in breach of these Terms of Service, the
        User’s right to access the Website will stop immediately and the User must, at our option,
        return or destroy any copies of the materials the User has made. No right, title, or
        interest in or to the Website or any content on the Website is transferred to the User, and
        all rights not expressly granted are reserved by the Company.
      </Paragraph>
      <Paragraph>
        Notwithstanding anything to the contrary in these Terms of Service, the User may freely use
        any open-sourced materials up to the limits provided, but in accordance with any
        requirements placed, by those materials’ open-source licenses.
      </Paragraph>
      <Paragraph>
        Any use of the Website not expressly permitted by these Terms of Service is a breach of
        these Terms of Service and may violate copyright, trademark, and other laws.
      </Paragraph>
      <Header>Trademarks.</Header>
      <Paragraph>
        The Company name, the terms “Mero”, and all related names, logos, product and service names,
        designs, and slogans are trademarks of the Company or its affiliates or licensors. You must
        not use such marks without the prior written permission of the Company; provided, however,
        the User is hereby granted a limited, revocable, non-transferable permission and license to
        use the term “Mero” and any related names (excluding the Company name), logos (excluding the
        Company logo), product and service names, designs, and slogans in any way that they desire
        so long as such usage is not done in a way that: (1) is deceitful, fraudulent, or
        manipulative; (2) implies any relationship between User and the Company beyond that
        reasonably typical of a website administrator and its users; or (3) to cause confusion in
        any way to gain digital assets of, or personal information about, another party other than
        that intended by the Services, the Protocol, the Interface or any related or interacting
        functionality (for example but without limitation, you may not use the foregoing marks to
        execute phishing attacks, spearphishing attacks, social engineering, or in any way that may
        cause a party to transmit digital assets to an unintended recipient or to reveal private
        information, like a private key or password). All other names, logos, product and service
        names, designs, and slogans on the Website and Website are the trademarks of their
        respective owners.
      </Paragraph>
      <Header>Reliance on Information Posted.</Header>
      <Paragraph>
        The content and information presented on or through the Website (including, without
        limitation, on the Interface) is made available solely for general information and education
        purposes. We do not warrant the accuracy, completeness, or usefulness of this information.
        Any information posted to the Website or through the Services should not be construed as an
        intention to form a contract, and in no case should any information be construed as the
        Company’s offer to buy, sell, or exchange digital assets. Any reliance the User places on
        such information is strictly at the User’s own risk, and as is common in the blockchain
        space, the User is assuming a high amount of risk related to others or technical harms when
        operating via the Website, the Interface, and the Services. We disclaim all liability and
        responsibility arising from any reliance placed on materials displayed on the Website such
        as, but not limited to: Total Value Locked (“TVL”) information about the Protocol, its
        liquidity pools and about any other element where this information is used; liquidity pools
        Annual Percentage Yield (“APY”); liquidity pools Annual Percentage Revenue (“APR”); any
        price conversion information between assets.
      </Paragraph>
      <Paragraph>
        This Website or the Services may include content provided by third parties, including
        (without limitation) materials provided by other decentralized applications, aggregators,
        and/or reporting services. All statements, alleged facts, and/or opinions expressed in these
        materials, and all articles and responses to questions and other content, other than the
        content provided by the Company, are solely the opinions and the responsibility of the
        person or entity providing those materials. These materials do not necessarily reflect the
        opinion of the Company or even the factual status of reality. We are not responsible, or
        liable to the User or any third party, for the content or accuracy of any materials provided
        by any third parties, and User agrees that it bears sole and absolute responsibility to
        evaluate and select any third-party functionality with which it interacts via the Services.
      </Paragraph>
      <Header>Changes to the Website.</Header>
      <Paragraph>
        We may update the content on, design of, or functionalities available through this Website
        or through the Services from time to time, but the Website and the Services are not
        necessarily complete or up-to-date. Any of the material on the Website or provided through
        the Services may be out of date at any given time, and we are under no obligation to update
        such material.
      </Paragraph>
      <Header>Information About the User.</Header>
      <Paragraph>
        All information we collect on this Website is subject to our{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        . By using the Website, the User consents to all actions taken by us with respect to the
        User’s information in compliance with the{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        .
      </Paragraph>
      <Header>WARRANTY DISCLAIMER.</Header>
      <Paragraph>
        The Company is a developer of open-source software and does not unilaterally offer, operate,
        or administer the Protocol or a blockchain network. The Services merely attempt to assist
        Participants in more easily participating in the Protocol, DeFi services, or blockchain
        networks generally. Nonetheless, the Company has no oversight on or control over any
        particular digital asset, blockchain network, or the Protocol.
      </Paragraph>
      <Paragraph>
        Through the Interface, Users deposit their digital assets into other blockchain-based DeFi
        protocols, as described in each pool strategy available on the Website, to earn yield (e.g.,
        Curve, Convex, yearn.finance, Aave, Compound etc.) (“Yield Farms”). The Company has no
        ability to control, modify, prevent, stop, amend, or adjust interactions or transactions
        after the User elects to route digital assets to Yield Farms, nor does the Company have any
        ability to ensure the security of any Yield Farms which Users may decide to use. Yield Farms
        are composed of sophisticated blockchain software which require a thorough understanding of
        blockchain technology, digital assets, cybersecurity, and other related technologies. You
        are expected to be familiar with Yield Farms and the risks they represent (including without
        limitation the possibility of your digital assets being forfeited according to the
        Protocol’s rules or being lost for any other reason) before accessing it (whether accessed
        via the Interface or otherwise).
      </Paragraph>
      <Paragraph>
        The User is responsible for its use of the Services, the functionalities they enable,
        transactions engaged through the Website or the Interface, and the use of the information
        derived thereof. The User is solely responsible for complying with all Applicable Laws
        related to its transactions and activities that directly or indirectly incorporate our
        provision of the Services, including, but not limited to, the Commodity Exchange Act and its
        regulations as overseen by the U.S. Commodity Futures Trading Commission (“CFTC”), and the
        federal securities laws and its regulations overseen by the U.S. Securities and Exchange
        Commission (“SEC”). The User acknowledges its understanding that the Company is not
        registered nor licensed with, nor have our Website, Interface, or Services (or the software
        contained therein) been reviewed or evaluated by, the CFTC, SEC, or any other financial or
        banking regulator of any jurisdiction.
      </Paragraph>
      <Paragraph>
        The User understands that we cannot and do not guarantee or warrant that files available for
        download from the internet or the Website or through the Services will be free of viruses or
        other destructive code. The User is responsible for implementing sufficient procedures and
        checkpoints to satisfy the User’s particular requirements for: (1) an appropriate Web3
        Utility; (2) anti-virus protection and accuracy of data input and output; (3) its
        participation in and use of DeFi products, the protocol, and any of the Services’ underlying
        blockchain and related technologies; and (4) maintaining a means external to our site to
        reconstruct of any lost data.
      </Paragraph>
      <Paragraph>
        TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED
        BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, MAN-IN-THE-MIDDLE ATTACK, VIRUSES, OR OTHER
        TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT THE USER’S COMPUTER EQUIPMENT, COMPUTER
        PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO THE USER’S USE OF THE WEBSITE OR ANY
        SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO THE USER’S DOWNLOADING OF ANY MATERIAL
        POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
      </Paragraph>
      <Paragraph>
        THE USER’S USE OF THE WEBSITE AND THE INTERFACE, THE PROTOCOL, ANY YIELD FARM, AND ANY OF
        THE SERVICES (AND ANY OF THEIR CONTENT) IS AT THE USER’S SOLE RISK. THE WEBSITE, THE
        INTERFACE, AND THE SERVICES ARE PROVIDED ON AN “AS IS’’ AND “AS AVAILABLE” BASIS. TO THE
        FULLEST EXTENT LEGALLY PERMISSIBLE, NEITHER WE, NOR ANY PERSON ASSOCIATED WITH THE COMPANY,
        MAKE, AND WE EXPLICITLY DISCLAIM, ANY AND ALL REPRESENTATIONS OR WARRANTIES OF ANY KIND
        RELATED TO THE WEBSITE, THE INTERFACE, AND THE SERVICES, WHETHER EXPRESS, IMPLIED, OR
        STATUTORY, INCLUDING (WITHOUT LIMITATION) THE WARRANTIES OF MERCHANTABILITY,
        NON-INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE. NEITHER THE COMPANY NOR ANY PERSON
        ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
        COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE, THE
        INTERFACE, OR THE SERVICES. THE COMPANY AND ANY PERSON ASSOCIATED WITH THE COMPANY DO NOT
        REPRESENT OR WARRANT THAT: (1) ACCESS TO THE WEBSITE, THE INTERFACE, OR THE SERVICES WILL BE
        CONTINUOUS, UNINTERRUPTED, TIMELY, WITHOUT DELAY, ERROR-FREE, SECURE, OR FREE FROM DEFECTS;
        (2) THAT THE INFORMATION CONTAINED OR PRESENTED ON THE WEBSITE OR VIA THE SERVICES IS
        ACCURATE, RELIABLE, COMPLETE, CONCISE, CURRENT, OR RELEVANT; (3) THAT THE WEBSITE, THE
        INTERFACE, THE SERVICES, OR ANY SOFTWARE CONTAINED THEREIN WILL BE FREE FROM DEFECTS,
        MALICIOUS SOFTWARE, ERRORS, OR ANY OTHER HARMFUL ELEMENTS, OR THAT ANY OF SUCH WILL BE
        CORRECTED; OR (4) THAT THE WEBSITE, THE INTERFACE, OR THE SERVICES WILL MEET THE USER’S
        EXPECTATIONS. NO INFORMATION OR STATEMENT THAT WE MAKE, INCLUDING DOCUMENTATION OR OUR
        PRIVATE COMMUNICATIONS, SHOULD BE TREATED AS OFFERING ANY WARRANTY CONCERNING THE WEBSITE,
        THE INTERFACE, OR THE SERVICES. WE DO NOT ENDORSE, GUARANTEE, OR ASSUME ANY LIABILITY OR
        RESPONSIBILITY FOR ANY CONTENT, ADVERTISEMENTS, OFFERS, STATEMENTS, OR ACTIONS BY ANY THIRD
        PARTY EITHER REGARDING THE WEBSITE OR THE SERVICES.
      </Paragraph>
      <Paragraph>
        THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER
        APPLICABLE LAW.
      </Paragraph>
      <Header>LIMITATION OF LIABILITY.</Header>
      <Paragraph>
        TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR
        THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR
        DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH THE USER’S
        USE, OR INABILITY TO USE, THE WEBSITE, THE INTERFACE, THE SERVICES, THE PROTOCOL, ANY YIELD
        FARM, ANY WEBSITES LINKED THROUGH OUR SERVICES, ANY CONTENT ON THE WEBSITE OR SUCH OTHER
        WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE
        DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL
        DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF
        USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE),
        BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE. THIS DISCLAIMER OF LIABILITY EXTENDS
        TO ANY AND ALL DAMAGES CAUSED BY ANY THIRD PARTY (INCLUDING, WITHOUT LIMITATION, THOSE
        CAUSED BY FRAUD, DECEIT, OR MANIPULATION), WHETHER OR NOT A PARTICIPANT, OR ANY FAILURE,
        EXPLOIT, OR VULNERABILITY OF THE WEBSITE, SERVICES, THE PROTOCOL, THE USER’S WEB3 UTILITIES,
        OR THE UNDERLYING BLOCKCHAINS OR RELATED BLOCKCHAIN FUNCTIONALITIES. TO THE FULLEST EXTENT
        PROVIDED BY LAW, IN NO EVENT WILL THE COLLECTIVE LIABILITY OF THE COMPANY AND ITS
        SUBSIDIARIES AND AFFILIATES, AND THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS,
        OFFICERS, AND DIRECTORS, TO ANY PARTY (REGARDLESS OF THE FORM OF ACTION, WHETHER IN
        CONTRACT, TORT, OR OTHERWISE) EXCEED THE GREATER OF $100 OR THE AMOUNT YOU HAVE PAID
        DIRECTLY TO THE COMPANY FOR THE APPLICABLE CONTENT OR SERVICES IN THE LAST SIX MONTHS OUT OF
        WHICH LIABILITY AROSE.
      </Paragraph>
      <Paragraph>
        THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER
        APPLICABLE LAW.
      </Paragraph>
      <Header>Nature of Blockchain; Assumption of Risk; Waiver of Claims.</Header>
      <Paragraph>
        Blockchains, DEXs, DeFi, digital assets, the Protocol, Yield Farms, and their related
        technologies and functionalities are still emerging innovations that carry a relatively high
        amount of foreseeable and unforeseeable risk from security, financial, technical, political,
        social, and personal safety standpoints. The mere access to and interaction with blockchains
        requires high degrees of skill and knowledge to operate with a relative degree of safety and
        proficiency. Digital assets are highly volatile in nature due to many diverse factors,
        including without limitation use and adoption, speculation, manipulation, technology,
        security, and legal and regulatory developments and application. Further, the speed and cost
        of transacting with cryptographic technologies, such as blockchains like those underlying
        the Protocol, are variable and highly volatile. Moreover, the transparent nature of many
        blockchains means that any interactions the User has with the Protocol and any blockchain
        may be publicly visible and readable in human form.
      </Paragraph>
      <Paragraph>
        You understand that anyone can create a digital asset, including fake versions of existing
        digital assets and digital assets that falsely claim to represent projects, and acknowledge
        and accept the risk that you may mistakenly trade those or other digital assets. So-called
        “stablecoins” may not be as stable as they purport to be, may not be fully or adequately
        collateralized, and may be subject to panics and runs. Further, you understand that smart
        contract transactions automatically execute and settle, and that blockchain-based
        transactions are irreversible when confirmed. You acknowledge and accept that the cost and
        speed of transacting with cryptographic and blockchain-based systems such as the Ethereum
        blockchain are variable and may increase or decrease dramatically in cost and/or latency at
        any time. If you act as a liquidity provider to the Protocol through the Interface, you
        understand that your digital assets may lose some or all of their value while they are
        supplied to the Protocol through the Interface due to the integration with third party
        protocols that are not controlled, endorsed or audited by Reactive Labs. Moreover, you
        understand that the Protocol is open-source, meaning that someone may “fork” the Protocol’s
        code repository and run their own version of the Protocol. The Company has no ability to
        control any forked version of the Protocol and is in no circumstance liable for any loss of
        digital assets or any other cause of injury and damage arising out of the use of a forked
        version of the Protocol.
      </Paragraph>
      <Paragraph>
        By accessing and using the Website or the Services, the User acknowledges the foregoing, and
        agrees and represents that it understands and assumes such and other risks involved with
        blockchains, DeFi, the Protocol, Yield Farms, and related technologies (including without
        limitation any specific technical language used in this Agreement). The User further
        represents that it has all knowledge sufficient to use the Protocol as intended, and is
        informed of all foreseeable risks and the possibility of unforeseeable risks associated with
        blockchains, digital assets, Web3 Utilities, smart contracts, the Interface, the Protocol,
        and the Services.
      </Paragraph>
      <Paragraph>
        The User further acknowledges, and assumes all risk related to the possibility, that any
        information presented via the Website, Interface, or Services may be inaccurate, possibly
        due to another party’s malicious activities and possibly to the User’s severe harm or
        detriment. The User agrees that we are not responsible for any of these or related risks, do
        not own or control any blockchain or DEX or the Protocol itself, cannot guarantee the safe
        or accurate functioning of the Services, and shall not be held liable for any resulting
        harms, damages, or losses incurred by or against the User experiences while accessing or
        using the Website or the Services. Accordingly, the User acknowledges the foregoing,
        represents its understanding of the foregoing, and agrees to assume full responsibility for
        all of the risks of accessing and using the Website and interacting with the Services,
        whether mentioned in this Section or otherwise. The User further expressly waives and
        releases us from any and all liability, claims, causes of action, or damages arising from or
        in any way relating to the User’s use of the Website and the User’s interaction with the
        Services.
      </Paragraph>
      <Header>No Professional Advice.</Header>
      <Paragraph>
        All information or content provided or displayed by the Website (including, without
        limitation, information related to digital assets and their market prices on the Interface)
        is for informational purposes only and should not be construed as professional advice
        (including, without limitation, tax, legal, or financial advice). The User should not take
        or refrain from taking any action based on any information or content displayed or provided
        on the Website, on the Interface, or through the Services. The User should seek independent
        professional advice from an individual licensed and competent in the appropriate area before
        the User makes any financial, legal, or other decisions where such should be considered
        prudent. The User acknowledges and agrees that, to the fullest extent permissible by law, it
        has not relied on the Company, the content on the Website, the Interface, or the Services
        for any professional advice related to its financial or legal behaviors.
      </Paragraph>
      <Paragraph>
        Additionally, it is your sole responsibility to determine whether, and to what extent, any
        taxes apply to any transactions you conduct through the Website, the Interface, the Wallet
        and/or the Services, and to withhold, collect, report, and remit the correct amounts of
        taxes to the appropriate tax authorities.
      </Paragraph>
      <Header>No Fiduciary Duties.</Header>
      <Paragraph>
        These Terms of Service, and the provision of the Website and the Services, are not intended
        to create any fiduciary duties between us and the User or any third party. The Company never
        takes possession, custody, control, ownership, or management of any digital assets or other
        property transmitted via the Interface. To the fullest extent permissible by law, the User
        agrees that neither the User’s use of the Website or the Services causes us or any
        Participant to owe fiduciary duties or liabilities to the User or any third party. Further,
        the User acknowledges and agrees to the fullest extent such duties or liabilities are
        afforded by law or by equity, those duties and liabilities are hereby irrevocably
        disclaimed, waived, and eliminated, and that we and any other Participant shall be held
        completely harmless in relation thereof. The User further agrees that the only duties and
        obligations that we or any Participant owes the User, and the only rights the User has
        related to this Agreement or the User’s use of the Website or the Services, are those set
        out expressly in this Agreement or that cannot be waived by law.
      </Paragraph>
      <Header>No Insurance.</Header>
      <Paragraph>
        Your crypto accounts are not checking or savings accounts. We do not provide any kind of
        insurance to you against any type of loss, including (without limitation) losses due to
        decrease in value of assets, assets lost due to a cybersecurity failure, or from your or
        other individuals’ errors or malfeasance. In most jurisdictions digital assets are not
        considered legal tender, and most digital assets are not backed by any government. Neither
        your digital asset balances nor any of your transactions via the Interface or Protocol are
        covered by Federal Deposit Insurance Corporation (“FDIC”), Securities Investor Protection
        Corporation (“SIPC”), or other similar protections.
      </Paragraph>
      <Header>Indemnification.</Header>
      <Paragraph>
        The User agrees to defend, indemnify, and hold harmless the Company, its affiliates,
        licensors, and service providers, and its and their respective officers, directors,
        employees, contractors, agents, licensors, suppliers, successors, and assigns from and
        against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
        fees (including reasonable attorneys’ fees) arising out of or relating to: (1) the User’s
        violation of these Terms of Service; (2) the User’s use of the Website, the Services, or the
        Protocol, including, but not limited to, the User’s interactions with the Interface or other
        features which incorporate the Services, use of or reliance on the Website’s content,
        services, and products other than as expressly authorized in these Terms of Service; (3) the
        User’s use or reliance on of any information obtained from the Website; or (4) any other
        party’s access and use of the Website or Services with the User’s assistance or by using any
        device or account that the User owns or controls.
      </Paragraph>
      <Header>Governing Law & Jurisdiction.</Header>
      <Paragraph>
        All matters relating to the Website and these Terms of Service, and any dispute or claim
        arising therefrom or related thereto (in each case, including non-contractual disputes or
        claims), shall be governed by and construed in accordance with the laws of the state of New
        York without giving effect to any choice or conflict of law provision or rule (whether of
        the state of New York or any other jurisdiction).
      </Paragraph>
      <Header>Arbitration; Class Arbitration Waiver.</Header>
      <Paragraph>
        Any dispute, controversy or claim arising out of, relating to, or in connection with the
        User’s use of the Website or the Services, or in connection with this Agreement, including
        disputes arising from or concerning their interpretation, violation, invalidity,
        non-performance, or termination, shall be finally resolved by binding arbitration by the
        American Arbitration Association under its Rules of Arbitration. The tribunal shall have the
        power to rule on any challenge to its own jurisdiction or to the validity or enforceability
        of any portion of the agreement to arbitrate. The parties agree to arbitrate solely on an
        individual basis, and that these Terms of Service do not permit class arbitration or any
        claims brought as a plaintiff or class member in any class or representative arbitration
        proceeding. The arbitral tribunal may not consolidate more than one person’s claims and may
        not otherwise preside over any form of a representative or class proceeding. In the event
        the prohibition on class arbitration is deemed invalid or unenforceable, then its remaining
        portions will remain in force.
      </Paragraph>
      <Header>Limitation on Time to File Claims.</Header>
      <Paragraph>
        ANY CAUSE OF ACTION OR CLAIM THE USER MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF
        USE OR ITS USE OF THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF
        ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
      </Paragraph>
      <Header>Waiver & Severability.</Header>
      <Paragraph>
        No waiver by the Company of any term or condition set out in these Terms of Service shall be
        deemed a further or continuing waiver of such term or condition or a waiver of any other
        term or condition, and any failure of the Company to assert a right or provision under these
        Terms of Service shall not constitute a waiver of such right or provision.
      </Paragraph>
      <Paragraph>
        If any provision of these Terms of Service is held by a court or other tribunal of competent
        jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall
        be eliminated or limited to the minimum extent such that the remaining provisions of these
        Terms of Service will continue in full force and effect.
      </Paragraph>
      <Header>Entire Agreement.</Header>
      <Paragraph>
        These Terms of Service, the{" "}
        <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </Link>
        , and any other document incorporated by reference herein constitute the sole and entire
        agreement between the User and the Company regarding the Website and supersede all prior and
        contemporaneous understandings, agreements, representations, and warranties, both written
        and oral, regarding the Website.
      </Paragraph>
      <Header>Comments and Concerns.</Header>
      <Paragraph>
        All other feedback, comments, requests for technical support, and other communications
        relating to the Website should be directed to{" "}
        <Link href="mailto:legal@mero.finance" target="_blank" rel="noopener noreferrer">
          legal@mero.finance
        </Link>
        .
      </Paragraph>
    </StyledTermsOfServicePage>
  );
};

export default TermsOfServicePage;
