import React, { useEffect, useRef } from "react";
import {
    CurrentDayWeekButton,
    DayButton,
    EndRangeButton,
    RangeButton,
    StartRangeButton,
} from "@/components/DayButton/DayButton";
import {
    BUTTON_TYPE_CURRENT_DAY,
    BUTTON_TYPE_INVALID_DAY,
    BUTTON_TYPE_CURRENT_MONTH_DAY,
    BUTTON_TYPE_START_RANGE,
    BUTTON_TYPE_END_RANGE,
    BUTTON_TYPE_WITHIN_RANGE,
} from "@/constants/index";
import { CalendarDayButtonPropsType } from "@/types";

export function CalendarDayButton({
    type,
    text,
    isInnerDay,
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
            return <StartRangeButton ref={buttonRef}>{text}</StartRangeButton>;
        case BUTTON_TYPE_INVALID_DAY:
            return (
                <DayButton ref={buttonRef} color="#AAAAAA" disabled>
                    {text}
                </DayButton>
            );
        case BUTTON_TYPE_WITHIN_RANGE:
            return <RangeButton ref={buttonRef}>{text}</RangeButton>;
        case BUTTON_TYPE_END_RANGE:
            return <EndRangeButton ref={buttonRef}>{text}</EndRangeButton>;
        case BUTTON_TYPE_CURRENT_DAY:
            return <CurrentDayWeekButton ref={buttonRef}>{text}</CurrentDayWeekButton>;
        case BUTTON_TYPE_CURRENT_MONTH_DAY:
            return isInnerDay ? (
                <DayButton ref={buttonRef} color="#AAAAAA">
                    {text}
                </DayButton>
            ) : (
                <DayButton ref={buttonRef}>{text}</DayButton>
            );
        default:
            return (
                <DayButton ref={buttonRef} color="#AAAAAA" disabled>
                    {text}
                </DayButton>
            );
    }
}
