import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { loadBoards } from '../store/board.actions'
import { GroupList } from './group-list'
import { BoardHeader } from './board-header'
import { useDispatch } from "react-redux";
import { getBoard } from '../store/board.actions'
import { useSelector } from 'react-redux'

export const Board = () => {

    const {board} = useSelector(state => state.boardModule)
    // const [board, setBoard] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        console.log('board', board);
        loadBoard()
        console.log('board', board);
    }, [])

    const loadBoard = async () => {
        const boardId = params.id
        try {
            const board = await dispatch(getBoard(boardId))
            console.log('board', board);
            // setBoard(board)
        } catch (err) {
            console.log('Cannot load board', err)
        }
    }


    // const loadBoard = async () => {
    //     const boardId = params.id
    //     try {
    //         const board = await boardService.getById(boardId)
    //         setBoard(board)
    //     } catch (err) {
    //         console.log('Cannot load board', err)
    //     }
    // }

    if (!board) return <div>Loading...</div>

    return (
        <section className="board" style={{ backgroundColor: board.style.bgColor }}>
            <BoardHeader
                board={board} />

            <GroupList board={board} />
            {/* <div className="group-container flex">
                {board.groups.map(group => {
                    return <div key={group.id} className="group-content">
                        <div className="group-title">
                            <span>{group.title}</span>
                        </div>
                        {group.tasks.map(task => {
                            return <div key={task.id}>
                                <span>{task.title}</span>
                            </div>
                        })}
                    </div>
                })}
            </div> */}

        </section>
    )
}