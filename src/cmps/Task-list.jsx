import { useEffect, useRef } from 'react'
import { TaskPreview } from './Task-Preview'

export const TaskList = ({ tasks, isAddTask, handleChangeTask, task }) => {

    const inputRef = useRef()

    useEffect(() => {
        if (!isAddTask) return
        inputRef.current.focus()
    }, [isAddTask])

    if (!tasks) return
    return (
        <section className="task-list">
            {tasks.map(task => {
                return <TaskPreview key={task.id} task={task} />
            })}
            {isAddTask && <div className="add-task-content task-preview">
                <textarea
                    name="title"
                    id="title"
                    placeholder="Enter a title for this card..."
                    value={task.title}
                    onChange={handleChangeTask}
                    ref={inputRef}
                ></textarea>
            </div>}
        </section>
    )
}