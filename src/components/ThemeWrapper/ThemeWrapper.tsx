import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";
import { GlobalStyles } from "@/components/GlobalStyle/index";
import { ThemeType } from "@/types";

export type ThemeWrapperPropsType = { children: ReactNode; theme: ThemeType };

export function ThemeWrapper({ children, theme }: ThemeWrapperPropsType) {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
