import React from "react";
import styled from "styled-components";
import { Text, TextUnderline } from "@/components/Text/Text";
import { TodoDataType } from "@/services/TodoService";
import { TodoRemoveButton } from "@/components/TodoModal/TodoForm";

export type TodoItemPropsType = {
    todoItem: TodoDataType;
    todoItemDate: string;
    handleChangeTodoStatus: (todoDate: string, todoId: string) => void;
    handleRemoveTodo: (todoDate: string, todoId: string) => void;
};

export const TodoItemContainer = styled.li`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const TodoItemTitleContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

export const ToggleTodoInput = styled.input``;

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
