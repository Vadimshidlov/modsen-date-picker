/* eslint-disable react/no-array-index-key */
import React, { MouseEvent, useMemo, useState } from "react";
import { DEFAULT_DAYS, REVERSE_DAYS } from "@/constants";
import {
    getCurrentMonthDays,
    getDateValues,
    getDaysInAMonth,
    getMontName,
    getNextMonthDays,
    getPreviousMonthDays,
} from "@/utils/date";
import { CalendarItemsType, DatePickerActionType } from "@/components/DatePicker/DatePicker";
import { Flex } from "@/components/Flex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { CurrentDayWeekButton, DayButton, DayWeekButton } from "@/components/DayButton";
import { ReactComponent as PrevYearButton } from "@/assets/svg/prev-button.svg";
import { ReactComponent as NextYearButton } from "@/assets/svg/next-button.svg";
import {
    getInitialWeekNumber,
    getPreviousMonthWeeksCount,
    validateMaxDate,
    validateMinDate,
} from "@/utils/date/calendarDate";

export type CalendarWeekModePropsType = {
    weekStartsOnSunday: boolean;
    dateValue: string;
    dateCalendarValue: string;
    dispatch: React.Dispatch<DatePickerActionType>;
    minDate: Date;
    maxDate: Date;
    withRange: boolean;
};

export function CalendarWeekMode({
    weekStartsOnSunday,
    dateValue,
    dateCalendarValue,
    dispatch,
    minDate,
    maxDate,
    withRange,
}: CalendarWeekModePropsType) {
    const DAYS = weekStartsOnSunday ? REVERSE_DAYS : DEFAULT_DAYS;
    const [dayNumber, monthNumber, yearNumber] = getDateValues(dateValue);
    const [innerDayNumber, innerMonthNumber, innerYearNumber] = getDateValues(dateCalendarValue);
    // const [weekNumber, setWeekNumber] = useState(0);
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
                type: "SET_CALENDAR_DATE",
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

        console.log("handleNextWeek 2");

        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            const nexCalendarDate =
                +month === 12 ? `${day}/01/${+year + 1}` : `${day}/${+month + 1}/${+year}`;

            dispatch({
                type: "SET_CALENDAR_DATE",
                payload: { dateValue: nexCalendarDate },
            });

            setWeekNumber(0);
        }
    };

    return (
        <Flex
            direction="column"
            width="250px"
            padding="10px"
            border="1px solid #dddddd"
            borderRadius="8px"
        >
            <Flex justify="space-between">
                <Flex columnGap="8px" align="center">
                    <Button onClick={handlePrevWeek}>
                        {null}
                        <PrevYearButton />
                    </Button>
                </Flex>
                <Text>
                    {getMontName(dateCalendarValue)} {innerYearNumber}
                </Text>
                <Flex columnGap="8px" align="center">
                    <Button onClick={handleNextWeek}>
                        {null}
                        <NextYearButton />
                    </Button>
                </Flex>
            </Flex>
            <Flex>
                {DAYS.map((day) => (
                    <DayWeekButton key={day} width="33px" height="33px">
                        {day}
                    </DayWeekButton>
                ))}
            </Flex>
            <Flex flexWrap="wrap" align="center" justify="center">
                {calendarItems &&
                    calendarItems
                        .slice(weekNumber * 7, 7 + 7 * weekNumber)
                        .map((calendarItem, index) => {
                            if (
                                validateMinDate(minDate, calendarItem) ||
                                validateMaxDate(maxDate, calendarItem)
                            ) {
                                return (
                                    <DayButton color="#AAAAAA" key={index.toString()} disabled>
                                        {calendarItem.date}
                                    </DayButton>
                                );
                            }

                            if (
                                calendarItem.month === monthNumber &&
                                calendarItem.year === yearNumber &&
                                calendarItem.date === dayNumber
                            ) {
                                return (
                                    <CurrentDayWeekButton
                                        key={index.toString()}
                                        onClick={() => {
                                            dispatch({
                                                type: "SET_CALENDAR_AND_PICKER_DATE",
                                                payload: {
                                                    dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                                },
                                            });
                                        }}
                                        onContextMenu={(e: MouseEvent) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        {calendarItem.date}
                                    </CurrentDayWeekButton>
                                );
                            }

                            return Number.isInteger(monthNumber) &&
                                calendarItem.month !== innerMonthNumber ? (
                                <DayButton
                                    color="#AAAAAA"
                                    key={index.toString()}
                                    onClick={() => {
                                        dispatch({
                                            type: "SET_CALENDAR_AND_PICKER_DATE",
                                            payload: {
                                                dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                            },
                                        });

                                        setWeekNumber(
                                            getInitialWeekNumber(
                                                `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                                weekStartsOnSunday,
                                            ),
                                        );
                                    }}
                                >
                                    {calendarItem.date}
                                </DayButton>
                            ) : (
                                <DayButton
                                    key={index.toString()}
                                    onClick={() => {
                                        dispatch({
                                            type: "SET_CALENDAR_AND_PICKER_DATE",
                                            payload: {
                                                dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                            },
                                        });

                                        setWeekNumber(
                                            getInitialWeekNumber(
                                                `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                                weekStartsOnSunday,
                                            ),
                                        );
                                    }}
                                >
                                    {calendarItem.date}
                                </DayButton>
                            );
                        })}
            </Flex>
        </Flex>
    );
}
