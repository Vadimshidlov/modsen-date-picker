import { FC } from "react";

import { DatePicker } from "@/components/DatePicker/index";
import { DatePickerPropsType } from "@/types";

export type HocType = (calendar: FC<DatePickerPropsType>) => FC<DatePickerPropsType>;

export class DecoratorService {
    private datePicker: FC<DatePickerPropsType>;

    constructor() {
        this.datePicker = DatePicker;
    }

    public addDecorators(decorators: HocType[]) {
        decorators.forEach((decorator) => {
            this.datePicker = decorator(this.datePicker);
        });
    }

    public getDatePicker(): FC<DatePickerPropsType> {
        return this.datePicker;
    }
}
