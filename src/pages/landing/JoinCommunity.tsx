import React from "react";
import styled from "styled-components";
import GradientText from "../../styles/GradientText";
import { Header3 } from "../../styles/Headers";
import telegram from "../../assets/socials/telegram.svg";
import twitter from "../../assets/socials/twitter.svg";
import github from "../../assets/socials/github.svg";

type SocialType = {
  label: string;
  icon: string;
};

const socials: SocialType[] = [
  {
    label: "Telegram →",
    icon: telegram,
  },
  {
    label: "Twitter →",
    icon: twitter,
  },
  {
    label: "GitHub →",
    icon: github,
  },
];

const StyledJoinCommunity = styled.div`
  width: 100%;
  margin: var(--section-margin);
`;

const Socials = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Social = styled.div`
  flex: 1;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.4rem;
  background-color: #141128;
  display: flex;
  align-items: bottom;
  justify-content: space-between;
`;

const Link = styled(GradientText)`
  flex: 1;
  font-weight: 700;
  font-size: 1.8rem;
`;

const IconContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main);
  border-radius: 1.4rem;
`;

const Icon = styled.img`
  width: 3.6rem;
`;

const JoinCommunity = () => {
  return (
    <StyledJoinCommunity>
      <Header3>join the community</Header3>
      <Socials>
        {socials.map((social: SocialType) => (
          <Social>
            <Link>{social.label}</Link>
            <IconContainer>
              <Icon src={social.icon} />
            </IconContainer>
          </Social>
        ))}
      </Socials>
    </StyledJoinCommunity>
  );
};

export default JoinCommunity;
