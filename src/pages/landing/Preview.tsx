import React from "react";
import styled from "styled-components";

const StyledPreview = styled.div`
  width: 100%;
  margin: var(--section-margin);

  @media (max-width: 600px) {
    margin: var(--mobile-section-margin);
  }
`;

const Preview = () => {
  return <StyledPreview>preview</StyledPreview>;
};

export default Preview;
