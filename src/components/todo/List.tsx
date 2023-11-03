import { TodoType } from "@/types/todo";
import { Button, Checkbox } from "@nextui-org/react";
import React, { useState } from "react";
import { ActionButton } from "./ActionButton";
import LoadingBox from "./LoadingBox";
import useSWR from "swr";
import { getFetcher } from "@/libs/fetcher";
import CheckTodo from "./Check";

export interface ITodoListProps {
    onEdit?: (todo: TodoType) => void;
    onDelete?: (todo: TodoType) => void;
    onComplete?: (todo: TodoType) => void;
}

const useReadTasks = () => {
    const url = "/api/todos";

    const { data, isLoading, error } = useSWR(url, getFetcher, {
        refreshInterval: 1000,
    });

    return { tasks: data, isLoading, taskError: error };
};

const TodoList = ({ onEdit, onDelete, onComplete }: ITodoListProps) => {
    const { tasks, isLoading, taskError } = useReadTasks();

    return (
        <div className="relative">
            {isLoading ? (
                <LoadingBox />
            ) : taskError ? (
                <div className="">{taskError}</div>
            ) : (
                tasks?.data?.map((todo: TodoType) => (
                    <div
                        key={todo.id}
                        className="bg-white/30 backdrop-saturate-125 backdrop-blur-lg drop-shadow-sm flex justify-between items-center px-4 py-3 rounded-lg my-4"
                    >
                        <div className="text-white font-medium">
                            <CheckTodo todo={todo} onComplete={onComplete} />
                            {/* <Checkbox
                                radius="sm"
                                color="success"
                                lineThrough
                                isSelected={todo.isComplete == 1}
                                value={todo.id.toString()}
                                classNames={{
                                    label: "ml-2 text-white before:bg-gray-500 ",
                                    icon: "text-white",
                                }}
                            >
                                {todo.task}
                            </Checkbox> */}
                        </div>
                        <div className="flex gap-2">
                            <ActionButton
                                text="Done"
                                color="success"
                                icon={<i className="ri-check-line text-lg"></i>}
                                isIconOnly
                                onClick={() =>
                                    onComplete ? onComplete(todo) : {}
                                }
                            />
                            <ActionButton
                                text="Edit"
                                color="warning"
                                icon={
                                    <i className="ri-pencil-line text-lg"></i>
                                }
                                isIconOnly
                                onClick={() => (onEdit ? onEdit(todo) : {})}
                            />
                            <ActionButton
                                text="Delete"
                                color="danger"
                                icon={
                                    <i className="ri-delete-bin-2-line text-lg"></i>
                                }
                                isIconOnly
                                onClick={() => (onDelete ? onDelete(todo) : {})}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodoList;
