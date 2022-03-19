import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import chevron from "../../assets/ui/chevron.svg";
import { CareerType } from "./careers";

const StyledCareer = styled.button`
  width: 100%;
  position: relative;
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--row-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 1.7rem;
  cursor: pointer;
  margin: 0.6rem 0;

  transition: background-color 0.3s;
  :hover {
    background-color: #1a1438;
  }

  @media (max-width: 600px) {
    height: 4.8rem;
    padding: 0 1.6rem;

    div:nth-child(2) {
      display: none;
    }
    div:nth-child(4) {
      display: none;
    }
  }
`;

interface DataProps {
  right?: boolean;
  preview?: boolean;
  hideOnSnapshot?: boolean;
}

const Data = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  letter-spacing: 0.15px;
  justify-content: ${(props: DataProps) => (props.right ? "flex-end" : "flex-start")};
  display: ${(props: DataProps) => (!props.preview && props.right ? "none" : "flex")};
  white-space: nowrap;

  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
  @media (max-width: 600px) {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
    display: ${(props: DataProps) => (props.right ? "none" : "flex")};
  }

  @media only percy {
    opacity: ${(props: DataProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

const ChevronData = styled.div`
  width: 2.4rem;

  @media (max-width: 600px) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

interface Props {
  career: CareerType;
}

const Career = ({ career }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <StyledCareer onClick={() => navigate(`/career/${career.id}`)}>
      <Data>{career.title}</Data>
      <Data>{career.department}</Data>
      <Data>{career.type}</Data>
      <Data>{career.location}</Data>
      <ChevronData>
        <Chevron src={chevron} alt="right arrow" />
      </ChevronData>
      <Data right />
    </StyledCareer>
  );
};

export default Career;
