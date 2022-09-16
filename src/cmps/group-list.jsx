import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GroupEdit } from './group-edit';
import { GroupPreview } from './group-preview'
import { useDispatch } from "react-redux";
import { updateBoard } from '../store/board.actions'
import React, { useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export const GroupList = ({ board }) => {
    console.log('board:', board)

    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const [currBoard, setCurrBoard] = useState(board)

    const taskRef = useRef()


    useEffect(() => {
    }, [currBoard])

    const dispatch = useDispatch()

    const onAddingGroup = () => {
        setIsAddingGroup(!isAddingGroup)
    }

    const addTask = async (groupToUpdate) => {
        const boardToSave = { ...board }
        boardToSave.groups.map(group => (group.id === groupToUpdate.id) ? groupToUpdate : group)
        const savedBoard = await dispatch(updateBoard(boardToSave))
        setCurrBoard(savedBoard.board)
    }



    // console.log('board.groups', currBoard.groups);
    if (!currBoard) return <div>Loading...</div>
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
                            {currBoard.groups.map((group, index) => {
                                return <GroupPreview 
                                key={group.id} 
                                group={group} 
                                addTask={addTask} 
                                taskRef={taskRef} 
                                index={index}
                                />
                            })}
                            {!isAddingGroup && <button onClick={onAddingGroup}>Add another list</button>}
                            {isAddingGroup && <GroupEdit onAddingGroup={onAddingGroup} board={currBoard} />}
                            {/* <Link to="/group/edit" className='nice-button'>Add group</Link> */}
                        </section>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
    )
}