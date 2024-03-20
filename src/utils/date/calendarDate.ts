import { CalendarItemsType } from "@/components/DatePicker/DatePicker";
import { MONTH_NAMES } from "@/constants";

export const getDaysInAMonth = (year: number, month: number) => {
    const nextMonthDate = new Date(year, month + 1, 1);
    nextMonthDate.setMinutes(-1);

    return nextMonthDate.getDate();
};

export const getPreviousMonthDays = (year: number, month: number, weekStartsOnSunday: boolean) => {
    const currentMonthFirstDay = new Date(year, month, 1);
    const dayOfTheWeek = currentMonthFirstDay.getDay();

    let previousMonthCellsCount =
        (!weekStartsOnSunday && dayOfTheWeek === 0 ? 7 : dayOfTheWeek) - 1;

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

    if (weekStartsOnSunday && dayOfTheWeek === 6 && nextMonthDaysFullCount === 30) {
        nextYearDaysCalendarCount = 6;
    }

    if (weekStartsOnSunday && dayOfTheWeek === 5 && nextMonthDaysFullCount === 31) {
        nextYearDaysCalendarCount = 6;
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

export const getMontName = (dateValue: string): null | string => {
    const dateList = dateValue.split("/");

    if (typeof dateList[1] === "undefined") return null;

    const monthName = MONTH_NAMES[dateList[1]];

    return typeof monthName !== "undefined" ? monthName : null;
};

export const getMontNumber = (dateValue: string): null | number => {
    const dateList = dateValue.split("/");

    if (typeof dateList[1] === "undefined") return null;

    const monthNumber = +dateList[1] - 1;

    return typeof monthNumber !== "undefined" ? monthNumber : null;
};

export const getDateValues = (dateValue: string): number[] => {
    const dateList = dateValue.split("/");

    if (
        typeof dateList[0] === "undefined" ||
        typeof dateList[1] === "undefined" ||
        typeof dateList[2] === "undefined"
    )
        return [];

    return [+dateList[0], +dateList[1] - 1, +dateList[2]];
};

export const getPreviousMonthWeeksCount = (
    previousMonthDate: string,
    weekStartsOnSunday: boolean,
): number | null => {
    const [day, month, year] = previousMonthDate.split("/");

    if (day && month && year) {
        const selectedMonthDaysCount = getDaysInAMonth(+year, +month - 1);

        const cellsLIst = [
            ...getPreviousMonthDays(+year, +month - 1, weekStartsOnSunday),
            ...getCurrentMonthDays(+year, +month - 1, selectedMonthDaysCount),
            ...getNextMonthDays(+year, +month - 1, weekStartsOnSunday),
        ];

        return cellsLIst.length / 7 - 1;
    }

    return null;
};

export const getInitialWeekNumber = (monthDate: string, weekStartsOnSunday: boolean): number => {
    const [day, month, year] = monthDate.split("/");
    let weekNumber = 0;

    if (day && month && year) {
        const selectedMonthDaysCount = getDaysInAMonth(+year, +month - 1);

        const cellsLIst = [
            ...getPreviousMonthDays(+year, +month - 1, weekStartsOnSunday),
            ...getCurrentMonthDays(+year, +month - 1, selectedMonthDaysCount),
            ...getNextMonthDays(+year, +month - 1, weekStartsOnSunday),
        ];

        cellsLIst.forEach((cellItem, index) => {
            if (
                cellItem.month === Number(month) - 1 &&
                cellItem.year === Number(year) &&
                cellItem.date === Number(day)
            ) {
                weekNumber = Math.floor(index / 7);
            }
        });

        return weekNumber;
    }

    return weekNumber;
};

export const validateMinDate = (minDate: Date, calendarItem: CalendarItemsType) =>
    minDate > new Date(calendarItem.year, calendarItem.month, calendarItem.date);

export const validateMaxDate = (maxDate: Date, calendarItem: CalendarItemsType) =>
    maxDate < new Date(calendarItem.year, calendarItem.month, calendarItem.date);

export const validateInputMinMaxDate = (minDate: Date, maxDate: Date, inputDate: string) => {
    const [day, month, year] = inputDate.split("/");

    if (inputDate.length < 10) return true;

    if (day && month && year) {
        const result =
            maxDate >= new Date(Number(year), Number(month) - 1, Number(day)) &&
            minDate <= new Date(Number(year), Number(month) - 1, Number(day));

        return result;
    }

    return true;
};

export const isNumbersExist = (
    dayNumber: number | undefined,
    monthNumber: number | undefined,
    yearNumber: number | undefined,
    secondDayNumber: number | undefined,
    secondMonthNumber: number | undefined,
    secondYearNumber: number | undefined,
) =>
    Number.isInteger(dayNumber) &&
    Number.isInteger(monthNumber) &&
    Number.isInteger(yearNumber) &&
    Number.isInteger(secondDayNumber) &&
    Number.isInteger(secondMonthNumber) &&
    Number.isInteger(secondYearNumber);

export const isDateInRange = (
    calendarItem: CalendarItemsType,
    yearNumber: number | undefined,
    monthNumber: number | undefined,
    dayNumber: number | undefined,
    secondYearNumber: number | undefined,
    secondMonthNumber: number | undefined,
    secondDayNumber: number | undefined,
) =>
    new Date(calendarItem.year, calendarItem.month, calendarItem.date) >
        new Date(yearNumber!, monthNumber!, dayNumber!) &&
    new Date(calendarItem.year, calendarItem.month, calendarItem.date) <
        new Date(secondYearNumber!, secondMonthNumber!, secondDayNumber!);

export const getDateValueFromCalendarItem = (calendarItem: CalendarItemsType) => {
    const day = calendarItem.date < 10 ? `0${calendarItem.date}` : `${calendarItem.date}`;
    const month =
        calendarItem.month + 1 < 10 ? `0${calendarItem.month + 1}` : `${calendarItem.month + 1}`;
    const { year } = calendarItem;

    return `${day}/${month}/${year}`;
};

export const isFirstDayInRange = (
    calendarItem: CalendarItemsType,
    dayNumber: number | undefined,
    monthNumber: number | undefined,
    yearNumber: number | undefined,
) =>
    Number.isInteger(dayNumber) &&
    Number.isInteger(monthNumber) &&
    Number.isInteger(yearNumber) &&
    calendarItem.date === dayNumber &&
    calendarItem.month === monthNumber &&
    calendarItem.year === yearNumber;

export const isLastDayInRange = (
    calendarItem: CalendarItemsType,
    secondDayNumber: number | undefined,
    secondMonthNumber: number | undefined,
    secondYearNumber: number | undefined,
) =>
    calendarItem.date === secondDayNumber &&
    calendarItem.month === secondMonthNumber &&
    calendarItem.year === secondYearNumber;
