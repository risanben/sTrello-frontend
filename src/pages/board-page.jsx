import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



import { loadBoards, addBoard, updateBoard, removeBoard, addToBoard } from '../store/board.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'

function _BoardPage({ loadBoards, addBoard, updateBoard, removeBoard, addToBoard, boards }) {

    useEffect(() => {
        loadBoards()
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
        console.log(`Adding ${board.vendor} to Board`)
        addToBoard(board)
        showSuccessMsg('Added to Boardt')
    }

    return (
        <div className="board-page">
            <h3>Boards App</h3>
            <main>

                {/* <button onClick={onAddBoard}>Add Board</button> */}
                <Link to="/board/edit" className='nice-button'>Add Board</Link>

                <ul className="board-list">

                    {boards.map(board =>
                        <li className="board-preview" key={board._id} style={{ backgroundColor: board.style.bgColor }}>
                            <Link to={`/board/${board._id}`}>
                                <span>{board.title}</span>
                            </Link>
                            
                            {/* <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div> */}

                            {/* <button className="buy" onClick={() => { onAddToBoardt(board) }}>Add to Boardt</button> */}
                        </li>)
                    }

                </ul>
            </main>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard,
    addToBoard
}


export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage)