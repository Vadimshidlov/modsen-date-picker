import * as React from "react";
import { TextInput, TodoAddButton, TodoFormContainer } from "@/components/TodoModal/index";
import { TodoFormPropsType } from "@/types";

export function TodoForm({ todoTitle, handleAddTodoText, handleAddTodo }: TodoFormPropsType) {
    return (
        <TodoFormContainer>
            <TextInput type="text" value={todoTitle} onChange={handleAddTodoText} />
            <TodoAddButton onClick={handleAddTodo}>Add Todo</TodoAddButton>
        </TodoFormContainer>
    );
}
