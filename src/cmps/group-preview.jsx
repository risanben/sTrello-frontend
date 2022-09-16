import { TaskList } from './Task-list'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { utilService } from '../services/util.service'
import { useEffect } from 'react'


export const GroupPreview = ({ group, addTask }) => {

    const [isAddTask, setIsAddTask] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)


    const [task, handleChangeTask, setTask] = useForm({
        title: ''
    })

    const [groupToEdit, handleChangeGroup, setGroup] = useForm({
        title: ''
    })

    useEffect(() => {
        setGroup(group)
    }, [])

    const toggaleEditTitle = () => {
        setIsEditTitle(!isEditTitle)
    }

    const onEditGroupTitle = (ev) => {
        ev.preventDefault()
        console.log('groupToEdit', groupToEdit)
        setIsEditTitle(!isEditTitle)
    }

    const toggaleAddTaskTextarea = () => {
        setIsAddTask(!isAddTask)
        setTask({})
    }

    const onAddTask = () => {
        if (!task.title) return
        task.id = utilService.makeId()
        const groupToSave = { ...group }
        if (groupToSave?.tasks) groupToSave.tasks.push(task)
        else groupToSave.tasks = [task]
        // groupToSave.tasks = !groupToSave?.tasks ? [task] : [...groupToSave.tasks, task]
        addTask(groupToSave)
        setIsAddTask(!isAddTask)
    }
    // console.log('group', group)
    // console.log('render group preview')
    return (
        <section className="group-preview">
            <div className="group-title">
                {!isEditTitle && <span onClick={toggaleEditTitle}>{group.title}</span>}
                {isEditTitle &&
                    <form onSubmit={onEditGroupTitle}>
                        <input
                            value={groupToEdit.title}
                            onChange={handleChangeGroup}
                            type="text"
                            name="title"
                            id="title"
                        />
                    </form>}
            </div>
            <TaskList tasks={group.tasks} isAddTask={isAddTask} handleChangeTask={handleChangeTask} task={task} />
            {!isAddTask && <div className="add-task-container" onClick={toggaleAddTaskTextarea}>
                <span className="add-icon">+</span>
                <span> Add a card</span>
            </div>}
            {isAddTask && <React.Fragment>

                <div className="add-task-btn-container">
                    <button className="btn-add" onClick={onAddTask}>Add card</button>
                    <div className="btn-close-add" onClick={toggaleAddTaskTextarea}></div>
                </div>
            </React.Fragment>}
        </section >
    )
}

