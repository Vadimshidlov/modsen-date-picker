import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex } from "@/components/Flex/index";
import { ReactComponent as CalendarIcon } from "@/assets/svg/Calendar.svg";
import { ReactComponent as ClearDateIcon } from "@/assets/svg/Clear.svg";
import { validateDate } from "@/utils/date/index";
import { TextError } from "@/components/Text/index";
import { DatePickerActionType } from "@/components/DatePicker/DatePicker";
import { validateInputMinMaxDate } from "@/utils/date/calendarDate";

export const DateInputStyled = styled.input<{ $isValid: boolean }>`
    outline: none;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 15px;
    line-height: normal;
    width: 80%;
    outline: none;
    color: ${({ $isValid }) => ($isValid ? "inherit" : "red")};
`;

const StyledClearDateIcon = styled(ClearDateIcon)`
    cursor: pointer;
    transition: all 1s;

    &:hover {
        opacity: 0.5;
    }
`;

export type DateInputProps = {
    value: string;
    setIsShowCalendar: (value: React.SetStateAction<boolean>) => void;
    dispatch: React.Dispatch<DatePickerActionType>;
    minDate: Date;
    maxDate: Date;
};

export function DateInput({
    value,
    dispatch,
    setIsShowCalendar,
    minDate,
    maxDate,
}: DateInputProps) {
    const [validateError, setValidateError] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
        } else if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        }

        dispatch({
            type: "SET_CALENDAR_AND_PICKER_DATE",
            payload: {
                dateValue: inputValue,
            },
        });
    };

    const handleClearInputDate = () => {
        dispatch({
            type: "SET_CALENDAR_AND_PICKER_DATE",
            payload: {
                dateValue: "",
            },
        });

        setIsShowCalendar(false);
    };

    useEffect(() => {
        console.log(validateError);
    }, [validateError]);

    useEffect(() => {
        if (value === "") {
            setValidateError("");
            return;
        }

        if (!validateDate(value)) {
            setValidateError("Date should be in DD/MM/YYYY format.");
            setIsShowCalendar(false);
        } else {
            setValidateError("");
            setIsShowCalendar(true);
        }
    }, [setIsShowCalendar, value]);

    return (
        <Flex direction="column" maxWidth="250px">
            <Flex
                align="center"
                border="1px solid #dddddd"
                borderRadius="8px"
                padding="8px 15px"
                height="42px"
                columnGap="8px"
                margin="0 0 8px 0"
            >
                <CalendarIcon />
                <DateInputStyled
                    type="text"
                    placeholder="Choose Date"
                    value={value}
                    onChange={handleInputChange}
                    $isValid={validateInputMinMaxDate(minDate, maxDate, value)}
                />
                <Flex minWidth="15px">
                    {validateError === "" && value !== "" ? (
                        <StyledClearDateIcon onClick={handleClearInputDate} />
                    ) : null}
                </Flex>
            </Flex>
            <Flex>
                <TextError>{validateError}</TextError>
            </Flex>
        </Flex>
    );
}
