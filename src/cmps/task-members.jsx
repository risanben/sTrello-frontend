import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState, useEffect } from "react"


export const TaskMember = ({ memberIds, taskRef, index }) => {
    const board = useSelector(state => state.boardModule.board)
    // let leftCount = 0


    const getMemberName = (memberId) => {
        if (!board?.members) return
        const member = board.members.find(member => member._id === memberId)
        if (member.imgUrl) {
            return <div className="member-content" style={{
                backgroundImage: `url(${member.imgUrl})`,
                backgroundSize: "cover",
                // height: "28px",
                // width: "28px",
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

    // const _getMemberDivStyle = () => {
    //     const pos = {
    //         position: "relative",
    //         left:`-${parseInt(leftCount)}px`
    //     }

    //     leftCount = leftCount + 20
    //     return pos
    // }

    return (
        <div className="task-member-container">
            {memberIds.map(memberId => {
                return <div className="member"
                    // style={{ ..._getMemberDivStyle() }}
                    key={memberId}>
                    {getMemberName(memberId)}
                </div>
            })}
        </div>
    )
}
