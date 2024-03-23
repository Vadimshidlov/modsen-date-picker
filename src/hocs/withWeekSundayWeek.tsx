import React, { ComponentType, FC } from "react";

export const withWeekSundayWeek = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithWeekUSAWeek(props: P) {
        return <WrappedComponent {...props} weekStartsOnSunday />;
    }

    return ComponentWithWeekUSAWeek;
};
