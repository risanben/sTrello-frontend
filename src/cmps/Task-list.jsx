
import { TaskPreview } from './Task-Preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import React, { useEffect, useRef } from 'react';

export const TaskList = ({ tasks, groupId, group }) => {
    const taskRef = useRef()

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
                            return <TaskPreview key={task.id} task={task} groupId={groupId} taskRef={taskRef} index={index} />
                        })}
                        {provided.placeholder}
                    </section>
                </section>
            )}
        </Droppable>

    )
}