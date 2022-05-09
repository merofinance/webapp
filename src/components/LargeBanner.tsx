import { useTranslation } from "react-i18next";
import styled from "styled-components";
import LaunchIcon from "@material-ui/icons/Launch";

import bg from "../assets/illustrations/large-banner-bg.svg";
import { GradientLink } from "../styles/GradientText";

const Glow = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1.8rem;
  background: linear-gradient(to right, rgba(197, 50, 249, 0.2), rgba(50, 178, 229, 0.2));
  margin-bottom: 2.4rem;
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
  padding: 2.9rem;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h3`
  font-size: 3.6rem;
  font-weight: 700;
  margin-bottom: 2.2rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  margin-bottom: 2.7rem;
`;

const Details = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const Link = styled(GradientLink)`
  font-size: 2rem;
  font-weight: 500;
  margin-left: 0.4rem;
`;

const Button = styled.button`
  width: 28.8rem;
  padding: 1.8rem 0;
  border-radius: 1.4rem;
  background: white;
  cursor: pointer;

  :hover {
    span {
      background-position: right center;
    }
  }
`;

const ButtonText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;

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
                fontSize="medium"
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
