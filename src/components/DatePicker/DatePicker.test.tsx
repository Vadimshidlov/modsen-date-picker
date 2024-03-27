import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DatePicker } from "@/components/DatePicker";

describe("DatePicker tests", () => {
    it("should correct handle invalid date", async () => {
        const { getByTestId } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2023, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange={false}
                weekStartsOnSunday={false}
                weekMode={false}
            />,
        );

        const inputElement = getByTestId("date-input");
        fireEvent.change(inputElement, { target: { value: "01/01/2022" } });

        expect(
            screen.getByText("The Date should be in range within min and max dates"),
        ).toBeInTheDocument();
    });

    it("should open and close calendar after calendar icon click", async () => {
        const { getByTestId } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2022, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange={false}
                weekStartsOnSunday={false}
                weekMode={false}
            />,
        );

        const inputElement = getByTestId("date-input");
        const openCalendarIcon = getByTestId("close-calendar-icon");

        fireEvent.change(inputElement, { target: { value: "01/01/2022" } });
        fireEvent.click(openCalendarIcon);

        await waitFor(() => {
            const calendar = getByTestId("calendar");
            expect(calendar).toBeInTheDocument();
        });

        fireEvent.click(openCalendarIcon);

        await waitFor(() => {});
    });

    it("should correct select calendar day", async () => {
        const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2022, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange={false}
                weekStartsOnSunday={false}
                weekMode={false}
            />,
        );

        const inputElement = getByTestId("date-input");
        const openCalendarIcon = getByTestId("close-calendar-icon");

        fireEvent.change(inputElement, { target: { value: "01/05/2022" } });

        fireEvent.click(openCalendarIcon);

        expect(getByTestId("selected-day").textContent).toBe("1");

        fireEvent.change(inputElement, { target: { value: "05/05/2022" } });

        expect(getByTestId("selected-day").textContent).toBe("5");

        fireEvent.change(inputElement, { target: { value: "03/05/2022" } });

        expect(getByTestId("selected-day").textContent).toBe("3");
    });

    it("should correct select calendar days with Range and year mode", async () => {
        const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2022, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange
                weekStartsOnSunday={false}
                weekMode={false}
            />,
        );

        const inputs = getAllByTestId("date-input");
        expect(inputs.length).toBe(2);

        const fistInput = inputs[0];
        const secondInput = inputs[1];

        const openCalendarIcons = getAllByTestId("close-calendar-icon");
        const firstCalendarIcon = openCalendarIcons[0];

        if (firstCalendarIcon) {
            fireEvent.click(firstCalendarIcon);
        }

        if (fistInput) {
            fireEvent.change(fistInput, { target: { value: "01/05/2022" } });
        }

        if (secondInput) {
            fireEvent.change(secondInput, { target: { value: "05/05/2022" } });
        }

        expect(getByTestId("start-range-day").textContent).toBe("1");
        expect(getByTestId("end-range-day").textContent).toBe("5");

        if (fistInput) {
            fireEvent.change(fistInput, { target: { value: "01/05/2022" } });
        }

        if (secondInput) {
            fireEvent.change(secondInput, { target: { value: "10/05/2022" } });
        }

        expect(getByTestId("start-range-day").textContent).toBe("1");
        expect(getByTestId("end-range-day").textContent).toBe("10");

        if (fistInput) {
            fireEvent.change(fistInput, { target: { value: "10/05/2022" } });
        }

        if (secondInput) {
            fireEvent.change(secondInput, { target: { value: "5/05/2022" } });
        }

        expect(getByText("Incorrect date for the range")).toBeInTheDocument();
    });

    it("should correct select calendar days with Range and week mode", async () => {
        const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2022, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange
                weekStartsOnSunday={false}
                weekMode
            />,
        );

        const inputs = getAllByTestId("date-input");
        expect(inputs.length).toBe(2);

        const fistInput = inputs[0];
        const secondInput = inputs[1];

        const openCalendarIcons = getAllByTestId("close-calendar-icon");
        const firstCalendarIcon = openCalendarIcons[0];

        if (firstCalendarIcon) {
            fireEvent.click(firstCalendarIcon);
        }

        if (fistInput) {
            fireEvent.change(fistInput, { target: { value: "28/05/2022" } });
        }

        if (secondInput) {
            fireEvent.change(secondInput, { target: { value: "31/05/2022" } });
        }

        const nextWeekButton = getByTestId("next-week-button");
        const prevWeekButton = getByTestId("next-week-button");
        expect(nextWeekButton).toBeInTheDocument();
        expect(prevWeekButton).toBeInTheDocument();

        expect(getByTestId("start-range-day")).toBeInTheDocument();
        expect(getByTestId("start-range-day").textContent).toBe("28");

        fireEvent.click(nextWeekButton);

        expect(getByTestId("end-range-day")).toBeInTheDocument();
        expect(getByTestId("end-range-day").textContent).toBe("31");

        if (secondInput) {
            fireEvent.change(secondInput, { target: { value: "30/05/2022" } });
        }

        expect(getByTestId("end-range-day")).toBeInTheDocument();
        expect(getByTestId("end-range-day").textContent).toBe("30");

        fireEvent.click(prevWeekButton);

        if (fistInput) {
            fireEvent.change(fistInput, { target: { value: "31/05/2022" } });
        }

        expect(getByText("Incorrect date for the range")).toBeInTheDocument();
    });

    it("should correct select calendar days for year and month mode with input validation", async () => {
        const { getByTestId, getAllByTestId, getAllByText, getByText } = render(
            <DatePicker
                minDate={(new Date(2022, 0, 1), new Date(2022, 0, 1))}
                maxDate={(new Date(2023, 0, 1), new Date(2023, 0, 1))}
                withHolidays
                holidaysList={[]}
                withRange={false}
                weekStartsOnSunday={false}
                weekMode={false}
            />,
        );

        const input = getByTestId("date-input");
        expect(input).toBeInTheDocument();

        const openCalendarIcon = getByTestId("close-calendar-icon");

        if (openCalendarIcon) {
            fireEvent.click(openCalendarIcon);
        }

        fireEvent.change(input, { target: { value: "28/05/2022" } });

        const nextYearButton = getByTestId("next-year-button");
        const nextMonthButton = getByTestId("next-month-button");
        const prevYearButton = getByTestId("prev-year-button");
        const prevMonthButton = getByTestId("prev-month-button");
        const dateInput = getByTestId("date-input");

        expect(nextYearButton).toBeInTheDocument();
        expect(nextMonthButton).toBeInTheDocument();
        expect(prevYearButton).toBeInTheDocument();
        expect(prevMonthButton).toBeInTheDocument();

        expect(getByTestId("selected-day")).toBeInTheDocument();
        expect(getByTestId("selected-day").textContent).toBe("28");

        fireEvent.change(dateInput, { target: { value: "30/05/2022" } });

        expect(getByTestId("selected-day")).toBeInTheDocument();
        expect(getByTestId("selected-day").textContent).toBe("30");

        fireEvent.change(dateInput, { target: { value: "30/20/2022" } });

        expect(getByText("Invalid Date")).toBeInTheDocument();

        fireEvent.change(dateInput, { target: { value: "30/05/2021" } });

        expect(
            getByText("The Date should be in range within min and max dates"),
        ).toBeInTheDocument();

        fireEvent.change(dateInput, { target: { value: "30/05/2025" } });

        expect(
            getByText("The Date should be in range within min and max dates"),
        ).toBeInTheDocument();

        fireEvent.change(dateInput, { target: { value: "25/05/2022" } });

        expect(getByTestId("selected-day")).toBeInTheDocument();
        expect(getByTestId("selected-day").textContent).toBe("25");
    });
});
