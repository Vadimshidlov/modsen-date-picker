import styled from "styled-components";

export const Text = styled.p`
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
`;

interface TextErrorProps {
    $isOpen?: boolean;
}

export const TextError = styled.p<TextErrorProps>`
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: ${({ theme }) => theme.sizes.s15};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.s};
    color: ${({ theme }) => theme.colors.red};
    text-align: center;
    overflow: hidden;
    transition: max-height 0.5s;
    max-height: ${({ $isOpen }) => ($isOpen ? "35px" : "0")};
`;

export const TextUnderline = styled(Text)`
    font-size: ${({ theme }) => theme.sizes.s15};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
    text-decoration: line-through;
    word-break: break-word;
`;

export const TextTitle = styled(Text)`
    font-weight: ${({ theme }) => theme.fonts.fontWeight.m};
    font-size: ${({ theme }) => theme.sizes.s20};
    text-align: center;
    margin-bottom: 20px;
`;

export const DayWeekTitle = styled(Text)`
    width: 33px;
    font-size: ${({ theme }) => theme.sizes.s14};
    font-weight: ${({ theme }) => theme.fonts.fontWeight.x};
    padding: 6px 8px;
    line-height: 19px;
`;
