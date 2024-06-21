import { create } from "zustand";
import { TodoType } from "../types/todo";

interface TodoState {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  updateTodo: (todos: TodoType[]) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: JSON.parse(localStorage.getItem("todo") || "[]"),
  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      localStorage.setItem("todo", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  updateTodo: (todos) =>
    set(() => {
      localStorage.setItem("todo", JSON.stringify(todos));
      return { todos };
    }),
  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todo", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));
