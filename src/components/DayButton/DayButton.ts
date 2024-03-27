import styled from "styled-components";
import { DayButtonPropsType } from "@/types";

export const DayButton = styled.button<DayButtonPropsType>`
    display: flex;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
    padding: 7px 9px;
    font-size: ${({ theme }) => theme.sizes.s13};
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
    background: ${({ theme, $isStartRange, $isEndRange, $isWithinRange, $isSelected }) =>
        $isStartRange || $isEndRange || $isSelected
            ? `${theme.colors.darkBlue}`
            : $isWithinRange
              ? `${theme.colors.lightBlue}`
              : "transparent"};
    transition: all 0.5s;
    color: ${({
        theme,
        $isSelected,
        $isInnerDay,
        $isDayOff,
        $isStartRange,
        $isEndRange,
        $isWithinRange,
        $isDisabled,
        $isHoliday,
    }) =>
        $isStartRange || $isEndRange || $isSelected
            ? `${theme.colors.white}`
            : ($isDayOff || $isHoliday) && !$isInnerDay
              ? `${theme.colors.red}`
              : $isWithinRange
                ? `${theme.colors.darkBlue}`
                : !$isInnerDay && !$isDisabled
                  ? `${theme.colors.black}`
                  : `${theme.colors.lightGray}`};
    border: ${({ theme, $isToday, $isWithinRange, $isSelected, $isStartRange, $isEndRange }) =>
        $isToday && !$isWithinRange && !$isSelected && !$isStartRange && !$isEndRange
            ? `1px solid ${theme.colors.orange}`
            : `${theme.colors.lightGray}`};

    &:hover {
        opacity: 0.6;
    }
`;

export const DayWeekButton = styled(DayButton)<DayButtonPropsType>`
    display: flex;
    justify-content: start;
    font-size: ${({ theme }) => theme.sizes.s14};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.x};
    padding: 6px 8px;
    line-height: 19px;
`;
