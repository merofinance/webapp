import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ContentSection from "../../components/ContentSection";
import { Position } from "../../lib/types";
import { selectPositions } from "../../state/positionsSlice";
import Button from "../../components/Button";

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Empty = styled.div`
  font-size: 1.5rem;
  line-height: 2.1rem;
  letter-spacing: 0.46px;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 6rem;
`;

const RegisteredActions = () => {
  const positions = useSelector(selectPositions);

  return (
    <ContentSection
      header="Registered Actions"
      content={
        <Content>
          {/* TODO Check the styling of this */}
          {positions.length === 0 && <Empty>You have not registered any Actions yet..</Empty>}
          {/* TODO Add the position */}
          {positions.length > 0 && positions.map((position: Position) => <div>Cool position</div>)}
          <ButtonContainer>
            <Button primary medium width="44%" text="Register an Action" />
          </ButtonContainer>
        </Content>
      }
    />
  );
};

export default RegisteredActions;
