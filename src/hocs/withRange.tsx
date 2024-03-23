import React, { ComponentType, FC } from "react";

export const withRange = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
    function ComponentWithRange(props: P) {
        return <WrappedComponent {...props} withRange />;
    }

    return ComponentWithRange;
};
