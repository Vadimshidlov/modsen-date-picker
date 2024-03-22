import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/DatePicker";
import { DatePickerPropsType } from "@/types";
import { withRange, withWeekMode, withWeekSundayWeek } from "@/hocs/";
import { DecoratorService } from "@/services/DecoratorService";

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
};

export const PrimaryWeekMode: StoryObj = (args: DatePickerPropsType) => <DatePicker {...args} />;

PrimaryWeekMode.args = {
    weekStartsOnSunday: false,
    weekMode: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
    withRange: false,
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
};

export const withRangeAngWeekModeHOC: StoryObj = (args: DatePickerPropsType) => {
    const DatePickerWithRange = withWeekMode(withRange(DatePicker));
    return <DatePickerWithRange {...args} />;
};

withRangeAngWeekModeHOC.args = {
    weekStartsOnSunday: true,
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
};

const decoratorService = new DecoratorService();

decoratorService.addDecorators([withRange, withWeekMode]);
// decoratorService.addDecorators([withRange, withWeekMode, withWeekSundayWeek]);
// decoratorService.addDecorators([withRange, withWeekMode, withWeekSundayWeek]);

const DatePickerWithHOCS = decoratorService.getDatePicker();

export const DatePickerFromService: StoryObj = (args: DatePickerPropsType) => {
    return <DatePickerWithHOCS {...args} />;
};

DatePickerFromService.args = {
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2025, 0, 31),
};
