import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expiryTime = localStorage.getItem("expiryTime");

  const isTokenExpired = () => {
    if (!expiryTime) return true;
    const currentTime = new Date().getTime();
    return currentTime > parseInt(expiryTime);
  };

  if (!token || isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
