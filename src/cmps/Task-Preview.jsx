import React, { useEffect, useState, useRef } from "react"
import { TaskQuickEdit } from "./task-quick-edit"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskDetails } from '../pages/task-details'
import { useNavigate, useParams } from "react-router-dom"
import { TaskLabel } from "./task-label"
import { TaskMember } from "./task-members"
import { updateTask } from "../store/board.actions"
import { useDispatch, useSelector } from "react-redux"

export const TaskPreview = ({ task, groupId, index, taskRef, groupTitle }) => {

    const board = useSelector(state => state.boardModule.board)
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isFullCover, setIsFullCover] = useState(false)
    const [isQuickEditOn, setIsQuickEditOn] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [quickEditPos, setQuickEditPos] = useState(null)

    const [windowWidth, setWidth] = useState(window.innerWidth)
    const [windowHeight, setHeight] = useState(window.innerHeight)

    const refQuickEdit = useRef(null)
    const boardIdRef = useRef()
    boardIdRef.current = params.id

    useEffect(() => {
        if (task.style) setIsFullCover(task.style.bg.fullCover)
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
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

    const toggleQuickEdit = (ev, openDetails = false) => {
        if (ev) ev.stopPropagation()

        if (!isQuickEditOn) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()
            const style = _getPosition(ev.target.getBoundingClientRect(), parentEl.getBoundingClientRect())
            let pos = {
                position: position,
                style: style
            }
            setQuickEditPos(pos)
            setIsQuickEditOn(!isQuickEditOn)

        } else {
            //closing quick edit modal
            setIsQuickEditOn(false)

            //opening details modal
            if (openDetails) {
                onGoToDetails()
            }
        }
    }

    const _getPosition = (evTarget, parent) => {
        // const { left, top } = evTarget
        // if (windowHeight - top < 160) {
        //     console.log('entered first:')
        //     return { top: top - 180, }
        // }
        // if (windowWidth - left < 200) {
        //     console.log('entered second')
        //     return { right: 15, top }
        // }
        // if (windowWidth - left < 420 && windowHeight - top < 160){ 
        //     console.log('ent third')
        //     return { top: top - 160, right: 15 }}
        // else{
        // console.log('entered else:')
        return { top: parent.top, left: parent.left }
        // }
    }

    // const onGoToDetails = () => {
    //     setShowDetailsModal(!showDetailsModal)
    // }

    const onGoToDetails = () => {
        const boardId = params.id
        // navigate(`/board/${boardId}/${groupId}/${task.id}`)
        setShowDetailsModal(!showDetailsModal)

    }

    const onDarkClicked = (e) => {
        e.stopPropagation()
    }

    const isWatchByUser = () => {
        if (!task.memberIds || !task.watcedMemberIds) return
        let isWatch = false
        task.memberIds.forEach(member => {
            if (task.watcedMemberIds.includes(member)) isWatch = true
        })
        return isWatch
    }

    const completeDue = (ev) => {
        ev.stopPropagation()
        task.dueDate.isDone = !task.dueDate.isDone
        const dueDateAction = task.dueDate.isDone ? 'complete' : 'incomplete'
        const activity = {
            txt: `marked the due date on ${task.title} ${dueDateAction}`,
            task: {
                id: task.id,
                title: ""
            }
        }
        dispatch(updateTask(board._id, groupId, task, activity))
    }

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
                            <div className="btn-quick-edit hide" onClick={toggleQuickEdit}>
                            </div>
                            {isQuickEditOn && <section ref={refQuickEdit}><TaskQuickEdit task={task} boardId={boardIdRef.current} groupId={groupId} pos={quickEditPos} toggaleQuickEdit={toggleQuickEdit} /></section>}

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
