import * as React from "react";
import { Component, ErrorInfo } from "react";
import {
    ErrorBoundaryContainer,
    ErrorBoundaryText,
    ErrorBoundaryTitle,
} from "@/components/ErrorBoundary/index";
import { ErrorBoundaryPropsType, ErrorBoundaryStateType } from "@/types";

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
