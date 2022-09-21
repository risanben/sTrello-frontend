import { TaskDetailsLabel } from "./task-details-label"

export const TaskDetailsLabelModal = ({ labelIds, onSetLabel ,toggleLabelsModal }) => {
    return (
        <section className="members-modal">
            {/* <div className="members-modal-container"> */}
            <div onClick={toggleLabelsModal}>X</div>
                <div className="members-modal-title">Labels</div>
                <input type="text" placeholder="Search Labels..." />
                <span className="sub-title">Labels</span>
                <section className="member-detail-container">
                    <TaskDetailsLabel labelIds={labelIds} onSetLabel={onSetLabel} />
                </section>
            {/* </div> */}
        </section>
    )
}


