/* eslint-disable react/no-array-index-key */
import React, { MouseEvent, useMemo } from "react";
import { DEFAULT_DAYS, REVERSE_DAYS } from "@/constants";
import { CalendarItemsType, DatePickerActionType } from "@/components/DatePicker/DatePicker";
import { Flex } from "@/components/Flex";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { CurrentDayWeekButton, DayButton, DayWeekButton } from "@/components/DayButton";
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
    isNumbersExist,
    validateMaxDate,
    validateMinDate,
} from "@/utils/date/calendarDate";
import { EndRangeButton, RangeButton, StartRangeButton } from "@/components/DayButton/DayButton";

export type CalendarYearModePropsType = {
    weekStartsOnSunday: boolean;
    dateValue: string;
    dateSecondValue: string;
    dateCalendarValue: string;
    dispatch: React.Dispatch<DatePickerActionType>;
    minDate: Date;
    maxDate: Date;
    withRange: boolean;
    handleOpenTodo: (event: MouseEvent, calendarItem: CalendarItemsType) => void;
};

export type ChangeRangeDatePropsType = {
    calendarItem: CalendarItemsType;
    dispatch: (value: DatePickerActionType) => void;
    dayNumber: number | undefined;
    monthNumber: number | undefined;
    yearNumber: number | undefined;
    secondYearNumber: number | undefined;
    secondMonthNumber: number | undefined;
    secondDayNumber: number | undefined;
};

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
            type: "SET_FIRST_CALENDAR_DATE",
            payload: {
                // dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                dateValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    if (!secondYearNumber && !secondMonthNumber && !secondDayNumber) {
        dispatch({
            type: "SET_SECOND_CALENDAR_DATE",
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
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
        console.log("Second Dispatch");

        dispatch({
            type: "SET_SECOND_CALENDAR_DATE",
            payload: {
                // dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                dateValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    if (
        new Date(calendarItem.year, calendarItem.month, calendarItem.date) >
        new Date(secondYearNumber!, secondMonthNumber!, secondDayNumber!)
    ) {
        dispatch({
            type: "SET_SECOND_CALENDAR_DATE",
            payload: {
                dateValue: getDateValueFromCalendarItem(calendarItem),
            },
        });

        return;
    }

    console.log("The Third Dispatch");

    dispatch({
        type: "SET_FIRST_CALENDAR_DATE",
        payload: {
            // dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
            dateValue: getDateValueFromCalendarItem(calendarItem),
        },
    });
};

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
                type: "SET_CALENDAR_DATE",
                payload: { dateValue: `${day}/${month}/${+year - 1}` },
            });
        }
    };

    const handleNextYear = () => {
        const [day, month, year] = dateCalendarValue.split("/");

        if (day && month && year) {
            dispatch({
                type: "SET_CALENDAR_DATE",
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
                type: "SET_CALENDAR_DATE",
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
                type: "SET_CALENDAR_DATE",
                payload: { dateValue: nexCalendarDate },
            });
        }
    };

    const handleAddTodo = () => {};

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
                    <Button onClick={handlePrevYear}>
                        {null}
                        <PrevYearButton />
                    </Button>
                    <Button onClick={handlePrevMonth}>
                        {null}
                        <PrevMonthButton />
                    </Button>
                </Flex>
                <Text>
                    {getMontName(dateCalendarValue)} {innerYearNumber}
                </Text>
                <Flex columnGap="8px" align="center">
                    <Button onClick={handleNextMonth}>
                        {null}
                        <NextMonthButton />
                    </Button>
                    <Button onClick={handleNextYear}>
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
                    calendarItems.map((calendarItem, index) => {
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

                        if (withRange) {
                            if (
                                Number.isInteger(dayNumber) &&
                                Number.isInteger(monthNumber) &&
                                Number.isInteger(yearNumber)
                            ) {
                                if (
                                    calendarItem.date === dayNumber &&
                                    calendarItem.month === monthNumber &&
                                    calendarItem.year === yearNumber
                                ) {
                                    return (
                                        <StartRangeButton
                                            key={index.toString()}
                                            onContextMenu={(e: MouseEvent) =>
                                                handleOpenTodo(e, calendarItem)
                                            }
                                        >
                                            {calendarItem.date}
                                        </StartRangeButton>
                                    );
                                }
                            }
                        }

                        if (withRange) {
                            if (
                                Number.isInteger(secondDayNumber) &&
                                Number.isInteger(secondMonthNumber) &&
                                Number.isInteger(secondYearNumber)
                            ) {
                                if (
                                    calendarItem.date === secondDayNumber &&
                                    calendarItem.month === secondMonthNumber &&
                                    calendarItem.year === secondYearNumber
                                ) {
                                    return (
                                        <EndRangeButton
                                            key={index.toString()}
                                            // onClick={() => {
                                            //     dispatch({
                                            //         type: "SET_CALENDAR_AND_PICKER_DATE",
                                            //         payload: {
                                            //             dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                            //         },
                                            //     });
                                            // }}
                                            onContextMenu={(e: MouseEvent) =>
                                                handleOpenTodo(e, calendarItem)
                                            }
                                        >
                                            {calendarItem.date}
                                        </EndRangeButton>
                                    );
                                }
                            }
                        }

                        if (withRange) {
                            if (
                                isNumbersExist(
                                    dayNumber,
                                    monthNumber,
                                    yearNumber,
                                    secondDayNumber,
                                    secondMonthNumber,
                                    secondYearNumber,
                                ) &&
                                isDateInRange(
                                    calendarItem,
                                    yearNumber,
                                    monthNumber,
                                    dayNumber,
                                    secondYearNumber,
                                    secondMonthNumber,
                                    secondDayNumber,
                                )
                            ) {
                                return (
                                    <RangeButton
                                        key={index.toString()}
                                        onClick={() => {
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
                                                type: "SET_CALENDAR_AND_PICKER_DATE",
                                                payload: {
                                                    dateValue:
                                                        getDateValueFromCalendarItem(calendarItem),
                                                },
                                            });
                                        }}
                                        onContextMenu={(e: MouseEvent) =>
                                            handleOpenTodo(e, calendarItem)
                                        }
                                    >
                                        {calendarItem.date}
                                    </RangeButton>
                                );
                            }
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
                                                dateValue:
                                                    getDateValueFromCalendarItem(calendarItem),
                                                // dateValue: `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                            },
                                        });
                                    }}
                                    onContextMenu={(e: MouseEvent) =>
                                        handleOpenTodo(e, calendarItem)
                                    }
                                >
                                    {calendarItem.date}
                                </CurrentDayWeekButton>
                            );
                        }

                        return calendarItem.month !== innerMonthNumber ? (
                            <DayButton
                                color="#AAAAAA"
                                key={index.toString()}
                                onClick={() => {
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
                                        type: "SET_CALENDAR_AND_PICKER_DATE",
                                        payload: {
                                            dateValue: getDateValueFromCalendarItem(calendarItem),
                                        },
                                    });
                                }}
                                onContextMenu={(e: MouseEvent) => handleOpenTodo(e, calendarItem)}
                            >
                                {calendarItem.date}
                            </DayButton>
                        ) : (
                            <DayButton
                                key={index.toString()}
                                onClick={() => {
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
                                        type: "SET_CALENDAR_AND_PICKER_DATE",
                                        payload: {
                                            dateValue: getDateValueFromCalendarItem(calendarItem),
                                        },
                                    });
                                }}
                                onContextMenu={(e: MouseEvent) => handleOpenTodo(e, calendarItem)}
                            >
                                {calendarItem.date}
                            </DayButton>
                        );
                    })}
            </Flex>
        </Flex>
    );
}
