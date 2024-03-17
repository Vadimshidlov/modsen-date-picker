/* eslint-disable react/no-array-index-key */
import { CalendarPropsType } from "@/types";
import { CalendarYearMode } from "@/components/Calendar/CalendarYearMode";
import { CalendarWeekMode } from "@/components/Calendar/CalendarWeekMode";

export function Calendar({
    weekStartsOnSunday,
    dateValue,
    dateCalendarValue,
    dispatch,
    weekMode,
}: CalendarPropsType) {
    return weekMode ? (
        <CalendarWeekMode
            weekStartsOnSunday={weekStartsOnSunday}
            dateValue={dateValue}
            dateCalendarValue={dateCalendarValue}
            dispatch={dispatch}
        />
    ) : (
        <CalendarYearMode
            weekStartsOnSunday={weekStartsOnSunday}
            dateValue={dateValue}
            dateCalendarValue={dateCalendarValue}
            dispatch={dispatch}
        />
    );
}
