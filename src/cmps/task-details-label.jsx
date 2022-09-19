import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const TaskLabelDetails = ({ labelIds }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)

    const getLabel = (labelId) => {
        const currentLabel = board.labels.find(label => label.id === labelId)
        const isTaskLabel=checkTaskLabel()
        return (
            <li>
                <input type="checkbox" checked={isTaskLabel}></input>
                <div style={{ backgroundColor: currentLabel.color }}>
                    {currentLabel.title}
                </div>
                <button>🖋</button>
            </li>
        )
    }

    const checkTaskLabel = (labelId) => {
        if(!labelIds) return
        const checkedLabel = labelIds.find(label => label=== labelId)
        if (checkedLabel) return true
        return false
    }

    return (
        <div className="task-label-container" >
            <ul>
                {board.labels.map(label => {
                    return (getLabel(label.id) )
                })}
            </ul>
        </div>
    )
}
