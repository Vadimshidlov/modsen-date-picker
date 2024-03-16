import styled from "styled-components";
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { Flex } from "@/components/Flex/index";
import { ReactComponent as CalendarIcon } from "@/assets/svg/Calendar.svg";
import { ReactComponent as ClearDateIcon } from "@/assets/svg/Clear.svg";
import { validateDate } from "@/utils/date/index";
import { TextError } from "@/components/Text/index";

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
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClearInput: () => void;
    setIsShowCalendar: (value: React.SetStateAction<boolean>) => void;
};

export function DateInput({
    value,
    handleInputChange,
    handleClearInput,
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
                    // onFocus={(e: FocusEvent<HTMLInputElement>) => {
                    //     const dateLength = e.currentTarget.value.length;
                    //     //
                    //     console.log(dateLength, `dateLength`);
                    //     //
                    //     // // e.target.setSelectionRange(dateLength, dateLength);
                    //     //
                    //     // // e.currentTarget.setSelectionRange(dateLength, dateLength);
                    //     // e.target.selectionStart = dateLength;
                    //     // e.target.selectionEnd = dateLength;
                    //
                    //     // setTimeout(() => {
                    //     //     const dateLength = e.currentTarget.value.length;
                    //     //     e.target.setSelectionRange(dateLength, dateLength);
                    //     // }, 0);
                    //
                    //     console.log(e.target);
                    //
                    //     e.target.setSelectionRange(dateLength, dateLength);
                    //     setTimeout(() => {
                    //         e.target.focus();
                    //         e.target.setSelectionRange(dateLength, dateLength);
                    //
                    //         console.log(e.target.selectionStart);
                    //         console.log(e.target.selectionEnd);
                    //     }, 0);
                    // }}
                />
                <Flex minWidth="15px">
                    {validateError === "" && value !== "" ? (
                        <StyledClearDateIcon onClick={handleClearInput} />
                    ) : null}
                </Flex>
            </Flex>
            <Flex>
                <TextError>{validateError}</TextError>
            </Flex>
        </Flex>
    );
}
