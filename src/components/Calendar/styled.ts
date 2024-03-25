import styled from "styled-components";

export const EmptyWeek = styled.div`
    height: 32px;
    width: 100%;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DaysTitleContainer = styled(Flex)`
    flex-direction: row;
    justify-content: center;
`;

export const CalendarContainer = styled(Flex)`
    width: 250px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export const CalendarButtonsContainer = styled(Flex)`
    padding-top: 10px;
    flex-direction: row;
    justify-content: space-between;
`;

export const CalendarButtonsBlock = styled(Flex)`
    flex-direction: row;
    justify-content: space-between;
    column-gap: 8px;
    align-items: center;
`;

export const CalendarDaysContainer = styled(Flex)`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const CalendarTitleContainer = styled(Flex)`
    align-items: center;
    justify-content: center;
`;
