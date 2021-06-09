import React from "react";
import styled from "styled-components";

const StyledAuditedBy = styled.div`
  width: 100%;
  margin: var(--section-margin);
`;

const AuditedBy = () => {
  return <StyledAuditedBy>audited by</StyledAuditedBy>;
};

export default AuditedBy;
