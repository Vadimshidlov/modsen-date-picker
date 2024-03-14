import { ReactNode } from "react";
import styled from "styled-components";

interface TextProps {
    direction?: "row" | "column";
    align?: "flex-start" | "flex-end" | "center" | "stretch";
    justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    margin?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    rowGap?: string;
    columnGap?: string;
    fontWeight?: string;
    fontFamily?: string;
    lineHeight?: string;
    children: ReactNode;
}

export const Text = styled.p<TextProps>`
    font-family: "Open Sans";
    font-weight: 600;
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
    font-family: ${(props) => props.fontFamily || ""};
    line-height: ${(props) => props.lineHeight || ""};
    font-weight: ${(props) => props.fontWeight || ""};
    color: ${(props) => props.color || ""};
`;

export const TextError = styled(Text)`
    font-weight: 400;
    color: red;
    font-size: 15px;
`;
