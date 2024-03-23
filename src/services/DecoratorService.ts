import { FC } from "react";

import { DatePicker } from "@/components/DatePicker/index";
import { DatePickerPropsType } from "@/types";

export type HocType = (calendar: FC<DatePickerPropsType>) => FC<DatePickerPropsType>;

export type HocTypeWithMinMaxDate = (
    minDate?: Date,
    maxDate?: Date,
) => (calendar: FC<DatePickerPropsType>) => FC<DatePickerPropsType>;

export type HocTypeWithoutMinMaxDate = (
    calendar: FC<DatePickerPropsType>,
) => FC<DatePickerPropsType>;

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

    // public addDecorators(
    //     decorators: (HocTypeWithMinMaxDate | HocTypeWithoutMinMaxDate)[],
    //     minDate?: Date,
    //     maxDate?: Date,
    // ) {
    //     let decoratedDatePicker = this.datePicker;
    //
    //     decorators.forEach((decorator) => {
    //         if (args.length !== 1) {
    //             decoratedDatePicker = (decorator as HocTypeWithMinMaxDate)(
    //                 minDate,
    //                 maxDate,
    //             )(decoratedDatePicker);
    //         } else {
    //             decoratedDatePicker = (decorator as HocTypeWithoutMinMaxDate)(decoratedDatePicker);
    //         }
    //     });
    //
    //     this.datePicker = decoratedDatePicker;
    // }

    public getDatePicker(): FC<DatePickerPropsType> {
        return this.datePicker;
    }
}
