import * as React from "react";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "@/components/ErrorBoundary/index";
import { THEME } from "@/constants";
import { ThemeWrapper } from "@/components/ThemeWrapper";

describe("ErrorBoundary", () => {
    const ChildComponent = () => {
        throw new Error("Test error");
    };

    it("should render error message when child component throws an error", () => {
        console.error = jest.fn();

        const { getByText } = render(
            <ThemeWrapper theme={THEME}>
                <ErrorBoundary>
                    <ChildComponent />
                </ErrorBoundary>
            </ThemeWrapper>,
        );

        const errorMessage = getByText("Something went wrong...");
        const tryLaterMessage = getByText("Please, try later!");

        expect(errorMessage).toBeInTheDocument();
        expect(tryLaterMessage).toBeInTheDocument();
    });

    it("should render children when no error occurs", () => {
        console.error = jest.fn();

        const { getByText } = render(
            <ThemeWrapper theme={THEME}>
                <ErrorBoundary>
                    <div>Child component</div>
                </ErrorBoundary>
            </ThemeWrapper>,
        );

        const childComponent = getByText("Child component");

        expect(childComponent).toBeInTheDocument();
    });
});
