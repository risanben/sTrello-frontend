import React, { useEffect, useState, useRef } from "react"
import { BsFillPencilFill } from 'react-icons/bs'
import { TaskQuickEdit } from "./task-quick-edit"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { useDispatch } from "react-redux";
// import { loadTasks } from "../store/task.actions"
import { TaskDetails } from '../pages/task-details'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import { TaskLabel } from "./task-label"
import { TaskMember } from "./task-members"
import { HiOutlineEye } from 'react-icons/hi';
import { updateTask } from "../store/board.actions"
import { useDispatch, useSelector } from "react-redux"


export const TaskPreview = ({ task, groupId, index, taskRef, groupTitle }) => {

    const [isFullCover, setIsFullCover] = useState(false)
    const [isQuickEditOn, setIsQuickEditOn] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    // const [taskDoneStyle, setTaskDoneStyle] = useState({})
    const refQuickEdit = useRef(null)

    const board = useSelector(state => state.boardModule.board)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const boardIdRef = useRef()
    boardIdRef.current = params.id
    // console.log('boardIdRef', boardIdRef);

    useEffect(() => {
        if (task.style) setIsFullCover(task.style.bg.fullCover)
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickedOutside, true)
    }, [])

    const handleClickedOutside = (e) => {
        if (!refQuickEdit.current) return
        if (!refQuickEdit.current.contains(e.target)) {
            setIsQuickEditOn(false)
        }
    }

    const setTaskCoverStyle = () => {
        let style = {}
        if (!task.style) return style
        if (task.style.bg.color) style = { backgroundColor: task.style.bg.color }
        else if (task.style.bg.imgUrl) {
            style = {
                backgroundImage: `url(${task.style.bg.imgUrl})`,
                backgroundSize: "cover",
                height: "180px"
            }
        }
        return style
    }

    const toggaleQuickEdit = (ev) => {
        ev.stopPropagation()
        setIsQuickEditOn(!isQuickEditOn)
    }

    const onGoToDetails = () => {
        // const boardId = params.id
        setShowDetailsModal(!showDetailsModal)
        // navigate(`/board/${boardId}/${groupId}/${task.id}`)
    }

    const onDarkClicked = (e) => {
        e.stopPropagation()
    }
    const isWatchByUser = () => {
        // console.log('isWatch function')
        if (!task.memberIds || !task.watcedMemberIds) return
        let isWatch = false
        task.memberIds.forEach(member => {
            if (task.watcedMemberIds.includes(member)) isWatch = true
        })
        // console.log('isWatch', isWatch)
        return isWatch
    }

    const completeDue = (ev) => {
        ev.stopPropagation()
        task.dueDate.isDone = !task.dueDate.isDone
        dispatch(updateTask(board._id, groupId, task))
    }

    console.log('render TASK PREVIEW')
    return (
        <React.Fragment>
            <Draggable
                draggableId={task.id}
                // key={task.id}
                index={index}
            >
                {(provided) => (
                    <div
                        ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <section className="task-preview" onClick={onGoToDetails} >
                            <div className="btn-quick-edit hide" onClick={toggaleQuickEdit}>
                                {/* <BsFillPencilFill /> */}
                            </div>
                            {isQuickEditOn && <section ref={refQuickEdit}><TaskQuickEdit task={task} /></section>}

                            {!isFullCover && task?.style &&
                                <div className="task-cover" style={setTaskCoverStyle()}></div>}
                            {!isFullCover &&
                                <div className="task-preview-content">
                                    {task?.labelIds && <TaskLabel
                                        labelIds={task.labelIds}
                                    />}
                                    <span>{task.title}</span>
                                    <div className={"badges-container " + (!task?.memberIds && task?.dueDate ? "adjust-height" : "")} >
                                        <div className="left-badges-container">
                                            {isWatchByUser() && <div className="viewed-by-user"></div>}
                                            {task?.dueDate && <div className={"due-date-container " + (task?.dueDate.isDone ? "done" : "")} onClick={completeDue}>
                                                <div className="due-date-icon"></div>
                                                <span className="due-date-txt">Sep 20</span>
                                            </div>}
                                            {task.desc && <div className="task-desc-icon"></div>}
                                            {task?.attachments && <div className="attachment-badge-container">
                                                <div className="attachment-badge"></div>
                                                <span>{task.attachments.length}</span>
                                            </div>}
                                            {/* <div className="checklist-container">
                                                <div className="checklist-icon"></div>
                                                <span className="checklist-todos">1/2</span>
                                            </div> */}
                                        </div>

                                        <div className="right-badges-container">
                                            {task?.memberIds && <TaskMember
                                                memberIds={task.memberIds}
                                                taskRef={taskRef}
                                                index={index} />}
                                        </div>
                                    </div>
                                </div>}

                            {isFullCover && task?.style?.bg?.imgUrl &&
                                <div className="task-preview-content add-border" style={setTaskCoverStyle()}>
                                    <span className="title-img-cover" >{task.title}</span>
                                </div>}


                            {isFullCover && task?.style?.bg?.color &&
                                <React.Fragment>
                                    <div className="task-cover" style={setTaskCoverStyle()}></div>
                                    <div className="task-preview-content" style={setTaskCoverStyle()}>
                                        <span>{task.title}</span>
                                    </div>
                                </React.Fragment>}
                            <div className="dark-screen" style={{ display: isQuickEditOn ? "block" : "none" }} onClick={onDarkClicked}></div>
                        </section >
                        {/* { isDetailsShown && <TaskDetails boardId={boardId} groupId={groupId} taskId={task.id}/>} */}
                    </div>
                )
                }
            </Draggable >
            {showDetailsModal && <TaskDetails boardId={boardIdRef.current} groupId={groupId} taskId={task.id} task={task} closeModal={onGoToDetails} groupTitle={groupTitle} />}
        </React.Fragment >
    )
}
