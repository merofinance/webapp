import styled from "styled-components";

type Props = {
  hero?: boolean;
  large?: boolean;
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    270deg,
    var(--primary-gradient) 0%,
    var(--secondary-gradient) 50%,
    var(--primary-gradient) 100%
  );
  text-transform: capitalize;
  cursor: pointer;
  transition: 0.5s;
  background-size: 200% auto;

  letter-spacing: ${(props: Props) => (props.large ? "0" : "0.46px")};
  line-height: ${(props: Props) => (props.large ? "2.8rem" : "2.6rem")};
  font-size: ${(props: Props) => (props.large ? "2.1rem" : "1.5rem")};
  font-weight: ${(props: Props) => (props.large ? "700" : "500")};
  height: ${(props: Props) => (props.large ? "6.2rem" : "3.8rem")};
  border-radius: ${(props: Props) => (props.large ? "3.1rem" : "1.9rem")};
  padding: 0 ${(props: Props) => (props.large ? "5rem" : "2.6rem")};
  margin-top: ${(props: Props) => (props.hero ? "8rem" : "0")};

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
