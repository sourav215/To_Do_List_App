// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import todosReducer from "../redux/todo/todosSlice";
// import { errorMiddleware } from "./middleware/errorMiddleware";
const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todosReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(errorMiddleware),
});

export default store;
