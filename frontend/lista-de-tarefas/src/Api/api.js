import axios from "axios";
import { ToastNotify } from "../components/pages/ToastNotify/Toast";

export const api = axios.create({
  baseURL: "https://projeto-tarefas-do-dia-completo.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const taskService = {
  getTasks: () => api.get("/tarefas"),
  createTask: (task) => api.post("/tarefas", task),
  updateTask: (id, task) => api.put(`/tarefas/${id}`, task),
  deleteTask: (id) => api.delete(`/tarefas/${id}`),
};

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let notify = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !notify) {
      notify = true;
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];

      ToastNotify.info("Sessão finalizada, faça login novamente!");

      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  },

  logout: () => {
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("user");
  },
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });

    if (response.status === 200 && response.data) {
      const userData = {
        username,
        token: response.data.token,
      };
      authService.login(userData);
      return userData;
    }
    throw new Error("Falha na autenticação");
  } catch (error) {
    console.error("[Login]:", error.message);
    throw error;
  }
};
