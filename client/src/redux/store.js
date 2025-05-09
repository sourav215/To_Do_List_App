// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import todosReducer from "../redux/todo/todosSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});

export default store;
