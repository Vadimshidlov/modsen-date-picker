import { DatePicker } from "@/components/DatePicker/index";
import { DatePickerPropsType, DatePickerServiceTypes, HocTypes } from "@/types";

export class DecoratorService {
    private datePicker: DatePickerServiceTypes;

    constructor() {
        this.datePicker = DatePicker;
    }

    public addDecorator(decorator: HocTypes<DatePickerPropsType>) {
        this.datePicker = decorator(this.datePicker);
    }

    public getDatePicker() {
        return this.datePicker;
    }
}
