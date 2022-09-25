import { useState } from "react"
import { AiOutlineBars } from "react-icons/ai"
import { ActivityList } from "./activity-list"

export const DetailsActivities = ({task}) => {

    const [textAreaContent, setTextAreaContent] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [isActivityListShown, toggleActivityList] = useState(true)

    const onToggleActivityList = () => {
        toggleActivityList(!isActivityListShown)
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

                <button className={`checklist-btn ${(textAreaContent) ? 'activate' : ''}`} /*onMouseDown={() => { onSaveComment() }} */ >
                    Save
                </button>

            </section>}
        </div>

                {isActivityListShown && <ActivityList task={task}/>}
        

    </section>
}