"use client";
import TodoForm from "@/components/todo/Form";
import TodoList from "@/components/todo/List";
import LoadingBox from "@/components/todo/LoadingBox";
import { getFetcher } from "@/libs/fetcher";
import { TodoType } from "@/types/todo";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const defaultTodo: TodoType[] = [
    {
        id: 1,
        task: "Coba 1",
        isComplete: 0,
    },
    {
        id: 2,
        task: "Coba 2",
        isComplete: 1,
    },
    {
        id: 3,
        task: "Coba 3",
        isComplete: 0,
    },
    {
        id: 4,
        task: "Coba 4",
        isComplete: 0,
    },
    {
        id: 5,
        task: "Coba 5",
        isComplete: 0,
    },
    {
        id: 6,
        task: "Coba 6",
        isComplete: 0,
    },
    {
        id: 7,
        task: "Coba 7",
        isComplete: 0,
    },
];

const handleReadTask = () => {};
const handleCreateTask = () => {};
const handleUpdateTask = () => {};
const handleDeleteTask = () => {};
const handleCompleteTask = () => {};

function TodoPage() {
    const [todo, setTodo] = useState<TodoType>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>,
        value?: TodoType
    ) => {
        e.preventDefault();
    };

    const handleEdit = (value: TodoType) => {
        setTodo(value);
        setIsEdit(true);
    };

    const handleDelete = async (value: TodoType) => {
        console.log("Delete Function");

        const results = await fetch(`/api/todos/${value.id}`, {
            method: "DELETE",
        }).then((r) => r.json());

        setTodo(undefined);
    };

    const handleComplete = async (value: TodoType) => {
        console.log(
            "Complete Function :",
            value.isComplete,
            !(value.isComplete == 1)
        );

        const results = await fetch(`/api/todos/completion/${value.id}`, {
            method: "PUT",
            body: JSON.stringify({
                isComplete: !(value.isComplete == 1),
            }),
        }).then((r) => r.json());

        setTodo(undefined);
    };

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
        <div className=" bg-slate-200 relative w-full h-fit flex justify-center items-start  py-16">
            <div className="relative w-1/2 min-h-[75vh] h-fit bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl shadow-lg p-14">
                <div className="h-fit">
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
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onComplete={handleComplete}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
