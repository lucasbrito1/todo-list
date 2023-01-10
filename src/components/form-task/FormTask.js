import { useState } from 'react';
import './FormTask.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiTrash, BiCheck } from "react-icons/bi";
import { useEffect } from 'react';


const getTask = () => {
    let list = localStorage.getItem("tarefas");

    if (list) {
        return JSON.parse(localStorage.getItem("tarefas"));
    } else {
        return [];
    }
}

const FormTask = () => {

    const [input, setInput] = useState('');
    const [task, setTask] = useState(getTask());

    const addTask = (event) => {
        event.preventDefault();

        if (input === "") {
            toast.error("Digita uma tarefa!");
        } else {

            const idTask = (num) => Math.floor(Math.random() * num)

            const newTask = {
                id: idTask(12132131),
                title: input,
                isComplete: false
            }

            setTask([...task, newTask]);
        }
        setInput("");
    }

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(task));
    }, [task])



    const taskComplete = (id) => {

        const taskComplete = task.map(task => {
            if (task.id === id) {
                return { ...task, isComplete: !task.isComplete }
            }
            return task
        })

        setTask(taskComplete);
    }

    const taskTrash = (id) => {
        setTask(task.filter(remove => remove.id !== id))
    }

    return (

        <div className='todo'>

            <ToastContainer />

            <form>
                <h1>TODO LIST</h1>
                <div className='box-input'>
                    <input
                        type="text"
                        placeholder='Digite sua tarefa'
                        value={input}
                        onChange={(ev) => setInput(ev.target.value)}
                    />
                    <button className='button-add' onClick={addTask}>+</button>
                </div>

                {task.map(getTask => (
                    <div key={getTask.id} className={getTask.isComplete ? 'list-task-complete' : 'list-task'}>
                        <li className='li'>
                            {getTask.title}
                            <div className='bt-check-trash'>
                                <BiCheck
                                    className='bt-check'
                                    onClick={() => taskComplete(getTask.id)}
                                />
                                <BiTrash
                                    className='bt-trash'
                                    onClick={() => taskTrash(getTask.id)}
                                />
                            </div>
                        </li>
                    </div>
                ))}

            </form>
        </div>
    )
}

export default FormTask