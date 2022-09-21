import { TaskDetailsLabel } from "./task-details-label"

export const TaskDetailsLabelModal = ({ labelIds, onSetLabel ,toggleLabelsModal }) => {
    return (
        <section className="labels-modal">
            {/* <div className="members-modal-container"> */}
            <div onClick={toggleLabelsModal}>X</div>
                <div className="labels-modal-title">Labels</div>
                <input type="text" placeholder="Search Labels..." />
                <h3>Labels</h3>
                <section className="member-detail-container">
                    <TaskDetailsLabel labelIds={labelIds} onSetLabel={onSetLabel} />
                </section>
            {/* </div> */}
        </section>
    )
}


