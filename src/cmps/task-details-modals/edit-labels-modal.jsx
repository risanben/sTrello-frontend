import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import closeIcon from '../../assets/img/icon-close-task-details.svg'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateBoard } from "../../store/board.actions"

export const EditLabelsModal = ({ toggleEditLabelModal, labelForEdit }) => {


    const [backgroundColors, setBackgroundColors] = useState([])
    const [newLabelStyle, setNewLabelStyle] = useState({})

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()

    useEffect(() => {
        loadBackGround()
        setNewLabelStyle({
            id: labelForEdit.id || utilService.makeId(),
            title: labelForEdit.title,
            color: labelForEdit.color
        })
    }, [])

    const loadBackGround = () => {
        setBackgroundColors(boardService.getLabelsColors('color'))
    }

    const onUpdateTitle = (ev) => {
        setNewLabelStyle({ ...newLabelStyle, title: ev.target.value })
    }

    const onSetColor = (color) => {
        setNewLabelStyle({ ...newLabelStyle, color })
    }

    const onEditLabel = (ev) => {
        ev.preventDefault()
        toggleEditLabelModal()
        const idx = board.labels.findIndex(label => label.id === newLabelStyle.id)
        if (idx < 0) board.labels.push(newLabelStyle)
        else board.labels.splice(idx, 1, newLabelStyle)
        dispatch(updateBoard(board))
    }

    const onDeleteLabel=()=>{
        toggleEditLabelModal()
        const idxDelete = board.labels.findIndex(label => label.id === newLabelStyle.id)
        board.labels.splice(idxDelete, 1)
    }

    return (
        <section className="cover-modal">
            <img src={closeIcon} onClick={toggleEditLabelModal} alt="close" className="close-btn" />
            <div className="cover-modal-title">Edit label</div>

            <form onSubmit={onEditLabel}>
                <label className="sub-title">Title</label>
                <input className="input" type="text" onChange={onUpdateTitle} value={newLabelStyle.title} />
            </form>

            <section>
                <span className="sub-title">Select a color</span>
                <ul className="cover-color">
                    {backgroundColors.map(color =>
                        <li className="cover-color-container" key={color}>
                            <div onClick={() => onSetColor(color)} className={`cover-color ${color === newLabelStyle.color ? 'selected' : ''}`} style={{ backgroundColor: color }} />
                        </li>
                    )}
                </ul>
            </section>
            <div className="border"></div>
            <div className="btns-container">
                <button className="btn btn-save" onClick={onEditLabel}>Save</button>
                <button className="btn btn-delete" onClick={onDeleteLabel}>Delete</button>
            </div>
        </section>
    )
}


