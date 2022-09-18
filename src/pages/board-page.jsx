import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBoards, addBoard, updateBoard, removeBoard, addToBoard } from '../store/board.actions'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'
import { useState } from 'react'
import { BoardEdit } from '../cmps/board-edit'

export function BoardPage() {
    const boards = useSelector(state => state.boardModule.boards)
    const [isModalNewBoard, setIsModalNewBoard] = useState(false)
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
                backgroundPosition: "50%"


            }
        } else style = { backgroundColor: board.style.bgColor }
        return style
    }

    const onCreateNewBoard = () => {
        setIsModalNewBoard(!isModalNewBoard)
    }

    if (!boards) return <div>Loading...</div>
    // console.log('boards', boards)
    return (
        <div className="board-page">
            {/* <h3>Boards App</h3> */}

            {/* <button onClick={onAddBoard}>Add Board</button> */}
            {/* <Link to="/board/edit" className='nice-button'>Add Board</Link> */}

            <ul className="board-list">

                {boards.map(board =>
                    <Link to={`/board/${board._id}`} key={board._id}>
                        <li className="board-preview" style={getBoradBg(board)}>

                            <div className="board-title">{board.title}</div>

                            {/* </div> */}
                            {/* <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div> */}

                            {/* <button className="buy" onClick={() => { onAddToBoardt(board) }}>Add to Boardt</button> */}
                        </li>
                    </Link>)}
                <li className="board-preview" onClick={onCreateNewBoard}>
                    <div className="board-title create-new">Create new board</div>
                </li>
                {isModalNewBoard && <BoardEdit />}
            </ul>
        </div >
    )
}
