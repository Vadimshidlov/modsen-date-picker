export const REVERSE_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const DEFAULT_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const MONTH_NAMES: Record<string, string> = {
    "01": "January",
    "1": "January",
    "02": "February",
    "2": "February",
    "03": "March",
    "3": "March",
    "04": "April",
    "4": "April",
    "05": "May",
    "5": "May",
    "06": "June",
    "6": "June",
    "07": "July",
    "7": "July",
    "08": "August",
    "8": "August",
    "09": "September",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
};

export const BUTTON_TYPE_START_RANGE = "START_RANGE";
export const BUTTON_TYPE_WITHIN_RANGE = "WITHIN_RANGE";
export const BUTTON_TYPE_END_RANGE = "END_RANGE";
export const BUTTON_TYPE_INVALID_DAY = "INVALID_DAY";
export const BUTTON_TYPE_CURRENT_DAY = "CURRENT_DAY";
export const BUTTON_TYPE_CURRENT_MONTH_DAY = "CURRENT_MONTH_DAY";

export const SET_CALENDAR_DATE = "SET_CALENDAR_DATE";
export const SET_FIRST_CALENDAR_DATE = "SET_FIRST_CALENDAR_DATE";
export const SET_SECOND_CALENDAR_DATE = "SET_SECOND_CALENDAR_DATE";
export const CLEAR_SECOND_CALENDAR_DATE = "CLEAR_SECOND_CALENDAR_DATE";
export const SET_CALENDAR_AND_PICKER_DATE = "SET_CALENDAR_AND_PICKER_DATE";
export const СLEAR_CALENDAR_AND_PICKER_DATE = "СLEAR_CALENDAR_AND_PICKER_DATE";
export const CLEAR_FIRST_PICKER_DATE = "CLEAR_FIRST_PICKER_DATE";
export const СLEAR_PICKER_DATES = "СLEAR_PICKER_DATES";
export const SET_TODO_DATE = "SET_TODO_DATE";
export const CLEAR_TODO_DATE = "CLEAR_TODO_DATE";

export type HolidaysListType = {
    title: string;
    date: Date;
};

export const DEFAULT_HOLIDAYS: HolidaysListType[] = [
    // 2023
    {
        title: "New Year's Day",
        date: new Date(2023, 0, 1),
    },
    {
        title: "Orthodox Christmas Eve",
        date: new Date(2023, 0, 6),
    },
    {
        title: "Orthodox Christmas Day",
        date: new Date(2023, 0, 7),
    },
    {
        title: "Defender of the Fatherland Day",
        date: new Date(2023, 1, 23),
    },
    {
        title: "International Women's Day",
        date: new Date(2023, 2, 8),
    },
    {
        title: "International Labor Day",
        date: new Date(2023, 4, 1),
    },
    {
        title: "Victory Day",
        date: new Date(2023, 4, 9),
    },
    {
        title: "Commemoration Day",
        date: new Date(2023, 4, 14),
    },
    {
        title: "Independence Day",
        date: new Date(2023, 6, 3),
    },
    {
        title: "October Revolution Day",
        date: new Date(2023, 10, 7),
    },
    {
        title: "Christmas Day",
        date: new Date(2023, 11, 25),
    },
    // 2024
    {
        title: "New Year's Day",
        date: new Date(2024, 0, 1),
    },
    {
        title: "Orthodox Christmas Eve",
        date: new Date(2024, 0, 6),
    },
    {
        title: "Orthodox Christmas Day",
        date: new Date(2024, 0, 7),
    },
    {
        title: "Defender of the Fatherland Day",
        date: new Date(2024, 1, 23),
    },
    {
        title: "International Women's Day",
        date: new Date(2024, 2, 8),
    },
    {
        title: "International Labor Day",
        date: new Date(2024, 4, 1),
    },
    {
        title: "Victory Day",
        date: new Date(2024, 4, 9),
    },
    {
        title: "Commemoration Day",
        date: new Date(2024, 4, 14),
    },
    {
        title: "Independence Day",
        date: new Date(2024, 6, 3),
    },
    {
        title: "October Revolution Day",
        date: new Date(2024, 10, 7),
    },
    {
        title: "Christmas Day",
        date: new Date(2024, 11, 25),
    },
    // 2025
    {
        title: "New Year's Day",
        date: new Date(2025, 0, 1),
    },
    {
        title: "Orthodox Christmas Eve",
        date: new Date(2025, 0, 6),
    },
    {
        title: "Orthodox Christmas Day",
        date: new Date(2025, 0, 7),
    },
    {
        title: "Defender of the Fatherland Day",
        date: new Date(2025, 1, 23),
    },
    {
        title: "International Women's Day",
        date: new Date(2025, 2, 8),
    },
    {
        title: "International Labor Day",
        date: new Date(2025, 4, 1),
    },
    {
        title: "Victory Day",
        date: new Date(2025, 4, 9),
    },
    {
        title: "Commemoration Day",
        date: new Date(2025, 4, 14),
    },
    {
        title: "Independence Day",
        date: new Date(2025, 6, 3),
    },
    {
        title: "October Revolution Day",
        date: new Date(2025, 10, 7),
    },
    {
        title: "Christmas Day",
        date: new Date(2025, 11, 25),
    },
    // 2026
    {
        title: "New Year's Day",
        date: new Date(2026, 0, 1),
    },
    {
        title: "Orthodox Christmas Eve",
        date: new Date(2026, 0, 6),
    },
    {
        title: "Orthodox Christmas Day",
        date: new Date(2026, 0, 7),
    },
    {
        title: "Defender of the Fatherland Day",
        date: new Date(2026, 1, 23),
    },
    {
        title: "International Women's Day",
        date: new Date(2026, 2, 8),
    },
    {
        title: "International Labor Day",
        date: new Date(2026, 4, 1),
    },
    {
        title: "Victory Day",
        date: new Date(2026, 4, 9),
    },
    {
        title: "Commemoration Day",
        date: new Date(2026, 4, 14),
    },
    {
        title: "Independence Day",
        date: new Date(2026, 6, 3),
    },
    {
        title: "October Revolution Day",
        date: new Date(2026, 10, 7),
    },
    {
        title: "Christmas Day",
        date: new Date(2026, 11, 25),
    },
];
