import { useEffect, useState } from "react";
import style from "./tarefas.module.css";
import { taskService } from "../../../Api/api";

export function CreatList() {
  const [taskList, setTaskList] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todas");
  const [status, setStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const getTasks = async () => {
    try {
      const response = await taskService.getTasks();
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createOrUpdateTask = async (event) => {
    event.preventDefault();

    if (!title || !category) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, {
          titulo: title,
          categoria: category,
          status,
        });
      } else {
        await taskService.createTask({ titulo: title, categoria: category, status });
      }
      setCategory("");
      setTitle("");
      setStatus("");
      setEditingTask(null);
      getTasks();
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTaskList(taskList.filter((task) => task.id !== id));
      getTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleEditForm = (task) => {
    setEditingTask(task);
    setTitle(task.titulo);
    setCategory(task.categoria);
  };

  const toggleCompleteTask = (id) => {
    setCompletedTasks((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const filteredTasks = taskList.filter((task) => {
    return filterCategory === "Todas" || task.categoria === filterCategory;
  });

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.containerButtons}>
          <div className={style.form}>
            <form onSubmit={createOrUpdateTask}>
              <h1 className={style.heading}>Lista de tarefas</h1>
              <div className={style.createTask}>
                <h4 className={style.subheading}>
                  {editingTask ? "Editar tarefa" : "Criar tarefa"}
                </h4>
                <div className={style.selectCategory}>
                  <select
                    className={style.categoryButton}
                    name="create"
                    id="create"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Estudo">Estudo</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                  </select>
                </div>
                <div className={style.inputArea}>
                  <input
                    placeholder="Digite o titulo"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <button type="submit" className={style.createOrEdit}>
                    {editingTask ? "Salvar tarefa" : "Criar tarefa"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className={style.taskContainer}>
            <div className={style.searchTasks}>
              <h4 className={style.searchTitle}>Pesquisar</h4>
              <select
                id="search"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="Todas">Todas</option>
                <option value="Estudo">Estudo</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
              </select>
            </div>

            <div className={style.taskList}>
              {filteredTasks.length === 0 ? (
                <p>Não ha tarefas registradas!</p>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className={style.taskItem}>
                    <div
                      className={`${style.category} ${
                        completedTasks.has(task.id) ? style.completed : ""
                      }`}
                    >
                      <p className={style.title}>{task.titulo}</p>
                      <p className={style.categoryLabel}>({task.categoria})</p>
                    </div>
                    <div className={style.buttons}>
                      <button
                        className={style.complete}
                        onClick={() => toggleCompleteTask(task.id)}
                      >
                        Complete
                      </button>
                      <button
                        className={style.delete}
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className={style.edit}
                        onClick={() => handleEditForm(task)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
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
