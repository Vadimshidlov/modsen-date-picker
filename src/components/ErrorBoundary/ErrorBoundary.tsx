import React, { Component, ErrorInfo } from "react";
import {
    ErrorBoundaryContainer,
    ErrorBoundaryText,
    ErrorBoundaryTitle,
} from "@/components/ErrorBoundary/index";

export type ErrorBoundaryPropsType = {
    children: React.ReactNode;
};

export type ErrorBoundaryStateType = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryPropsType, ErrorBoundaryStateType> {
    constructor(props: ErrorBoundaryPropsType) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error: ", error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <ErrorBoundaryContainer>
                    <ErrorBoundaryTitle>Something went wrong...</ErrorBoundaryTitle>
                    <ErrorBoundaryText>Please, try later!</ErrorBoundaryText>
                </ErrorBoundaryContainer>
            );
        }

        return children;
    }
}
