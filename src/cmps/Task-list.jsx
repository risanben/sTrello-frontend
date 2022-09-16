
import { TaskPreview } from './Task-Preview'


export const TaskList = ({ tasks , groupId }) => {

    if (!tasks) return
    return (
        <section className="task-list" >
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} groupId={groupId}/>
            })}
        </section>
    )
}