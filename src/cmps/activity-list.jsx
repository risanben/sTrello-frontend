import { useDispatch, useSelector } from "react-redux"
import { TaskMember } from "./task-members"
import moment from 'moment'
import { useState } from "react"
import { updateBoard } from '../store/board.actions'
import IconClose from '../assets/img/icon-close-task-details.svg'



export const ActivityList = ({ task }) => {

    const board = useSelector(state => state.boardModule.board)
    const [isEditingTxt, setEditingTxt] = useState(false)
    const [commentTxt, setCommentTxt] = useState('')

    const dispatch = useDispatch()

    if (!board.activities) return <section></section>

    const taskActivities = board.activities.filter(activity => activity.task.id === task.id)
    if (!taskActivities.length) return <section></section>

    const getTime = (activity) => {
        return moment(activity.createdAt).fromNow()
    }

    const onDefocusTxtArea = (ev, activityId) => {
        ev.preventDefault()
        saveComment(ev, activityId)
        setEditingTxt(false)
    }

    const handleChange = ({ target }) => {
        const { name, value } = target
        setCommentTxt(value)
    }

    const saveComment = (ev, activityId) => {
        ev.preventDefault()
        board.activities.map(act => {
            if (act.id === activityId) {
                act.txt = commentTxt
            }
        })
        dispatch(updateBoard(board))
    }

    const onDeleteComment = (ev, activityId) => {
        ev.preventDefault()
        console.log('entered on delete')
        console.log('board.activities:-before', board.activities)
        board.activities = board.activities.filter(act => act.id !== activityId)
        console.log('board.activities:-after', board.activities)
        dispatch(updateBoard(board))
    }

    //BUILT TO REMOVE THE 'TO/FROM' AT THE END OF EVERY ACTIVITY TEXT
    function _removeLastWord(str) {

        const lastIndexOfSpace = str.lastIndexOf(' ')
        if (lastIndexOfSpace === -1) {
            return str
        }
        return str.substring(0, lastIndexOfSpace)
    }


    // console.log('board.activities:', board.activities)
    return <section>
        {taskActivities.map(activity => {
            if (activity.type === "comment") {
                return <section className="activity-list" key={activity.id}>

                    <div className="user-icon" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>
                    <div className="activity-content">
                        <span className="comment-header">
                            <span className="user-name">{activity.byMember.fullname} </span>
                            <div className="activity-time"> {getTime(activity)}</div>
                        </span>

                        <textarea
                            className="txt-area-normal"
                            name="txt"
                            defaultValue={activity.txt}
                            // value={activity.txt}
                            onClick={(ev) => setEditingTxt(true)}
                            onBlur={(ev) => { onDefocusTxtArea(ev, activity.id) }}
                            onChange={(ev) => handleChange(ev)}
                        >
                        </textarea>

                        {isEditingTxt&& <section className="save-close-btns">
                                <button className="btn-add" onClick={(ev)=>onDefocusTxtArea(ev, activity.id)}>Save</button>
                                <img src={IconClose} alt="close" className="icon-close" onClick={()=>{setEditingTxt(false)}}/>
                                </section>}

                        <section className="comment-edit-btns"> 
                            {/* <button onClick={(ev) => setEditingTxt(true)}>Edit</button>- */}
                            <button onClick={(ev) => onDeleteComment(ev, activity.id)}>Delete</button>
                        </section>


                    </div>

                </section>
            } else {
                return <section className="activity-list" key={activity.id}>
                    <div className="user-icon" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>

                    <div className="activity-content">
                        <span className="user-name">{activity.byMember.fullname} </span>
                        <span className="activity-action">{_removeLastWord(activity.txt)} </span>
                        {/* <span className="activity-action">{activity.txt} </span> */}
                        {/* <span className="activity-task-title">{activity.task.title}</span> */}
                        {/* {activity?.groupTitle && <span className="activity-group-title">{activity.groupTitle} </span>} */}
                        <div className="activity-time"> {getTime(activity)}</div>
                    </div>

                </section>
            }
        })}
    </section>
}