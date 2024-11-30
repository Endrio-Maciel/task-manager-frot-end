import React, { useState } from "react";
import api from "../../services/api";
import styles from './Task-form.module.css'

interface TaskFormProps {
  refreshTask: () => Promise<void>;
}

export default function TaskForm({ refreshTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState<number | "">("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      cost: Number(cost),
      deadline: new Date(deadline).toISOString(),
    };

    console.log("Payload enviado ao servidor:", payload);

    try {
      const response = await api.post("/tasks/create-task", payload);
      console.log("Resposta do servidor:", response.data);
      await refreshTask();
      setTitle("")
      setCost("")
      setDeadline("")
    } catch (error: any) {
      console.error("Erro na criação da tarefa:", error.response?.data || error.message);
    }
  };

  return (
    < >
       <div className={styles.conteinerMain}>
       <form className={styles.form}onSubmit={handleSubmit}>
        
            <label htmlFor="">Título:</label>
            <input
            type="text"
            placeholder="Título da Tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        
        
            <label>Custo (R$):</label>
            <input
            type="number"
            placeholder="Custo (R$)"
            value={cost}
            onChange={(e) => setCost(e.target.value ? Number(e.target.value) : "")}
            required
            />
        
            <label>Prazo:</label>
            <input
            type="date"
            min="2012-12-12"
            max="2030-12-12"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            />
        
        <button type="submit">Adicionar Tarefa</button>
        </form>
        </div>
    </>
  );
}
