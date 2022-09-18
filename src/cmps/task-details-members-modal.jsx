import { TaskMemberDetails } from "./task-members-details"

export const TaskDetailsMembersModal = ({ memberIds, boardMembers, onSetMember }) => {
    console.log('boardMembers', boardMembers);
    return (
        <section className="members-modal">
            {/* <div className="members-modal-container"> */}
                <div className="members-modal-title">Members</div>
                <input type="text" placeholder="Search members" />
                <h3>Board members</h3>
                <section className="member-detail-container">
                    <TaskMemberDetails memberIds={memberIds} onSetMember={onSetMember} />
                </section>
            {/* </div> */}
        </section>
    )
}


