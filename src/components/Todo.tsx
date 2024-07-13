import { useEffect, useState } from "react";
import { TodoType } from "../types/todo";
import { useTranslation } from "react-i18next";

export default function Todo() {
  const { t, i18n } = useTranslation();
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
      <h1>{t("todo.title")}</h1>

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
            alert(
              i18n.language === "ar"
                ? "من فضلك اضف عنوان للمهمه"
                : "Please add a title for the todo"
            );
          } else {
            setData([
              ...data!,
              { id: data!.length + 1, title: currentTodo, status: "Todo" },
            ]);
            setCurrentTodo("");
          }
        }}
      >
        {t("todo.button")}
      </button>
      <div className="flex flex-col items-start justify-start gap-6">
        {data?.map((item: TodoType, index) => (
          <div
            key={item.id}
            className={`flex ${
              i18n.language === "ar" ? "flex-row-reverse" : ""
            } items-center justify-between w-full gap-5`}
          >
            <div
              className={`p-2 border-2 rounded-lg flex ${
                i18n.language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <p>{i18n.language === "ar" ? ":مهمه" : "Todo:"}</p>
              <p className=""> {item.title}</p>
            </div>
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
              {i18n.language === "ar"
                ? item.status === "Todo"
                  ? "سوف يتم بدأه"
                  : "تم الانتهاء"
                : item.status}
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
