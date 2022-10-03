
import { useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { ActivityList } from "./activity-list"
import { updateBoard } from '../store/board.actions'
import { userService } from "../services/user.service"



export const DetailsActivities = ({ task, groupId, onUpdateTask }) => {
    const board = useSelector(state => state.boardModule.board)
    const [textAreaContent, setTextAreaContent] = useState('')
    const [CurrTask, setCurrTask] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [isActivityListShown, toggleActivityList] = useState(true)
    const dispatch = useDispatch()

    const onToggleActivityList = () => {
        toggleActivityList(!isActivityListShown)
    }

    const onSaveComment = () => {
        const user = userService.getLoggedinUser()
        const activity = {
            txt: textAreaContent,
            byMember: user,
            task: { id: task.id, title: task.title },
            type: 'comment'
        }
        setTextAreaContent('')
        dispatch(updateBoard(board, activity))
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
                    setTextAreaContent(ev.target.value)
                }}>
            </textarea>
            {isTextAreaOpen && <section>
                    <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`} onMouseDown={() => onSaveComment()} >
                    Save
                </button>
            </section>}
        </div>
        {isActivityListShown && <ActivityList task={task}/>}
    </section>
}


