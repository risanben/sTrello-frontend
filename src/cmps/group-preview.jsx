import { TaskList } from './Task-list.jsx'
import React, { useState, useRef } from 'react'
import { useForm } from '../hooks/useForm'
import { utilService } from '../services/util.service'
import { useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { GroupActionModal } from './group-action'
import { useDispatch, useSelector } from 'react-redux'
import { removeGroup } from '../store/board.actions'

export const GroupPreview = ({ group, addTask, index, taskRef }) => {

    const disapcth = useDispatch()
    const board = useSelector(state => state.boardModule.board)

    const refTitle = useRef(null)
    const [isAddTask, setIsAddTask] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isOpenGroupAction, setIsOpenGroupAction] = useState(false)
    const [leftPosGroupModal, setLeftPosGroupModal] = useState(null)


    useEffect(() => {
        setGroup(group)
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)

        return (
            () => {
                document.removeEventListener("click", handleClickOutside, false)
                // console.log('listener disabled:')
            }
        )

    }, [])

    const [task, handleChangeTask, setTask] = useForm({
        title: ''
    })

    const [groupToEdit, handleChangeGroup, setGroup] = useForm({
        title: ''
    })
    const handleClickOutside = (e) => {
        if (!refTitle.current) return
        if (!refTitle.current.contains(e.target)) {
            onEditGroupTitle()
        }
    }

    const toggaleEditTitle = () => {
        setIsEditTitle(!isEditTitle)
    }

    const onEditGroupTitle = (ev) => {
        if (ev) ev.preventDefault()
        addTask(groupToEdit)
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
        const activity = {
            txt: 'added',
            groupTitle: ` to ${groupToSave.title}`,
            task: {
                id: task.id,
                title: task.title
            }
        }
        addTask(groupToSave, activity)
        setIsAddTask(!isAddTask)
    }

    const onDeleteGroup = (group) => {
        const activity = {
            txt: `archived list  ${group.title}`,
            task: {
                id: "",
                title: ""
            }
        }
        disapcth(removeGroup(board._id, group.id, activity))
    }

    const onOpenGroupAction = (ev) => {
        const parentEl = ev.currentTarget.parentNode
        const position = parentEl.getBoundingClientRect()
        // setLeftPosGroupModal(ev.target.offsetLeft - 200)
        setLeftPosGroupModal(position.x + 30)
        console.log('ev.target.offsetLeft', ev.target.offsetLeft)
        console.log('leftPosGroupMOdal', leftPosGroupModal)
        console.log('position', position)
        setIsOpenGroupAction(!isOpenGroupAction)
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
                    className="group-preview-dnd"
                >
                    <section className="group-preview">
                        <div className="group-title">
                            {!isEditTitle && <span onClick={toggaleEditTitle}>{groupToEdit.title}</span>}
                            {isEditTitle &&
                                <form onSubmit={onEditGroupTitle} ref={refTitle}>
                                    <input
                                        value={groupToEdit.title}
                                        onChange={handleChangeGroup}
                                        type="text"
                                        name="title"
                                        id="title"

                                    />
                                </form>}
                            <div className="group-menu" onClick={onOpenGroupAction}></div>
                            {isOpenGroupAction &&
                                <GroupActionModal
                                    group={groupToEdit}
                                    leftPos={leftPosGroupModal}
                                    onOpenGroupAction={onOpenGroupAction}
                                    onDeleteGroup={onDeleteGroup}
                                    addTask={addTask}
                                    setIsOpenGroupAction={setIsOpenGroupAction} />}
                        </div>
                        <div className="scroll">
                            <TaskList
                                tasks={group.tasks}
                                group={group}
                                groupId={group.id}
                                isAddTask={isAddTask}
                                handleChangeTask={handleChangeTask}
                                task={task}
                            />
                            {isAddTask && <React.Fragment>

                                <div className="add-task-btn-container">
                                    <button className="btn-add" onClick={onAddTask}>Add card</button>
                                    <div className="btn-close-add" onClick={toggaleAddTaskTextarea}></div>
                                </div>
                            </React.Fragment>}
                        </div>
                        {!isAddTask && <div className="add-task-container" onClick={toggaleAddTaskTextarea}>
                            <span className="add-icon">+</span>
                            <span> Add a card</span>
                        </div>}

                    </section >
                </article>
            )}
        </Draggable>
    )
}

