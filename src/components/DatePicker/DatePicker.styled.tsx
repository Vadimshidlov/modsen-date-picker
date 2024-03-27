import styled from "styled-components";
import * as React from "react";
import { ReactComponent as TodoIcon } from "@/assets/svg/to-do-list.svg";

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DatePickerStyled = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @font-face {
        font-family: ${({ theme }) => theme.fonts.fontFamily.openSans};
        src: url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap")
            format("ttf");
        font-weight: normal;
        font-style: normal;
    }
`;

export const DatePickerFormContainer = styled(Flex)`
    margin: 20px 0px 0px 0px;
`;

export const TodoToltipContainer = styled(Flex)`
    margin: 10px 0px 10px 0px;
    flex-direction: row;
    column-gap: 10px;
    margin: 10px 0px 10px 0px;
    justify-content: center;
`;

export const TodoIconStyled = styled(TodoIcon)`
    width: 20px;
    height: 20px;
`;
