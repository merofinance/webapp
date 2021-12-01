import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import back from "../assets/ui/back.svg";

const StyledBackButton = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 1.9rem;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(-100% - 1.9rem));

  opacity: 1;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    position: relative;
    margin-bottom: 1.9rem;
    transform: none;
  }
`;

const Arrow = styled.img`
  width: 1.6rem;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 2.8rem;
  color: var(--primary);
  margin-left: 0.9rem;
`;

const BackButton = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <StyledBackButton id="back-button" onClick={() => navigate(-1)}>
      <Arrow src={back} />
      <Text>{t("components.back")}</Text>
    </StyledBackButton>
  );
};

export default BackButton;
