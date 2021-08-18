import React from "react";
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
`;

const Text = styled.div`
  color: var(--info);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
`;

const Link = styled.a`
  color: var(--info);
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  text-decoration: underline;
`;

const ExitButton = styled.button``;

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
  if (!show) return null;
  return (
    <StyledSnackbar>
      <Text>
        {text}
        {link && (
          <Link href={link.link} target="_blank" rel="noopener noreferrer">
            {link.label}
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
