import styled from "styled-components";

export const GradientText = styled.span`
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GradientLink = styled.a`
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;
