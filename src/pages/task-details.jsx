
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { useFormRegister } from '../hooks/useFormRegister'
import { useDispatch } from "react-redux"
import { updateTask, removeTask, getTask, getBoardMembers, resizeLabel } from '../store/board.actions'
import { TaskMember } from "../cmps/task-members"
import { TaskLabel } from "../cmps/task-label"
import { TaskDetailsMembersModal } from "../cmps/task-details-members-modal"
import { HiUser } from 'react-icons/hi'
import { BsTagFill, BsCheck2Square, BsClock } from 'react-icons/bs'
import { HiArchive } from 'react-icons/hi'
import { FaWindowMaximize } from 'react-icons/fa'
import { GrTextAlignFull, GrAdd, GrAttachment } from 'react-icons/gr'
import { IoIosArrowDown } from 'react-icons/io'
import { AbilityCreator } from "../cmps/ability-creator"
import { TaskDetailsLabelModal } from "../cmps/task-details-labels-modal"

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
        console.log('clicked')
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
        console.log('addOrRemove', addOrRemove)
        console.log('memberId', memberId)
        console.log('memberIds', task.memberIds)

        if (!addOrRemove) {
            if (!task.memberIds) task.memberIds = [memberId]
            else task.memberIds.push(memberId)
            if (!task.watcedMemberIds) task.watcedMemberIds = [memberId]
            else task.watcedMemberIds.push(memberId)
        } else {
            console.log('task', task)
            const idx = task.memberIds.findIndex(member => member === memberId)
            task.memberIds.splice(idx, 1)
            const watchIdx = task.watcedMemberIds.findIndex(watcedMember => watcedMember === memberId)
            task.watcedMemberIds.splice(watchIdx, 1)
        }
        console.log('memberIds', task.memberIds)
        onUpdateTask(task)
    }

    const onSetLabel = (addOrRemove, labelId) => {
        if (!addOrRemove) {
            if (!task.labelIds) task.labelIds = [labelId]
            else task.labelIds.push(labelId)
        } else {
            const idx = task.labelIds.findIndex(label => label === labelId)
            task.labelIds.splice(idx, 1)
        }
        onUpdateTask(task)
    }

    const onRemoveTask = () => {
        dispatch(removeTask(currentBoardId, currentGroupId, task))
        navigate(`/board/${currentBoardId}`)
    }

    const onSaveTask = async (ev) => {
        ev.preventDefault()
        dispatch(updateTask(currentBoardId, currentGroupId, task))
    }

    const clickedOnModal = (ev) => {
        ev.stopPropagation()
    }

    const onOpenLabelsModal = (ev) => {
        // ev.stopPropagation()

        dispatch(resizeLabel(false))
        // 
        console.log('labels')
    }

    const onCompleteDueDate = () => {
        task.dueDate.isDone = !task.dueDate.isDone
        dispatch(updateTask(currentBoardId, currentGroupId, task))
    }

    if (!task) return <div>Loading...</div>
    return (
        <section className="task-details-main" >
            <div className="black-screen" onClick={onBack}>

                <section className="task-details-container" onClick={clickedOnModal}>

                    {/* task cover  */}
                    {task?.style && <section className="task-cover" style={{ backgroundColor: bgColor }} >
                        <button onClick={onBack} className="btn close"></button>
                        {task?.style?.bg?.imgUrl && <div className="img-cover" style={{ backgroundImage: `url(${task.style.bg.imgUrl})` }} ></div>}
                        <div onClick={onShowModal} className="btn cover">
                            <span className="bts-icon"><FaWindowMaximize /></span>
                            <span className="btn-cover-txt">Cover</span>
                            {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} />}
                        </div>
                    </section>}

                    {/* task-details */}

                    <div className="task-main-container">

                        <div className="title-container">
                            <span className="task-title-icon"><FaWindowMaximize /></span>
                            <section className="title-input">
                                {!isEditTitle && <div className="static-input" onClick={toggleEditTitle} >{task.title}</div>}
                                {isEditTitle && <form className="task-details-form" onSubmit={onSaveTask}>
                                    <input className="title-text-area" {...register('title', 'text')} value={task.title} ref={refInput} />
                                </form>}
                                <div className="group-title-in-task">in list {currentGroupTitle}</div>
                            </section>
                        </div> {/*title-container*/}

                        <div className="task-main-middle-container">

                            <div className="task-main-container-left">

                                <section className="tags">

                                    {task?.memberIds && <section className="members">
                                        <div className="tag-title">Members</div>
                                        <div className="select-members">
                                            <TaskMember memberIds={task.memberIds} />
                                            <div onClick={toggleMembersModal} className="plus-icon"><GrAdd /></div>
                                        </div>
                                    </section>}
                                    {isMemberModal && <TaskDetailsMembersModal memberIds={task.memberIds} onSetMember={onSetMember} toggleMembersModal={toggleMembersModal} />}

                                    {task?.labelIds && <section className="labels">
                                        <div className="tag-title">Labels</div>
                                        <div className="select-labels">
                                            <div className="label-container" onClick={onOpenLabelsModal}>
                                                <TaskLabel labelIds={task.labelIds} />
                                            </div>
                                            <div onClick={toggleLabelsModal} className="plus-icon">
                                                <GrAdd />
                                            </div>
                                        </div>
                                    </section>}
                                    {isLabelModal && <TaskDetailsLabelModal labelIds={task.labelIds} onSetLabel={onSetLabel} toggleLabelsModal={toggleLabelsModal} />}
                                </section>{/*tags*/}

                                {task?.dueDate && <section className="due-date">
                                    <div className="tag-title">Due date</div>
                                    <div className="due-date-container">
                                        <div className={"due-date-checkbox " + (task.dueDate.isDone ? "is-done" : "")} onClick={onCompleteDueDate}></div>
                                        <div className={"due-date-content " + (task.dueDate.isDone ? "is-done" : "")}>
                                            <div className="due-date-time">Sep 19 at 8:30 PM</div>
                                            {!task.dueDate.isDone && <div className="due-date-tag">due soon</div>}
                                            {task.dueDate.isDone && <div className="due-date-tag is-done">complete</div>}
                                            <div className="due-date-dropdwon-icon"><IoIosArrowDown /></div>
                                        </div>
                                    </div>
                                </section>}

                                <section className={`description-container ${isEditDescription ? 'edit-status' : ''}`}>
                                    <span className="description-icon"> <GrTextAlignFull /> </span>
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
                            </div>

                            <div className="task-main-container-right">
                                <span>Add to card</span>
                                {/* <section className="task-abilities"> */}
                                <AbilityCreator callBackF={toggleMembersModal} iconCmp={HiUser} name={'Members'} />
                                {/* <button className="btn abilities" onClick={onShowMembersModal}><span className="icon"><HiUser /></span><span className="ability">Members</span></button> */}
                                <button className="btn abilities" onClick={toggleLabelsModal}>
                                    <span className="icon"><BsTagFill /></span>
                                    <span className="ability">Labels</span>
                                </button>
                                <button className="btn abilities">
                                    <span className="icon"><BsCheck2Square /></span>
                                    <span className="ability">Checklist</span>
                                </button>
                                <button className="btn abilities">
                                    <span className="icon"><BsClock /></span>
                                    <span className="ability">Dates</span>
                                </button>
                                <button className="btn abilities">
                                    <span className="icon"><GrAttachment /></span>
                                    <span className="ability">Attachment</span></button>
                                <button className="btn abilities" onClick={onRemoveTask}>
                                    <span className="icon"><HiArchive /> </span>
                                    <span className="ability">Archive</span>
                                </button>
                                {/* </section> */}

                            </div>


                        </div>
                    </div>

                </section>{/*task-details-container focus*/}
            </div >

            {/* </div> */}
        </section >
    )
}

