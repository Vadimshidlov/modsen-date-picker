import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/DatePicker";
import { DatePickerPropsType } from "@/types";
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

export const PrimaryWithRange: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

PrimaryWithRange.args = {
    weekStartsOnSunday: false,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withHolidays: true,
    withRange: true,
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

export const USACalendarWithRange: StoryObj = (args: DatePickerPropsType) => (
    <DatePicker {...args} />
);

USACalendarWithRange.args = {
    weekStartsOnSunday: true,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: true,
};
