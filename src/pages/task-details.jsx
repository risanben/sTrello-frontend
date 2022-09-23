
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { useFormRegister } from '../hooks/useFormRegister'
import { useDispatch } from "react-redux"
import { updateTask, removeTask, getTask, getBoardMembers, resizeLabel, getImgUrl, getImgFromUrl } from '../store/board.actions'
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
import { useSelector } from "react-redux"
import { AttachmentModal } from "../cmps/attachment-modal"
import moment from 'moment'
import { TaskDetailsAttachments } from "../cmps/task-details-sections/task-details-attachments"
import { AttachmentNameEditModal } from "../cmps/task-details-modals/attachment-name-edit-modal"
import { DatePicker } from '../cmps/date-picker'
import { DatePickerModal } from "../cmps/date-picker-modal"

export const TaskDetails = ({ boardId, groupId, taskId, groupTitle, closeModal }) => {

    const imgJson = useSelector(state => state.boardModule.imgJson)
    const currentTask = useSelector(state => state.boardModule.task)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const refInput = useRef(null)
    const refDesc = useRef(null)
    const refLabelModal = useRef(null)

    const [bgColor, setBgColor] = useState(null)
    const [showModal, setShowModal] = useState(null)
    const [currentBoardId, setBoardId] = useState(null)
    const [currentGroupId, setGroupId] = useState(null)
    const [currentGroupTitle, setGroupTitle] = useState(null)
    const [isMemberModal, setIsMemberModal] = useState(null)
    const [isEditTitle, setEditTitle] = useState(null)
    const [isEditDescription, setEditDescription] = useState(null)
    const [isLabelModal, setIsLabelModal] = useState(null)
    const [isAttachmentModal, setIsAttachmentModal] = useState(false)
    const [isEditAttachName, setIsEditAttachName] = useState(false)
    // const [isAttachedFile, setIsAttachedFile] = useState(null)
    const [currentUser, setCurrentUser] = useState([])
    const [labelModalPos, setLabelModalPos] = useState(null)
    const [attachModalPos, setAttachModalPos] = useState(null)
    // const [windowWidth, setWidth] = useState(window.innerWidth)
    // const [windowHeight, setHeight] = useState(window.innerHeight)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(null)


    useEffect(() => {
        // const { boardId, groupId, taskId, groupTitle } = props
        // const { taskId, boardId, groupId } = params

        console.log('boardId', boardId);
        console.log('groupId', groupId);
        console.log('taskId', taskId);

        if (!boardId) return
        setBoardId(boardId)
        if (!groupId) return
        setGroupId(groupId)
        if (!taskId) return
        setGroupTitle(groupTitle)

        //When we operate with a real user we will place here a user sent to the component and use is ID
        setCurrentUser(['u102'])

        dispatch(getTask(boardId, groupId, taskId))
        // loadTasks(boardId, groupId, taskId)

    }, [])

    // const loadTasks = async (boardId, groupId, taskId) => {
    //     try {
    //         await dispatch(getTask(boardId, groupId, taskId))
    //     } catch (err) {
    //         throw err
    //     }
    // }

    useEffect(() => {
        if (currentTask?.style?.bg.color) setBgColor(currentTask.style.bg.color)
        setTask(currentTask)
    }, [currentTask])

    useEffect(() => {
        setIsAttachmentModal(false)
        // if (imgUrl) setIsAttachedFile(true)
        if (imgJson) onSetAttachment(false)
    }, [imgJson])

    useEffect(() => {
        // document.addEventListener("click", handleClickOutside, true)
        // document.addEventListener("click", handleClickOutsideLabelModal, true)

        return (
            () => {
                // document.removeEventListener("click", handleClickOutside, false)
                // document.removeEventListener("click", handleClickOutsideLabelModal, false)
                // console.log('listener disabled:')
            }
        )
    }, [])

    const handleClickOutside = (e) => {
        if (e) e.preventDefault()
        if (!refInput.current) return
        if (!refInput.current.contains(e.target)) {
            setEditTitle(false)
            setEditDescription(false)
        }
    }
    const handleClickOutsideLabelModal = (e) => {
        if (e) e.preventDefault()
        if (!refLabelModal.current) return
        if (!refLabelModal.current.contains(e.target)) {
            toggleLabelsModal()
        }
    }

    const getTime = (imgJson) => {
        return moment(imgJson.addedAt).fromNow()
    }

    const onUpdateTask = (taskForUpdate, activity = { "_id": "u999", "fullname": "Guset", "imgUrl": null }) => {
        if (!taskForUpdate) return
        dispatch(updateTask(currentBoardId, currentGroupId, taskForUpdate, activity))
        // navigate(`/board/${currentBoardId}/${currentGroupId}/${task.id}`)
    }

    const [register, setTask, task] = useFormRegister({}, onUpdateTask)

    const onBack = () => {
        closeModal()

        // navigate(`/board/${currentBoardId}`)
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

    const toggleEditAttachNameModal = () => {
        setIsEditAttachName(!isEditAttachName)
    }

    const toggleLabelsModal = (ev) => {
        if (ev) ev.stopPropagation()

        if (!isLabelModal && isLabelModal !== null) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()

            const style = {
                top: ev.target.offsetTop,
                left: ev.target.offsetLeft
            }
            let pos = {
                position: position,
                style: style
            }

            setLabelModalPos(pos)
            setIsLabelModal(!isLabelModal)
        } else {
            setIsLabelModal(false)
        }
    }

    const toggleAttachmentModal = (ev) => {
        // setIsAttachmentModal(!isAttachmentModal)

        if (!isAttachmentModal) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()

            const style = {
                top: ev.target.offsetTop,
                left: ev.target.offsetLeft
            }
            let pos = {
                position: position,
                style: style
            }

            setAttachModalPos(pos)
            setIsAttachmentModal(!isAttachmentModal)
        } else {
            setIsAttachmentModal(false)
        }
    }

    const onSetColor = (newColor) => {
        console.log('color', newColor)
        if (!task.style) task.style = { bg: { color: newColor } }
        task.style.bg.color = newColor
        task.style.bg.imgUrl = null
        setBgColor(newColor)
        onUpdateTask(task)
    }

    const onSetImg = (imgJson) => {
        if (!task.style) task.style = { bg: { imgUrl: imgJson.url } }
        task.style.bg.imgUrl = imgJson.url
        task.style.bg.color = null
        setBgColor(null)
        onUpdateTask(task)
    }

    const onSetMember = (addOrRemove, memberId, fullname) => {
        const activity = {
            task: {
                id: task.id,
                title: task.title
            }
        }
        if (!addOrRemove) {
            activity.txt = `added ${fullname} to`
            if (!task.memberIds) task.memberIds = [memberId]
            else task.memberIds.push(memberId)
            if (!task.watcedMemberIds) task.watcedMemberIds = [memberId]
            else task.watcedMemberIds.push(memberId)
        } else {
            activity.txt = `remove ${fullname} from`

            const idx = task.memberIds.findIndex(member => member === memberId)
            task.memberIds.splice(idx, 1)
            const watchIdx = task.watcedMemberIds.findIndex(watcedMember => watcedMember === memberId)
            task.watcedMemberIds.splice(watchIdx, 1)
        }

        onUpdateTask(task, activity)
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

    const onSetAttachment = (addOrRemove, attachId /*, taskToAttach, boardId, groupId*/) => {
        // console.log('taskToAttach', taskToAttach, 'boardId:', boardId, "groupId:", groupId);
        if (!addOrRemove) {
            if (!task.attachments) task.attachments = [(imgJson)]
            else task.attachments.unshift((imgJson))
        } else {
            const idx = task.attachments.findIndex(img => img.id === attachId)
            task.attachments.splice(idx, 1)
        }
        console.log('task', task);
        onUpdateTask(task)
        navigate(`/board/${currentBoardId}/${currentGroupId}/${task.id}`)
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

    const onOpenLabelsModal = () => {
        dispatch(resizeLabel(false))
    }

    const onCompleteDueDate = () => {
        task.dueDate.isDone = !task.dueDate.isDone
        const dueDateAction = task.dueDate.isDone ? 'complete' : 'incomplete'
        const activity = {
            txt: `marked the due date on ${task.title} ${dueDateAction}`,
            task: {
                id: task.id,
                title: ""
            }
        }
        onUpdateTask(task, activity)
    }

    const onToggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen)
    }

    if (!task) return <div>Loading...</div>
    // console.log('task.desc', task.desc)
    // console.log('task', task);
    return (
        <section className="task-details-main" >
            <div className="black-screen" onClick={onBack}>

                <section className="task-details-container" onClick={clickedOnModal}>

                    {task?.style && <section className="task-cover"/* style={{ backgroundColor:bgColor }} */>
                        <div className="color-cover" style={{ backgroundColor: bgColor }}></div>
                        <button onClick={onBack} className="btn close"></button>
                        {task?.style?.bg?.imgUrl && <div className="img-cover" style={{ backgroundImage: `url(${task.style.bg.imgUrl})` }} ></div>}
                        <div onClick={onShowModal} className="btn cover">
                            <span className="bts-icon"><FaWindowMaximize /></span>
                            <span className="btn-cover-txt">Cover</span>
                            {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} onShowModal={onShowModal} />}
                        </div>
                    </section>}

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
                                    <section ref={refLabelModal}>
                                        {isLabelModal && <TaskDetailsLabelModal labelIds={task.labelIds} onSetLabel={onSetLabel} toggleLabelsModal={toggleLabelsModal} labelModalPos={labelModalPos} />}
                                    </section>
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
                                    <label htmlFor=""></label>
                                </section>}

                                <section className={`description-container ${isEditDescription ? 'edit-status' : ''}`}>
                                    <div className="description-main-content">
                                        <div className="description-icon"><GrTextAlignFull /></div>
                                        <div className="description-title">Description</div>
                                        {!isEditDescription && task.desc && <button className="btn-edit-description" onClick={toggleEditDescription}>Edit</button>}
                                    </div>
                                    {!isEditDescription && !task.desc && <div className="description-placeholder" onClick={toggleEditDescription} >Add a more detailed description...</div>}
                                    {!isEditDescription && task.desc && <div className="static-description" onClick={toggleEditDescription}>{task.desc}</div>}
                                    <div className="description-edit-container">
                                        {isEditDescription && <textarea className="description-textarea" placeholder="Add a more detailed description..." {...register('desc', 'text')} value={task.desc} ref={refInput} />}
                                        {isEditDescription && <button className="btn-desc save" onClick={toggleEditDescription}>Save</button>}
                                        {isEditDescription && <button className="btn-desc close">Cancel</button>}
                                    </div>
                                </section>

                                {task?.attachments && <section className="attachment">
                                    <div className="attachment-title">
                                        <span className="icon"><GrAttachment /></span>
                                        <span className="ability">Attachment</span>
                                    </div>
                                    <div className="attachment-body-and-btn">
                                        {task?.attachments.map(attachment => {
                                            return <div className="attachment-body" key={attachment.id}>
                                                <img className="img-attached" src={`${attachment.url}`} />
                                                <div className="attachment-details">
                                                    <span className="url-name">{attachment.urlName}.{attachment.fileFormat ? attachment.fileFormat : ''}</span>
                                                    <div className="add-time-and-btns">
                                                        <span className="Added-at">Added {getTime(attachment)}</span>
                                                        <span>-</span>
                                                        <span key={`${attachment.id}-dBtn`} className="btn-delete-attachment" onClick={() => onSetAttachment(true, attachment.id)} title={'Delete attachment for ever'}>Delete</span>
                                                        <span>-</span>
                                                        <span key={`${attachment.id}-eBtn`} className="btn-delete-attachment" onClick={() => toggleEditAttachNameModal()} title={'Edit attachment name'}>Edit</span>
                                                        {isEditAttachName && <AttachmentNameEditModal toggleEditAttachNameModal={toggleEditAttachNameModal} attachment={attachment} task={task} onUpdateTask={onUpdateTask} />}
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                        <button className="btn attachment" onClick={toggleAttachmentModal}>
                                            <span className="ability">Add an attachment</span>
                                        </button>
                                    </div>
                                </section>}
                                {/* {task?.attachments && <TaskDetailsAttachments task={task} imgJson={imgJson} onSetAttachment={onSetAttachment} currentBoardId={currentBoardId} currentGroupId={currentGroupId} />} */}
                                {isAttachmentModal && <AttachmentModal toggleAttachmentModal={toggleAttachmentModal} attachModalPos={attachModalPos} />}

                                <div className="activity-container">
                                    <span className="activity-main-icon"> <GrTextAlignFull /></span>
                                    <span className="activity-title">Activity</span>
                                    <span className="user-icon"><TaskMember memberIds={currentUser} /></span>
                                    <textarea className="activity-input" placeholder="Write a comment..."></textarea>
                                    <span className="activity-icon">icon</span>
                                    <span className="activity-title">Activity</span>
                                </div>
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
                                {/* {isDatePickerOpen && <DatePicker />} */}
                                {isDatePickerOpen && <DatePickerModal />}
                                <button className="btn abilities">
                                    <span className="icon"><BsCheck2Square /></span>
                                    <span className="ability">Checklist</span>
                                </button>
                                <button className="btn abilities" onClick={onToggleDatePicker}>
                                    <span className="icon"><BsClock /></span>
                                    <span className="ability">Dates</span>
                                </button>
                                <button className="btn abilities" onClick={toggleAttachmentModal}>
                                    <span className="icon"><GrAttachment /></span>
                                    <span className="ability">Attachment</span>
                                </button>
                                <button className="btn abilities" onClick={onShowModal}>
                                    <span className="icon"><FaWindowMaximize /> </span>
                                    <span className="ability">Cover</span>
                                </button>
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

