import style from "./home.module.css";
import img1 from "/src/assets/img1.jpg"
export function Home() {
  return (
    <div className={style.container}>
      <div className={style.description}>
        <div className={style.title}>
          <h1>Bem-vindo ao gerenciador de tarefas 🚀</h1>
        </div>
        <div className={style.text}>
          <p>
            Organize suas tarefas de forma simples e eficiente! Gerencie prazos,
            acompanhe seu progresso e maximize sua produtividade.
          </p>
          <p>✅ Crie, edite e exclua tarefas com facilicade.</p>
          <p>✅ Acesse suas atividades de qualquer lugar.</p>
          <p>✅ Visualize apenas suas tarefas pessoais.</p>
        </div>
        <h3>💡 Torne seu dia mais produtivo com o Taredas do dia!</h3>
      </div>
      <div className={style.image}>
        <img src={img1} alt="" />
      </div>
    </div>
  );
}
