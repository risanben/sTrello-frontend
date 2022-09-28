import { LightenDarkenColor } from "lighten-darken-color"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PenIcon from '../assets/img/pen-icon.svg'
import { EditLabelsModal } from "./task-details-modals/edit-labels-modal"

export const TaskDetailsLabel = ({ labelIds, onSetLabel, pos }) => {
    const board = useSelector(state => state.boardModule.board)
    const [isClicked, setIsClicked] = useState(false)
    const [isEditLabelModal, setIsEditLabelModal] = useState(false)
    const [labelForEdit, setLabelForEdit] = useState(null)

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
                            <div className="label-icon" style={{ backgroundColor: LightenDarkenColor(currentLabel.color, 30) }}></div>
                            <div className="label-title"> {currentLabel.title}</div>
                        </div>
                    </div>
                    <button className="btn-edit" onClick={(ev) => toggleEditLabelModal(ev, currentLabel)}><img src={PenIcon} alt="pen" className="pen-icon" /></button>
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

    const toggleEditLabelModal = (ev, label) => {
        console.log('label', label);
        setLabelForEdit(label)
        setIsEditLabelModal(!isEditLabelModal)
    }

    // console.log('rendered task label')
    return (
        <div className="task-label-container" >
            {isEditLabelModal && <EditLabelsModal toggleEditLabelModal={toggleEditLabelModal} labelForEdit={labelForEdit} style={{ ...pos }} />}
            <ul className="label-list">
                {board.labels.map(label => {
                    return (getLabel(label.id))
                })}
            </ul>
            <div className="border"></div>
            <button className="btn-create" onClick={(ev) => toggleEditLabelModal(ev, {})}>Create a new label</button>
        </div>
    )
}
