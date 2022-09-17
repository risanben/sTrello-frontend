import { useState } from "react"
import { useSelector } from "react-redux"


export const TaskLabel = ({ labelIds }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)

    const getColor = (labelId) => {
        const label = board.labels.find(label => label.id === labelId)
        return {
            backgroundColor: label.color
        }
    }

    const toggaleLabelSize = (ev) => {
        ev.stopPropagation()
        setIsClicked(!isClicked)
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
