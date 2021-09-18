import styled from "styled-components";

export const Header1 = styled.h1`
  text-transform: capitalize;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;

  font-size: 7.2rem;
  line-height: 8.64rem;
  margin-bottom: 3rem;
  @media (max-width: 600px) {
    font-size: 3.4rem;
    line-height: 3.84rem;
    margin-bottom: 1.5rem;
  }
`;

export const Header2 = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
  color: var(--sub);

  font-size: 2.2rem;
  line-height: 3rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;

export const Header3 = styled.h3`
  font-weight: 400;
  text-align: center;
  max-width: 84rem;
  letter-spacing: 0.25px;

  font-size: 2.8rem;
  line-height: 4.2rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
`;

export const Header4 = styled.h4`
  font-weight: 700;
  text-align: center;

  font-size: 4.2rem;
  line-height: 4.9rem;
  margin-bottom: 5rem;
  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 2.6rem;
    margin-bottom: 3.3rem;
  }
`;

export const Header5 = styled.h5`
  font-weight: 700;
  text-align: center;

  font-size: 2.6rem;
  line-height: 3.4rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
    line-height: 2.1rem;
    margin-bottom: 0.6rem;
  }
`;

export const Header6 = styled.h6`
  font-weight: 500;
  text-align: center;
  color: var(--sub);

  font-size: 2rem;
  line-height: 2.8rem;
  max-width: 54rem;
  margin-bottom: 1.5rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    max-width: 25rem;
    margin-bottom: 0;
  }
`;

export const Paragraph = styled.p`
  font-weight: 400;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;

  font-size: 1.6rem;
  line-height: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;
