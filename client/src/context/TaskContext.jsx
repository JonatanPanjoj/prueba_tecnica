import { createContext, useState, useContext } from "react";
import { registrarTarea, obtenerTareas, eliminarTarea, obtenerTareaId, editarTarea } from '../api/task'

const taskContext = createContext();

export const useTask = () => {
    const context = useContext(taskContext)
    if (!context) {
        throw new Error("Use task provider within a TaskProvider");
    }
    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTask] = useState([]);

    const getTasks = async () => {
        try {
            const res = await obtenerTareas();
            setTask(res.data)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const createTask = async (task) => {
        console.log('task!')
        const res = await registrarTarea(task)

        console.log(res)
    }

    const deleteTask = async (id) => {
        try{
            const res = await eliminarTarea(id);
            if(res.status == 200) setTask(tasks.filter(task => task._id != id))
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    };

    const getTask = async (id) =>{
        const res = await obtenerTareaId(id)
        return res.data;
    }

    const updateTask = async (id,task)=>{
        try {
            await editarTarea(id,task);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <taskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTask,
            getTask,
            updateTask
        }}>
            {children}
        </taskContext.Provider>
    )
}