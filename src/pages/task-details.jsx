
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { taskService } from "../services/task.service"
import { utilService } from "../services/util.service"
import { useFormRegister } from '../hooks/useFormRegister'
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux";
import { updateTask } from '../store/board.actions'
// import { loadTasks } from "../store/task.actions"


// import {  } from 'react-icons';


export const TaskDetails = ({ props }) => {

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
        const { id, boardId, groupId } = params

        if (!boardId) return
        if (!id) return
        if (!groupId) return

        setBoardId(boardId)
        setGroupId(groupId)

        loadTasks(boardId, groupId, id)

        // activityService.query({ taskId: id })
        // .then(activity => setActivities(activity))
    }, [])

    const loadTasks = async (boardId, groupId, id) => {
        try {
            setTask(await boardService.getTaskById(boardId, groupId, id))
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

    const onSaveTask = async (ev) => {
        ev.preventDefault()
        try {
            // const board = await boardService.updateTask(currentBoardId, currentGroupId, task)
            dispatch(updateTask(currentBoardId, currentGroupId, task))
            // console.log('task', task);
            setTask(task)
            navigate(`/board/${currentBoardId}`)
        } catch (err) {
            throw err
        }
    }

    if (!task) return <div>Loading...</div>
    return (
        <section className="task-details-container">
            {/* task cover */}
            <section style={{ backgroundColor: bgColor }} className="task-cover">
                <button onClick={onBack} className="btn close">x</button>
                {coverImg && <img src={require(`../assets/img/${imgName}.jpg`)} alt="Cover" />}
                <button onClick={onShowModal} className="btn close">Cover</button>
                {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
            </section>

            {/* task-details */}
            {/* <section className="task-details">
                <h1>{task.title}</h1>
                <h4>Members</h4>
                <h1>Description</h1>
                <h2>{task.description}</h2> */}
            {/* <p> {task.createdBy} added this card</p> */}
            {/* </section> */}

            <form className="task-details" onSubmit={onSaveTask}>
                <section>
                    <label htmlFor="title">Title</label>
                    <input {...register('title', 'text')} value={task.title} />
                </section>
                <section>
                    <label htmlFor="members">Members</label>
                    <input {...register('members', 'text')} />
                </section>
                <section>
                    <label htmlFor="description">Description</label>
                    <input {...register('description', 'text')} value={task.description} />
                </section>
                <button>Save</button>
            </form>

            <section className="task-abilities">
                <button className="btn close">Members</button>
                <button className="btn close">Labels</button>
                <button className="btn close">Checklist</button>
                <button className="btn close">Dates</button>
                <button className="btn close">Attachment</button>
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

        </section>
    )
}

