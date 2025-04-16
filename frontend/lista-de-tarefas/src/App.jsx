import { BrowserRouter } from "react-router-dom";
import styles from "./app.module.css";
import { Router } from "./components/pages/Routes/Route";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
