import React, { ComponentType, FC } from "react";

export const withWeekMode = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithWeekMode(props: P) {
        return <WrappedComponent {...props} weekMode />;
    }

    return ComponentWithWeekMode;
};
