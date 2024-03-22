import styled from "styled-components";

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
        font-family: "YourFontFamilyName";
        src: url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap")
            format("ttf");
        font-weight: normal;
        font-style: normal;
    }
`;

export const DatePickerFormContainer = styled(Flex)`
    margin: 20px 0px 0px 0px;
`;
