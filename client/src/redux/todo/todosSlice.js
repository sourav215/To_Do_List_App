// features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import { addTodoAPI, deleteTodoAPI, fetchTodosAPI, updateTodoAPI } from '../authAPI';

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  // const res = await axiosInstance.get('/todos');
  const res = await fetchTodosAPI()
  return res.data;
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  // const res = await axiosInstance.post('/todos', todo);
  const res = await addTodoAPI({});
  return res.data;
});

export const updateTodo = createAsyncThunk('todos/update', async ({ id, data }) => {
  // const res = await axiosInstance.put(`/todos/${id}`, data);
  const res = await updateTodoAPI(id, {})
  return res.data;
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id) => {
  // await axiosInstance.delete(`/todos/${id}`);
  await deleteTodoAPI();
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
