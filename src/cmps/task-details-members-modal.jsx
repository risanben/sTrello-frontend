import { TaskDetailsMember } from "./task-details-members"

export const TaskDetailsMembersModal = ({ memberIds, onSetMember, toggleMembersModal }) => {
    return (
        <section className="members-modal">
            {/* <div className="members-modal-container"> */}
            <div onClick={toggleMembersModal}>X</div>
            <div className="members-modal-title">Members</div>
            <input type="text" placeholder="Search members" />
            <span className="sub-title">Board members</span>
            <section className="member-detail-container">
                <TaskDetailsMember memberIds={memberIds} onSetMember={onSetMember} />
            </section>
            {/* </div> */}
        </section>
    )
}


