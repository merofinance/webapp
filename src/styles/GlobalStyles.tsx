import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #0a0622;
        --main: #fff;
        --primary: #fc28d3;
        --primary-light: #d893fc;

        --section-margin: 8rem 0;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: var(--main);
        font-family: "Inter", sans-serif;
    }

    button {
        background: none;
        border: none;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    h1 {
        font-weight: 700;
        font-size: 7.2rem;
        line-height: 8.64rem;
        text-align: center;
        color: red;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
