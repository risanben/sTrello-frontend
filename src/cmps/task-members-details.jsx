import { useSelector } from "react-redux"

export const TaskMemberDetails = ({ memberIds }) => {
    const board = useSelector(state => state.boardModule.board)

    const getMemberName = (memberId) => {
        const member = board.members.find(member => member._id === memberId)

        const fullname = member.fullname.split(' ')
        let initials = fullname[0][0]
        if (fullname.length >= 2) {
            initials += fullname[1][0]
        }
        if (member.imgUrl) {
            return (
                <section>
                    <div style={{
                        backgroundImage: `url(${member.imgUrl})`,
                        backgroundSize: "cover",
                        height: "28px",
                        width: "28px",
                        borderRadius: "50%"
                    }}></div>
                    <div>{fullname}</div>
                </section>
            )
        }

        return (
            <section>
                <div>{initials}</div>
                <div>{fullname}</div>
            </section>
        )
    }

    return (
        <div className="task-member-container">
            {memberIds.map(memberId => {
                return <div className="member"
                    key={memberId}>
                    {getMemberName(memberId)}
                </div>
            })}
        </div>
    )
}
