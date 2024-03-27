import {
    getCalendarItems,
    getCurrentDate,
    getCurrentMonthDays,
    getDateValueFromCalendarItem,
    getDateValues,
    getDaysInAMonth,
    getInitialWeekNumber,
    getMontName,
    getMontNumber,
    getNextMonthDays,
    getPreviousMonthDays,
    getPreviousMonthWeeksCount,
    isDateInRange,
    isFirstDayInRange,
    isLastDayInRange,
    validateInputMinMaxDate,
    validateMaxDate,
    validateMinDate,
} from "@/utils/date/index";
import {
    handleInputMask,
    isDayOff,
    isHoliday,
    isToday,
    isValidRange,
    validateRangeInput,
} from "@/utils/date/calendarDate";

describe("getDaysInAMonth tests", () => {
    test("should returns the correct number of days in a month", () => {
        expect(getDaysInAMonth(2024, 0)).toBe(31);

        expect(getDaysInAMonth(2024, 1)).toBe(29);

        expect(getDaysInAMonth(2023, 1)).toBe(28);

        expect(getDaysInAMonth(2024, 3)).toBe(30);
    });
});

describe("getPreviousMonthDays tests", () => {
    test("should returns the correct number of days from the previous month", () => {
        const previousMonthDays1 = getPreviousMonthDays(2024, 1, false);
        expect(previousMonthDays1).toEqual([
            { year: 2024, month: 0, date: 29 },
            { year: 2024, month: 0, date: 30 },
            { year: 2024, month: 0, date: 31 },
        ]);

        const previousMonthDays2 = getPreviousMonthDays(2023, 4, true);
        expect(previousMonthDays2).toEqual([{ year: 2023, month: 3, date: 30 }]);

        const previousMonthDays3 = getPreviousMonthDays(2022, 0, true);
        expect(previousMonthDays3).toEqual([
            { year: 2021, month: 11, date: 26 },
            { year: 2021, month: 11, date: 27 },
            { year: 2021, month: 11, date: 28 },
            { year: 2021, month: 11, date: 29 },
            { year: 2021, month: 11, date: 30 },
            { year: 2021, month: 11, date: 31 },
        ]);
    });
});

describe("getNextMonthDays tests", () => {
    test("should returns the correct list of days for the next month", () => {
        const nextMonthDaysOne = getNextMonthDays(2024, 1, true);

        expect(nextMonthDaysOne.length).toBe(2);
        expect(nextMonthDaysOne).toEqual([
            { year: 2024, month: 2, date: 1 },
            { year: 2024, month: 2, date: 2 },
        ]);

        const nextMonthDaysTwo = getNextMonthDays(2024, 2, true);

        expect(nextMonthDaysTwo.length).toBe(6);
        expect(nextMonthDaysTwo).toEqual([
            { year: 2024, month: 3, date: 1 },
            { year: 2024, month: 3, date: 2 },
            { year: 2024, month: 3, date: 3 },
            { year: 2024, month: 3, date: 4 },
            { year: 2024, month: 3, date: 5 },
            { year: 2024, month: 3, date: 6 },
        ]);

        const nextMonthDaysThree = getNextMonthDays(2024, 3, false);

        expect(nextMonthDaysThree.length).toBe(5);
        expect(nextMonthDaysThree).toEqual([
            { year: 2024, month: 4, date: 1 },
            { year: 2024, month: 4, date: 2 },
            { year: 2024, month: 4, date: 3 },
            { year: 2024, month: 4, date: 4 },
            { year: 2024, month: 4, date: 5 },
        ]);
    });
});

describe("getCurrentMonthDays test", () => {
    test("should returns the correct data for days for the current month", () => {
        const currentMonthDays1 = getCurrentMonthDays(2024, 1, 29);
        expect(currentMonthDays1).toEqual([
            { year: 2024, month: 1, date: 1 },
            { year: 2024, month: 1, date: 2 },
            { year: 2024, month: 1, date: 3 },
            { year: 2024, month: 1, date: 4 },
            { year: 2024, month: 1, date: 5 },
            { year: 2024, month: 1, date: 6 },
            { year: 2024, month: 1, date: 7 },
            { year: 2024, month: 1, date: 8 },
            { year: 2024, month: 1, date: 9 },
            { year: 2024, month: 1, date: 10 },
            { year: 2024, month: 1, date: 11 },
            { year: 2024, month: 1, date: 12 },
            { year: 2024, month: 1, date: 13 },
            { year: 2024, month: 1, date: 14 },
            { year: 2024, month: 1, date: 15 },
            { year: 2024, month: 1, date: 16 },
            { year: 2024, month: 1, date: 17 },
            { year: 2024, month: 1, date: 18 },
            { year: 2024, month: 1, date: 19 },
            { year: 2024, month: 1, date: 20 },
            { year: 2024, month: 1, date: 21 },
            { year: 2024, month: 1, date: 22 },
            { year: 2024, month: 1, date: 23 },
            { year: 2024, month: 1, date: 24 },
            { year: 2024, month: 1, date: 25 },
            { year: 2024, month: 1, date: 26 },
            { year: 2024, month: 1, date: 27 },
            { year: 2024, month: 1, date: 28 },
            { year: 2024, month: 1, date: 29 },
        ]);
    });
});

describe("getMontName tests", () => {
    test("should returns the correct month name", () => {
        expect(getMontName("01/01/2022")).toBe("January");
        expect(getMontName("1/01/2022")).toBe("January");

        expect(getMontName("15/02/2022")).toBe("February");
        expect(getMontName("15/2/2022")).toBe("February");

        expect(getMontName("25/04/2022")).toBe("April");
        expect(getMontName("25/4/2022")).toBe("April");

        expect(getMontName("10/05/2022")).toBe("May");
        expect(getMontName("10/5/2022")).toBe("May");

        expect(getMontName("05/06/2022")).toBe("June");
        expect(getMontName("05/6/2022")).toBe("June");

        expect(getMontName("04/07/2022")).toBe("July");
        expect(getMontName("04/7/2022")).toBe("July");

        expect(getMontName("30/08/2022")).toBe("August");
        expect(getMontName("30/8/2022")).toBe("August");

        expect(getMontName("22/09/2022")).toBe("September");
        expect(getMontName("22/9/2022")).toBe("September");

        expect(getMontName("12/10/2022")).toBe("October");

        expect(getMontName("08/11/2022")).toBe("November");

        expect(getMontName("30/12/2022")).toBe("December");
    });

    test("should returns null for invalid date format", () => {
        expect(getMontName("01-01-2022")).toBe(null);
        expect(getMontName("January 01, 2022")).toBe(null);
    });
});

describe("getMontNumber tests", () => {
    test("should returns correct month number for date with zero-padded month", () => {
        expect(getMontNumber("01/01/2022")).toBe(0);
    });

    test("should returns correct month number for date with non-zero-padded month", () => {
        expect(getMontNumber("1/01/2022")).toBe(0);
    });

    test("should returns correct month number for date with zero-padded month and non-zero-padded day", () => {
        expect(getMontNumber("15/02/2022")).toBe(1);
    });

    test("should returns correct month number for date with non-zero-padded month and non-zero-padded day", () => {
        expect(getMontNumber("15/2/2022")).toBe(1);
    });
});

describe("getDateValues tests", () => {
    test("should returns empty array if any part of date is missing", () => {
        expect(getDateValues("")).toEqual([]);
        expect(getDateValues("01")).toEqual([]);
        expect(getDateValues("01/01")).toEqual([]);
    });

    test("should returns array of numbers representing date values", () => {
        expect(getDateValues("01/01/2022")).toEqual([1, 0, 2022]);
        expect(getDateValues("1/01/2022")).toEqual([1, 0, 2022]);
        expect(getDateValues("15/02/2022")).toEqual([15, 1, 2022]);
        expect(getDateValues("15/2/2022")).toEqual([15, 1, 2022]);
    });
});

describe("getPreviousMonthWeeksCount tests", () => {
    test("should return null if any part of date is missing", () => {
        expect(getPreviousMonthWeeksCount("", false)).toBeNull();
        expect(getPreviousMonthWeeksCount("01", false)).toBeNull();
        expect(getPreviousMonthWeeksCount("01/01", false)).toBeNull();
    });

    test("should return correct number of weeks for previous month", () => {
        expect(getPreviousMonthWeeksCount("01/02/2022", false)).toBe(4);

        expect(getPreviousMonthWeeksCount("01/02/2022", true)).toBe(4);
        //
        expect(getPreviousMonthWeeksCount("01/03/2024", false)).toBe(4);
        //
        expect(getPreviousMonthWeeksCount("01/04/2023", true)).toBe(5);
    });
});

describe("getInitialWeekNumber tests", () => {
    test("should returns correct initial week number for month with week starting on Sunday", () => {
        expect(getInitialWeekNumber("01/01/2022", true)).toBe(0);

        expect(getInitialWeekNumber("01/03/2022", true)).toBe(0);
    });

    test("should returns correct initial week number for month with week starting on Monday", () => {
        expect(getInitialWeekNumber("01/01/2022", false)).toBe(0);

        expect(getInitialWeekNumber("01/03/2022", false)).toBe(0);
    });

    test("should returns correct initial week number for month", () => {
        expect(getInitialWeekNumber("07/01/2022", false)).toBe(1);
        expect(getInitialWeekNumber("14/03/2022", false)).toBe(2);
        expect(getInitialWeekNumber("21/03/2022", false)).toBe(3);
        expect(getInitialWeekNumber("28/03/2022", false)).toBe(4);
    });
});

describe("validateMinDate tests", () => {
    test("should returns false if calendar item date is less than minDate", () => {
        const minDate = new Date(2021, 0, 15);
        const calendarItem = { year: 2022, month: 0, date: 10 };
        expect(validateMinDate(minDate, calendarItem)).toBe(false);
    });

    test("should returns true if calendar item date is high than minDate", () => {
        const minDate = new Date(2023, 0, 15);
        const calendarItem = { year: 2022, month: 0, date: 10 };
        expect(validateMinDate(minDate, calendarItem)).toBe(true);
    });

    test("should returns false if calendar item date is equal to minDate", () => {
        const minDate = new Date(2022, 0, 15);
        const calendarItem = { year: 2022, month: 0, date: 15 };
        expect(validateMinDate(minDate, calendarItem)).toBe(false);
    });
});

describe("validateMaxDate tests", () => {
    test("should returns true if calendar item date is less than maxDate", () => {
        const maxDate = new Date(2022, 0, 31);
        const calendarItem = { year: 2022, month: 0, date: 20 };
        expect(validateMaxDate(maxDate, calendarItem)).toBe(false);
    });

    test("should returns false if calendar item date is greater than maxDate", () => {
        const maxDate = new Date(2022, 0, 15);
        const calendarItem = { year: 2022, month: 0, date: 20 };
        expect(validateMaxDate(maxDate, calendarItem)).toBe(true);
    });

    test("should returns false if calendar item date is equal to maxDate", () => {
        const maxDate = new Date(2022, 0, 20);
        const calendarItem = { year: 2022, month: 0, date: 20 };
        expect(validateMaxDate(maxDate, calendarItem)).toBe(false);
    });
});

describe("validateInputMinMaxDate tests", () => {
    test("should returns true if input date is within minDate and maxDate range", () => {
        const minDate = new Date(2022, 0, 15);
        const maxDate = new Date(2022, 0, 31);

        expect(validateInputMinMaxDate(minDate, maxDate, "20/01/2022")).toBe(true);
    });

    test("should returns false if input date is outside minDate and maxDate range", () => {
        const minDate = new Date(2022, 0, 15);
        const maxDate = new Date(2022, 0, 31);

        expect(validateInputMinMaxDate(minDate, maxDate, "10/01/2022")).toBe(false);
    });

    test("should returns false if input date format is invalid", () => {
        const minDate = new Date(2022, 0, 15);
        const maxDate = new Date(2022, 0, 31);

        expect(validateInputMinMaxDate(minDate, maxDate, "1/1/2022")).toBe(false);
    });
});

describe("validateRangeInput tests", () => {
    test("should returns true if input date is within rangeValue for first value", () => {
        const rangeValue = "20/01/2022";
        expect(validateRangeInput("15/01/2022", rangeValue, true)).toBe(true);
    });

    test("should returns false if input date is not within rangeValue for first value", () => {
        const rangeValue = "10/01/2022";
        expect(validateRangeInput("05/01/2022", rangeValue, false)).toBe(false);
    });

    test("should returns true if input date is within rangeValue for second value", () => {
        const rangeValue = "10/01/2022";
        expect(validateRangeInput("15/01/2022", rangeValue, false)).toBe(true);
    });

    test("should returns false if input date is not within rangeValue for second value", () => {
        const rangeValue = "25/01/2022";
        expect(validateRangeInput("20/01/2022", rangeValue, false)).toBe(false);
    });

    test("should returns true if rangeValue is empty", () => {
        const rangeValue = "";
        expect(validateRangeInput("15/01/2022", rangeValue, true)).toBe(true);
        expect(validateRangeInput("25/01/2022", rangeValue, false)).toBe(true);
    });
});

describe("isDateInRange tests", () => {
    test("should returns true if calendarItem date is within specified range", () => {
        const calendarItem = { year: 2022, month: 0, date: 15 };
        const yearNumber = 2022;
        const monthNumber = 0;
        const dayNumber = 10;
        const secondYearNumber = 2022;
        const secondMonthNumber = 0;
        const secondDayNumber = 20;

        expect(
            isDateInRange(
                calendarItem,
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            ),
        ).toBe(true);
    });

    test("should returns false if calendarItem date is outside specified range", () => {
        const calendarItem = { year: 2022, month: 0, date: 5 };
        const yearNumber = 2022;
        const monthNumber = 0;
        const dayNumber = 10;
        const secondYearNumber = 2022;
        const secondMonthNumber = 0;
        const secondDayNumber = 20;

        expect(
            isDateInRange(
                calendarItem,
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            ),
        ).toBe(false);
    });
});

describe("isValidRange tests", () => {
    test("should returns true if first date is less than second date", () => {
        const yearNumber = 2022;
        const monthNumber = 0;
        const dayNumber = 10;
        const secondYearNumber = 2022;
        const secondMonthNumber = 0;
        const secondDayNumber = 20;

        expect(
            isValidRange(
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            ),
        ).toBe(true);
    });

    test("should returns false if first date is equal to or greater than second date", () => {
        const yearNumber = 2022;
        const monthNumber = 0;
        const dayNumber = 20;
        const secondYearNumber = 2022;
        const secondMonthNumber = 0;
        const secondDayNumber = 20;

        expect(
            isValidRange(
                yearNumber,
                monthNumber,
                dayNumber,
                secondYearNumber,
                secondMonthNumber,
                secondDayNumber,
            ),
        ).toBe(false);
    });
});

describe("getDateValueFromCalendarItem tests", () => {
    test("should returns correctly formatted date value for single-digit date and month", () => {
        const calendarItem = { year: 2022, month: 0, date: 5 };
        expect(getDateValueFromCalendarItem(calendarItem)).toBe("05/01/2022");
    });

    test("should returns correctly formatted date value for double-digit date and month", () => {
        const calendarItem = { year: 2022, month: 9, date: 15 };
        expect(getDateValueFromCalendarItem(calendarItem)).toBe("15/10/2022");
    });
});

describe("isFirstDayInRange tests", () => {
    test("should returns true if calendarItem matches the first day in the range", () => {
        const calendarItem = { year: 2022, month: 0, date: 10 };
        const dayNumber = 10;
        const monthNumber = 0;
        const yearNumber = 2022;
        expect(isFirstDayInRange(calendarItem, dayNumber, monthNumber, yearNumber)).toBe(true);
    });

    test("should returns false if calendarItem does not match the first day in the range", () => {
        const calendarItem = { year: 2022, month: 0, date: 5 };
        const dayNumber = 10;
        const monthNumber = 0;
        const yearNumber = 2022;
        expect(isFirstDayInRange(calendarItem, dayNumber, monthNumber, yearNumber)).toBe(false);
    });

    test("should returns false if dayNumber, monthNumber, or yearNumber is not provided", () => {
        const calendarItem = { year: 2022, month: 0, date: 10 };
        expect(isFirstDayInRange(calendarItem, undefined, 0, 2022)).toBe(false);
        expect(isFirstDayInRange(calendarItem, 10, undefined, 2022)).toBe(false);
        expect(isFirstDayInRange(calendarItem, 10, 0, undefined)).toBe(false);
    });
});

describe("isLastDayInRange tests", () => {
    test("should returns true if calendarItem matches the last day in the range", () => {
        const calendarItem = { year: 2022, month: 0, date: 20 };
        const secondDayNumber = 20;
        const secondMonthNumber = 0;
        const secondYearNumber = 2022;
        expect(
            isLastDayInRange(calendarItem, secondDayNumber, secondMonthNumber, secondYearNumber),
        ).toBe(true);
    });

    test("should returns false if calendarItem does not match the last day in the range", () => {
        const calendarItem = { year: 2022, month: 0, date: 25 };
        const secondDayNumber = 20;
        const secondMonthNumber = 0;
        const secondYearNumber = 2022;
        expect(
            isLastDayInRange(calendarItem, secondDayNumber, secondMonthNumber, secondYearNumber),
        ).toBe(false);
    });

    test("should returns false if secondDayNumber, secondMonthNumber, or secondYearNumber is not provided", () => {
        const calendarItem = { year: 2022, month: 0, date: 20 };
        expect(isLastDayInRange(calendarItem, undefined, 0, 2022)).toBe(false);
        expect(isLastDayInRange(calendarItem, 20, undefined, 2022)).toBe(false);
        expect(isLastDayInRange(calendarItem, 20, 0, undefined)).toBe(false);
    });
});

describe("getCurrentDate tests", () => {
    test("should returns current date in format DD/MM/YYYY", () => {
        const currentDate = new Date();
        const expectedDay =
            currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : `${currentDate.getDate()}`;
        const expectedMonth =
            currentDate.getMonth() + 1 < 10
                ? `0${currentDate.getMonth() + 1}`
                : `${currentDate.getMonth() + 1}`;
        const expectedYear = currentDate.getFullYear();
        const expectedDate = `${expectedDay}/${expectedMonth}/${expectedYear}`;
        expect(getCurrentDate()).toBe(expectedDate);
    });
});

describe("handleInputMask tests", () => {
    test("should returns input value with date mask applied for 6-digit input", () => {
        const inputValue = "030120";
        expect(handleInputMask(inputValue)).toBe("03/01/20");
    });

    test("should returns input value with date mask applied for 8-digit input", () => {
        const inputValue = "03012022";
        expect(handleInputMask(inputValue)).toBe("03/01/2022");
    });

    test("should returns input value without mask for input less than 6 digits", () => {
        const inputValue = "0301";
        expect(handleInputMask(inputValue)).toBe("03/01");
    });

    test("should returns input value without mask for input more than 8 digits", () => {
        const inputValue = "03012020";
        expect(handleInputMask(inputValue)).toBe("03/01/2020");
    });
});

describe("isToday tests", () => {
    test("should returns true if calendarItem matches today", () => {
        const currentDate = new Date();
        const today = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            date: currentDate.getDate(),
        };
        expect(isToday(today)).toBe(true);
    });

    test("should returns false if calendarItem does not match today", () => {
        const notToday = {
            year: 2022,
            month: 0,
            date: 1,
        };
        expect(isToday(notToday)).toBe(false);
    });
});

describe("isDayOff tests", () => {
    test("should returns true if calendarItem matches a weekend day (weekStartsOnSunday: false)", () => {
        const dayOffOne = { year: 2022, month: 0, date: 1 };
        const dayOffTwo = { year: 2022, month: 0, date: 2 };
        expect(isDayOff(dayOffOne, false)).toBe(true);
        expect(isDayOff(dayOffTwo, false)).toBe(true);
    });

    test("should returns false if calendarItem matches a weekday (weekStartsOnSunday: false)", () => {
        const weekday = { year: 2022, month: 0, date: 3 };
        expect(isDayOff(weekday, false)).toBe(false);
    });

    test("should returns true if calendarItem matches a weekend day (weekStartsOnSunday: true)", () => {
        const weekendFriday = { year: 2022, month: 0, date: 6 };
        const weekendSaturday = { year: 2022, month: 0, date: 7 };
        expect(isDayOff(weekendFriday, true)).toBe(false);
        expect(isDayOff(weekendSaturday, true)).toBe(true);
    });

    test("should returns false if calendarItem matches a weekday (weekStartsOnSunday: true)", () => {
        const weekday = { year: 2022, month: 0, date: 3 };
        expect(isDayOff(weekday, true)).toBe(false);
    });
});

describe("isHoliday tests", () => {
    const holidaysList = [
        { date: new Date(2022, 0, 1), title: "New Year" },
        { date: new Date(2022, 4, 9), title: "Victory Day" },
        { date: new Date(2022, 6, 4), title: "Independence Day" },
    ];

    test("should returns true if calendarItem matches a holiday", () => {
        const newYear2022 = { year: 2022, month: 0, date: 1 };
        const victoryDay2022 = { year: 2022, month: 4, date: 9 };
        const independenceDay2022 = { year: 2022, month: 6, date: 4 };
        expect(isHoliday(newYear2022, holidaysList)).toBe(true);
        expect(isHoliday(victoryDay2022, holidaysList)).toBe(true);
        expect(isHoliday(independenceDay2022, holidaysList)).toBe(true);
    });

    test("should returns false if calendarItem does not match a holiday", () => {
        const regularDay = { year: 2022, month: 2, date: 15 };
        expect(isHoliday(regularDay, holidaysList)).toBe(false);
    });
});

describe("getCalendarItems tests", () => {
    test("should returns calendar items array when all render values are provided", () => {
        const renderDay = "1";
        const renderMonth = "3";
        const renderYear = "2024";
        const weekStartsOnSunday = true;

        const calendarItems = getCalendarItems(
            renderDay,
            renderMonth,
            renderYear,
            weekStartsOnSunday,
        );

        const expectedLength = 42;
        expect(calendarItems).toHaveLength(expectedLength);
    });

    test("should returns null when render values are missing", () => {
        const weekStartsOnSunday = true;

        const calendarItems = getCalendarItems(undefined, undefined, undefined, weekStartsOnSunday);

        expect(calendarItems).toBeNull();
    });
});
