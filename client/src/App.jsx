import "./App.css";
import Login from "./components/Auth/Login";
import Todos from "./components/Todos/Todos";
import NotFound from "./components/NotFoundPage/NotFound";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Todos />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return (
    <div className="bg-cyan-50">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
