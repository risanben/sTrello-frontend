import { BsFillPencilFill } from 'react-icons/bs'

export const TaskPreview = ({ task }) => {

    return (
        <section className="task-preview">
            {task.style && <div className="task-cover" style={{ backgroundColor: task.style.bgColor }}></div>}
            <span>{task.title}</span>
            <button className='quick-edit-btn hide'>
                <BsFillPencilFill />
            </button>
        </section>
    )
}