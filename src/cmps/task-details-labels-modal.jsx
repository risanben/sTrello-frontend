import { TaskDetailsLabel } from "./task-details-label"
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useEffect, useRef } from "react"

export const TaskDetailsLabelModal = ({ labelIds, onSetLabel, toggleLabelsModal, labelModalPos }) => {

    return (
        <section className="labels-modal" style={{ ...labelModalPos.style }}>
            <img src={closeIcon} onClick={toggleLabelsModal} alt="close" className="close-btn" />
            <div className="labels-modal-title">Labels</div>
            <input type="text" placeholder="Search Labels..." className="label-search-input" />
            <span className="sub-title">Labels</span>
            <section className="label-detail-container">
                <TaskDetailsLabel labelIds={labelIds} onSetLabel={onSetLabel} />
            </section>
            {/* </div> */}
        </section>
    )
}


