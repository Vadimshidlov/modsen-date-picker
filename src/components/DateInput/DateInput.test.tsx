import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { DateInput } from "@/components/DateInput/index";

const dispatchMock = jest.fn();

describe("DateInput", () => {
    const minDate = new Date("2022-01-01");
    const maxDate = new Date("2022-12-31");

    test("renders with initial value", () => {
        const { getByPlaceholderText } = render(
            <DateInput
                value="01/01/2022"
                dateRangeFirstValue=""
                dateRangeSecondValue=""
                setIsShowCalendar={() => {}}
                dispatch={dispatchMock}
                minDate={minDate}
                maxDate={maxDate}
                isWithRange={false}
                isFirstDate
            />,
        );
        const inputElement = getByPlaceholderText("Choose Date");
        expect(inputElement.getAttribute("value")).toBe("01/01/2022");
    });

    test("triggers onChange event", () => {
        const { getByPlaceholderText } = render(
            <DateInput
                value=""
                dateRangeFirstValue=""
                dateRangeSecondValue=""
                setIsShowCalendar={() => {}}
                dispatch={dispatchMock}
                minDate={minDate}
                maxDate={maxDate}
                isWithRange={false}
                isFirstDate
            />,
        );
        const inputElement = getByPlaceholderText("Choose Date");
        fireEvent.change(inputElement, { target: { value: "01/01/2022" } });
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
