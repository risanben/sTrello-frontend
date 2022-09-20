
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
        console.log('entered onEnd')
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
                                {(provided) => (
                                    <div
                                        ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div style={{ marginTop: "20px" }}>{item.name}
                                            <br />
                                            <Droppable droppableId='12345678'>
                                                {(provided) => (
                                                    <div ref={(el) => { taskRef.current = el; provided.innerRef(el) }} >
                                                        <Draggable draggableId={item.name} key={item.name} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div>emoji{item.name}</div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>

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





// return (
//     <Droppable droppableId='12345678' type="member">
//         {(provided) => (
//             <div ref={(el) => { taskRef.current = el; provided.innerRef(el) }} >
//                 <div className="task-member-container">
//                     {memberIds.map((memberId, index) => {

//                         return (
//                             <Draggable draggableId={memberId} key={memberId} type="member"index={index}>

//                                 {(provided) => (
//                                     <div
//                                         ref={(el) => { taskRef.current = el; provided.innerRef(el) }}
//                                         {...provided.draggableProps}
//                                         {...provided.dragHandleProps}
//                                     >

//                                         <div className="member"
//                                             key={memberId}>
//                                             {getMemberName(memberId)}
//                                         </div>

//                                         { provided.placeholder }
//                                     </div>
//                                 )}

//                             </Draggable>

//                         )


//                     })}

//                 </div>

//             </div>

//         )}
//     </Droppable>
// )