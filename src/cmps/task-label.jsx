import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateBoard } from "../store/board.actions"


export const TaskLabel = ({ labelIds, onUpdateLabels }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()
    const getColor = (labelId) => {
        const label = board.labels.find(label => label.id === labelId)
        return {
            backgroundColor: label.color
        }
    }

    const toggaleLabelSize = (ev) => {
        ev.stopPropagation()
        // onUpdateLabels(isClicked)
        setIsClicked(!isClicked)
        // dispatch(updateBoard(board))
    }
    return (
        <div className="task-label-container">
            {labelIds.map(labelId => {
                return <button
                    key={labelId}
                    onClick={toggaleLabelSize}
                    className={isClicked ? 'clicked' : ''}
                    style={getColor(labelId)}></button>
            })}
        </div>
    )
}
