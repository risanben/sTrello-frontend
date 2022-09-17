import { TaskMemberDetails } from "./task-members-details"

export const TaskDetailsMembersModal = ({ memberIds }) => {
    return (
        <section className="members-modal">
            <h2>Members</h2>
            <input type="text" placeholder="Search members" />
            <h3>Board members</h3>
            <section>

                <TaskMemberDetails memberIds={memberIds} />
                {/* <ul className="members-list">
                    {members.map(memberId =>
                        <li className="member-container" >
                            <img className="cover-img" src={`${imgUrl}`} onClick={() => props.onSetImg(imgUrl)}></img>
                        </li>
                    )}
                </ul> */}
            </section>

        </section>
    )
}


