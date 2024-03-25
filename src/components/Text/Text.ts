import styled from "styled-components";

export const Text = styled.p`
    font-family: "Open Sans";
    font-weight: 600;
`;

interface TextErrorProps {
    $isOpen?: boolean;
}

export const TextError = styled.p<TextErrorProps>`
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: 400;
    color: red;
    font-size: 15px;
    text-align: center;
    overflow: hidden;
    transition: max-height 0.5s;
    max-height: ${({ $isOpen }) => ($isOpen ? "35px" : "0")};
`;

export const TextUnderline = styled(Text)`
    font-weight: 600;
    font-size: 15px;
    text-decoration: line-through;
    word-break: break-word;
`;

export const TextTitle = styled(Text)`
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
`;

export const DayWeekTitle = styled(Text)`
    width: 33px;
    font-weight: 900;
    padding: 6px 8px;
    line-height: 19px;
    font-size: 14px;
`;
