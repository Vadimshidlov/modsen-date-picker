import styled from "styled-components";

export const Button = styled.button`
    background: transparent;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;

    &:hover {
        opacity: 0.5;
    }
`;

export const ClearButton = styled.button`
    width: 250px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
    font-size: ${({ theme }) => theme.sizes.s12};
    cursor: pointer;
    background: transparent;
    border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: all 0.5s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lightGray};
    }
`;
