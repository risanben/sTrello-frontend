import { TaskPreview } from './Task-Preview'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import React, { useEffect, useRef } from 'react';

export const TaskList = ({ tasks, group }) => {

    // const onEnd = (result) => {
    //     const { destination, source, type } = result
    //     // let groupToEdit = { ...group }
    //     const { tasks } = group.tasks
    //     if (!result.destination) return

    //     const droppableIdxStart = source.index
    //     const droppableIdxEnd = destination.index
    //     const droppableIdStart = source.droppableId
    //     const droppableIdEnd = destination.droppableId

    //     //if from the same group
    //     if (droppableIdStart === droppableIdEnd) {
    //         const task = group.tasks.splice(droppableIdxStart, 1);
    //         group.tasks.splice(droppableIdxEnd, 0, ...task);
    //       }
    // }
    const taskRef = useRef()

    // console.log('tasks', tasks)
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
                        <section className="task-list">
                            {tasks.map((task, index) => {
                                return <TaskPreview key={task.id} task={task} taskRef={taskRef} index={index} />
                            })}
                        {provided.placeholder}
                        </section>
                    </section>
                )}
            </Droppable>
     
    )
}