/* eslint-disable react/no-array-index-key */
import { Flex } from "@/components/Flex";
import { CurrentDayWeekButton, DayButton, DayWeekButton } from "@/components/DayButton/index";
import { ReactComponent as PrevMonthButton } from "@/assets/svg/prev-button.svg";
import { ReactComponent as NextMonthButton } from "@/assets/svg/next-button.svg";
import { Button } from "@/components/Button/index";
import { Text } from "@/components/Text/index";
import { CalendarItemsType } from "@/components/DatePicker/DatePicker";

const REVERSE_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DEFAULT_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const months: Record<string, string> = {
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

export const getMontName = (dateValue: string): null | string => {
    const dateList = dateValue.split("/");

    if (typeof dateList[1] === "undefined") return null;

    const monthName = months[dateList[1]];

    return typeof monthName !== "undefined" ? monthName : null;
};

export const getMontNumber = (dateValue: string): null | number => {
    const dateList = dateValue.split("/");

    console.log(dateValue, `dateValue getMontNumber helper`);

    if (typeof dateList[1] === "undefined") return null;

    // const monthNumber = +dateList[1] - 1 === 11 ? 0 : +dateList[1] - 1;
    const monthNumber = +dateList[1] - 1;

    return typeof monthNumber !== "undefined" ? monthNumber : null;
};

/* export const getYearNumber = (dateValue: string): null | number => {
    const dateList = dateValue.split("/");

    console.log(dateValue, `dateValue getMontNumber helper`);

    if (typeof dateList[2] === "undefined") return null;

    // const monthNumber = +dateList[1] - 1 === 11 ? 0 : +dateList[1] - 1;
    const monthNumber = +dateList[2];

    return typeof monthNumber !== "undefined" ? monthNumber : null;
}; */

export const getDateValues = (dateValue: string): number[] => {
    const dateList = dateValue.split("/");

    console.log(dateValue, `dateValue getMontNumber helper`);

    if (
        typeof dateList[0] === "undefined" ||
        typeof dateList[1] === "undefined" ||
        typeof dateList[2] === "undefined"
    )
        return [];

    // const monthNumber = +dateList[1] - 1 === 11 ? 0 : +dateList[1] - 1;
    // const monthNumber = +dateList[2];

    return [+dateList[0], +dateList[1] - 1, +dateList[2]];

    // return typeof monthNumber !== "undefined" ? monthNumber : null;
};

export type CalendarPropsType = {
    calendarItems: CalendarItemsType[];
    weekStartsOnSunday: boolean;
    dateValue: string;
    handleSetDate: (dateValue: string) => void;
};

export function Calendar({
    calendarItems,
    weekStartsOnSunday,
    dateValue,
    handleSetDate,
}: CalendarPropsType) {
    const DAYS = weekStartsOnSunday ? REVERSE_DAYS : DEFAULT_DAYS;
    // const monthNumber = getMontNumber(dateValue);
    const [dayNumber, monthNumber, yearNumber] = getDateValues(dateValue);

    console.log(dateValue, `monthNumber`);
    console.log(monthNumber, `monthNumber`);

    return (
        <Flex direction="column" width="250px" padding="10px" border="1px solid #dddddd">
            <Flex columnGap="44px" justify="space-between">
                <Button>
                    {null}
                    <PrevMonthButton />
                </Button>
                <Text>{getMontName(dateValue)}</Text>
                <Button>
                    {null}
                    <NextMonthButton />
                </Button>
            </Flex>
            <Flex>
                {DAYS.map((day) => (
                    <DayWeekButton key={day} width="33px" height="33px">
                        {day}
                    </DayWeekButton>
                ))}
            </Flex>
            <Flex flexWrap="wrap" align="center" justify="center">
                {calendarItems.map((calendarItem, index) => {
                    // console.log(calendarItem, `calendarItem`);
                    if (
                        calendarItem.month === monthNumber &&
                        calendarItem.year === yearNumber &&
                        calendarItem.date === dayNumber
                    ) {
                        console.log("I have found it!");

                        return (
                            <CurrentDayWeekButton
                                key={index.toString()}
                                onClick={() => {
                                    handleSetDate(
                                        `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                    );
                                }}
                            >
                                {calendarItem.date}
                            </CurrentDayWeekButton>
                        );
                    }

                    return Number.isInteger(monthNumber) && calendarItem.month !== monthNumber ? (
                        <DayButton
                            color="#AAAAAA"
                            key={index.toString()}
                            onClick={() => {
                                handleSetDate(
                                    `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
                                );
                            }}
                        >
                            {calendarItem.date}
                        </DayButton>
                    ) : (
                        <DayButton
                            key={index.toString()}
                            onClick={() => {
                                handleSetDate(
                                    `${calendarItem.date}/${calendarItem.month + 1}/${calendarItem.year}`,
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
