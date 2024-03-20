import React from "react";
import styled from "styled-components";
import { TodoItem } from "@/components/TodoModal/index";
import { TodoDataType } from "@/services/TodoService";

export type TodoListPropsType = {
    todoItemDate: string;
    todos: TodoDataType[];
    handleChangeTodoStatus: (todoDate: string, todoId: string) => void;
    handleRemoveTodo: (todoDate: string, todoId: string) => void;
};

export const TodoListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 10px;
`;

export function TodoList({
    todoItemDate,
    todos,
    handleChangeTodoStatus,
    handleRemoveTodo,
}: TodoListPropsType) {
    return (
        <TodoListContainer>
            {todos.map((todoItem) => (
                <TodoItem
                    key={todoItem.id}
                    todoItemDate={todoItemDate}
                    todoItem={todoItem}
                    handleRemoveTodo={handleRemoveTodo}
                    handleChangeTodoStatus={handleChangeTodoStatus}
                />
            ))}
        </TodoListContainer>
    );
}
