import * as React from "react";
import { useEffect, useRef } from "react";
import { Text } from "@/components/Text";
import { TodoToltipContainer } from "@/components/DatePicker";
import { TodoIconStyled } from "@/components/DatePicker/index";

const CLOSE_DELAY = 4000;

export function TodoTooltip() {
    const todoContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (todoContainerRef.current) {
                todoContainerRef.current.style.display = "none";
            }
        }, CLOSE_DELAY);

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
