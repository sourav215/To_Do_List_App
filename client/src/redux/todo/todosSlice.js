// features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const getTodos = createAsyncThunk("todos/fetch", async ({ params }) => {
  const res = await axiosInstance.get("/todos", { params });
  return res.data;
});

export const addTodo = createAsyncThunk("/add-todo", async ({ body }) => {
  const res = await axiosInstance.post("/todos", body);
  return res.data;
});

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(`/todos/${id}`, data);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/delete", async ({ id }) => {
  const res = await axiosInstance.delete(`/todos/${id}`);
  return res.data;
});

const initialState = {
  todos: {
    data: null,
    success: false,
    loading: false,
    error: false,
  },
  todoCreation: {
    success: false,
    loading: false,
    error: false,
  },
  todoDetails: {
    data: null,
    success: false,
    loading: false,
    error: false,
  },
  updateTodo: {
    data: null,
    success: false,
    loading: false,
    error: false,
  },
  deleteTodo: {
    success: false,
    loading: false,
    error: false,
  },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodoCreation: (state) => {
      state.todoCreation = initialState.todoCreation;
    },
    clearTodoUpdation: (state) => {
      state.updateTodo = initialState.updateTodo;
    },
    clearTodoDeletion: (state) => {
      state.deleteTodo = initialState.deleteTodo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.todos.success = false;
        state.todos.data = null;
        state.todos.loading = true;
        state.todos.loading = false;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = { ...action.payload };
        state.todos.loading = false;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.todos = { ...action.payload };
        state.todos.loading = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.todoCreation.success = false;
        state.todoCreation.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todoCreation = { ...action.payload };
        state.todoCreation.loading = false;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.todoCreation = { ...action.payload };
        state.todoCreation.loading = false;
      })
      .addCase(updateTodo.pending, (state) => {
        state.updateTodo = initialState.updateTodo;
        state.updateTodo.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodo = { ...action.payload };
        state.updateTodo.loading = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.updateTodo = { ...action.payload };
        state.updateTodo.success = true;
        state.updateTodo.loading = false;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodo.success = false;
        state.deleteTodo.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.deleteTodo = { ...action.payload };
        state.deleteTodo.loading = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.deleteTodo = { ...action.payload };
        state.deleteTodo.loading = false;
      });
  },
});
export const { clearTodoCreation, clearTodoUpdation, clearTodoDeletion } =
  todosSlice.actions;
export default todosSlice.reducer;
