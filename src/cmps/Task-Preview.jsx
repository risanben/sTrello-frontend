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


export const TaskPreview = ({ task, groupId, index, taskRef, groupTitle }) => {

    const [isFullCover, setIsFullCover] = useState(false)
    const [isQuickEditOn, setIsQuickEditOn] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const refQuickEdit = useRef(null)

    // const dispatch = useDispatch()
    const params = useParams()
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
        if(!refQuickEdit.current) return 
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
                height: "180px",
                borderRadius: "3px"
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
                        <section className="task-preview" /*onDoubleClick={onGoToDetails}*/ onClick={onGoToDetails}>
                            <div className="btn-quick-edit hide" onClick={toggaleQuickEdit}>
                                {/* <BsFillPencilFill /> */}
                            </div>
                            {isQuickEditOn && <section ref={refQuickEdit}><TaskQuickEdit task={task} /></section>}

                            {!isFullCover && task?.style &&
                                <div className="task-cover" style={setTaskCoverStyle()}></div>}
                            {!isFullCover &&
                                <div className="task-preview-content">
                                    {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
                                    <span>{task.title}</span>
                                    {task?.memberIds && <TaskMember memberIds={task.memberIds} />}
                                </div>}

                            {isFullCover && task?.style?.bg?.imgUrl &&
                                <div className="task-preview-content">
                                    <span className="title-img-cover" style={setTaskCoverStyle()}>{task.title}</span>
                                </div>}


                            {isFullCover && task?.style?.bg?.color &&
                                <React.Fragment>
                                    <div className="task-cover" style={setTaskCoverStyle()}></div>
                                    <div className="task-preview-content" style={setTaskCoverStyle()}>
                                        <span>{task.title}</span>
                                    </div>
                                </React.Fragment>}
                        </section >
                        {/* { isDetailsShown && <TaskDetails boardId={boardId} groupId={groupId} taskId={task.id}/>} */}
                    </div>
                )}
            </Draggable>
            {showDetailsModal && <TaskDetails boardId={boardIdRef.current} groupId={groupId} taskId={task.id} task={task} closeModal={onGoToDetails} groupTitle={groupTitle} />}
        </React.Fragment>
    )
}
