import React, { useEffect, useState } from "react"
import { BsFillPencilFill } from 'react-icons/bs'
import { TaskQuickEdit } from "./task-quick-edit"
// import { useDispatch } from "react-redux";
// import { loadTasks } from "../store/task.actions"
import { TaskDetails } from '../pages/task-details'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom"

export const TaskPreview = ({ task, groupId }) => {

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
        <section className="task-preview" onDoubleClick={onGoToDetails} /*onClick={onGoToDetails}*/ >
            <button className="quick-edit-btn hide" onClick={toggaleQuickEdit}>
                <BsFillPencilFill />
            </button>
            {isQuickEditOn && <TaskQuickEdit />}
            {!isFullCover && task?.style && <div className="task-cover" style={setTaskCoverStyle()}></div>}
            {!isFullCover && <span>{task.title}</span>}

            {isFullCover && task?.style?.bg?.imgUrl && <span className="title-img-cover" style={setTaskCoverStyle()}>{task.title}</span>}
            {isFullCover && task?.style?.bg?.color && <React.Fragment>
                <div className="task-cover" style={setTaskCoverStyle()}></div>
                <span style={setTaskCoverStyle()}>{task.title}</span>
            </React.Fragment>}
            {/* {   showDetailsModal && <TaskDetails props={onUpdateTask} />} */}
        </section >
    )
}
