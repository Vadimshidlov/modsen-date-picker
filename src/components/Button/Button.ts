import styled from "styled-components";
import { ButtonPropsType } from "@/types";

export const Button = styled.button<ButtonPropsType>`
    background: transparent;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;

    &:hover {
        opacity: 0.5;
    }

    flex-direction: ${(props) => props.direction || "row"};
    align-items: ${(props) => props.align || "stretch"};
    justify-content: ${(props) => props.justify || "center"};
    margin: ${(props) => props.margin || "0"};
    border: ${(props) => props.border || ""};
    border-radius: ${(props) => props.borderRadius || ""};
    padding: ${(props) => props.padding || ""};
    max-width: ${(props) => props.maxWidth || ""};
    min-width: ${(props) => props.minWidth || ""};
    row-gap: ${(props) => props.rowGap || ""};
    column-gap: ${(props) => props.columnGap || ""};
`;
