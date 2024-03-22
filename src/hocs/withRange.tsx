import React, { ComponentType, FC } from "react";

export const withRange = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithRange(props: P) {
        return <WrappedComponent {...props} withRange />;
    }

    return ComponentWithRange;
};

export const withWeekMode = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithWeekMode(props: P) {
        return <WrappedComponent {...props} weekMode />;
    }

    return ComponentWithWeekMode;
};

export const withWeekUSAWeek = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithWeekUSAWeek(props: P) {
        return <WrappedComponent {...props} weekStartsOnSunday />;
    }

    return ComponentWithWeekUSAWeek;
};
