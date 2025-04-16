import { useEffect, useState } from "react";
import style from "./tarefas.module.css";
import { taskService } from "../../../Api/api";

export function CreatList() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [status, setStatus] = useState("");
  const [editarLista, setEditarLista] = useState(null);
  const [completarTarefa, setCompletarTarefa] = useState(new Set());

  const getTarefas = async () => {
    try {
      const response = await taskService.getTasks();
      setLista(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefa", error);
    }
  };
  useEffect(() => {
    getTarefas();
  }, []);

  const createTasks = async (event) => {
    event.preventDefault();

    if (!titulo || !categoria) {
      alert("Preencha os campos");
      return;
    }

    try {
      if (editarLista) {
        await taskService.updateTask(editarLista.id, {
          titulo,
          categoria,
          status,
        });
      } else {
        await taskService.createTask({ titulo, categoria, status });
      }
      setCategoria("");
      setTitulo("");
      setStatus("");
      setEditarLista(null);
      getTarefas();
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
    }
  };

  const deleteTarefa = async (id) => {
    try {
      await taskService.deleteTask(id);
      setLista(lista.filter((tarefa) => tarefa.id !== id));
      getTarefas();
    } catch (error) {
      console.error("Erro ao excluir tarefa", error);
    }
  };

  const formeditarTarefa = (tarefa) => {
    setEditarLista(tarefa);
    setTitulo(tarefa.titulo);
    setCategoria(tarefa.categoria);
  };

  const completeTarefa = (id) => {
    setCompletarTarefa((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(id)) {
        newCompleted.delete(id);
      } else {
        newCompleted.add(id);
      }
      return newCompleted;
    });
  };
  const tarefasfiltro = lista.filter((tarefa) => {
    return filtroCategoria === "todos" || tarefa.categoria === filtroCategoria;
  });

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.containerButton}>
          <div className={style.formulario}>
          <form onSubmit={createTasks}>
          <h1 className={style.title}>Lista de Tarefas</h1>
            <div className={style.criarTarefa}>
              <h4 className={style.title2}>
                {editarLista ? "Editar tarefa" : "Criar tarefa"}
              </h4>
              <div className={style.criar}>
                <select
                  className={style.buttonCategoria}
                  name="criar"
                  id="criar"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Selecione uma Categoria</option>
                  <option value="Estudo">Estudo</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Pessoal">Pessoal</option>
                </select>
              </div>
              <div className={style.tituloPesquisa}>
                <input
                  placeholder="Digite o titulo"
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />

                <button type="submit" className={style.criarEditar}>
                  {editarLista ? "Salvar Edição" : "Criar Tarefa"}
                </button>
              </div>
            </div>
          </form>
          </div>

          <div className={style.tarefasContainer}>

            <div className={style.pesquisarTarefas}>
              <h4 className={style.titlePesquisa}>Pesquisar</h4>
              <select
                id="pesquisa"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="Estudo"> Estudo</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
              </select>
            </div>

            <div className={style.listaTarefa}>
              {tarefasfiltro.length === 0 ? (
                <p>Não ha tarefas cadastradas</p>
              ) : (
                tarefasfiltro.map((listas) => (
                  <div key={listas.id} className={style.todasTarefas}>
                    <div
                      className={`${style.categoria} ${
                        completarTarefa.has(listas.id) ? style.completar : ""
                      }`}
                    >
                      <p className={style.titulo}>{listas.titulo}</p>
                      <p className={style.categoryList}>({listas.categoria})</p>
                    </div>
                    <div className={style.status}>
                      <button
                        className={style.complete}
                        onClick={() => completeTarefa(listas.id)}
                      >
                        Completar
                      </button>
                      <button
                        className={style.deletar}
                        onClick={() => deleteTarefa(listas.id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className={style.edit}
                        onClick={() => formeditarTarefa(listas)}
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
