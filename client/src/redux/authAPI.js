// services/dummyApi.js

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dummy user and todo data
let dummyUser = { id: 1, name: "John Doe", email: "john@example.com" };
let dummyToken = "dummy-jwt-token";
let todos = [
  { id: 1, title: "Buy groceries", status: "completed", duedate: "23-34-2025" },
  { id: 2, title: "Read a book", status: "pending", duedate: "23-34-2025" },
];

// AUTH APIs
export const loginAPI = async (credentials) => {
  await delay(1000);
  if (
    credentials.email === "john@example.com" &&
    credentials.password === "password"
  ) {
    return {
      user: dummyUser,
      token: dummyToken,
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const signupAPI = async () => {
  await delay(1000);
  dummyUser = { ...dummyUser, password: "087490o" };
  return {
    user: dummyUser,
    token: dummyToken,
  };
};

// TODO APIs
export const fetchTodosAPI = async () => {
  await delay(1000);
  return todos;
};

export const addTodoAPI = async (todo = {}) => {
  await delay(500);
  const newTodo = {
    id: Date.now(),
    title: "Read a book",
    status: "pending",
    duedate: "23-34-2025",
  };
  //   todos.push(newTodo);
  return newTodo;
};

export const updateTodoAPI = async (id, data) => {
  await delay(500);
  todos = todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo));
  return todos.find((todo) => todo.id === id);
};

export const deleteTodoAPI = async (id) => {
  await delay(500);
  todos = todos.filter((todo) => todo.id !== id);
  return id;
};
