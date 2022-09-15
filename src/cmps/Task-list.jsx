import { TaskPreview } from './Task-Preview'

export const TaskList = ({ tasks }) => {

    console.log('tasks', tasks)
    if (!tasks) return
    return (
        <section className="task-list">
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} />
            })}
        </section>
    )
}