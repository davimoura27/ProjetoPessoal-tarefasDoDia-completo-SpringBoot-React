import { BrowserRouter } from "react-router-dom";
import styles from "./app.module.css";
import { Router } from "./components/pages/Routes/Route";
import { ThemeProvider } from "./components/pages/ThemeContext/Theme";

function App() {
  return (
    <ThemeProvider>
    <div className={styles.container}>
      <div className={styles.layout}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
