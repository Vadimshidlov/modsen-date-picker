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

export const ClearButton = styled.button`
    weight: 250px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open Sans";
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    background: transparent;
    border: 1px solid #e1e1e1;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    transition: all 0.5s;

    &:hover {
        background-color: #e1e1e1;
    }
`;
