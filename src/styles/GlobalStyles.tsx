import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #0a0622;
        --main: #fff;
        --primary: #fc28d3;
        --primary-light: #d893fc;
        --primary-gradient: #d127fa;
        --secondary-gradient: #24bde3;

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
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
