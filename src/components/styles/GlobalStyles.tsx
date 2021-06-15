import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: #0a0622;
        --main: #fff;
        --sub: #cecdd3;
        --subtle: #9d9ca6;
        --primary: #C532F9;
        --primary-light: #d893fc;
        --primary-gradient: #d127fa;
        --secondary: #32B2E5;
        --secondary-gradient: #24bde3;
        --success: #4CAF50;
        --error: #F44336;
        --gradient: linear-gradient(to right, var(--primary) 0%, var(--secondary) 100%);

        --section-margin: 8rem 0;
        --mobile-section-margin: 3.6rem 0;
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
