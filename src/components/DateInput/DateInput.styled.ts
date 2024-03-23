import styled from "styled-components";
import { ReactComponent as ClearDateIcon } from "@/assets/svg/Clear.svg";

export const DateInputStyled = styled.input<{ $isValid: boolean }>`
    outline: none;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 15px;
    line-height: normal;
    width: 80%;
    outline: none;
    color: ${({ $isValid }) => ($isValid ? "inherit" : "red")};
`;

export const StyledClearDateIcon = styled(ClearDateIcon)`
    cursor: pointer;
    transition: all 1s;

    &:hover {
        opacity: 0.5;
    }
`;

export const Flex = styled.div`
    display: flex;
`;

export const IconContainer = styled(Flex)`
    min-width: 15px;
`;

export const DateInputContainer = styled(Flex)`
    flex-direction: column;
    max-width: 250px;
`;

export const ValidationError = styled(Flex)`
    justify-content: center;
    max-width: 250px;
`;

export const InputContainer = styled(Flex)`
    align-items: center;
    margin: 0 0 8px 0;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 8px 15px;
    column-gap: 8px;
`;
