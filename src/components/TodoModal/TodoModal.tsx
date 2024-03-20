import React, { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import {
    CalendarItemsType,
    DatePickerActionType,
    DatePickerClearActionType,
} from "@/components/DatePicker/DatePicker";
import { Flex } from "@/components/Flex";
import { TextTitle, Text, TextUnderline } from "@/components/Text/Text";
import { ReactComponent as CloseModalButton } from "@/assets/svg/close-modal-button.svg";
import TodoService, { TodoDataType } from "@/services/TodoService";
import { TodoList } from "@/components/TodoModal/TodoList";
import { TodoForm } from "@/components/TodoModal/TodoForm";

export type TodoModalProps = {
    todoItemDate: string;
    dispatch: React.Dispatch<DatePickerActionType | DatePickerClearActionType>;
};

const StyledClearDateIcon = styled(CloseModalButton)`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition: all 1s;

    &:hover {
        opacity: 0.5;
    }
`;

export const TodoModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(85, 85, 85, 0.15);
    z-index: 998;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    height: 100lvh;

    display: flex;
    justify-content: center;
    //align-items: center;
`;

export const TodoModalContent = styled.div`
    //position: fixed;
    //top: 15%;
    //left: 50%;
    position: relative;
    margin-top: 30px;
    width: 60vw;
    height: 60vh;
    overflow-y: auto;
    //transform: translate(-50%, -50%);
    background: #d3d2d0;
    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
`;

export const getInitialState = (todoDate: string) => {
    const todosStorage = TodoService.getTodos(todoDate);
    const todos = todosStorage.length > 0 ? todosStorage[0]!.todos : [];

    return todos;
};

export function TodoModal({ todoItemDate, dispatch }: TodoModalProps) {
    const [todos, setTodos] = useState<TodoDataType[]>(getInitialState(todoItemDate));
    const [todoTitle, setTodoTitle] = useState("");
    const TodoServiceApi = useRef(TodoService);

    const handleAddTodoText = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        if (todoTitle !== "") {
            setTodos((prevState) => [
                ...prevState,
                {
                    title: todoTitle,
                    completed: false,
                    id: new Date().toISOString(),
                },
            ]);

            TodoServiceApi.current.addTodo(
                {
                    title: todoTitle,
                    completed: false,
                    id: new Date().toISOString(),
                },
                todoItemDate,
            );

            setTodoTitle("");
        }
    };

    const handleRemoveTodo = (todoDate: string, todoId: string) => {
        const filteredTodos = todos.filter((todoItem) => todoItem.id !== todoId);

        TodoServiceApi.current.updateTodos(todoDate, filteredTodos);

        setTodos(filteredTodos);
    };

    const handleChangeTodoStatus = (todoDate: string, todoId: string) => {
        const filteredTodos = todos.map((todoItem) => {
            if (todoItem.id === todoId) {
                return {
                    ...todoItem,
                    completed: !todoItem.completed,
                };
            }

            return todoItem;
        });

        TodoServiceApi.current.updateTodos(todoDate, filteredTodos);

        setTodos(filteredTodos);
    };

    const handleCloseModal = () => {
        dispatch({ type: "CLEAR_TODO_DATE" });
    };

    return (
        todoItemDate && (
            <TodoModalContainer>
                <TodoModalContent>
                    <TextTitle>Todolist for: {todoItemDate}</TextTitle>
                    <TodoForm
                        todoTitle={todoTitle}
                        handleAddTodoText={handleAddTodoText}
                        handleAddTodo={handleAddTodo}
                    />
                    <TodoList
                        todos={todos}
                        todoItemDate={todoItemDate}
                        handleChangeTodoStatus={handleChangeTodoStatus}
                        handleRemoveTodo={handleRemoveTodo}
                    />
                    <StyledClearDateIcon onClick={handleCloseModal} />
                </TodoModalContent>
            </TodoModalContainer>
        )
    );
}
