import styled from "styled-components";
import { Flex } from "@/components/Calendar/index";
import { Text } from "@/components/Text/index";

export const ErrorBoundaryContainer = styled(Flex)`
    align-items: center;
    justify-content: center;
`;
export const ErrorBoundaryTitle = styled(Text)`
    font-size: 30px;
`;
export const ErrorBoundaryText = styled(Text)`
    font-size: 20px;
`;
