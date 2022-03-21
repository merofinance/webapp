import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigateToTop } from "../../app/hooks/use-navigate-to-top";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import { Optional } from "../../lib/types";
import { Header1, Header5, Paragraph as DefaultParagraph } from "../../styles/Headers";
import { careers, XOfType } from "./careers";

const StyledCareerPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 770px;

  button {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

const Header = styled(Header5)`
  width: 100%;
  text-align: left;
  margin-top: 5rem;

  @media (max-width: 600px) {
    margin-top: 2rem;
  }
`;

const Paragraph = styled(DefaultParagraph)`
  width: 100%;
  text-align: left;
`;

const List = styled.ul`
  padding-left: 3rem;
  font-size: 20rem;
  list-style-type: none;
  width: 100%;
`;

const Item = styled.li`
  position: relative;
  width: 100%;
  text-align: left;

  :before {
    content: "";
    position: absolute;
    top: 0.8rem;
    left: -2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    background-color: var(--main);
  }
`;

const CareerPage = (): Optional<JSX.Element> => {
  const { careerId } = useParams<"careerId">();
  const navigate = useNavigateToTop();

  const [applying, setApplying] = useState(false);

  const career = careers.find((c) => c.id === careerId);
  if (!career) {
    navigate("/404");
    return null;
  }

  return (
    <StyledCareerPage>
      <Header1>{career.title}</Header1>
      <Header>Main responsibilities</Header>
      <List>
        {career.responsibilities.map((r) => (
          <Item>
            <Paragraph>{r}</Paragraph>
          </Item>
        ))}
      </List>
      <Header>Requirements</Header>
      <List>
        {career.requirements.map((r) => (
          <Item>
            <Paragraph>{r}</Paragraph>
          </Item>
        ))}
      </List>
      {career.xOf &&
        career.xOf.map((xOf: XOfType) => (
          <>
            <Paragraph>{`At least ${xOf.x} of:`}</Paragraph>
            <List>
              {xOf.requirements.map((r) => (
                <Item>
                  <Paragraph>{r}</Paragraph>
                </Item>
              ))}
            </List>
          </>
        ))}
      <Header>Nice to have</Header>
      <List>
        {career.niceToHaves.map((r) => (
          <Item>
            <Paragraph>{r}</Paragraph>
          </Item>
        ))}
      </List>
      <Button primary large click={() => setApplying(true)}>
        Apply now
      </Button>
      <Popup
        show={applying}
        close={() => setApplying(false)}
        header="How to apply"
        body="Please send us an email with your CV and a link to your GitHub to: jobs@backd.fund"
      />
    </StyledCareerPage>
  );
};

export default CareerPage;
