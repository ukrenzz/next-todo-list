"use client";
import { TodoType } from "@/types/todo";
import { Button, Input, colors } from "@nextui-org/react";
import React, { FormEventHandler, useEffect, useState } from "react";

export interface ITodoFormProps {
    todo?: TodoType;
    isEdit?: boolean;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>, value?: TodoType) => void;
}

const TodoForm = ({ todo, isEdit, onSubmit }: ITodoFormProps) => {
    const [todoState, setTodoState] = useState<TodoType | undefined>(todo);
    const [isEditState, setIsEditState] = useState<boolean>(isEdit ?? false);

    useEffect(() => {
        setTodoState(todo);
    }, [todo]);

    console.log("Test TodoForm", todoState);
    console.log("Test TodoForm", todo);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (onSubmit) onSubmit(event, todoState);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const current = event.target.value;
        console.log("Change form: ", current);

        if (current == "") {
            setTodoState(undefined);
            setIsEditState(false);
        } else {
            setTodoState({
                id: todoState?.id ?? -1,
                task: current,
                isComplete: todoState?.isComplete ?? false,
            });
        }
    };

    const handleClear = () => {
        setTodoState(undefined);
        setIsEditState(false);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="gap-6 justify-between flex"
            >
                <Input
                    type="text"
                    name="task"
                    label="Task"
                    autoFocus
                    isClearable
                    color="default"
                    value={todoState?.task ?? ""}
                    labelPlacement="outside"
                    onChange={handleChange}
                    onClear={handleClear}
                    classNames={{
                        base: "hover:bg-transparent",
                        label: "text-gray-950  group-data-[focus=true]:!text-white group-data-[filled=true]:text-white",
                        input: [
                            "bg-transparent",
                            "text-gray-700 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-white/80",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "group-data-[hover=true]:bg-white/90",
                            "group-data-[focus=true]:bg-white",
                            "group-data-[filled=true]:bg-white",
                        ],
                        clearButton: "text-gray-500",
                    }}
                />
                <Button
                    type="submit"
                    color="secondary"
                    variant="ghost"
                    className="border-white text-white hover:!bg-white hover:text-sky-500"
                >
                    {isEditState ? (
                        <span>
                            <span className="ri-save-line text-lg mr-2"></span>
                            <span>Save</span>
                        </span>
                    ) : (
                        <span>
                            <span className="ri-add-line text-lg mr-2"></span>
                            {/* <span>Save</span> */}
                            <span>Add</span>
                        </span>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default TodoForm;
