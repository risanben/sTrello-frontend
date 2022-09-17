import React, { useEffect, useState } from "react"
import { BsFillPencilFill } from 'react-icons/bs'
import { TaskQuickEdit } from "./task-quick-edit"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { useDispatch } from "react-redux";
// import { loadTasks } from "../store/task.actions"
import { TaskDetails } from '../pages/task-details'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"
import { TaskLabel } from "./task-label"


export const TaskPreview = ({ task, groupId, index, taskRef }) => {

    const [isFullCover, setIsFullCover] = useState(false)
    const [isQuickEditOn, setIsQuickEditOn] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    // const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (task.style) setIsFullCover(task.style.bg.fullCover)
    }, [])

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
        const boardId = params.id
        //    showDetailsModal=setShowDetailsModal(!showDetailsModal)
        navigate(`/board/${boardId}/${groupId}/${task.id}`)
    }

    return (
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
                    <section className="task-preview" onDoubleClick={onGoToDetails} /*onClick={onGoToDetails}*/ >
                        <div className="btn-quick-edit hide" onClick={toggaleQuickEdit}>
                            {/* <BsFillPencilFill /> */}
                        </div>
                        {isQuickEditOn && <TaskQuickEdit />}

                        {!isFullCover && task?.style &&
                            <div className="task-cover" style={setTaskCoverStyle()}></div>}
                        {!isFullCover &&
                            <div className="task-preview-content">
                                {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
                                <span>{task.title}</span>
                            </div>}

                        {isFullCover && task?.style?.bg?.imgUrl &&
                            <div><span className="title-img-cover" style={setTaskCoverStyle()}>{task.title}</span></div>}

                        {isFullCover && task?.style?.bg?.color &&
                            <React.Fragment>
                                <div className="task-cover" style={setTaskCoverStyle()}></div>
                                <div><span style={setTaskCoverStyle()}>{task.title}</span></div>
                            </React.Fragment>}
                        {/* {   showDetailsModal && <TaskDetails props={onUpdateTask} />} */}
                    </section >
                </div>
            )}
        </Draggable>
    )
}
