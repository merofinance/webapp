import styled from "styled-components";

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
  margin-top: 8rem;
  cursor: pointer;
  transition: 0.5s;
  background-size: 200% auto;

  :hover {
    background-position: right center;
    transform: scale(1.01);
  }

  :active {
    transform: scale(0.99);
  }
`;

export default Button;
