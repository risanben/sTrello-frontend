
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { taskService } from "../services/task.service"
import { utilService } from "../services/util.service"
import { useFormRegister } from '../hooks/useFormRegister'
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux";
import { updateTask, removeTask } from '../store/board.actions'
import MultipleSelectCheckmarks from "../cmps/select-mui"
// import { loadTasks } from "../store/task.actions"


// import {  } from 'react-icons';


export const TaskDetails = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const [task, setTask] = useState(null)
    const [bgColor, setBgColor] = useState('blue')
    const [showModal, setShowModal] = useState(null)
    const [imgName, setImgName] = useState(null)
    const [coverImg, setCoverImg] = useState(null)
    const [currentBoardId, setBoardId] = useState(null)
    const [currentGroupId, setGroupId] = useState(null)
    // const [currentGroup, setCurrentGroup] = useState(null)
    // const [activities, setActivities] = useState(null)

    useEffect(() => {
        // const { id, boardId, groupId } = params
        console.log('props', props);
        const { boardId, groupId, taskId } = props
console.log('{props}',boardId, groupId, taskId);

        if (!boardId) return
        if (!taskId) return
        if (!groupId) return

        setBoardId(boardId)
        setGroupId(groupId)

        loadTasks(boardId, groupId,taskId)

        // activityService.query({ taskId: id })
        // .then(activity => setActivities(activity))
    }, [])

    const loadTasks = async (boardId, groupId, taskId) => {
        try {
            setTask(await boardService.getTaskById(boardId, groupId, taskId))
        } catch (err) {
            throw err
        }
    }

    const onUpdateTask = (task) => {
        setTask(task)
        // dispatch(loadTasks())
    }

    const [register, setTask, task] = useFormRegister({
        title: '',
        members: '',
        description: '',
        date: new Date(),
    }, onUpdateTask)

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

    const onBack = () => {
        navigate(`/board/${currentBoardId}`)
    }

    const onSetColor = (ev) => {
        setBgColor(ev.target.value)
        // coverImg.current=false
        setCoverImg(false)
    }

    const onShowModal = () => {
        // showModal.current=!showModal.current
        setShowModal(!showModal)
    }

    const onSetImg = (ev) => {
        setImgName(ev.target.value)
        // coverImg.current=true
        setCoverImg(true)
    }
    const onRemoveTask = () => {
        try {
            dispatch(removeTask(currentBoardId, currentGroupId, task))
            console.log('task', task);
            setTask(null)
            navigate(`/board/${currentBoardId}`)
        } catch (err) {
            throw err
        }
    }


    const onSaveTask = async (ev) => {
        ev.preventDefault()
        try {
            // const board = await boardService.updateTask(currentBoardId, currentGroupId, task)
            dispatch(updateTask(currentBoardId, currentGroupId, task))
            console.log('task', task);
            setTask(task)
            navigate(`/board/${currentBoardId}`)
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
                    {/* {coverImg && <img src={require(`../assets/img/${imgName}.jpg`)} alt="Cover" />} */}
                    {task?.style?.bg?.imgUrl && <span className="title-img-cover" style={setTaskCoverStyle()}>{task.title}</span>}
                    <button onClick={onShowModal} className="btn cover">Cover</button>
                    {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
                </section>{/*task-cover*/}

                {/* task-details */}
                <form className="task-details" onSubmit={onSaveTask}>
                    <section>
                        <label htmlFor="title">Title</label>
                        <input {...register('title', 'text')} value={task.title} />
                    </section>
                    <section className="multiple-Select-container">
                        {/* <label htmlFor="members">Members</label> */}
                        {/* <input {...register('members', 'text')} /> */}
                        <MultipleSelectCheckmarks />
                    </section>
                    <section>
                        <label htmlFor="description">Description</label>
                        <input {...register('description', 'text')} value={task.description} />
                    </section>
                    <button>Save</button>
                </form>

                <section className="task-abilities">
                    <button className="btn abilities">Members</button>
                    <button className="btn abilities">Labels</button>
                    <button className="btn abilities">Checklist</button>
                    <button className="btn abilities">Dates</button>
                    <button className="btn abilities">Attachment</button>
                    <button className="btn abilities" onClick={onRemoveTask}>Archive</button>
                </section>

                {/* {activities && <section className="tasks-activities">
                {activities.map(activity => (
                    <article key={activity.id}>
                        <h3>{activity.txt}</h3>
                        <h3>{activity.byMember.fullname}</h3>
                        <p> {(new Date(activity.createdAt)).toLocaleDateString('en-US')}</p>
                        
                    </article>
                ))}
            </section>} */}

            </section>{/*task-details-container focus*/}
            </div>
            <div className="black-screen" onClick={onBack}>
            </div>
        </section>
    )
}

