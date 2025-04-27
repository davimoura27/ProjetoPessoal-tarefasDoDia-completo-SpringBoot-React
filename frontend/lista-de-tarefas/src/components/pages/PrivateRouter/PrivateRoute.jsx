import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  if (!storedUser) {
    // Se NÃO estiver logado, manda pra home
    return <Navigate to="/" />;
  }

  // Se estiver logado, deixa acessar normalmente
  return children;
}
