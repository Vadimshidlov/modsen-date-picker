import { ReactNode } from "react";
import styled from "styled-components";

interface DayButtonProps {
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
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    rowGap?: string;
    columnGap?: string;
    children: ReactNode;
}

export const DayButton = styled.button<DayButtonProps>`
    display: flex;
    font-family: "Open Sans";
    font-weight: 600;
    padding: 7px 9px;
    font-size: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: transparent;
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
    color: ${(props) => props.color || ""};
    transition: all 0.5s;

    &:hover {
        opacity: 0.6;
    }
`;

export const DayWeekButton = styled(DayButton)`
    font-weight: 900;
    padding: 6px 8px;
    line-height: 19px;
    font-size: 14px;
`;

export const CurrentDayWeekButton = styled(DayButton)`
    font-weight: 600;
    padding: 7px 9px;
    color: #ffffff;
    background-color: #2f80ed;
    line-height: 19px;
    font-size: 14px;
    border-radius: 8px;
`;

// export function DayButton(props: DayButtonProps) {
//     const { children } = props;
//
//     return <StyledDayButton {...props}>{children}</StyledDayButton>;
// }
