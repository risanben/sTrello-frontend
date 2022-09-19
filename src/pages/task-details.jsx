
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { taskService } from "../services/task.service"
import { utilService } from "../services/util.service"
import { useFormRegister } from '../hooks/useFormRegister'
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux";
import { updateTask, removeTask, getTask, getBoardMembers } from '../store/board.actions'
import MultipleSelectCheckmarks from "../cmps/select-mui"
import { TaskMember } from "../cmps/task-members"
import { TaskLabel } from "../cmps/task-label"
import { TaskDetailsMembersModal } from "../cmps/task-details-members-modal"
import { HiUser } from 'react-icons/hi';
import { BsTagFill,BsCheck2Square,BsClock } from 'react-icons/bs';
import { HiArchive } from 'react-icons/hi';
import { FaWindowMaximize } from 'react-icons/fa';
import { GrTextAlignFull, GrAdd,GrAttachment } from 'react-icons/gr';

// import { loadTasks } from "../store/task.actions"

// import {  } from 'react-icons';
<span class="window-header-icon icon-lg js-card-header-icon icon-template-card"></span>

export const TaskDetails = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const refInput = useRef(null)
    const refDesc = useRef(null)

    // const [task, setTask] = useState(null)
    const [bgColor, setBgColor] = useState(null)
    const [showModal, setShowModal] = useState(null)
    // const [imgName, setImgName] = useState(null)
    // const [coverImg, setCoverImg] = useState(null)
    const [currentBoardId, setBoardId] = useState(null)
    const [currentGroupId, setGroupId] = useState(null)
    const [currentGroupTitle, setGroupTitle] = useState(null)
    const [ShowMembersModal, setShowMembersModal] = useState(null)
    const [currentBoardMembers, setCurrentBoardMembers] = useState([])
    const [isEditTitle, setEditTitle] = useState(null)
    const [isEditDescription, setEditDescription] = useState(null)
    // const [currentGroup, setCurrentGroup] = useState(null)
    // const [activities, setActivities] = useState(null)

    useEffect(() => {
        // const { id, boardId, groupId } = params
        // console.log('props', props);
        const { boardId, groupId, taskId, groupTitle } = props
        // console.log('{props}', boardId, groupId, taskId);

        if (!boardId) return
        if (!taskId) return
        if (!groupId) return

        setBoardId(boardId)
        setGroupId(groupId)
        setGroupTitle(groupTitle)

        // loadTask(boardId, groupId, taskId)
        if (props?.task?.style?.bg.color) setBgColor(props.task.style.bg.color)
        setTask(props.task)



        // activityService.query({ taskId: id })
        // .then(activity => setActivities(activity))
    }, [])


    const onUpdateTask = (task) => {
        dispatch(updateTask(currentBoardId, currentGroupId, task))
        // setTask(task)
        // dispatch(loadTasks())
    }

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


    const [register, setTask, task] = useFormRegister({
        // title: '',
        // members: '',
        // description: '',
        // date: new Date(),

    }, onUpdateTask)

    const onBack = () => {
        // navigate(`/board/${currentBoardId}`)
        props.closeModal()
    }

    const onSetColor = (ev) => {
        setBgColor(ev.target.value)
        if (!task.style) task.style = { bg: { color: ev.target.value } }
        task.style.bg.color = ev.target.value
        task.style.bg.imgUrl = null
        onUpdateTask(task)
        // setCoverImg(false)
    }

    const onShowModal = () => {
        // showModal.current=!showModal.current
        setShowModal(!showModal)
    }

    const toggleEditTitle = () => {
        setEditTitle(!isEditTitle)
        console.log(isEditTitle)
    }
    const toggleEditDescription = () => {
        setEditDescription(!isEditDescription)
    }

    const onShowMembersModal = async () => {
        await boardMembers()
        setShowMembersModal(!ShowMembersModal)
    }

    const onSetImg = (imgUrl) => {
        // setImgName(ev.target.value)
        if (!task.style) task.style = { bg: { imgUrl } }
        task.style.bg.imgUrl = imgUrl
        task.style.bg.color = null
        setBgColor(null)
        onUpdateTask(task)
        // setCoverImg(true)
    }

    const boardMembers = async () => {
        try {
            const bm = await dispatch(getBoardMembers(currentBoardId))
            console.log('getBoardMembers-bm', bm);
            setCurrentBoardMembers(bm)
        } catch (err) {
            throw err
        }
    }

    const onSetMember = (addOrRemove, memberId) => {
        if (!addOrRemove) {
            if (!task.memberIds) task.memberIds = [memberId]
            else task.memberIds.push(memberId)
        } else {
            console.log('task', task);
            const idx = task.memberIds.findIndex(member => member._id === memberId)
            task.memberIds.splice(idx, 1)
        }
        onUpdateTask(task)
    }

    const onRemoveTask = () => {
        try {
            dispatch(removeTask(currentBoardId, currentGroupId, task))
            // setTask(null)
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
                        <button onClick={onBack} className="btn close">✖</button>
                        {/* {task?.style?.bg?.imgUrl && <span className="img-cover" style={setTaskCoverStyle()}></span>} */}
                        {task?.style?.bg?.imgUrl && <img className="img-cover" src={`${task.style.bg.imgUrl}`} ></img>}
                        <button onClick={onShowModal} className="btn cover">Cover</button>
                        {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
                    </section>{/*task-cover*/}

                    {/* task-details */}
                    <span className="task-title-icon"><FaWindowMaximize /></span>
                    <div className="title-container">
                        <form className="task-details" onSubmit={onSaveTask}>
                            <section className="title-input">
                                {isEditTitle && <input {...register('title', 'text')} value={task.title} ref={refInput} />}
                                {!isEditTitle && <span className="static-input" onClick={toggleEditTitle} >{task.title}</span>}
                                {/* <br></br> */}
                                <span className="group-title-in-task">in list {currentGroupTitle}</span>
                            </section>
                        </form>
                    </div> {/*title-container*/}
                    {/* <section className="task-details-middle"> */}
                    <section className="tags">
                        <section className="members" >
                            <span className="tag-title">Members</span>
                            <br />
                            <div className="select-members">
                                {task?.memberIds && <TaskMember memberIds={task.memberIds} />}
                                <span onClick={onShowMembersModal} className="plus-icon"><GrAdd/></span>
                                {ShowMembersModal && <TaskDetailsMembersModal memberIds={task.memberIds} boardMembers={currentBoardMembers} onSetMember={onSetMember} />}
                            </div>
                        </section>
                        <section className="labels">
                            <span className="tag-title">Labels</span>
                            <div className="select-members">
                                {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
                                <span className="plus-icon"><GrAdd/></span>
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
                            {/* <br></br> */}
                            {!isEditDescription && <span className="static-description" onClick={toggleEditDescription}>{task.description} </span>}
                        </div>
                    </section>

                    {/* <section className="activity-container"> */}
                    <span className="activity-main-icon"> <GrTextAlignFull /></span>
                    <span className="activity-title">Activity</span>
                    <span className="activity-icon">icon</span>
                    <span className="activity-title">Activity</span>
                    <span className="activity-icon">icon</span>
    
                    {/* </section> */}

                    {/* </form> */}
                    {/* </section> */}
                    <section className="task-abilities">
                        <button className="btn abilities" onClick={onShowMembersModal}><span className="icon"><HiUser /></span><span className="ability">Members</span></button>
                        <button className="btn abilities"><span className="icon"><BsTagFill /></span><span className="ability">Labels</span></button>
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

