import { toast } from "react-toastify";
import style from "./toast.module.css" 

export const ToastNotify = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast.info(msg),
    warn: (msg) => toast.warn(msg),

    confirm: (message, onConfirm) => toast.info(
        ({ closeToast}) => (
            <div>
            <p>{message}</p>
            <div className={style.containerInfo}>
                <button 
                onClick={() =>{
                    onConfirm();
                    closeToast();
                }}
                className={style.buttonConfirm}>
                    Sim
                </button>
                <button
                onClick={closeToast}
                className={style.buttonCancelar}
                >
                    Cancelar
                </button>
            </div>
            </div>
        ),
        {autoClose:false}
    )
}