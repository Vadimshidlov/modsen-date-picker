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
};

export const PrimaryWeekMode: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

PrimaryWeekMode.args = {
    weekStartsOnSunday: false,
    weekMode: true,
};

export const USACalendar: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

USACalendar.args = {
    weekStartsOnSunday: true,
    weekMode: false,
};

export const USACalendarWeekMode: StoryObj = (args: DatePickerPropsType) => (
    <DatePicker {...args} />
);

USACalendarWeekMode.args = {
    weekStartsOnSunday: true,
    weekMode: true,
};
