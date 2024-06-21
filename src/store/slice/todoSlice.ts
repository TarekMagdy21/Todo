import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoType } from '../../types/todo';
 
interface TodoState {
  todos: TodoType[];
}

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem('todo') || '[]'),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
      localStorage.setItem('todo', JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<{ id: number, status: string }>) => {
      const { id, status } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.status = status;
        localStorage.setItem('todo', JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todo', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
