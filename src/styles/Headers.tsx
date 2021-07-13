import styled from "styled-components";

export const Header1 = styled.h1`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 7.2rem;
  line-height: 8.64rem;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: -0.5px;

  @media (max-width: 600px) {
    line-height: 3.84rem;
    font-size: 3.4rem;
    margin-bottom: 1.5rem;
  }
`;

export const Header2 = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 2.2rem;
  line-height: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 2px;
  color: var(--sub);

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

export const Header3 = styled.h3`
  font-weight: 400;
  font-size: 2.8rem;
  line-height: 4.2rem;
  text-align: center;
  max-width: 84rem;
  letter-spacing: 0.25px;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    line-height: 1.9rem;
  }
`;

export const Header4 = styled.h4`
  font-weight: 700;
  font-size: 2.6rem;
  line-height: 3.4rem;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    font-size: 1.6rem;
    line-height: 2.1rem;
    margin-bottom: 0.6rem;
  }
`;

export const Header5 = styled.h5`
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.8rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--sub);
  max-width: 42rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
    max-width: 25rem;
    margin-bottom: 0;
  }
`;

export const Paragraph = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
`;
