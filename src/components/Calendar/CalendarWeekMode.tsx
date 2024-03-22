import React, { useMemo, useState } from "react";
import {
    DEFAULT_DAYS,
    REVERSE_DAYS,
    BUTTON_TYPE_CURRENT_DAY,
    BUTTON_TYPE_CURRENT_MONTH_DAY,
    BUTTON_TYPE_END_RANGE,
    BUTTON_TYPE_INVALID_DAY,
    BUTTON_TYPE_START_RANGE,
    BUTTON_TYPE_WITHIN_RANGE,
    SET_CALENDAR_DATE,
    SET_CALENDAR_AND_PICKER_DATE,
} from "@/constants";
import {
    getCurrentMonthDays,
    getDateValueFromCalendarItem,
    getDateValues,
    getDaysInAMonth,
    getMontName,
    getNextMonthDays,
    getPreviousMonthDays,
    isDateInRange,
} from "@/utils/date";
import { Flex } from "@/components/Flex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { ReactComponent as PrevYearButton } from "@/assets/svg/prev-button.svg";
import { ReactComponent as NextYearButton } from "@/assets/svg/next-button.svg";
import {
    getInitialWeekNumber,
    getPreviousMonthWeeksCount,
    isDatesExist,
    isFirstDayInRange,
    isLastDayInRange,
    validateMaxDate,
    validateMinDate,
} from "@/utils/date/calendarDate";
import { handleChangeRangeDate } from "@/utils/handlers";
import {
    CalendarButtonsBlock,
    CalendarButtonsContainer,
    CalendarContainer,
    CalendarDaysContainer,
} from "@/components/Calendar/styled";
import { DayWeekTitle } from "@/components/Text/Text";
import { CalendarTitleContainer } from "@/components/Calendar/index";
import { CalendarDayButton } from "@/components/Calendar/CalendarDayButton";
import { CalendarItemsType, CalendarWeekModePropsType } from "@/types";

export function CalendarWeekMode({
    weekStartsOnSunday,
    dateValue,
    dateSecondValue,
    dateCalendarValue,
    dispatch,
    minDate,
    maxDate,
    withRange,
    handleOpenTodo,
}: CalendarWeekModePropsType) {
    const DAYS = weekStartsOnSunday ? REVERSE_DAYS : DEFAULT_DAYS;
    const [dayNumber, monthNumber, yearNumber] = getDateValues(dateValue);
    const [secondDayNumber, secondMonthNumber, secondYearNumber] = getDateValues(dateSecondValue);
    const [innerDayNumber, innerMonthNumber, innerYearNumber] = getDateValues(dateCalendarValue);
    const [weekNumber, setWeekNumber] = useState(() =>
        getInitialWeekNumber(dateCalendarValue, weekStartsOnSunday),
    );

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

    const handlePrevWeek = () => {
        if (weekNumber >= 1) {
            setWeekNumber((prevWeek) => prevWeek - 1);

            return;
        }

        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 1 ? `${day}/12/${+year - 1}` : `${day}/${+month - 1}/${+year}`;

            const previousMonthWeeksCount = getPreviousMonthWeeksCount(
                nexCalendarDate,
                weekStartsOnSunday,
            );

            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: nexCalendarDate },
            });

            if (previousMonthWeeksCount !== null) {
                setWeekNumber(previousMonthWeeksCount);
            }
        }
    };

    const handleNextWeek = () => {
        if (calendarItems && calendarItems.length / 7 > weekNumber + 1) {
            setWeekNumber((prevWeek) => prevWeek + 1);

            return;
        }

        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 12 ? `${day}/01/${+year + 1}` : `${day}/${+month + 1}/${+year}`;

            dispatch({
                type: SET_CALENDAR_DATE,
                payload: { dateValue: nexCalendarDate },
            });

            setWeekNumber(0);
        }
    };

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

            return;
        }

        dispatch({
            type: SET_CALENDAR_AND_PICKER_DATE,
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
                dateRangeFirstValue: "",
            },
        });
    };

    const handleCalendarDateClick = (calendarItem: CalendarItemsType) => {
        const currentDayDateValue = getDateValueFromCalendarItem(calendarItem);

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
                dateValue: currentDayDateValue,
                dateRangeFirstValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        setWeekNumber(getInitialWeekNumber(currentDayDateValue, weekStartsOnSunday));
    };

    return (
        <CalendarContainer>
            <CalendarButtonsContainer>
                <CalendarButtonsBlock>
                    <Button onClick={handlePrevWeek}>
                        {null}
                        <PrevYearButton />
                    </Button>
                </CalendarButtonsBlock>
                <CalendarTitleContainer>
                    <Text>
                        {getMontName(dateCalendarValue)} {innerYearNumber}
                    </Text>
                    <Text>Week: {weekNumber + 1}</Text>
                </CalendarTitleContainer>

                <CalendarButtonsBlock>
                    <Button onClick={handleNextWeek}>
                        {null}
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
                    calendarItems
                        .slice(weekNumber * 7, 7 + 7 * weekNumber)
                        .map((calendarItem, index) => {
                            const isInvalidDate =
                                validateMinDate(minDate, calendarItem) ||
                                validateMaxDate(maxDate, calendarItem);

                            const isFirstDayInRangeButton = isFirstDayInRange(
                                calendarItem,
                                dayNumber,
                                monthNumber,
                                yearNumber,
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

                            const isLastDayInRangeButton = isLastDayInRange(
                                calendarItem,
                                secondDayNumber,
                                secondMonthNumber,
                                secondYearNumber,
                            );

                            const isCurrentDayButton =
                                calendarItem.month === monthNumber &&
                                calendarItem.year === yearNumber &&
                                calendarItem.date === dayNumber;

                            if (isInvalidDate) {
                                return (
                                    <CalendarDayButton
                                        key={index.toString()}
                                        type={BUTTON_TYPE_INVALID_DAY}
                                        text={String(calendarItem.date)}
                                    />
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

                            if (isCurrentDayButton) {
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
            </CalendarDaysContainer>
        </CalendarContainer>
    );
}
