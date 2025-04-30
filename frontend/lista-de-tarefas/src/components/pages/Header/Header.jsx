import { useEffect, useState } from "react";
import { User, ClipboardText } from "phosphor-react";
import { Modal } from "../Modal/Modal";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { ToastNotify } from "../ToastNotify/Toast";
import { ToastContainer } from "react-toastify";
import { useTheme } from "../ThemeContext/Theme";
import { Moon, Sun } from "@phosphor-icons/react";

export function Header() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const {isDarkTheme, toggleTheme} = useTheme();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser.username);
      if (location.pathname === '/') {
        navigate('/lista')
      }
      } else{
        setIsLoggedIn(false)
        setUserName('')
      }
  }, []);

  const handleLoginSuccess = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserName(userData.username);
    setIsModalOpen(false);
    navigate("/lista");
  };

  const handleLogout = () => {
    ToastNotify.confirm("Deseja realmente sair?", async ()=>{
      sessionStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/");

    })
    
  };

  return (
    <>
   
    <div className={styles.containerBody}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <ClipboardText   weight="light" className={styles.logo}/>
          <h1 className={styles.title}>Tarefas do dia</h1>
        </div>

        <div className={styles.configButton}>
          <li className={styles.containerButton}>
        <div>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkTheme ? (
              <Sun weight="bold"/>
            ):(
              <Moon weight="bold"/>
            )}
          </button>
        </div>
            {isLoggedIn ? (
              <div className={styles.userInfo} onClick={handleLogout}>
                <User weight="fill" className={styles.userIcon} />
                <span className={styles.username}>{username}</span>
              </div>
            ) : (
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.buttonStyle}
                  onClick={() => {
                    setIsSignUp(false);
                    setIsModalOpen(true);
                  }}
                >
                  Entrar
                </button>
                <button
                  className={styles.buttonStyleCreate}
                  onClick={() => {
                    setIsSignUp(true);
                    setIsModalOpen(true);
                  }}
                >
                  Criar Conta
                </button>
              </div>
            )}
          </li>
        </div>
        <Modal
          isOpen={isModalOpen}
          isSignUp={isSignUp}
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
    </>
  );
}
