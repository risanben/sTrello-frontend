
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { taskService } from "../services/task.service"
import { utilService } from "../services/util.service"
import { useFormRegister } from '../hooks/useFormRegister'
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux";
import { updateTask, removeTask, getTask } from '../store/board.actions'
import MultipleSelectCheckmarks from "../cmps/select-mui"
import { TaskMember } from "../cmps/task-members"
import { TaskLabel } from "../cmps/task-label"
import { TaskDetailsMembersModal } from "../cmps/task-details-members-modal"
import { HiUser } from 'react-icons/hi';
import { BsTagFill } from 'react-icons/bs';
import { HiArchive } from 'react-icons/hi';
// import { loadTasks } from "../store/task.actions"


// import {  } from 'react-icons';


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
        console.log('props', props);
        const { boardId, groupId, taskId, groupTitle } = props
        console.log('{props}', boardId, groupId, taskId);

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
        console.log('task', task);
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
        console.log('task', task);
        if (!task.style) task.style = { bg: { imgUrl } }
        console.log('task', task);
        task.style.bg.imgUrl = imgUrl
        task.style.bg.color = null
        setBgColor(null)
        onUpdateTask(task)
        // setCoverImg(true)
    }

    const onSetMember = (memberId) => {
        if (!task.memberIds) task.memberIds = [memberId]
        task.memberIds.push(memberId)
        onUpdateTask(task)
    }

    const onRemoveTask = () => {
        try {
            dispatch(removeTask(currentBoardId, currentGroupId, task))
            console.log('task', task);
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
                        <button onClick={onBack} className="btn close">x</button>
                        {/* {task?.style?.bg?.imgUrl && <span className="img-cover" style={setTaskCoverStyle()}></span>} */}
                        {task?.style?.bg?.imgUrl && <img className="img-cover" src={`${task.style.bg.imgUrl}`} ></img>}
                        <button onClick={onShowModal} className="btn cover">Cover</button>
                        {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
                    </section>{/*task-cover*/}

                    {/* task-details */}
                    <form className="task-details" onSubmit={onSaveTask}>
                        <section>
                            <label htmlFor="title">Title
                                {isEditTitle && <input {...register('title', 'text')} value={task.title} ref={refInput} />}
                                {!isEditTitle && <span onClick={toggleEditTitle} >{task.title}</span>}
                            </label>
                            <br></br>
                            <span>in list {currentGroupTitle}</span>
                        </section>
                        <section className="tags">
                            <section className="members" >
                                <span>Members</span>
                                <br />
                                <div className="select-members">
                                    {task?.memberIds && <TaskMember memberIds={task.memberIds} />}
                                    <span onClick={onShowMembersModal}>➕</span>
                                    {ShowMembersModal && <TaskDetailsMembersModal memberIds={task.memberIds} />}
                                </div>
                            </section>
                            <section className="labels">
                                <span>Labels</span>
                                <div className="select-members">
                                    {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
                                    <span>➕</span>
                                </div>
                            </section>
                        </section>
                        <section>
                            <label htmlFor="description">Description</label>
                            {!isEditDescription && <button onClick={toggleEditDescription}>Edit</button>}
                            {isEditDescription && <textarea {...register('description', 'text')} value={task.description} ref={refInput} />}
                            {isEditDescription && <button className="btn save" onClick={toggleEditDescription}>Save</button>}
                            {isEditDescription && <button>Cancel</button>}
                            <br></br>
                            {!isEditDescription && <span onClick={toggleEditDescription}>{task.description} </span>}
                        </section>
                        {/* <button>Save</button> */}
                    </form>

                    <section className="task-abilities">
                        <button className="btn abilities" onClick={onShowMembersModal}><span className="icon"><HiUser /></span><span className="ability">Members</span></button>
                        <button className="btn abilities"><span className="icon"><BsTagFill /></span><span className="ability">Labels</span></button>
                        <button className="btn abilities">Checklist</button>
                        <button className="btn abilities">Dates</button>
                        <button className="btn abilities">Attachment</button>
                        <button className="btn abilities" onClick={onRemoveTask}><span className="icon"><HiArchive /> </span><span className="ability">Archive</span></button>
                    </section>

                </section>{/*task-details-container focus*/}
            </div>
            <div className="black-screen" onClick={onBack}>
            </div>
        </section>
    )
}

