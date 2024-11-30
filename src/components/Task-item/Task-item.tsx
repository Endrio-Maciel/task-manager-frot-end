import { Task } from "../../@types/task"
import { ArrowFatDown, ArrowFatUp, Trash, Pencil, CheckCircle, XCircle } from 'phosphor-react'
import api from "../../services/api"
import React from "react"
import styles from './Task-item.module.css'

interface TaskItemProps {
    task: Task
    refreshTask: () => Promise<void>
    index: number  
    totalTasks: number  
    updateTaskInList: (updatedTask: Task) => void
}

export function TaskItem({ task, refreshTask, index, totalTasks, updateTaskInList }: TaskItemProps) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [editedTask, setEditedTask] = React.useState({ ...task })


    const handleDelete = async () => {
        const confirmDeleteTask = window.confirm(`Deseja deletar a tarefa ${task.title}?`)
        if (confirmDeleteTask) {
            await api.delete(`/tasks/delete/${task.id}`)
            
            refreshTask()
        }
    }

    const handleChange = async () => {
        
        if (
            editedTask.title === task.title &&
            editedTask.cost === task.cost &&
            editedTask.deadline === task.deadline
        ) {
            alert("Nenhuma alteração detectada!")
            return
        }
    
        await api.patch(`/task/${task.id}`, {
            title: editedTask.title,
            cost: editedTask.cost,
            deadline: editedTask.deadline
        })
       
        updateTaskInList({ ...editedTask, id: task.id})
        setIsEditing(false)

        // setIsEditing(false)
        // refreshTask()
    }

    const handleMoveUp = async () => {
        await api.patch(`/tasks/${task.id}/up`)
        refreshTask()
    }

    const handleMoveDown = async () => {
        await api.patch(`/tasks/${task.id}/down`)
        refreshTask()
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Task) => {
        const newValue = e.target.value

        if(editedTask[field] !== newValue) {
            setEditedTask((prev) => ({...prev, [field]: newValue}))
        }

        setEditedTask({ ...editedTask, [field]: e.target.value })
    }

    const handleCancel = () => {
        setEditedTask({ ...task })
        setIsEditing(false)
    }

    return (
        <li className={`${styles.task} ${task.cost >= 1000 ? styles.yellowBg : styles.whiteBg}`}>
            <h3>{task.title}</h3>
            <div>
                <div className={styles.content}>
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => handleInputChange(e, 'title')}
                                className={styles.inputField}
                            />
                            <input
                                type="number"
                                value={editedTask.cost}
                                onChange={(e) => handleInputChange(e, 'cost')}
                                className={styles.inputField}
                            />
                            <input
                                type="date"
                                value={new Date(editedTask.deadline).toLocaleDateString('en-CA')} 
                                onChange={(e) => handleInputChange(e, 'deadline')}
                                className={styles.inputField}
                            />
                        </>
                    ) : (
                        <>
                            <p>Custo: R${task.cost}</p>
                            <p>Data Limite: {new Date(task.deadline).toLocaleDateString()}</p>
                        </>
                    )}
                </div>
                <div className={`${styles.buttonsActions}`}>
                    
                    <button 
                        onClick={handleMoveUp} 
                        className={`${index ===0 ? styles.disabled : styles.abled}`}
                        disabled={index === 0} 
                    >
                        <ArrowFatUp size={15} />
                    </button>
                    
                    <button 
                        onClick={handleMoveDown} 
                        className={`${index === totalTasks-1 ? styles.disabled : styles.abled}`}
                        disabled={index === totalTasks - 1}  
                    >
                        <ArrowFatDown size={15} />
                    </button>
                    <button onClick={handleDelete} className={styles.delete}>
                        <Trash size={15} />
                    </button>
                    {isEditing ? (
                        <>
                            <button onClick={handleChange} className={styles.saveButton}>
                                <CheckCircle size={15} />
                            </button>
                            <button onClick={handleCancel} className={styles.cancelButton}>
                                <XCircle size={15} />
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                            <Pencil size={15} />
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}
