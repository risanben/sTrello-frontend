import { useState } from 'react';
import { Link } from 'react-router-dom'
import { GroupEdit } from './group-edit';
import { GroupPreview } from './group-preview'

export const GroupList = ({ board }) => {

    const [isAddingGroup, setIsAddingGroup] = useState(false)

    const onAddingGroup = () => {
        setIsAddingGroup(!isAddingGroup)
    }

    console.log('board.groups', board.groups);
    return (
        <section className="group-list">
            {board.groups.map(group => {
                return <GroupPreview key={group.id} group={group} />
            })}
            {!isAddingGroup && <button onClick={onAddingGroup}>Add another list</button>}
            {isAddingGroup && <GroupEdit onAddingGroup={onAddingGroup} board={board} />}

            {/* <Link to="/group/edit" className='nice-button'>Add group</Link> */}
        </section>
    )
}