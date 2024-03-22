import React from "react";
import { TodoItem, TodoListContainer } from "@/components/TodoModal/index";
import { TodoListPropsType } from "@/types";

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
