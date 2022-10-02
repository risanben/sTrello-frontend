import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resizeLabel } from "../store/board.actions"


export const TaskLabel = ({ labelIds }) => {
    const board = useSelector(state => state.boardModule.board)
    const resizeLabelState = useSelector(state => state.boardModule.resizeLabel)
    const [isClicked, setIsClicked] = useState(false)
    const dispatch = useDispatch()
    const getColor = (labelId) => {
        const label = board.labels.find(label => label.id === labelId)
        if (label?.color)
            return {
                color: label.color,
                title: label.title,
            }
    }

    const toggaleLabelSize = (ev) => {
        ev.stopPropagation()
        dispatch(resizeLabel(isClicked))
        setIsClicked(!isClicked)
    }

    const getClassName = () => {
        // if(resizeLabelState) setTimeout( 'active',5000 )
        return resizeLabelState ? 'active' : 'hidden'
    }

    return (
        <div className="task-label-container">
            {labelIds.map(labelId => {
                return <button
                    key={labelId}
                    onClick={toggaleLabelSize}
                    className={`btn-label ${resizeLabelState ? 'clicked' : ''}`}
                    style={{ backgroundColor: getColor(labelId).color }}>{resizeLabelState &&<span className={`label-title ${getClassName()}`}>{getColor(labelId).title}</span>} </button>
            })}
        </div>
    )
}




// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { resizeLabel } from "../store/board.actions"


// export const TaskLabel = ({ labelIds }) => {
//     const board = useSelector(state => state.boardModule.board)
//     const resizeLabelState = useSelector(state => state.boardModule.resizeLabel)
//     const [isClicked, setIsClicked] = useState(false)
//     const dispatch = useDispatch()
//     const getColor = (labelId) => {
//         const label = board.labels.find(label => label.id === labelId)
//         if(label?.color)
//         return {
//             backgroundColor: label.color
//         }
//     }

//     const toggaleLabelSize = (ev) => {
//         ev.stopPropagation()
//         dispatch(resizeLabel(isClicked))
//         setIsClicked(!isClicked)
//     }
//     return (
//         <div className="task-label-container">
//             {labelIds.map(labelId => {
//                 return <button
//                     key={labelId}
//                     onClick={toggaleLabelSize}
//                     className={`btn-label ${resizeLabelState ? 'clicked' : ''}`}
//                     style={getColor(labelId)}></button>
//             })}
//         </div>
//     )
// }
