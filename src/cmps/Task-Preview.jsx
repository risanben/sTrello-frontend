export const TaskPreview = ({ task }) => {


    return (
        <section className="task-preview">
            {task.style && <div className="task-cover" style={{ backgroundColor: task.style.bgColor }}></div>}
            <span>{task.title}</span>
        </section>
    )
}