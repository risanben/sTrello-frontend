import { TaskList } from './Task-list'
import { Link } from 'react-router-dom'
import React, { useState, useRef } from 'react'
import { useForm } from '../hooks/useForm'
import { utilService } from '../services/util.service'
import { useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'



export const GroupPreview = ({ group, addTask, index, taskRef }) => {

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

    return (
        <Draggable
            draggableId={group.id}
            // key={group.id}
            index={index}
        >
            {(provided) => (
                <article
                    ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <section className="group-preview">
                        <div className="group-title">
                            <span>{group.title}</span>
                        </div>
                        <TaskList
                            tasks={group.tasks}
                            group={group} groupId={group.id} />
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
                </article>
            )}
        </Draggable>
    )
}

