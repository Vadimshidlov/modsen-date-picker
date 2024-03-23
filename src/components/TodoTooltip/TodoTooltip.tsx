import React, { useEffect, useRef } from "react";
import { Text } from "@/components/Text";
import { TodoToltipContainer } from "@/components/DatePicker";
import { TodoIconStyled } from "@/components/DatePicker/index";

export function TodoTooltip() {
    const todoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (todoContainerRef.current) {
                todoContainerRef.current.style.display = "none";
            }
        }, 4000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <TodoToltipContainer ref={todoContainerRef}>
            <TodoIconStyled />
            <Text>Add todo? - Double click</Text>
        </TodoToltipContainer>
    );
}
