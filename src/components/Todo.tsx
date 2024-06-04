import { useEffect, useState } from "react";
import { TodoType } from "../types/todo";

export default function Todo() {
  const [data, setData] = useState<TodoType[] | undefined>(() => {
    const savedData = localStorage.getItem("todo");
    return savedData ? (JSON.parse(savedData) as TodoType[]) : [];
  });
  const [currentTodo, setCurrentTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1>Todo List</h1>
      <input
        className="px-4 border-2 border-blue-500 rounded-2xl"
        type="text"
        onChange={(e) => {
          setCurrentTodo(e.target.value);
        }}
        value={currentTodo}
      />
      <button
        onClick={() => {
          if (currentTodo === "" || currentTodo.trim()?.length === 0) {
            alert("Please add a title for the todo");
          } else {
            setData([
              ...data!,
              { id: data!.length + 1, title: currentTodo, status: "Todo" },
            ]);
            setCurrentTodo("");
          }
        }}
      >
        Add Todo
      </button>
      <div className="flex flex-col items-start justify-start gap-6">
        {data?.map((item: TodoType, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full gap-5"
          >
            <p className="p-2 border-2 rounded-lg ">Todo: {item.title}</p>
            <p
              onClick={() => {
                const changedStatus = [...data];
                if (changedStatus[index].status === "Todo") {
                  changedStatus[index].status = "Completed";
                  setData(changedStatus);
                }
              }}
              className={`p-2 border-2 rounded-lg ${
                item.status === "Todo"
                  ? "text-red-500 cursor-pointer hover:border-blue-400"
                  : "text-green-500"
              }`}
            >
              {item.status}
            </p>
            <button
              className="text-red-500"
              onClick={() => {
                setData(data.filter((todo) => todo.id !== item.id));
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
