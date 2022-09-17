import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBoards, addBoard, updateBoard, removeBoard, addToBoard } from '../store/board.actions'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'

export function BoardPage() {
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const onRemoveBoard = (boardId) => {
        removeBoard(boardId)
    }
    // const onAddBoard = () => {
    //     const board = boardService.getEmptyBoard()
    //     board.vendor = prompt('Vendor?')
    //     addBoard(board)
    // }
    const onUpdateBoard = (board) => {
        const price = +prompt('New price?')
        const boardToSave = { ...board, price }
        updateBoard(boardToSave)
    }

    const onAddToBoard = (board) => {
        addToBoard(board)
        showSuccessMsg('Added to Boardt')
    }

    const getBoradBg = (board) => {
        // console.log('board from BG', board)
        let style = {}
        if (board.style?.imgUrl) {
            style = {
                backgroundImage: `url(${board.style.imgUrl})`,
                backgroundSize: "cover",

            }
        } else style = { backgroundColor: board.style.bgColor }
        return style
    }

    if (!boards) return <div>Loading...</div>
    // console.log('boards', boards)
    return (
        <div className="board-page">
            {/* <h3>Boards App</h3> */}
            <main>

                {/* <button onClick={onAddBoard}>Add Board</button> */}
                <Link to="/board/edit" className='nice-button'>Add Board</Link>

                <ul className="board-list">

                    {boards.map(board =>
                        <Link to={`/board/${board._id}`} key={board._id}>
                            <li className="board-preview" style={getBoradBg(board)}>
                                <span>{board.title}</span>

                                {/* <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div> */}

                                {/* <button className="buy" onClick={() => { onAddToBoardt(board) }}>Add to Boardt</button> */}
                            </li>
                        </Link>
                    )
                    }

                </ul>
            </main>
        </div>
    )
}


// function mapStateToProps(state) {
//     return {
//         boards: state.boardModule.boards
//     }
// }
// const mapDispatchToProps = {
//     loadBoards,
//     removeBoard,
//     addBoard,
//     updateBoard,
//     addToBoard
// }


// export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage)