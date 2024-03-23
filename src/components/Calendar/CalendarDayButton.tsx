import React, { useEffect, useRef } from "react";
import { DayButton } from "@/components/DayButton/DayButton";
import {
    BUTTON_TYPE_CURRENT_DAY,
    BUTTON_TYPE_CURRENT_MONTH_DAY,
    BUTTON_TYPE_END_RANGE,
    BUTTON_TYPE_INVALID_DAY,
    BUTTON_TYPE_START_RANGE,
    BUTTON_TYPE_WITHIN_RANGE,
} from "@/constants/index";
import { CalendarDayButtonPropsType } from "@/types";

export function CalendarDayButton({
    type,
    text,
    isInnerDay,
    isToday,
    isDayOff,
    isHoliday,
    onClick,
    onDoubleClick,
}: CalendarDayButtonPropsType) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const clickRef = buttonRef.current;
        let clickCount = 0;

        const handleClick = () => {
            clickCount += 1;

            setTimeout(() => {
                if (clickCount === 1) {
                    if (onClick) {
                        onClick();
                    }
                } else if (clickCount === 2) {
                    if (onDoubleClick) {
                        onDoubleClick();
                    }
                }

                clickCount = 0;
            }, 200);
        };

        if (clickRef) {
            clickRef.addEventListener("click", handleClick);
        }

        return () => {
            if (clickRef) {
                clickRef.removeEventListener("click", handleClick);
            }
        };
    }, [onClick, onDoubleClick]);

    switch (type) {
        case BUTTON_TYPE_START_RANGE:
            return (
                <DayButton $isToday={isToday} $isDayOff={isDayOff} $isStartRange ref={buttonRef}>
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_INVALID_DAY:
            return (
                <DayButton
                    $isToday={isToday}
                    $isInnerDay={isInnerDay}
                    $isDayOff={isDayOff}
                    $isDisabled
                    ref={buttonRef}
                    disabled
                >
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_WITHIN_RANGE:
            return (
                <DayButton
                    $isWithinRange
                    $isToday={isToday}
                    $isDayOff={isDayOff}
                    $isHoliday={isHoliday}
                    ref={buttonRef}
                >
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_END_RANGE:
            return (
                <DayButton
                    $isToday={isToday}
                    $isDayOff={isDayOff}
                    $isHoliday={isHoliday}
                    $isEndRange
                    ref={buttonRef}
                >
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_CURRENT_DAY:
            return (
                <DayButton
                    $isSelected
                    $isToday={isToday}
                    $isDayOff={isDayOff}
                    $isHoliday={isHoliday}
                    ref={buttonRef}
                >
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_CURRENT_MONTH_DAY:
            return (
                <DayButton
                    $isToday={isToday}
                    $isInnerDay={isInnerDay}
                    $isDayOff={isDayOff}
                    $isHoliday={isHoliday}
                    ref={buttonRef}
                    // color="#AAAAAA"
                >
                    {text}
                </DayButton>
            );
        default:
            return (
                <DayButton
                    $isToday={isToday}
                    $isInnerDay={isInnerDay}
                    $isDayOff={isDayOff}
                    $isDisabled
                    ref={buttonRef}
                    disabled
                >
                    {text}
                </DayButton>
            );
    }
}
