import { ChangeEvent, useEffect, useMemo, useReducer, useState } from "react";
import { DatePickerStyled } from "@/components/DatePicker/DatePicker.styled";
import { DateInput } from "@/components/DateInput/index";
import { Flex } from "@/components/Flex/index";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { Calendar } from "@/components/Calendar";
import {
    getCurrentMonthDays,
    getDaysInAMonth,
    getNextMonthDays,
    getPreviousMonthDays,
} from "@/utils/date";

export type CalendarItemsType = {
    year: number;
    month: number;
    date: number;
};

/*
 * return {1,2}
 * return {
 * datepicke
 * to
 * calendar
 * }
 * */

// export function DatePicker({minValue, maxValue, reversWeek, weekMode, withRange}) {
export function DatePicker() {
    const [value, setValue] = useState("");
    // const [calendarValue, setCalendarValue] = useState(value);
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [weekStartsOnSunday] = useState(false);

    // const [state, dispatch] = useReducer(reducer, withRange, getInitialState(withRange));

    // useEffect(() => {
    //     setCalendarValue(value);
    // }, [value]);

    // useEffect(() => {
    //     console.log(calendarValue, `calendarValue`);
    // }, [calendarValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setValue(e.target.value);

        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
        } else if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        }

        setValue(inputValue);

        /* let inputValue = e.target.value;
        // Удаляем все, кроме цифр
        inputValue = inputValue.replace(/\D/g, "");

        // Добавляем разделители в дату
        if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
        } else if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        }

        setValue(inputValue); */
    };

    const handleClearInput = () => {
        setValue("");
        setIsShowCalendar(false);
    };

    const handleSetDate = (dateValue: string) => {
        setValue(dateValue);
    };

    /* const handleClearInput = () => {
        setValue("");
        setIsShowCalendar(false);
    };

    const handlePrevYear = () => {
        const [day, month, year] = calendarValue.split("/");

        if (day && month && year) {
            setCalendarValue(`${day}/${month}/${+year - 1}`);
        }
    };

    const handleNextYear = () => {
        const [day, month, year] = calendarValue.split("/");

        if (day && month && year) {
            setCalendarValue(`${day}/${month}/${+year + 1}`);
        }
    };

    const handlePrevMonth = () => {
        const [day, month, year] = calendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 1 ? `${day}/12/${+year - 1}` : `${day}/${+month - 1}/${+year}`;

            setCalendarValue(nexCalendarDate);
        }
    };

    const handleNextMonth = () => {
        const [day, month, year] = calendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 12 ? `${day}/01/${+year + 1}` : `${day}/${+month + 1}/${+year}`;

            setCalendarValue(nexCalendarDate);
        }
    };

    const handleSetDate = (dateValue: string) => {
        setValue(dateValue);
    };

    const calendarItems = useMemo((): CalendarItemsType[] | null => {
        const [day, month, year] = calendarValue.split("/");

        if (day && month && year) {
            const selectedMonthDaysCount = getDaysInAMonth(+year, +month - 1);

            return [
                ...getPreviousMonthDays(+year, +month - 1, weekStartsOnSunday),
                ...getCurrentMonthDays(+year, +month - 1, selectedMonthDaysCount),
                ...getNextMonthDays(+year, +month - 1, weekStartsOnSunday),
            ];
        }

        return null;
    }, [calendarValue, weekStartsOnSunday]); */

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
            {/* {isShowCalendar && calendarItems && ( */}
            {isShowCalendar && (
                <Calendar
                    // calendarItems={calendarItems}
                    weekStartsOnSunday={weekStartsOnSunday}
                    dateValue={value}
                    // calendarValue={calendarValue}
                    handleSetDate={handleSetDate}
                    // handlePrevYear={handlePrevYear}
                    // handleNextYear={handleNextYear}
                    // handlePrevMonth={handlePrevMonth}
                    // handleNextMonth={handleNextMonth}
                />
            )}
        </DatePickerStyled>
    );
}
