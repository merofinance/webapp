import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import { Header } from "./features/header/Header";
import { Pools } from "./features/pools/Pools";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Pools />
      </Container>
    </>
  );
}

export default App;
