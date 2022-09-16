
import React, { useState, useRef } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export function Dnd() {

    const data = [
        {
            name: "one",
            id: "1"
        },
        {
            name: "two",
            id: "2"
        },
        {
            name: "three",
            id: "3"
        },
        {
            name: "four",
            id: "4"
        },
    ]

    const [list, setList] = React.useState(data)

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const onEnd = (result) => {
        if (!result.destination) return
        setList(reorder(list, result.source.index, result.destination.index))
    }

    const taskRef = useRef()

    return (
        <DragDropContext onDragEnd={onEnd}>
            <Droppable
                droppableId='12345678'
            >
                {(provided, snapshot) => (
                    <div
                        ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                    >
                        {list.map((item, index) => (
                            <Draggable
                                draggableId={item.id}
                                key={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div>{item.name}</div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}


