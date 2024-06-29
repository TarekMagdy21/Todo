import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addTodo, updateTodo, deleteTodo } from "../store/slice/todoSlice";
import { TodoType } from "../types/todo";
import { useTranslation } from "react-i18next";

export default function Todo() {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.todos.todos);
  const [currentTodo, setCurrentTodo] = useState("");

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1>{t("todo.title")}</h1>
      <input
        className="px-4 border-2 border-blue-500 rounded-2xl"
        type="text"
        onChange={(e) => setCurrentTodo(e.target.value)}
        value={currentTodo}
      />
      <button
        onClick={() => {
          if (currentTodo === "" || currentTodo.trim().length === 0) {
            alert("Please add a title for the todo");
          } else {
            dispatch(
              addTodo({
                id: data.length + 1,
                title: currentTodo,
                status: "Todo",
              })
            );
            setCurrentTodo("");
          }
        }}
      >
        {t("todo.button")}{" "}
      </button>
      <div className="flex flex-col items-start justify-start gap-6">
        {data.map((item: TodoType) => (
          <div
            key={item.id}
            className="flex items-center justify-between w-full gap-5"
          >
            <p className="p-2 border-2 rounded-lg">Todo: {item.title}</p>
            <p
              onClick={() => {
                dispatch(
                  updateTodo({
                    id: item.id,
                    status: item.status === "Todo" ? "Completed" : "Todo",
                  })
                );
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
              onClick={() => dispatch(deleteTodo(item.id))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
