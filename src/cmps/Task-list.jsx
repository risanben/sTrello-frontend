import { TaskPreview } from './Task-Preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import React, { useEffect, useRef } from 'react';

export const TaskList = ({ tasks, groupId, group, isAddTask, handleChangeTask, task }) => {
    const taskRef = useRef()

    const inputRef = useRef()

    useEffect(() => {
        if (!isAddTask) return
        inputRef.current.focus()
    }, [isAddTask])

    if (!tasks) return
    return (

        <Droppable
            droppableId={group.id}
        >
            {(provided) => (
                <section
                    ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                    {...provided.droppableProps}
                >
                    <section className="task-list" >
                        {tasks.map((task, index) => {
                            return <TaskPreview key={task.id} task={task} groupId={groupId} taskRef={taskRef} index={index} groupTitle={group.title} />
                        })}
                        {provided.placeholder}
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
                </section>
            )}
        </Droppable>

    )
}