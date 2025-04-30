import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <Navigate to="/" />;
  }

  return children;
}
