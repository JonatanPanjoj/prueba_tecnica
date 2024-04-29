import { useForm } from 'react-hook-form'
import { useTask } from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm()
    const { createTask, getTask, updateTask } = useTask()
    const navigate = useNavigate();
    var checked = true;

    const params = useParams();

    const onSubmit = handleSubmit((data) => {
        if(params.id == 'new'){
            createTask(data);
        }else{
            updateTask(params.id,data)
        }
        navigate('/task')
    })

    useEffect(() => {
        console.log(params)
        async function loadTask() {
            if (params.id) {
                try {
                    const task = await getTask(params.id)
                    console.log('TASK:',    task)
                    setValue('tarea', task.tareaEncontrada.tarea)
                    setValue('done', task.tareaEncontrada.done)
                } catch (error) {
                    console.error(error)
                }

            }
        }
        loadTask()
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-dark-card max-w-md w-full p-10 rounded-md '>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        placeholder="Tarea"
                        {...register("tarea")}
                        className='w-full bg-zinc-700 text-white px-4 py-4 rounded-md my-3'
                        autoFocus
                    />

                    <input type="checkbox" id="cbox2" onChange={(e) => {
                        checked = e.target.checked;
                        console.log(checked)
                    }}
                        {...register("done")}
                    />
                    <label > Tarea Completada</label>
                    <br />
                    <br />


                    <button
                        className="bg-dark-primary hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage