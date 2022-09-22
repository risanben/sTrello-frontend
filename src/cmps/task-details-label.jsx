import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PenIcon from '../assets/img/pen-icon.svg'

export const TaskDetailsLabel = ({ labelIds, onSetLabel }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)

    const getLabel = (labelId) => {
        const currentLabel = board.labels.find(label => label.id === labelId)
        const isTaskLabel = checkTaskLabel(labelId)
        if (currentLabel?.color) {

            return (
                <li key={currentLabel.id} className="label-details">
                    <div className="checkbox-label" onClick={() => onSetLabel(isTaskLabel, currentLabel.id)}>
                        <label htmlFor="label-body"></label>
                        <input id="label-body" type="checkbox" checked={isTaskLabel}></input>
                        {/* <input type="checkbox" defaultChecked={isTaskLabel} onChange={()=>onSetLabel(isTaskLabel,currentLabel.id)}></input> */}
                        <div className="label-details-body" style={{ backgroundColor: currentLabel.color }}>
                            {currentLabel.title}
                        </div>
                    </div>
                    <button className="btn-edit"><img src={PenIcon} alt="pen" className="pen-icon" /></button>
                </li>
            )
        }
    }

    const checkTaskLabel = (labelId1) => {
        if (!labelIds) return
        const checkedLabel = labelIds.find(labelId => labelId === labelId1)
        // console.log('checkedLabel:', checkedLabel)
        if (checkedLabel) return true
        return false
        // return checkedLabel
    }

    // console.log('rendered:')
    return (
        <div className="task-label-container" >
            <ul className="label-list">
                {board.labels.map(label => {
                    return (getLabel(label.id))
                })}
            </ul>
        </div>
    )
}
