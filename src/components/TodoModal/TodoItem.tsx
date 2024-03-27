import * as React from "react";
import { TextUnderline } from "@/components/Text/Text";
import {
    TodoItemContainer,
    TodoItemTextContainer,
    TodoItemTitleContainer,
    TodoRemoveButton,
    TodoText,
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
                <TodoItemTextContainer>
                    {todoItem.completed ? (
                        <TextUnderline>{todoItem.title}</TextUnderline>
                    ) : (
                        <TodoText>{todoItem.title}</TodoText>
                    )}
                </TodoItemTextContainer>
            </TodoItemTitleContainer>
            <TodoRemoveButton onClick={() => handleRemoveTodo(todoItemDate, todoItem.id)}>
                Remove
            </TodoRemoveButton>
        </TodoItemContainer>
    );
}
