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

export const getMontName = (dateValue: string): null | string => {
    const dateList = dateValue.split("/");

    if (typeof dateList[1] === "undefined") return null;

    const monthName = MONTH_NAMES[dateList[1]];

    return typeof monthName !== "undefined" ? monthName : null;
};

export const getMontNumber = (dateValue: string): null | number => {
    const dateList = dateValue.split("/");

    console.log(dateValue, `dateValue getMontNumber helper`);

    if (typeof dateList[1] === "undefined") return null;

    const monthNumber = +dateList[1] - 1;

    return typeof monthNumber !== "undefined" ? monthNumber : null;
};

export const getDateValues = (dateValue: string): number[] => {
    const dateList = dateValue.split("/");

    console.log(dateValue, `dateValue getMontNumber helper`);

    if (
        typeof dateList[0] === "undefined" ||
        typeof dateList[1] === "undefined" ||
        typeof dateList[2] === "undefined"
    )
        return [];

    return [+dateList[0], +dateList[1] - 1, +dateList[2]];
};
