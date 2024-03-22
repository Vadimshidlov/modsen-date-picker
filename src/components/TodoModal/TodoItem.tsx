import React from "react";
import { Text, TextUnderline } from "@/components/Text/Text";
import {
    TodoItemContainer,
    TodoItemTitleContainer,
    TodoRemoveButton,
    ToggleTodoInput,
} from "@/components/TodoModal/index";
import { TodoItemPropsType } from "@/types";

export function TodoItem({
    todoItem,
    todoItemDate,
    handleChangeTodoStatus,
    handleRemoveTodo,
}: TodoItemPropsType) {
    return (
        <TodoItemContainer key={todoItem.id}>
            <TodoItemTitleContainer>
                <ToggleTodoInput
                    type="checkbox"
                    checked={todoItem.completed}
                    onChange={() => handleChangeTodoStatus(todoItemDate, todoItem.id)}
                />
                {todoItem.completed ? (
                    <TextUnderline>{todoItem.title}</TextUnderline>
                ) : (
                    <Text>{todoItem.title}</Text>
                )}
            </TodoItemTitleContainer>
            <TodoRemoveButton onClick={() => handleRemoveTodo(todoItemDate, todoItem.id)}>
                Remove
            </TodoRemoveButton>
        </TodoItemContainer>
    );
}
