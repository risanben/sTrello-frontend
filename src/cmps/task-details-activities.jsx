import { useState } from "react"
import { AiOutlineBars } from "react-icons/ai"

export const DetailsActivities = ({ currentUser }) => {

    const [textAreaContent, setTextAreaContent] = useState('')
    const [isTextAreaOpen, toggleTextArea] = useState(false)


    return <section className="details-activities">
        <div className='title-containerr'>
            <AiOutlineBars className='activity-icon' />
            <span className="title">Activity</span>
            {/* <button className="details-primary-link-btn" onClick={() => onToggleActivityList()}>{(isActivityListShown) ? 'Hide Details' : 'Shown Details'}</button> */}
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

    </section>
}