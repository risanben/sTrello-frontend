
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { useFormRegister } from '../hooks/useFormRegister'
import { useDispatch } from "react-redux";
import { updateTask, removeTask, getTask, getBoardMembers } from '../store/board.actions'
import { TaskMember } from "../cmps/task-members"
import { TaskLabel } from "../cmps/task-label"
import { TaskDetailsMembersModal } from "../cmps/task-details-members-modal"
import { HiUser } from 'react-icons/hi';
import { BsTagFill, BsCheck2Square, BsClock } from 'react-icons/bs';
import { HiArchive } from 'react-icons/hi';
import { FaWindowMaximize } from 'react-icons/fa';
import { GrTextAlignFull, GrAdd, GrAttachment } from 'react-icons/gr';
import { AbilityCreator } from "../cmps/ability-creator";
import { TaskDetailsLabelModal } from "../cmps/task-details-labels-modal";

export const TaskDetails = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const refInput = useRef(null)
    const refDesc = useRef(null)

    const [bgColor, setBgColor] = useState(null)
    const [showModal, setShowModal] = useState(null)
    const [currentBoardId, setBoardId] = useState(null)
    const [currentGroupId, setGroupId] = useState(null)
    const [currentGroupTitle, setGroupTitle] = useState(null)
    const [isMemberModal, setIsMemberModal] = useState(null)
    const [isEditTitle, setEditTitle] = useState(null)
    const [isEditDescription, setEditDescription] = useState(null)
    const [isLabelModal, setIsLabelModal] = useState(null)
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        // const { id, boardId, groupId } = params
        const { boardId, groupId, taskId, groupTitle } = props

        if (!boardId) return
        setBoardId(boardId)
        if (!groupId) return
        setGroupId(groupId)
        if (!taskId) return
        setGroupTitle(groupTitle)
        //When we operate with a real user we will place here a user sent to the component and use is ID
        setCurrentUser(['u102'])

        if (props?.task?.style?.bg.color) setBgColor(props.task.style.bg.color)
        setTask(props.task)
    }, [])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, [])

    const handleClickOutside = (e) => {
        if (!refInput.current) return
        if (!refInput.current.contains(e.target)) {
            setEditTitle(false)
            setEditDescription(false)
        }
    }

    const onUpdateTask = (task) => {
        dispatch(updateTask(currentBoardId, currentGroupId, task))
    }

    const [register, setTask, task] = useFormRegister({}, onUpdateTask)

    const onBack = () => {
        // navigate(`/board/${currentBoardId}`)
        props.closeModal()
    }

    const toggleEditTitle = () => {
        setEditTitle(!isEditTitle)
    }
    const toggleEditDescription = () => {
        setEditDescription(!isEditDescription)
    }

    const onShowModal = () => {
        setShowModal(!showModal)
    }

    const toggleMembersModal = () => {
        setIsMemberModal(!isMemberModal)
    }
    const toggleLabelsModal = () => {
        setIsLabelModal(!isLabelModal)
    }

    const onSetColor = (ev) => {
        setBgColor(ev.target.value)
        if (!task.style) task.style = { bg: { color: ev.target.value } }
        task.style.bg.color = ev.target.value
        task.style.bg.imgUrl = null
        onUpdateTask(task)
    }

    const onSetImg = (imgUrl) => {
        if (!task.style) task.style = { bg: { imgUrl } }
        task.style.bg.imgUrl = imgUrl
        task.style.bg.color = null
        setBgColor(null)
        onUpdateTask(task)
    }

    const onSetMember = (addOrRemove, memberId) => {
        if (!addOrRemove) {
            if (!task.memberIds) task.memberIds = [memberId]
            else task.memberIds.push(memberId)
            if (!task.watcedMemberIds) task.watcedMemberIds = [memberId]
            else task.watcedMemberIds.push(memberId)
        } else {
            console.log('task', task);
            const idx = task.memberIds.findIndex(member => member._id === memberId)
            task.memberIds.splice(idx, 1)
            const watchIdx = task.watcedMemberIds.findIndex(member => member._id === memberId)
            task.watcedMemberIds.splice(watchIdx, 1)
        }
        onUpdateTask(task)
    }

    const onSetLabel = (addOrRemove, labelId) => {
        if (!addOrRemove) {
            if (!task.labelIds) task.labelIds = [labelId]
            else task.labelIds.push(labelId)
        } else {
            const idx = task.labelIds.findIndex(label => label.id === labelId)
            task.labelIds.splice(idx, 1)
        }
        onUpdateTask(task)
    }

    const onRemoveTask = () => {
        try {
            dispatch(removeTask(currentBoardId, currentGroupId, task))
            navigate(`/board/${currentBoardId}`)
        } catch (err) {
            throw err
        }
    }

    const onSaveTask = async (ev) => {
        ev.preventDefault()
        try {
            dispatch(updateTask(currentBoardId, currentGroupId, task))
        } catch (err) {
            throw err
        }
    }

    if (!task) return <div>Loading...</div>
    return (
        <section className="task-details-main" >
            <div>
                <section className="task-details-container focus">
                    {/* task cover */}
                    <section style={{ backgroundColor: bgColor }} className="task-cover">
                        <button onClick={onBack} className="btn close"></button>
                        {task?.style?.bg?.imgUrl && <img className="img-cover" src={`${task.style.bg.imgUrl}`} ></img>}
                        <div onClick={onShowModal} className="btn cover"> <span className="bts-icon"><FaWindowMaximize /></span>Cover</div>
                        {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
                    </section>{/*task-cover*/}

                    {/* task-details */}
                    <span className="task-title-icon"><FaWindowMaximize /></span>
                    <div className="title-container">
                        <form className="task-details" onSubmit={onSaveTask}>
                            <section className="title-input">
                                {isEditTitle && <input {...register('title', 'text')} value={task.title} ref={refInput} />}
                                {!isEditTitle && <span className="static-input" onClick={toggleEditTitle} >{task.title}</span>}
                                <span className="group-title-in-task">in list {currentGroupTitle}</span>
                            </section>
                        </form>
                    </div> {/*title-container*/}

                    <section className="tags">
                        <section className="members" >
                            <span className="tag-title">Members</span>
                            <br />
                            <div className="select-members">
                                {task?.memberIds && <TaskMember memberIds={task.memberIds} />}
                                <span onClick={toggleMembersModal} className="plus-icon"><GrAdd /></span>
                                {isMemberModal && <TaskDetailsMembersModal memberIds={task.memberIds} onSetMember={onSetMember} toggleMembersModal={toggleMembersModal} />}
                            </div>
                        </section>
                        <section className="labels">
                            <span className="tag-title">Labels</span>
                            <div className="select-members">
                                {task?.labelIds && <span className="label-container"><TaskLabel labelIds={task.labelIds} /></span>}
                                <span onClick={toggleLabelsModal} className="plus-icon"><GrAdd /></span>
                                {isLabelModal && <TaskDetailsLabelModal labelIds={task.labelIds} onSetLabel={onSetLabel} toggleLabelsModal={toggleLabelsModal} />}

                            </div>
                        </section>
                    </section>{/*tags*/}

                    <span className="description-icon"> <GrTextAlignFull /> </span>
                    <section className="description-container">
                        <span className="description-title">Description</span>
                        {!isEditDescription && <button onClick={toggleEditDescription}>Edit</button>}
                        <div className="description-edit">
                            {isEditDescription && <textarea className="description-textarea" {...register('description', 'text')} value={task.description} ref={refInput} />}
                            {isEditDescription && <button className="btn save" onClick={toggleEditDescription}>Save</button>}
                            {isEditDescription && <button>Cancel</button>}
                            {!isEditDescription && <span className="static-description" onClick={toggleEditDescription}>{task.description} </span>}
                        </div>
                    </section>

                    <span className="activity-main-icon"> <GrTextAlignFull /></span>
                    <span className="activity-title">Activity</span>
                    <span className="user-icon"><TaskMember memberIds={currentUser} /></span>
                    <textarea className="activity-input" placeholder="Write a comment..."></textarea>
                    <span className="activity-icon">icon</span>
                    <span className="activity-title">Activity</span>
                    <span className="activity-icon">icon</span>
                    <span className="activity-title">Activity</span>
                    <span className="activity-icon">icon</span>
                    <span className="activity-title">Activity</span>
                    <span className="activity-icon">icon</span>
                    <span className="activity-title">Activity</span>

                    <section className="task-abilities">
                        <AbilityCreator callBackF={toggleMembersModal} iconCmp={HiUser} name={'Members'} />
                        {/* <button className="btn abilities" onClick={onShowMembersModal}><span className="icon"><HiUser /></span><span className="ability">Members</span></button> */}
                        <button className="btn abilities" onClick={toggleLabelsModal}><span className="icon"><BsTagFill /></span><span className="ability">Labels</span></button>
                        <button className="btn abilities"><span className="icon"><BsCheck2Square /></span><span className="ability">Checklist</span></button>
                        <button className="btn abilities"><span className="icon"><BsClock /></span><span className="ability">Dates</span></button>
                        <button className="btn abilities"><span className="icon"><GrAttachment /></span><span className="ability">Attachment</span></button>
                        <button className="btn abilities" onClick={onRemoveTask}><span className="icon"><HiArchive /> </span><span className="ability">Archive</span></button>
                    </section>

                </section>{/*task-details-container focus*/}
            </div >
            <div className="black-screen" onClick={onBack}>
            </div>
        </section >
    )
}

