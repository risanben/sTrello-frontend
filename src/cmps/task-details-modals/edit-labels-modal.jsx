import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import closeIcon from '../../assets/img/icon-close-task-details.svg'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { updateBoard } from "../../store/board.actions"

export const EditLabelsModal = ({ toggleEditLabelModal, labelForEdit }) => {

    // console.log('labelForEdit', labelForEdit);

    const [backgroundColors, setBackgroundColors] = useState([])
    // const [title, setTitle] = useState(null)
    // const [labelColor, setLabelColor] = useState(null)
    const [currentBoard, setCurrentBoard] = useState(null)
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
        console.log('newLabelStyle-didMount', newLabelStyle);
    }, [])

    useEffect(() => {
        setCurrentBoard(board)
    }, [board])

    const loadBackGround = () => {
        setBackgroundColors(boardService.getLabelsColors('color'))
    }

    const onUpdateTitle = (ev) => {
        setNewLabelStyle({ ...newLabelStyle, title: ev.target.value })
        console.log('newLabelStyle-title', newLabelStyle);
    }

    const onSetColor = (color) => {
        setNewLabelStyle({ ...newLabelStyle, color })
        console.log('newLabelStyle-color', newLabelStyle);
    }

    const onEditLabel = (ev) => {
        ev.preventDefault()
        toggleEditLabelModal()

        // const newLabelStyle = {
        //     id: utilService.makeId(),
        //     title,
        //     color: labelColor
        // }

        console.log('newLabelStyle-onEditLabel', newLabelStyle);
        const idx = currentBoard.labels.findIndex(label => label.id === newLabelStyle.id)
        console.log('currentBoard.labels', currentBoard.labels);
        console.log('idx', idx);
        if (idx < 0) currentBoard.labels.push(newLabelStyle)
        else currentBoard.labels.splice(idx, 1, newLabelStyle)
        dispatch(updateBoard(currentBoard))
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
                            <div onClick={() => onSetColor(color)} className="cover-color" style={{ backgroundColor: color }} />
                        </li>
                    )}
                </ul>
            </section>
        </section>
    )
}


