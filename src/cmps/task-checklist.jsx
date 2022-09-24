import { ChecklistPreview } from './checklist-preview'


export const TaskChecklist = ({checklists, board, group, task}) => {

    if (!task.checklists?.length) return <section></section>

    // console.log('taskchecklist renderd, task is:', task)
    return (
        <section className="task-checklist">
            {task.checklists.map(item=>{
                return <ChecklistPreview
                key={item.id}
                board={board}
                group={group}
                checklist={item}
                task={task}
                />
            })}
        </section>
    )
}