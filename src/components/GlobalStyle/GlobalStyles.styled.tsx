import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        padding: 0;
        margin: 0;
        border: none;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    ul,
    ol,
    li {
        list-style: none;
    }

    img {
        vertical-align: top;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: inherit;
        font-size: inherit;
    }
`;
