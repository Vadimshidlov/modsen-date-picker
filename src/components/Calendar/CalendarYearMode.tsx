import React, { useMemo } from "react";
import {
    DEFAULT_DAYS,
    REVERSE_DAYS,
    SET_CALENDAR_AND_PICKER_DATE,
    SET_CALENDAR_DATE,
    SET_FIRST_CALENDAR_DATE,
    SET_SECOND_CALENDAR_DATE,
} from "@/constants";
import { Flex } from "@/components/Flex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { DayButton } from "@/components/DayButton";
import { ReactComponent as PrevYearButton } from "@/assets/svg/prev-button.svg";
import { ReactComponent as NextYearButton } from "@/assets/svg/next-button.svg";
import { ReactComponent as PrevMonthButton } from "@/assets/svg/prev-month-button.svg";
import { ReactComponent as NextMonthButton } from "@/assets/svg/next-month-button.svg";
import {
    getCurrentMonthDays,
    getDateValueFromCalendarItem,
    getDateValues,
    getDaysInAMonth,
    getMontName,
    getNextMonthDays,
    getPreviousMonthDays,
    isDateInRange,
    isDatesExist,
    isFirstDayInRange,
    isLastDayInRange,
    isValidRange,
    validateMaxDate,
    validateMinDate,
} from "@/utils/date/calendarDate";
import {
    CalendarButtonsBlock,
    CalendarButtonsContainer,
    CalendarContainer,
    CalendarDaysContainer,
    EmptyWeek,
} from "@/components/Calendar/styled";
import { DayWeekTitle } from "@/components/Text/Text";
import { CalendarDayButton } from "@/components/Calendar/CalendarDayButton";
import {
    BUTTON_TYPE_CURRENT_DAY,
    BUTTON_TYPE_CURRENT_MONTH_DAY,
    BUTTON_TYPE_END_RANGE,
    BUTTON_TYPE_START_RANGE,
    BUTTON_TYPE_WITHIN_RANGE,
} from "@/constants/index";
import { CalendarItemsType, CalendarYearModePropsType, ChangeRangeDatePropsType } from "@/types";
import { handleChangeRangeDate } from "@/utils/handlers";

export function CalendarYearMode({
    weekStartsOnSunday,
    dateValue,
    dateSecondValue,
    dateCalendarValue,
    dispatch,
    minDate,
    maxDate,
    withRange,
    handleOpenTodo,
}: CalendarYearModePropsType) {
    const DAYS = weekStartsOnSunday ? REVERSE_DAYS : DEFAULT_DAYS;
    const [dayNumber, monthNumber, yearNumber] = getDateValues(dateValue);
    const [secondDayNumber, secondMonthNumber, secondYearNumber] = getDateValues(dateSecondValue);
    const [innerDayNumber, innerMonthNumber, innerYearNumber] = getDateValues(dateCalendarValue);

    const handlePrevYear = () => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: `${day}/${month}/${+year - 1}` },
            });
        }
    };

    const handleNextYear = () => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: `${day}/${month}/${+year + 1}` },
            });
        }
    };

    const handlePrevMonth = () => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 1 ? `${day}/12/${+year - 1}` : `${day}/${+month - 1}/${+year}`;

            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: nexCalendarDate },
            });
        }
    };

    const handleNextMonth = () => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 12 ? `${day}/01/${+year + 1}` : `${day}/${+month + 1}/${+year}`;

            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: nexCalendarDate },
            });
        }
    };

    const calendarItems = useMemo((): CalendarItemsType[] | null => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const selectedMonthDaysCount = getDaysInAMonth(+year, +month - 1);

            return [
                ...getPreviousMonthDays(+year, +month - 1, weekStartsOnSunday),
                ...getCurrentMonthDays(+year, +month - 1, selectedMonthDaysCount),
                ...getNextMonthDays(+year, +month - 1, weekStartsOnSunday),
            ];
        }

        return null;
    }, [dateCalendarValue, weekStartsOnSunday]);

    const handleWithinRangeClick = (calendarItem: CalendarItemsType) => {
        if (withRange) {
            handleChangeRangeDate({
                calendarItem,
                dispatch,
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            });
        }
    };

    const handleCalendarDateClick = (calendarItem: CalendarItemsType) => {
        if (withRange) {
            handleChangeRangeDate({
                calendarItem,
                dispatch,
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            });

            return;
        }

        dispatch({
            type: SET_CALENDAR_AND_PICKER_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeFirstValue: getDateValueFromCalendarItem(calendarItem),
            },
        });
    };

    return (
        <CalendarContainer>
            <CalendarButtonsContainer>
                <CalendarButtonsBlock>
                    <Button onClick={handlePrevYear}>
                        <PrevYearButton />
                    </Button>
                    <Button onClick={handlePrevMonth}>
                        <PrevMonthButton />
                    </Button>
                </CalendarButtonsBlock>
                <Text>
                    {getMontName(dateCalendarValue)} {innerYearNumber}
                </Text>
                <CalendarButtonsBlock>
                    <Button onClick={handleNextMonth}>
                        <NextMonthButton />
                    </Button>
                    <Button onClick={handleNextYear}>
                        <NextYearButton />
                    </Button>
                </CalendarButtonsBlock>
            </CalendarButtonsContainer>
            <Flex>
                {DAYS.map((day) => (
                    <DayWeekTitle key={day}>{day}</DayWeekTitle>
                ))}
            </Flex>
            <CalendarDaysContainer>
                {calendarItems &&
                    calendarItems.map((calendarItem, index) => {
                        const isInvalidDayButton =
                            validateMinDate(minDate, calendarItem) ||
                            validateMaxDate(maxDate, calendarItem);

                        const isFirstDayInRangeButton = isFirstDayInRange(
                            calendarItem,
                            dayNumber,
                            monthNumber,
                            yearNumber,
                        );

                        const isLastDayInRangeButton = isLastDayInRange(
                            calendarItem,
                            secondDayNumber,
                            secondMonthNumber,
                            secondYearNumber,
                        );

                        const isDateInRangeButton = isDateInRange(
                            calendarItem,
                            yearNumber,
                            monthNumber,
                            dayNumber,
                            secondYearNumber,
                            secondMonthNumber,
                            secondDayNumber,
                        );

                        const isSelectedDayButton =
                            calendarItem.month === monthNumber &&
                            calendarItem.year === yearNumber &&
                            calendarItem.date === dayNumber;

                        if (isInvalidDayButton) {
                            return (
                                <DayButton color="#AAAAAA" key={index.toString()} disabled>
                                    {calendarItem.date}
                                </DayButton>
                            );
                        }

                        if (withRange && isFirstDayInRangeButton) {
                            return (
                                <CalendarDayButton
                                    key={index.toString()}
                                    type={BUTTON_TYPE_START_RANGE}
                                    onDoubleClick={() => handleOpenTodo(calendarItem)}
                                    text={String(calendarItem.date)}
                                />
                            );
                        }

                        if (withRange && isLastDayInRangeButton) {
                            return (
                                <CalendarDayButton
                                    key={index.toString()}
                                    type={BUTTON_TYPE_END_RANGE}
                                    onDoubleClick={() => handleOpenTodo(calendarItem)}
                                    text={String(calendarItem.date)}
                                />
                            );
                        }

                        if (withRange && isDateInRangeButton) {
                            return (
                                <CalendarDayButton
                                    key={index.toString()}
                                    type={BUTTON_TYPE_WITHIN_RANGE}
                                    onDoubleClick={() => handleOpenTodo(calendarItem)}
                                    onClick={() => handleWithinRangeClick(calendarItem)}
                                    text={String(calendarItem.date)}
                                />
                            );
                        }

                        if (isSelectedDayButton) {
                            return (
                                <CalendarDayButton
                                    key={index.toString()}
                                    type={BUTTON_TYPE_CURRENT_DAY}
                                    onDoubleClick={() => handleOpenTodo(calendarItem)}
                                    text={String(calendarItem.date)}
                                />
                            );
                        }

                        return (
                            <CalendarDayButton
                                key={index.toString()}
                                type={BUTTON_TYPE_CURRENT_MONTH_DAY}
                                isInnerDay={calendarItem.month !== innerMonthNumber}
                                onClick={() => handleCalendarDateClick(calendarItem)}
                                onDoubleClick={() => handleOpenTodo(calendarItem)}
                                text={String(calendarItem.date)}
                            />
                        );
                    })}
                {calendarItems && calendarItems.length !== 42 && <EmptyWeek />}
            </CalendarDaysContainer>
        </CalendarContainer>
    );
}
