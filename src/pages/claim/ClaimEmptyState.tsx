import styled from "styled-components";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { GradientLink } from "../../styles/GradientText";
import { DOCS_KEEPERS_LINK } from "../../lib/links";

const EmptyState = styled.div`
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  margin: auto;

  @media (max-width: 600px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const EmptyStateButton = styled.button`
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const EmptyStateLink = styled(GradientLink)`
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const ClaimEmptyState = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <EmptyState>
      <Trans i18nKey="claim.empty">
        <EmptyStateButton type="button" onClick={() => navigate("/pools")}>
          pool
        </EmptyStateButton>
        <EmptyStateLink href={DOCS_KEEPERS_LINK} target="_blank" rel="noopener noreferrer">
          keeper
        </EmptyStateLink>
      </Trans>
    </EmptyState>
  );
};

export default ClaimEmptyState;
