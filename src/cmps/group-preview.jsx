import { TaskList } from './Task-list'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { utilService } from '../services/util.service'


export const GroupPreview = ({ group, addTask }) => {

    const [isAddTask, setIsAddTask] = useState(false)


    const [task, handleChange, setTask] = useForm({
        title: ''
    })
    const toggaleAddTaskTextarea = () => {
        setIsAddTask(!isAddTask)
        setTask({})
    }

    const onAddTask = () => {
        if (!task.title) return
        task.id = utilService.makeId()
        const groupToSave = { ...group }
        groupToSave.tasks.push(task)
        addTask(groupToSave)
        setIsAddTask(!isAddTask)
    }
    console.log('group', group)
    console.log('render group preview')
    return (
        <section className="group-preview">
            <div className="group-title">
                <span>{group.title}</span>
            </div>
            <TaskList tasks={group.tasks} />
            {!isAddTask && <div className="add-task-container" onClick={toggaleAddTaskTextarea}>
                <span className="add-icon">+</span>
                {/* <span>Add a card</span> */}
                {/* <Link to={`/task/edit/`} className='nice-button'><span>Add a card</span></Link> */}
                <span> Add a card</span>
            </div>}
            {isAddTask && <React.Fragment>
                <div className="add-task-content">
                    <textarea
                        name="title"
                        id="title"
                        placeholder="Enter a title for this card..."
                        value={task.title}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="add-task-btn-container">
                    <button onClick={onAddTask}>Add card</button> <button onClick={toggaleAddTaskTextarea}>X</button>
                </div>
            </React.Fragment>}
        </section >
    )
}

