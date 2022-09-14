import { TaskList } from './Task-list'

export const GroupPreview = ({ group }) => {

    return (
        <section className="group-preview">
            <div className="group-title">
                <span>{group.title}</span>
            </div>
            <TaskList tasks={group.tasks} />
            <div className="add-task-container">
                <span className="add-icon">+</span>
                <span>Add a card</span>
            </div>
        </section>
    )
}

