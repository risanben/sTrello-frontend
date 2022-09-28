import { useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { ActivityList } from "./activity-list"
import { ChatApp } from "./chat-app"
import { updateBoard } from '../store/board.actions'


export const DetailsActivities = ({task, groupId}) => {

    const board = useSelector(state => state.boardModule.board)
    const [textAreaContent, setTextAreaContent] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [isActivityListShown, toggleActivityList] = useState(true)
    const dispatch = useDispatch()

    const onToggleActivityList = () => {
        toggleActivityList(!isActivityListShown)
    }

    const onSaveComment = () => {

        const activity = {
            txt: textAreaContent,
            task: {id:task.id, title:task.title},
            type:'comment'
        }
        
        dispatch(updateBoard(board, activity))
        setTextAreaContent('')
    }

    return <section className="details-activities">
        <div className='title-containerr'>
            <AiOutlineBars className='activity-icon' />
            <span className="title">Activity</span>
            <button className="checklist-btn" onClick={() => onToggleActivityList()}>{(isActivityListShown) ? 'Hide Details' : 'Show Details'}</button>
        </div>

        <div className='text-area-container'>
            <textarea value={textAreaContent} onClick={() => toggleTextArea(true)} onBlur={() => toggleTextArea(false)} className='txt-area-normal' placeholder="Write a comment..." onChange={(ev) => {
                setTextAreaContent(ev.target.value)
            }}>
            </textarea>

            {isTextAreaOpen && <section>

                <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`} onMouseDown={() => { onSaveComment() }} >
                    Save
                </button>

            </section>} 
            <ChatApp task={task} onUpdateTask={onUpdateTask} />
        </div>

        {isActivityListShown && <ActivityList task={task} />}


    </section>
}