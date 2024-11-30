import { Task } from "../../@types/task";
import api from "../../services/api";
import { useEffect, useState } from "react";
import TaskForm from "../Task-form/Task-form";
import { TaskItem } from "../Task-item/Task-item";
import styles from './Task-list.module.css'

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get<{ tasks: Task[] }>("/tasks");
        if (Array.isArray(response.data.tasks)) {
          setTasks(response.data.tasks);
        } else {
          console.error("Unexpected response format:", response.data);
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    }
    fetchTasks();
  }, []);

  const refreshTask = async () => {
    try {
      const response = await api.get<{ tasks: Task[] }>("/tasks");
      if (Array.isArray(response.data.tasks)) {
        setTasks(response.data.tasks);
      } else {
        console.error("Unexpected response format:", response.data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const updateTaskInList = (updatedTask: Task) => {
    setTasks((prevTasks)=> 
    prevTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  return (

    <section className={styles.main}>
      <TaskForm refreshTask={refreshTask} />
      <ul className={styles.taskContainer}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskItem 
                key={task.id} 
                task={task} 
                refreshTask={refreshTask} 
                index={index}
                totalTasks={tasks.length}  
                updateTaskInList={updateTaskInList}
            />
          ))
        ) : (
          <p>Nenhuma tarefa encontrada</p>
        )}
      </ul>
    </section>
  );
}
