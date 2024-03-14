/* eslint-disable no-nested-ternary */
import { ChangeEvent, useMemo, useState } from "react";
import { DatePickerStyled } from "@/components/DatePicker/DatePicker.styled";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { Calendar } from "@/components/Calendar";

export type CalendarItemsType = {
    year: number;
    month: number;
    date: number;
};

export const getDaysInAMonth = (year: number, month: number) => {
    const nextMonthDate = new Date(year, month + 1, 1);
    nextMonthDate.setMinutes(-1);

    return nextMonthDate.getDate();
};

export const getPreviousMonthDays = (year: number, month: number, weekStartsOnSunday: boolean) => {
    const currentMonthFirstDay = new Date(year, month, 1);

    const dayOfTheWeek = currentMonthFirstDay.getDay();

    let previousMonthCellsCount = (dayOfTheWeek === 0 ? 7 : dayOfTheWeek) - 1;

    if (weekStartsOnSunday) {
        previousMonthCellsCount += 1;
    }

    const previousMonthDaysCount = getDaysInAMonth(year, month - 1);

    const previousMonthCalendarItems: CalendarItemsType[] = [];

    const [itemYear, itemMonth] = month === 0 ? [year - 1, 11] : [year, month - 1];

    for (let i = previousMonthCellsCount - 1; i >= 0; i -= 1) {
        previousMonthCalendarItems.push({
            year: itemYear,
            month: itemMonth,
            date: previousMonthDaysCount - i,
        });
    }

    return previousMonthCalendarItems;
};

export const getNextMonthDays = (year: number, month: number, weekStartsOnSunday: boolean) => {
    const currentMonthFirstDay = new Date(year, month, 1);
    const dayOfTheWeek = currentMonthFirstDay.getDay();
    const previousMonthCellsCount = (dayOfTheWeek === 0 ? 7 : dayOfTheWeek) - 1;

    const nextMonthDaysFullCount = getDaysInAMonth(year, month);

    const totalCalendarCells = previousMonthCellsCount + nextMonthDaysFullCount;

    const rows = Math.ceil(totalCalendarCells / 7);
    const requiredCells = rows * 7;

    let nextYearDaysCalendarCount = requiredCells - totalCalendarCells;

    if (weekStartsOnSunday) {
        nextYearDaysCalendarCount -= 1;
    }

    const nextMonthCalendarItems: CalendarItemsType[] = [];

    const [itemYear, itemMonth] = month === 11 ? [year + 1, 0] : [year, month + 1];

    for (let i = 1; i <= nextYearDaysCalendarCount; i += 1) {
        nextMonthCalendarItems.push({
            year: itemYear,
            month: itemMonth,
            date: i,
        });
    }

    return nextMonthCalendarItems;
};

export const getCurrentMonthDays = (year: number, month: number, daysCount: number) => {
    const currentMonthCalendarItems: CalendarItemsType[] = [];

    for (let i = 1; i <= daysCount; i += 1) {
        currentMonthCalendarItems.push({
            year,
            month,
            date: i,
        });
    }

    return currentMonthCalendarItems;
};

// -----------------

export function DatePicker() {
    // const [value, setValue] = useState("25/11/2022");
    const [value, setValue] = useState("");
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [weekStartsOnSunday] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClearInput = () => {
        setValue("");
        setIsShowCalendar(false);
    };

    const calendarItems = useMemo((): CalendarItemsType[] | null => {
        const [day, month, year] = value.split("/");

        if (day && month && year) {
            const selectedMonthDaysCount = getDaysInAMonth(+year, +month - 1);

            return [
                ...getPreviousMonthDays(+year, +month - 1, weekStartsOnSunday),
                ...getCurrentMonthDays(+year, +month - 1, selectedMonthDaysCount),
                ...getNextMonthDays(+year, +month - 1, weekStartsOnSunday),
            ];
        }

        return null;
    }, [value, weekStartsOnSunday]);

    return (
        <DatePickerStyled>
            <GlobalStyles />
            <Flex margin="20px 0px 0px 0px">
                <DateInput
                    value={value}
                    handleClearInput={handleClearInput}
                    handleInputChange={handleInputChange}
                    setIsShowCalendar={setIsShowCalendar}
                />
            </Flex>
            {isShowCalendar && calendarItems && (
                <Calendar
                    calendarItems={calendarItems}
                    weekStartsOnSunday={weekStartsOnSunday}
                    dateValue={value}
                    handleSetDate={(dateValue: string) => {
                        console.log(dateValue, `I am gonna to set new Date from calendar!`);

                        setValue(dateValue);
                    }}
                />
            )}
        </DatePickerStyled>
    );
}
