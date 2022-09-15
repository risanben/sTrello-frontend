import { TaskList } from './Task-list'
import { Link } from 'react-router-dom'

export const GroupPreview = ({ group }) => {

    return (
        <section className="group-preview">
            <div className="group-title">
                <span>{group.title}</span>
            </div>
            <TaskList tasks={group.tasks} />
            <div className="add-task-container">
                <span className="add-icon">+</span>
                {/* <span>Add a card</span> */}
                <Link to={`/task/edit/`} className='nice-button'><span>Add a card</span></Link>
            </div>
        </section>
    )
}

