import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GroupEdit } from './group-edit';
import { GroupPreview } from './group-preview'
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from '../store/board.actions'
import React, { useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export const GroupList = () => {
    const board = useSelector(state => state.boardModule.board)
    // console.log('**board from GroupList:**', board)

    const [isAddingGroup, setIsAddingGroup] = useState(false)
    // const [currBoard, setCurrBoard] = useState(board)


    const taskRef = useRef()


    useEffect(() => {
    }, [board])

    const dispatch = useDispatch()

    const onAddingGroup = () => {
        setIsAddingGroup(!isAddingGroup)
    }

    const addTask = async (groupToUpdate) => {
        // console.log('from add task+++++++++++++++++++++++++++', groupToUpdate)
        let boardToSave = { ...board }
        boardToSave.groups = boardToSave.groups.map(group => (group.id === groupToUpdate.id) ? groupToUpdate : group)
        const savedBoard = await dispatch(updateBoard(boardToSave))
        // console.log('saved board***', savedBoard)
        // setCurrBoard(savedBoard.board)
    }


    // console.log('render GROUP-LIST')

    // console.log('board.groups', currBoard.groups);
    if (!board) return <div>Loading...</div>
    return (
        <Droppable
            droppableId='groups'
            direction="horizontal"
            type='group'
        >
            {(provided) => (
                <div
                    ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                    {...provided.droppableProps}
                >
                    <section className="group-list">
                        {board?.groups?.map((group, index) => {
                            return <GroupPreview
                                key={group.id}
                                group={group}
                                addTask={addTask}
                                taskRef={taskRef}
                                index={index}
                            />
                        })}
                        {!isAddingGroup &&
                            <div className="btn-add-group-container" onClick={onAddingGroup}>
                                {/* <span>+</span> */}
                                <span className="btn-add-group">+ Add another list</span>
                            </div>}
                        {isAddingGroup && <GroupEdit onAddingGroup={onAddingGroup} board={board} />}
                        {/* <Link to="/group/edit" className='nice-button'>Add group</Link> */}
                    </section>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}