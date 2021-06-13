import styled from "styled-components";

type Props = {
  hero?: boolean;
};

const Button = styled.button`
  height: 6.2rem;
  border-radius: 3.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5rem;
  background-image: linear-gradient(
    270deg,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  font-size: 2.1rem;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: ${(props: Props) => (props.hero ? "8rem" : "0")};
  cursor: pointer;
  transition: 0.5s;
  background-size: 200% auto;

  :hover {
    background-position: right center;
  }

  @media (max-width: 600px) {
    height: 4.8rem;
    border-radius: 2.4rem;
    font-size: 1.4rem;
    padding: 0 5.2rem;
    margin-top: ${(props: Props) => (props.hero ? "4.5rem" : "0")};
  }
`;

export default Button;
