import { useEffect } from "react";
import { useTask } from "../context/TaskContext"
import TaskCard from '../components/TaskCard'
import { ImFileEmpty } from "react-icons/im";

function TaskPage() {

    const { getTasks, tasks } = useTask();

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            {tasks.length === 0 && (
                <div className="flex h-[calc(100vh-100px)] items-center justify-center">
                    <div>
                        <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                        <h1 className="font-bold text-xl">
                            No hay tareas, agrega una
                        </h1>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {tasks.map((task) => (
                    <TaskCard task={task} key={task._id} />
                ))}
            </div>
        </>
    );

}

export default TaskPage