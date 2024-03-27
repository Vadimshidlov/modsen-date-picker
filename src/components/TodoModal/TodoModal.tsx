import * as React from "react";
import { ChangeEvent, useRef, useState } from "react";
import { CLEAR_TODO_DATE } from "@/constants";
import { TextTitle } from "@/components/Text/Text";
import TodoService from "@/services/index";
import { TodoList } from "@/components/TodoModal/TodoList";
import { TodoForm } from "@/components/TodoModal/TodoForm";
import {
    StyledClearDateIcon,
    TodoModalContainer,
    TodoModalContent,
} from "@/components/TodoModal/index";
import { TodoDataType, TodoModalPropsType } from "@/types";

export const getInitialState = (todoDate: string) => {
    const todosStorage = TodoService.getTodos(todoDate);
    const todos = todosStorage.length > 0 ? todosStorage[0]!.todos : [];

    return todos;
};

export function TodoModal({ todoItemDate, dispatch }: TodoModalPropsType) {
    const [todos, setTodos] = useState<TodoDataType[]>(() => getInitialState(todoItemDate));
    const [todoTitle, setTodoTitle] = useState("");
    const TodoServiceApi = useRef(TodoService);

    const handleAddTodoText = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        if (todoTitle !== "") {
            const newTodo = {
                title: todoTitle,
                completed: false,
                id: new Date().toISOString(),
            };

            setTodos((prevState) => [...prevState, newTodo]);

            TodoServiceApi.current.addTodo(newTodo, todoItemDate);

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
        dispatch({ type: CLEAR_TODO_DATE });
    };

    return (
        todoItemDate && (
            <TodoModalContainer>
                <TodoModalContent data-testid="todo-modal">
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
