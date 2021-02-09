import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import { BackdContext } from "./app/providers/backd";
import { Header } from "./features/header/Header";
import { Pools } from "./features/pools/Pools";
import { Backd } from "./lib/backd";
import { createBackd } from "./lib/factory";
import MockSigner from "./lib/mock/signer";
import { Optional } from "./lib/types";

function App() {
  const [backd, setBackd] = useState<Optional<Backd>>(null);

  useEffect(() => {
    if (backd) return;
    createBackd(new MockSigner()).then((backdInstance) => {
      setBackd(backdInstance);
    });
  });

  return (
    <BackdContext.Provider value={backd}>
      <Header />
      <Container>
        <Pools />
      </Container>
    </BackdContext.Provider>
  );
}

export default App;
