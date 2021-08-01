import styled from "styled-components";

const GradientText = styled.span`
  background: var(--gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  > svg {
    margin-left: 0.3rem;

    transform: translateY(1px);
    @media (max-width: 600px) {
      transform: translateY(2px);
    }
  }
`;

export default GradientText;
