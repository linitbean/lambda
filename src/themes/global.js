import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    html, body {
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.bgContrast};
    }
    * {
        border: 0;
        padding:0;
        margin: 0;
        box-sizing: border-box;
        transition: background-color 0.3s ease-in-out;
        /* font-family: ${({ theme }) => theme.fontFamily.basic}; */
        font-family: 'Poppins', sans-serif;
    }

    ul {
        list-style: none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;
