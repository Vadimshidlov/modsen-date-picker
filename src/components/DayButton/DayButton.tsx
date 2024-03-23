/* eslint-disable */
import styled from "styled-components";
import { DayButtonPropsType } from "@/types";

export const DayButton = styled.button<DayButtonPropsType>`
    display: flex;
    justify-content: center;
    font-family: "Open Sans";
    font-weight: 600;
    padding: 7px 9px;
    font-size: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: ${({ $isStartRange, $isWithinRange, $isEndRange, $isSelected, $isToday }) =>
        $isStartRange
            ? "8px 0px 0px 8px"
            : $isEndRange
              ? "0px 8px 8px 0px"
              : ($isSelected || $isToday) && !$isWithinRange
                ? "8px 8px 8px 8px"
                : ""};
    background: ${({ $isStartRange, $isEndRange, $isWithinRange, $isSelected }) =>
        $isStartRange || $isEndRange || $isSelected
            ? "#2f80ed"
            : $isWithinRange
              ? "#2f80ed1a"
              : "transparent"};
    transition: all 0.5s;
    color: ${({
        $isSelected,
        $isInnerDay,
        // $isToday,
        $isDayOff,
        $isStartRange,
        $isEndRange,
        $isWithinRange,
        $isDisabled,
        $isHoliday,
    }) =>
        $isStartRange || $isEndRange || $isSelected
            ? "white"
            : // : $isToday
              //   ? "orange"
              ($isDayOff || $isHoliday) && !$isInnerDay
              ? "red"
              : $isWithinRange
                ? "#2F80ED"
                : !$isInnerDay && !$isDisabled
                  ? "black"
                  : "#808080c2"};
    border: ${({ $isToday, $isWithinRange }) =>
        $isToday && !$isWithinRange ? "1px solid orange" : "#808080c2"};

    &:hover {
        opacity: 0.6;
    }
`;

export const DayWeekButton = styled(DayButton)<DayButtonPropsType>`
    display: flex;
    justify-content: start;
    font-weight: 900;
    padding: 6px 8px;
    line-height: 19px;
    font-size: 14px;
`;
