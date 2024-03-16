import styled from "styled-components";
import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { Flex } from "@/components/Flex/index";
import { ReactComponent as CalendarIcon } from "@/assets/svg/Calendar.svg";
import { ReactComponent as ClearDateIcon } from "@/assets/svg/Clear.svg";
import { validateDate } from "@/utils/date/index";
import { TextError } from "@/components/Text/index";
import { DatePickerActionType } from "@/components/DatePicker/DatePicker";

export const DateInputStyled = styled.input`
    outline: none;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 15px;
    line-height: normal;
    width: 80%;
    outline: none;
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
    // handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    // handleClearInput: () => void;
    setIsShowCalendar: (value: React.SetStateAction<boolean>) => void;
    dispatch: React.Dispatch<DatePickerActionType>;
};

export function DateInput({
    value,
    dispatch,
    // handleInputChange,
    // handleClearInput,
    setIsShowCalendar,
}: DateInputProps) {
    const [validateError, setValidateError] = useState("");

    // const inputRef = useRef<HTMLInputElement>(null);
    //
    // useEffect(() => {
    //     if (!inputRef.current) return;
    //
    //     inputRef.current.setSelectionRange(value.length, value.length);
    // }, [value]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setValue(e.target.value);

        let inputValue = e.target.value;
        inputValue = inputValue.replace(/\D/g, "");

        if (inputValue.length > 4) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4)}`;
        } else if (inputValue.length > 2) {
            inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
        }

        // dispatch({
        //     type: "SET_FIRST_CALENDAR_DATE",
        //     payload: {
        //         dateValue: inputValue,
        //     },
        // });

        dispatch({
            type: "SET_CALENDAR_AND_PICKER_DATE",
            payload: {
                dateValue: inputValue,
            },
        });
    };

    const handleClearInputDate = () => {
        dispatch({
            type: "SET_FIRST_CALENDAR_DATE",
            payload: {
                dateValue: "",
            },
        });
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
                    // ref={inputRef}
                    type="text"
                    placeholder="Choose Date"
                    value={value}
                    onChange={handleInputChange}
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
