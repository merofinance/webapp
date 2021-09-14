import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import exit from "../assets/ui/snackbar-exit.svg";

const StyledSnackbar = styled.div`
  width: 100%;
  padding: 0.7rem 1.6rem;
  border-radius: 1.4rem;
  background-color: rgba(3, 184, 255, 0.2);
  border: 2px solid var(--info);
  display: flex;
  justify-content: space-between;

  margin-bottom: 5rem;
  @media (max-width: 600px) {
    margin-bottom: 2.5rem;
  }
`;

const Text = styled.div`
  color: var(--info);
  font-weight: 500;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  line-height: 2.8rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }
`;

const Link = styled.a`
  color: var(--info);
  font-weight: 500;
  letter-spacing: 0.15px;
  text-decoration: underline;
  margin-left: 0.4rem;

  font-size: 1.6rem;
  line-height: 2.8rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }
`;

const ExitButton = styled.button`
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.6rem 0;
  height: 2rem;

  @media (max-width: 600px) {
  }
`;

const ExitIcon = styled.img`
  width: 1.4rem;
`;

interface LinkProps {
  label: string;
  link: string;
}

interface Props {
  show: boolean;
  close: () => void;
  text: string;
  link?: LinkProps;
}

const Snackbar = ({ show, close, text, link }: Props) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <StyledSnackbar>
      <Text>
        {t(text)}
        {link && (
          <Link href={link.link} target="_blank" rel="noopener noreferrer">
            {t(link.label)}
          </Link>
        )}
      </Text>
      <ExitButton onClick={close}>
        <ExitIcon src={exit} />
      </ExitButton>
    </StyledSnackbar>
  );
};

export default Snackbar;
