import { useTask } from "../context/TaskContext";
import {Link} from 'react-router-dom';

function TaskCard({ task }) {
    // Crear un objeto Date a partir de la fecha en formato string
    const date = new Date(task.date);

    // Formatear la fecha como quieras
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

    const { deleteTask } = useTask()

    return (
        <div className="bg-dark-card max-w-md w-full p-6 m-3 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.tarea}</h1>
                <div className="flex gap-x-2 items-center">
                    <button onClick={() => {
                        deleteTask(task._id)
                    }

                    }
                        className="bg-dark-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                    > delete</button>
                    <button className="bg-dark-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"  >
                        <Link to={`/task/${task._id}`}>edit</Link>
                    </button>
                </div>
            </header>
            {
                task.done ? (
                    <>
                        <p className="text-md text-dark-primary">Finalizada</p>
                    </>
                ) : (
                    <>
                        <p className="text-md text-yellow-700">Pendiente</p>
                    </>
                )
            }
            <br />
            <p className="text-md text-gray-400">Creada en {formattedDate}</p>
        </div>

    )
}

export default TaskCard