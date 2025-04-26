import { useContext, useEffect, useState, createContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "ligth");
    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "ligth"
    );
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
