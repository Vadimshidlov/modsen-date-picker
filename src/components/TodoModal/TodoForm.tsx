import React, { ChangeEvent } from "react";
import styled from "styled-components";

export type TodoFormPropsType = {
    todoTitle: string;
    handleAddTodoText: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTodo: () => void;
};

export const TodoFormContainer = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
    margin-bottom: 20px;
`;

export const TextInput = styled.input`
    outline: none;
    font-size: 15px;
    padding: 5px 10px;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
`;

export const TodoAddButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-family: "Open Sans";
    font-weight: 600;
    padding: 7px 9px;
    font-size: 13px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    width: 100px;
    background-color: #2f80ed;
    color: #edf2f4;

    &:hover {
        opacity: 0.6;
    }
`;

export const TodoRemoveButton = styled(TodoAddButton)`
    //background-color: rgba(188, 153, 153, 0.72);
    background-color: #2f80ed;
    width: 70px;
`;

export function TodoForm({ todoTitle, handleAddTodoText, handleAddTodo }: TodoFormPropsType) {
    return (
        <TodoFormContainer>
            <TextInput type="text" value={todoTitle} onChange={handleAddTodoText} />
            <TodoAddButton onClick={handleAddTodo}>Add Todo</TodoAddButton>
        </TodoFormContainer>
    );
}
