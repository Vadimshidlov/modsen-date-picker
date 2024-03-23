import { ChangeRangeDatePropsType } from "@/types";
import { SET_FIRST_CALENDAR_DATE, SET_SECOND_CALENDAR_DATE } from "@/constants";
import { getDateValueFromCalendarItem } from "@/utils/date";

export const handleChangeRangeDate = ({
    calendarItem,
    dispatch,
    yearNumber,
    monthNumber,
    dayNumber,
    secondYearNumber,
    secondMonthNumber,
    secondDayNumber,
}: ChangeRangeDatePropsType) => {
    if (
        !yearNumber &&
        !monthNumber &&
        !dayNumber &&
        !secondYearNumber &&
        !secondMonthNumber &&
        !secondDayNumber
    ) {
        dispatch({
            type: SET_FIRST_CALENDAR_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeFirstValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    if (
        !secondYearNumber &&
        !secondMonthNumber &&
        !secondDayNumber &&
        new Date(calendarItem.year, calendarItem.month, calendarItem.date) >
            new Date(yearNumber!, monthNumber!, dayNumber!)
    ) {
        console.log("2");

        dispatch({
            type: SET_SECOND_CALENDAR_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeSecondValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    if (
        new Date(calendarItem.year, calendarItem.month, calendarItem.date) <
            new Date(secondYearNumber!, secondMonthNumber!, secondDayNumber!) &&
        new Date(calendarItem.year, calendarItem.month, calendarItem.date) >
            new Date(yearNumber!, monthNumber!, dayNumber!)
    ) {
        dispatch({
            type: SET_SECOND_CALENDAR_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeSecondValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    if (
        new Date(calendarItem.year, calendarItem.month, calendarItem.date) >
        new Date(secondYearNumber!, secondMonthNumber!, secondDayNumber!)
    ) {
        console.log("4");

        dispatch({
            type: SET_SECOND_CALENDAR_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeSecondValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    dispatch({
        type: SET_FIRST_CALENDAR_DATE,
        payload: {
            dateValue: getDateValueFromCalendarItem(calendarItem),
            dateRangeFirstValue: getDateValueFromCalendarItem(calendarItem),
        },
    });
};
