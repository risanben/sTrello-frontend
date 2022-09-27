import { useDispatch } from "react-redux"
import { boardService } from "../services/board.service"
import { updateBoard } from "../store/board.actions"


export const BoardBackgroundMenu = ({ board, type }) => {
    const dispacth = useDispatch()

    const setBoardBackGroundColor = (color) => {
        const boardToUpdate = { ...board }
        boardToUpdate.style.bgColor = color
        boardToUpdate.style.imgUrl = null
        dispacth(updateBoard(boardToUpdate))
    }

    const setBoardBackGroundImg = (imgUrl) => {
        const boardToUpdate = { ...board }
        boardToUpdate.style.imgUrl = imgUrl
        boardToUpdate.style.bgColor = null
        dispacth(updateBoard(boardToUpdate))
    }


    return (
        <section className="board-background-menu">

            {type === 'color' && <div className="background-container">
                {boardService.getBoardBackgrounds().colors.map(color => {
                    return <div
                        key={color}
                        className="background-option"
                        style={{ backgroundColor: color }}
                        onClick={() => setBoardBackGroundColor(color)}>

                    </div>
                })}
            </div>}

            {type === 'img' && <div className="background-container">
                {boardService.getBoardBackgrounds().imgsUrl.map(imgUrl => {
                    return <div
                        key={imgUrl}
                        className="background-option"
                        style={{ backgroundImage: `url(${imgUrl})` }}
                        onClick={() => setBoardBackGroundImg(imgUrl)}>

                    </div>
                })}
            </div>}

        </section>
    )
}