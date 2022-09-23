import { TaskDetailsMember } from "./task-details-members"
import closeIcon from '../assets/img/icon-close-task-details.svg'

export const TaskDetailsMembersModal = ({ memberIds, onSetMember, toggleMembersModal }) => {
    return (
        <section className="members-modal">
             <img src={closeIcon} onClick={toggleMembersModal} alt="close" className="close-btn" />
            {/* <div className="members-modal-container"> */}
            {/* <div onClick={toggleMembersModal}>X</div> */}
            <div className="members-modal-title">Members</div>
            <input className="member-search-input" type="text" placeholder="Search members" />
            <span className="sub-title">Board members</span>
            <section className="member-detail-container">
                <TaskDetailsMember memberIds={memberIds} onSetMember={onSetMember} />
            </section>
            {/* </div> */}
        </section>
    )
}


