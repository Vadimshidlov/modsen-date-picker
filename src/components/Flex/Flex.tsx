import styled from "styled-components";

interface FlexProps {
    direction?: "row" | "column";
    align?: "flex-start" | "flex-end" | "center" | "stretch";
    justify?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    margin?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    rowGap?: string;
    columnGap?: string;
    flexWrap?: string;
}

export const Flex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${(props) => props.direction || "row"};
    align-items: ${(props) => props.align || "stretch"};
    justify-content: ${(props) => props.justify || "stretch"};
    margin: ${(props) => props.margin || "0"};
    border: ${(props) => props.border || ""};
    border-radius: ${(props) => props.borderRadius || ""};
    padding: ${(props) => props.padding || ""};
    max-width: ${(props) => props.maxWidth || ""};
    width: ${(props) => props.width || ""};
    min-width: ${(props) => props.minWidth};
    row-gap: ${(props) => props.rowGap || ""};
    column-gap: ${(props) => props.columnGap || ""};
    flex-wrap: ${(props) => props.flexWrap || ""};
`;

/* export function Flex(props: FlexProps) {
    return <StyledFlex {...props} />;
} */
