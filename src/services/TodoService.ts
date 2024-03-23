import { TodoDataType, TodoStorageType } from "@/types";

class TodoService {
    getTodos(todoItemDate: string): TodoStorageType[] {
        const todosJSON = localStorage.getItem("userTodos");

        const userTodosList: TodoStorageType[] =
            typeof todosJSON === "string" ? JSON.parse(todosJSON) : [];

        const currentTodos =
            userTodosList.length !== 0
                ? userTodosList.filter((todosItem) => todosItem.date === todoItemDate)
                : [];

        return currentTodos;
    }

    addTodo(todoItem: TodoDataType, todoItemDate: string) {
        const userTodosList = this.getTodos(todoItemDate);

        if (userTodosList.length === 0) {
            const currentDayTodos: TodoDataType[] = [];
            currentDayTodos.push(todoItem);

            userTodosList.push({
                date: todoItemDate,
                todos: currentDayTodos,
            });

            const todosJSON = localStorage.getItem("userTodos");

            const userAllTodosList: TodoStorageType[] =
                typeof todosJSON === "string" ? JSON.parse(todosJSON) : [];

            const newData = [...userAllTodosList, ...userTodosList];

            localStorage.setItem("userTodos", JSON.stringify(newData));
        } else {
            const currentDayTodos = userTodosList[0]!.todos;

            currentDayTodos.push(todoItem);

            const todosJSON = localStorage.getItem("userTodos");

            const userAllTodosList: TodoStorageType[] =
                typeof todosJSON === "string" ? JSON.parse(todosJSON) : [];

            const newData = userAllTodosList.map((todoDay) => {
                if (todoDay.date === todoItemDate) {
                    return {
                        date: todoItemDate,
                        todos: currentDayTodos,
                    };
                }

                return todoDay;
            });

            localStorage.setItem("userTodos", JSON.stringify(newData));
        }
    }

    updateTodos(todoItemDate: string, updateTodos: TodoDataType[]) {
        const todosJSON = localStorage.getItem("userTodos");

        const userAllTodosList: TodoStorageType[] =
            typeof todosJSON === "string" ? JSON.parse(todosJSON) : [];

        const newData = userAllTodosList.map((todoDay) => {
            if (todoDay.date === todoItemDate) {
                return {
                    date: todoItemDate,
                    todos: updateTodos,
                };
            }

            return todoDay;
        });

        localStorage.setItem("userTodos", JSON.stringify(newData));
    }
}

export default new TodoService();
