import { Outlet } from "react-router";
import styled from "styled-components";

import BackButton from "../../../components/BackButton";

const Container = styled.div`
  position: relative;
`;

const ActionRegister = (): JSX.Element => {
  return (
    <Container>
      <BackButton />
      <Outlet />
    </Container>
  );
};

export default ActionRegister;
