import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { loadBoards } from '../store/board.actions'
import { GroupList } from './group-list'
import { BoardHeader } from './board-header'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { handleDrag } from '../store/board.actions';


// const taskRef = useRef()

export const Board = () => {
    const dispatch = useDispatch()
    const [board, setBoard] = useState(null)
    const params = useParams()
    useEffect(() => {
        loadBoard()
    }, [])

    const loadBoard = async () => {
        const boardId = params.id
        console.log(boardId)
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
        } catch (err) {
            console.log('Cannot load board', err)
        }
    }
   
    const onEnd = result => {
        const { destination, source, type } = result
        if (!destination) return
    
        dispatch(
          handleDrag(board, source.droppableId, destination.droppableId, source.index, destination.index, type)
        )
      }
   
   
    if (!board) return <div>Loading...</div>
    return (
        <DragDropContext onDragEnd={onEnd}>
            <section className="board" style={{ backgroundColor: board.style.bgColor }}>
                <BoardHeader
                    board={board} />
                <GroupList board={board} />
            </section>
        </DragDropContext>
    )
}