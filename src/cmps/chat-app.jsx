import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service.js'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG } from '../services/socket.service.js'
import { utilService } from '../services/util.service.js'
import { updateBoard } from '../store/board.actions.js'

function _ChatApp({ loggedInUser, task, onUpdateTask }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Love')
    const [isBotMode, setIsBotMode] = useState(false)
    const [textAreaContent, setTextAreaContent] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    let botTimeout

    // const dispatch = useDispatch()
    // const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        socketService.on('chat-add-msg', addMsg);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            botTimeout && clearTimeout(botTimeout)
        }
    }, [])


    const addMsg = (newMsg) => {
        console.log('newMsg', newMsg);
        const comment = {
            id: utilService.makeId(),
            txt: newMsg.txt,
            byMember: newMsg.from,
            createdAt: new Date(),
            //  {
            //     "_id": "u101",
            //     "fullname": "Tal Tarablus",
            //     "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
            // }
        }


        if (!task?.comments) task.comments = [(comment)]
        else task.comments.push((comment))
        onUpdateTask(task)
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }


    const sendMsg = ev => {
        ev.preventDefault()
        // const from = loggedInUser?.fullname || 'Me'

        // const from = user.fullname || 'Guest'
        // setMsg(prevMsg => ({ ...prevMsg, from: from }))

        socketService.emit(SOCKET_EMIT_SEND_MSG, (msg))
        // if (isBotMode) sendBotResponse();
        console.log('msg', msg);
        setMsg({ txt: '' })
    }


    const handleFormChange = ev => {
        const { name, value } = ev.target
        const from = boardService.getGuestUser()
        console.log('boardService.getGuestUser()', boardService.getGuestUser());
        console.log('from', from);
        setMsg(prevMsg => ({ ...prevMsg, [name]: value, from }))
        console.log(msg);
    }

    const getTime = (msg) => {
        return moment(msg.createdAt).fromNow()
    }

    return (
        <section className="chat-app">

            <form onSubmit={sendMsg}>
                <textarea
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off"
                    onClick={() => toggleTextArea(true)}
                    onBlur={() => toggleTextArea(false)}
                    className='txt-area-normal'
                    placeholder="Write a comment..."
                ></textarea>
                <button>Send</button>

            </form>

            {/*
            {isTextAreaOpen && <section>

                <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`}  >
                    Save
                </button>

            </section>} */}

            {/* <ul> */}
                {task?.comments?.map((msg, idx) => {
                    return <section className="activity-list" key={msg.id}>
                        <div className="user-icon" style={{ backgroundImage: `url(${msg.byMember.imgUrl})` }}></div>
                        <div className="activity-content">
                        {/* <span key={idx}>{msg.byMember.fullname}: {msg.txt}</span> */}
                        <span className="user-name">{msg.byMember.fullname} </span>
                        <div className="activity-time"> {getTime(msg)}</div>
                        <span className="activity-action">{msg.txt} </span>
                        </div>
                    </section>
                })}
            {/* </ul> */}



            {/* {taskActivities.map(activity => {
            return <section className="activity-list" key={activity.id}>
                <div className="user-icon" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>

                <div className="activity-content">
                    <span className="user-name">{activity.byMember.fullname} </span>
                    <span className="activity-action">{activity.txt} </span>
                    <span className="activity-task-title">{activity.task.title}</span>
                    {activity?.groupTitle && <span className="activity-group-title">{activity.groupTitle} </span>}
                    <div className="activity-time"> {getTime(activity)}</div>
                </div>

            </section>
        })} */}



        </section>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.user
    }
}
const mapDispatchToProps = {
}

export const ChatApp = connect(mapStateToProps, mapDispatchToProps)(_ChatApp)
