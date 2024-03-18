import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/DatePicker";
import { DatePickerPropsType } from "@/components/DatePicker/DatePicker";

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
    maxDate: new Date(2024, 0, 31),
};

export const PrimaryWeekMode: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

PrimaryWeekMode.args = {
    weekStartsOnSunday: false,
    weekMode: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2024, 0, 31),
};

export const USACalendar: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

USACalendar.args = {
    weekStartsOnSunday: true,
    weekMode: false,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2024, 0, 31),
};

export const USACalendarWeekMode: StoryObj = (args: DatePickerPropsType) => (
    <DatePicker {...args} />
);

USACalendarWeekMode.args = {
    weekStartsOnSunday: true,
    weekMode: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2024, 0, 31),
};
