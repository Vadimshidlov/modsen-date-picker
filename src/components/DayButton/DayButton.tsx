import styled from "styled-components";
import { DayButtonPropsType } from "@/types";

export const DayButton = styled.button<DayButtonPropsType>`
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

export const StartRangeButton = styled(DayButton)`
    font-weight: 600;
    padding: 7px 9px;
    color: #ffffff;
    background-color: #2f80ed;
    line-height: 19px;
    font-size: 14px;
    border-radius: 8px 0px 0px 8px;
`;

export const EndRangeButton = styled(DayButton)`
    font-weight: 600;
    padding: 7px 9px;
    color: #ffffff;
    background-color: #2f80ed;
    line-height: 19px;
    font-size: 14px;
    border-radius: 0px 8px 8px 0px;
`;

export const RangeButton = styled(DayButton)`
    font-weight: 600;
    padding: 7px 9px;
    color: #2f80ed;
    background-color: #2f80ed1a;
    line-height: 19px;
    font-size: 14px;
    border-radius: 0px 0px 0px 0px;
`;
