
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
// import { loadTasks } from "../store/task.actions"


// import {  } from 'react-icons';


export const TaskDetails = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    // const loadTask = async (boardId, groupId, taskId) => {
    //     try {
    //         // setTask(await dispatch(getTask(boardId, groupId, taskId)))
    //         const task1=await dispatch(getTask(boardId, groupId, taskId))
    //         setBgColor(task1.style.bg.color)
    //         setTask(task1)
    //         console.log('task', task);
    //     } catch (err) {
    //         throw err
    //     }
    // }

    const onUpdateTask = (task) => {
        dispatch(updateTask(currentBoardId, currentGroupId, task))
        // setTask(task)
        // dispatch(loadTasks())
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
            task.memberIds.push(memberId)
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
                        <button onClick={onBack} className="btn close">x</button>
                        {/* {task?.style?.bg?.imgUrl && <span className="img-cover" style={setTaskCoverStyle()}></span>} */}
                        {task?.style?.bg?.imgUrl && <img className="img-cover" src={`${task.style.bg.imgUrl}`} ></img>}
                        <button onClick={onShowModal} className="btn cover">Cover</button>
                        {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
                    </section>{/*task-cover*/}

                    {/* task-details */}
                    <form className="task-details" onSubmit={onSaveTask}>
                        <section>
                            <label htmlFor="title">Title</label>
                            <input {...register('title', 'text')} value={task.title} />
                            <span>in list {currentGroupTitle}</span>
                        </section>
                        <section className="tags">
                            <section className="members" >
                                {/* <label htmlFor="members">Members</label> */}
                                {/* <input {...register('members', 'text')} /> */}
                                {/* <MultipleSelectCheckmarks /> */}
                                <span>Members</span>
                                <br />
                                <div className="select-members">
                                    {task?.memberIds && <TaskMember memberIds={task.memberIds} />}
                                    <span onClick={onShowMembersModal}>➕</span>
                                    {ShowMembersModal && <TaskDetailsMembersModal memberIds={task.memberIds} boardMembers={currentBoardMembers} onSetMember={onSetMember} />}
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
                            <textarea {...register('description', 'text')} value={task.description} />
                        </section>
                        {/* <button>Save</button> */}
                    </form>

                    <section className="task-abilities">
                        <button className="btn abilities" onClick={onShowMembersModal}>Members</button>
                        <button className="btn abilities">Labels</button>
                        <button className="btn abilities">Checklist</button>
                        <button className="btn abilities">Dates</button>
                        <button className="btn abilities">Attachment</button>
                        <button className="btn abilities" onClick={onRemoveTask}>Archive</button>
                    </section>

                </section>{/*task-details-container focus*/}
            </div>
            <div className="black-screen" onClick={onBack}>
            </div>
        </section>
    )
}

