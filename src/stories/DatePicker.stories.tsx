import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/DatePicker";
import { DatePickerPropsType } from "@/types";
import { withRange, withWeekMode, withWeekSundayWeek, withMinMaxDate, withHolidays } from "@/hocs/";
import { DecoratorService } from "@/services/DecoratorService";
import { DEFAULT_HOLIDAYS } from "@/constants";

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
    argTypes: {
        weekStartsOnSunday: {
            control: { type: "boolean" },
        },
        weekMode: {
            control: { type: "boolean" },
        },
    },
};

export default meta;

export const Primary: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

Primary.args = {
    weekStartsOnSunday: false,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: false,
    withHolidays: true,
    holidaysList: DEFAULT_HOLIDAYS,
};

export const PrimaryWeekMode: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

PrimaryWeekMode.args = {
    weekStartsOnSunday: false,
    weekMode: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: false,
    withHolidays: true,
    holidaysList: DEFAULT_HOLIDAYS,
};

export const USACalendar: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

USACalendar.args = {
    weekStartsOnSunday: true,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: false,
};

export const USACalendarWeekMode: StoryObj = (args: DatePickerPropsType) => (
    <DatePicker {...args} />
);

USACalendarWeekMode.args = {
    weekStartsOnSunday: true,
    weekMode: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: false,
};

export const withRangeHOC: StoryObj = (args: DatePickerPropsType) => {
    const DatePickerWithRange = withRange(DatePicker);
    return <DatePickerWithRange {...args} />;
};

withRangeHOC.args = {
    weekStartsOnSunday: true,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withHolidays: true,
    holidaysList: DEFAULT_HOLIDAYS,
};

export const withRangeAndWeekMode: StoryObj = (args: DatePickerPropsType) => {
    const DatePickerWithRange = withWeekMode(withRange(DatePicker));
    return <DatePickerWithRange {...args} />;
};

withRangeAndWeekMode.args = {
    weekStartsOnSunday: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withHolidays: true,
    holidaysList: DEFAULT_HOLIDAYS,
};

// const decoratorService = new DecoratorService();
//
// decoratorService.addDecorators([withRange, withWeekMode]);
//
// const DatePickerWithHOCS = decoratorService.getDatePicker();
//
// export const DatePickerFromService: StoryObj = (args: DatePickerPropsType) => {
//     return <DatePickerWithHOCS {...args} />;
// };
//
// DatePickerFromService.args = {
//     withHolidays: true,
//     holidaysList: DEFAULT_HOLIDAYS,
// };
//
// const decoratorSecondService = new DecoratorService();
//
// decoratorSecondService.addDecorators([
//     withRange,
//     withMinMaxDate(new Date(2020, 0, 1), new Date(2030, 0, 1)),
// ]);
//
// const DatePickerWithMinMax = decoratorSecondService.getDatePicker();
//
// export const DatePickerFromServiceWithMinMax: StoryObj = (args: DatePickerPropsType) => {
//     return <DatePickerWithMinMax {...args} />;
// };
//
// DatePickerFromServiceWithMinMax.args = {};
//
// const decoratorThirdService = new DecoratorService();
//
// decoratorThirdService.addDecorators([
//     withRange,
//     withMinMaxDate(new Date(2020, 0, 1), new Date(2030, 0, 1)),
//     withHolidays([
//         { title: "International Women's Day", date: new Date(2023, 2, 8) },
//         { title: "International Women's Day", date: new Date(2024, 2, 8) },
//         { title: "International Women's Day", date: new Date(2025, 2, 8) },
//     ]),
// ]);
//
// const DatePickerWithHolidays = decoratorThirdService.getDatePicker();
//
// export const DatePickerFromServiceWithHolidays: StoryObj = (args: DatePickerPropsType) => {
//     return <DatePickerWithHolidays {...args} />;
// };
//
// DatePickerFromServiceWithHolidays.args = {};
