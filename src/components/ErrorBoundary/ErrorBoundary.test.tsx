import * as React from "react";
import { render } from "@testing-library/react";
import { ErrorBoundary } from "@/components/ErrorBoundary/index";

describe("ErrorBoundary", () => {
    const ChildComponent = () => {
        throw new Error("Test error");
    };

    it("should render error message when child component throws an error", () => {
        console.error = jest.fn();

        const { getByText } = render(
            <ErrorBoundary>
                <ChildComponent />
            </ErrorBoundary>,
        );

        const errorMessage = getByText("Something went wrong...");
        const tryLaterMessage = getByText("Please, try later!");

        expect(errorMessage).toBeInTheDocument();
        expect(tryLaterMessage).toBeInTheDocument();
    });

    it("should render children when no error occurs", () => {
        console.error = jest.fn();

        const { getByText } = render(
            <ErrorBoundary>
                <div>Child component</div>
            </ErrorBoundary>,
        );

        const childComponent = getByText("Child component");

        expect(childComponent).toBeInTheDocument();
    });
});
