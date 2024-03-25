import * as React from "react";
import { ChangeEvent, useState } from "react";
import { ReactComponent as CalendarIcon } from "@/assets/svg/Calendar.svg";
import { TextError } from "@/components/Text/index";
import {
    CLEAR_SECOND_CALENDAR_DATE,
    SET_CALENDAR_AND_PICKER_DATE,
    SET_SECOND_CALENDAR_DATE,
    СLEAR_CALENDAR_AND_PICKER_DATE,
} from "@/constants";
import {
    handleInputMask,
    validateInputMinMaxDate,
    validateRangeInput,
} from "@/utils/date/calendarDate";
import {
    DateInputContainer,
    DateInputStyled,
    IconContainer,
    InputContainer,
    StyledClearDateIcon,
    ValidationError,
} from "@/components/DateInput/index";
import { DateInputProps } from "@/types/types";
import { validateDate } from "@/utils/date";

export function DateInput({
    value,
    dateRangeFirstValue,
    dateRangeSecondValue,
    dispatch,
    setIsShowCalendar,
    minDate,
    maxDate,
    isFirstDate,
    isWithRange,
}: DateInputProps) {
    const [validateError, setValidateError] = useState("");

    const handleValidationError = (
        inputValue: string,
        isValidDate: boolean,
        isMinMaxValidate: boolean,
        isValidRange: boolean,
    ) => {
        if (inputValue.length === 10 && !isValidDate) {
            setValidateError("Invalid Date");
        } else if (inputValue.length === 10 && !isMinMaxValidate) {
            setValidateError("The Date should be in range within min and max dates");
        } else if (inputValue.length === 10 && !isValidRange) {
            setValidateError("Incorrect date for the range");
        } else {
            setValidateError("");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = handleInputMask(e.target.value);

        if (inputValue.length > 10) return;

        const isValidDate = validateDate(inputValue);
        const isMinMaxValidate = validateInputMinMaxDate(minDate, maxDate, inputValue);
        const rangeValue = isFirstDate ? dateRangeSecondValue : dateRangeFirstValue;
        const isValidRange = validateRangeInput(inputValue, rangeValue, isFirstDate);

        handleValidationError(inputValue, isValidDate, isMinMaxValidate, isValidRange);

        if ((isWithRange && isFirstDate) || !isWithRange) {
            const isValidInput =
                validateInputMinMaxDate(minDate, maxDate, inputValue) &&
                isValidRange &&
                isValidDate;

            dispatch({
                type: SET_CALENDAR_AND_PICKER_DATE,
                payload: {
                    dateValue: inputValue,
                    dateRangeFirstValue: isValidInput ? inputValue : "",
                },
            });

            return;
        }

        const isValidInput =
            validateInputMinMaxDate(minDate, maxDate, inputValue) && isValidRange && isValidDate;

        dispatch({
            type: SET_SECOND_CALENDAR_DATE,
            payload: {
                dateValue: inputValue,
                dateRangeSecondValue: isValidInput ? inputValue : "",
            },
        });
    };

    const handleClearInputDate = () => {
        setValidateError("");

        if ((isWithRange && isFirstDate) || !isWithRange) {
            dispatch({
                type: СLEAR_CALENDAR_AND_PICKER_DATE,
                payload: {
                    dateValue: "",
                },
            });

            return;
        }

        dispatch({
            type: CLEAR_SECOND_CALENDAR_DATE,
            payload: {
                dateValue: "",
            },
        });
    };

    return (
        <DateInputContainer>
            <InputContainer>
                <CalendarIcon
                    data-testid="close-calendar-icon"
                    onClick={() => setIsShowCalendar((prev) => !prev)}
                />
                <DateInputStyled
                    type="text"
                    data-testid="date-input"
                    placeholder="Choose Date"
                    value={value}
                    onChange={handleInputChange}
                    $isValid={validateError === ""}
                />
                <IconContainer>
                    {value !== "" ? <StyledClearDateIcon onClick={handleClearInputDate} /> : null}
                </IconContainer>
            </InputContainer>
            <ValidationError>
                <TextError $isOpen={validateError !== ""}>{validateError}</TextError>
            </ValidationError>
        </DateInputContainer>
    );
}
