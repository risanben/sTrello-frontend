import React, { useEffect } from 'react'
import { connect } from 'react-redux'


import { loadBoards, addBoard, updateBoard, removeBoard, addToBoardt } from '../store/board.actions.js'

import { showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.js'

function _BoardPage({ loadBoards, addBoard, updateBoard, removeBoard, addToBoardt, boards }) {

    useEffect(() => {
        loadBoards()
    }, [])

    const onRemoveBoard = (boardId) => {
        removeBoard(boardId)
    }
    const onAddBoard = () => {
        const board = boardService.getEmptyBoard()
        board.vendor = prompt('Vendor?')
        addBoard(board)
    }
    const onUpdateBoard = (board) => {
        const price = +prompt('New price?')
        const boardToSave = { ...board, price }
        updateBoard(boardToSave)
    }

    const onAddToBoardt = (board) => {
        console.log(`Adding ${board.vendor} to Boardt`)
        addToBoardt(board)
        showSuccessMsg('Added to Boardt')
    }

    return (
        <div>
            <h3>Boards App</h3>
            <main>

                <button onClick={onAddBoard}>Add Board ⛐</button>

                <ul className="board-list">

                    {boards.map(board =>
                        <li className="board-preview" key={board._id}>
                            <h4>{board.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${board.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => { onRemoveBoard(board._id) }}>x</button>
                                <button onClick={() => { onUpdateBoard(board) }}>Edit</button>
                            </div>

                            <button className="buy" onClick={() => { onAddToBoardt(board) }}>Add to Boardt</button>
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
    addToBoardt
}


export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage)