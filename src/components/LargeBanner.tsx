import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import bg from "../assets/illustrations/large-banner-bg.svg";
import { GradientLink } from "../styles/GradientText";
import { useDevice } from "../app/hooks/use-device";

const Glow = styled.div`
  width: 100%;
  border-radius: 1.8rem;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.2), rgba(50, 178, 229, 0.2));
  margin-bottom: 2.4rem;

  padding: 1rem;
  @media (max-width: 940px) {
    padding: 0.8rem;
  }
  @media (max-width: 600px) {
    padding: 0.7rem;
  }
`;

const Container = styled.div`
  position: relative;
  border-radius: 1.4rem;
  box-shadow: 0px 0px 12px 0px #1712160d;
  overflow: hidden;

  border: 1px solid transparent;
  background: linear-gradient(to right, #58197b, #1b5073),
    linear-gradient(to right, var(--primary-gradient), var(--secondary-gradient));
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const Background = styled.img`
  height: 112%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -6%);
`;

const Content = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  padding: 2.9rem;
  @media (max-width: 940px) {
    padding: 2.3rem;
  }
  @media (max-width: 600px) {
    padding: 1.6rem;
  }
`;

const Header = styled.h3`
  font-weight: 700;

  font-size: 3.6rem;
  margin-bottom: 2.2rem;
  @media (max-width: 940px) {
    font-size: 3rem;
    margin-bottom: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 1.4rem;
  }
`;

const DetailsContainer = styled.div`
  display: flex;

  margin-bottom: 2.7rem;
  @media (max-width: 940px) {
    margin-bottom: 2.3rem;
  }
  @media (max-width: 868px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }
`;

const Details = styled.p`
  font-weight: 500;
  text-align: center;

  font-size: 2rem;
  @media (max-width: 940px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const Link = styled(GradientLink)`
  font-weight: 500;
  margin-left: 0.4rem;

  font-size: 2rem;
  @media (max-width: 940px) {
    font-size: 1.8rem;
  }
  @media (max-width: 868px) {
    margin-top: 0.5rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-top: 0.3rem;
  }
`;

const Button = styled.button`
  background: white;
  cursor: pointer;

  width: 28.8rem;
  padding: 1.8rem 0;
  border-radius: 1.4rem;
  @media (max-width: 940px) {
    width: 22.8rem;
    padding: 1.4rem 0;
  }
  @media (max-width: 600px) {
    width: 18rem;
    padding: 1.3rem 0;
    border-radius: 1.2rem;
  }

  :hover {
    span {
      background-position: right center;
    }
  }
`;

const ButtonText = styled.span`
  font-weight: 600;

  font-size: 1.5rem;
  @media (max-width: 940px) {
    font-size: 1.3rem;
  }

  background: linear-gradient(
    to right,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.5s;
  background-size: 200% auto;
`;

interface Props {
  header: string;
  details: string;
  link: string;
  ctaText: string;
  ctaAction: () => void;
}

const LargeBanner = ({ header, details, link, ctaText, ctaAction }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  return (
    <Glow>
      <Container>
        <Background src={bg} alt="Background" />
        <Content>
          <Header>{header}</Header>
          <DetailsContainer>
            <Details>{details}</Details>
            <Link href={link} target="_blank" rel="noopener noreferrer">
              {t("components.moreInBlog")}
              <LaunchIcon
                fontSize={isMobile ? "small" : "medium"}
                style={{
                  fill: "var(--secondary)",
                  transform: "translateY(2px)",
                  marginLeft: "3px",
                }}
              />
            </Link>
          </DetailsContainer>
          <Button onClick={() => ctaAction()}>
            <ButtonText>{ctaText}</ButtonText>
          </Button>
        </Content>
      </Container>
    </Glow>
  );
};

export default LargeBanner;
