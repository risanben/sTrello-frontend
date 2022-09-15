import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GroupEdit } from './group-edit';
import { GroupPreview } from './group-preview'
import { useDispatch } from "react-redux";
import { updateBoard } from '../store/board.actions'
import { useEffect } from 'react';

export const GroupList = ({ board }) => {

    const [isAddingGroup, setIsAddingGroup] = useState(false)
    const [currBoard, setCurrBoard] = useState(board)
    useEffect(() => {
        console.log(currBoard)
    }, [currBoard])
    const dispatch = useDispatch()
    const onAddingGroup = () => {
        setIsAddingGroup(!isAddingGroup)
    }

    const addTask = async (groupToUpdate) => {
        const boardToSave = { ...board }
        boardToSave.groups.map(group => (group.id === groupToUpdate.id) ? groupToUpdate : group)
        const savedBoard = await dispatch(updateBoard(boardToSave))
        console.log('savedBoard', savedBoard)
        setCurrBoard(savedBoard.board)
    }



    // console.log('board.groups', currBoard.groups);
    if (!currBoard) return <div>Loading...</div>
    return (
        <section className="group-list">
            {currBoard.groups.map(group => {
                return <GroupPreview key={group.id} group={group} addTask={addTask} />
            })}
            {!isAddingGroup && <button onClick={onAddingGroup}>Add group</button>}
            {isAddingGroup && <GroupEdit onAddingGroup={onAddingGroup} board={currBoard} />}

            {/* <Link to="/group/edit" className='nice-button'>Add group</Link> */}
        </section>
    )
}