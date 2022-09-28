
import { useState, useEffect } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { ActivityList } from "./activity-list"
import { ChatApp } from "./chat-app"
import { updateBoard } from '../store/board.actions'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'
import { boardService } from "../services/board.service"
import { userService } from "../services/user.service"



export const DetailsActivities = ({ task, groupId, onUpdateTask }) => {
    const board = useSelector(state => state.boardModule.board)
    const [textAreaContent, setTextAreaContent] = useState('')
    const [CurrTask, setCurrTask] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [isActivityListShown, toggleActivityList] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, onSaveComment);
        // setCurrTask(task)
        console.log('task', task);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, onSaveComment)
        }
    }, [])

    const onToggleActivityList = () => {
        toggleActivityList(!isActivityListShown)
    }

    const onSaveComment = (newMsg) => {
        console.log('onSaveComment');
        console.log("task", task);

        const activity = {
            txt: newMsg,
            task: { id: task.id, title: task.title },
            type: 'comment'
        }
        console.log('activity', activity);
        dispatch(updateBoard(board, activity))
        // setTextAreaContent('')
    }

    const sendMsg = () => {

        // const user = userService.getLoggedinUser() || boardService.getGuestUser()
        // const activity = { txt: textAreaContent, user }
        socketService.emit(SOCKET_EMIT_SEND_MSG, (textAreaContent))
        // socketService.emit(SOCKET_EMIT_SEND_MSG, (activity))
        setTextAreaContent('')
    }

    return <section className="details-activities">
        <div className='title-containerr'>
            <AiOutlineBars className='activity-icon' />
            <span className="title">Activity</span>
            <button className="checklist-btn" onClick={() => onToggleActivityList()}>{(isActivityListShown) ? 'Hide Details' : 'Show Details'}</button>
        </div>
        <div className='text-area-container'>
            <textarea value={textAreaContent} onClick={() => toggleTextArea(true)} onBlur={() => toggleTextArea(false)} className='txt-area-normal' placeholder="Write a comment..."
                onChange={(ev) => {
                    // console.log('textAreaContent', textAreaContent);
                    setTextAreaContent(ev.target.value)
                }}>
            </textarea>
            {isTextAreaOpen && <section>
                <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`} onMouseDown={() => sendMsg()} >
                    Save
                </button>
            </section>}
            {/* <ChatApp task={task} onUpdateTask={onUpdateTask} /> */}
        </div>
        {isActivityListShown && <ActivityList task={task} />}
    </section>
}
















/*
import { useState, useEffect } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { ActivityList } from "./activity-list"
import { ChatApp } from "./chat-app"
import { updateBoard } from '../store/board.actions'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'


export const DetailsActivities = ({ task, groupId, onUpdateTask }) => {

    const board = useSelector(state => state.boardModule.board)
    const [textAreaContent, setTextAreaContent] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [isActivityListShown, toggleActivityList] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, onSaveComment);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, onSaveComment)
            // botTimeout && clearTimeout(botTimeout)
        }
    }, [])


    const onToggleActivityList = () => {
        toggleActivityList(!isActivityListShown)
    }

    const handleFormChange = ev => {
        const txt = ev.target.value
        // setTextAreaContent(prevTextAreaContent => ({ ...prevTextAreaContent, txt}))
        setTextAreaContent(ev.target.value)
    }

    const onSaveComment = () => {
        console.log('test');
        const activity = {
            txt: textAreaContent,
            task: { id: task.id, title: task.title },
            type: 'comment'
        }

        socketService.emit(SOCKET_EMIT_SEND_MSG, (textAreaContent))
        dispatch(updateBoard(board, activity))
        setTextAreaContent('')
    }

    // const sendMsg = ev => {
    //     ev.preventDefault()
    //     socketService.emit(SOCKET_EMIT_SEND_MSG, (textAreaContent))
    //     console.log('msg', textAreaContent);
    //     // setMsg({ txt: '' })
    //     setTextAreaContent('')
    // }

    return <section className="details-activities">
        <div className='title-containerr'>
            <AiOutlineBars className='activity-icon' />
            <span className="title">Activity</span>
            <button className="checklist-btn" onClick={() => onToggleActivityList()}>{(isActivityListShown) ? 'Hide Details' : 'Show Details'}</button>
        </div>

        <div className='text-area-container'>
            <textarea value={textAreaContent} onClick={() => toggleTextArea(true)} onBlur={() => toggleTextArea(false)} className='txt-area-normal' placeholder="Write a comment..."
                onChange={(ev) => (handleFormChange(ev))}>
            </textarea>

            {isTextAreaOpen && <section>

                <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`}
                        // onMouseDown={() => { onSaveComment() }}
                        onClick={() => {onSaveComment() }}
                    >
                    Save
                </button>
            </section>}

            { <ChatApp task={task} onUpdateTask={onUpdateTask} /> }
        </div>

        {isActivityListShown && <ActivityList task={task} />}


    </section>
/*}*/