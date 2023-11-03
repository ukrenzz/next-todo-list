"use client";
import TodoForm from "@/components/todo/Form";
import TodoList from "@/components/todo/List";
import { getFetcher } from "@/libs/fetcher";
import { TodoType } from "@/types/todo";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const defaultTodo: TodoType[] = [
    {
        id: 1,
        task: "Coba 1",
        isComplete: false,
    },
    {
        id: 2,
        task: "Coba 2",
        isComplete: true,
    },
    {
        id: 3,
        task: "Coba 3",
        isComplete: false,
    },
    {
        id: 4,
        task: "Coba 4",
        isComplete: false,
    },
    {
        id: 5,
        task: "Coba 5",
        isComplete: false,
    },
    {
        id: 6,
        task: "Coba 6",
        isComplete: false,
    },
    {
        id: 7,
        task: "Coba 7",
        isComplete: false,
    },
];

const useReadTasks = () => {
    const url = "/api/todos";

    const { data, isLoading, error } = useSWR(url, getFetcher);

    return { tasks: data, isLoading, error };
};

const handleReadTask = () => {};
const handleCreateTask = () => {};
const handleUpdateTask = () => {};
const handleDeleteTask = () => {};
const handleCompleteTask = () => {};

function TodoPage() {
    const [todos, setTodos] = useState<TodoType[]>(defaultTodo);
    const [todo, setTodo] = useState<TodoType>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const { tasks, isLoading, error } = useReadTasks();

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        value?: TodoType
    ) => {
        e.preventDefault();

        if (value) setTodos([...todos, value]);

        console.log(todos);
    };

    const handleEdit = (value: TodoType) => {
        setTodo(value);
        console.log("TeST");
        console.log(todo);
        console.log(value);
    };

    const handleDelete = (value: TodoType) => {
        setTodo(undefined);
        console.log("Delete Function");
    };

    // TODO: Convert all isComplete tasks to boolean
    useEffect(() => {
        if (!isLoading && tasks != undefined) {
            setTodos(tasks.data);
            console.log(tasks?.data);
        }
    }, [tasks]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (edit) {
    //         const editTodo = todos.find((i) => i.id === edit);
    //         const updateTodos = todos.map((td) =>
    //             td.id === editTodo.id
    //                 ? (td = { id: td.id, todo })
    //                 : { id: td.id, todo: td.todo }
    //         );
    //         setTodos(updateTodos);
    //         setEdit(0);
    //         setTodo("");
    //         return;
    //     }

    //     if (todo !== "") {
    //         setTodos([{ id: `${todo}`, todo }, ...todos]);
    //         setTodo("");
    //     }
    // };

    // const handleDelete = (id) => {
    //     const delTodo = todos.filter((to) => to.id !== id);
    //     setTodos([...delTodo]);
    // };

    // const handleEdit = (id) => {
    //     const editTodo = todos.find((i) => i.id === id);
    //     setTodo(editTodo.todo);
    //     setEdit(id);
    // };

    // const completeTodo = (id) => {
    //     console.log("terpanggil", id);
    //     const updateTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, isComplete: !todo.isComplete };
    //         }
    //         return todo;
    //     });
    //     setTodos(updateTodos);
    // };

    return (
        <div className="relative w-full h-full flex justify-center items-start overflow-y-auto py-16">
            <div className="relative w-1/2 min-h-[75vh] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl shadow-lg overflow-hidden p-14">
                <div className="h-full">
                    <section className="pb-10">
                        <TodoForm
                            todo={todo}
                            isEdit={isEdit}
                            onSubmit={handleSubmit}
                        />
                    </section>
                    <section className="relative h-full">
                        <div className="h-full">
                            <TodoList
                                todos={todos}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                // onComplete={completeTodo}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
