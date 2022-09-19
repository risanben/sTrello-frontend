import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export const TaskMember = ({ memberIds, taskRef, index }) => {
    const board = useSelector(state => state.boardModule.board)

    const getMemberName = (memberId) => {
        const member = board.members.find(member => member._id === memberId)
        if (member.imgUrl) {
            return <div style={{
                backgroundImage: `url(${member.imgUrl})`,
                backgroundSize: "cover",
                height: "28px",
                width: "28px",
                borderRadius: "50%"
            }}></div>
        }

        const fullname = member.fullname.split(' ')
        let initials = fullname[0][0]
        if (fullname.length >= 2) {
            initials += fullname[1][0]
        }
        return <div>{initials}</div>
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
