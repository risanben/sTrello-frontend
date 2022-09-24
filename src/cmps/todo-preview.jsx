import { useEffect, useState } from "react"
import { IoCheckbox } from "react-icons/io5"
import { MdCheckBoxOutlineBlank } from "react-icons/md"

export const TodoPreview = ({ todo, onToggleTodo, onRemoveTodo, onSaveTodo }) => {

    const [isTextAreaOpen, toggleTextArea] = useState(false)
    const [currTodo, setCurrTodo] = useState(todo)


    useEffect(() => {
        setCurrTodo(todo)
    }, [todo])


    const onToggleTextArea = (ev, isShownTextArea) => {
        ev.stopPropagation()
        ev.preventDefault()
        toggleTextArea(isShownTextArea)
    }


    return (<div className='todo-preview' key={todo.id} onBlur={(ev) => {
        onToggleTextArea(ev, false)

    }}>

        {(todo.isDone) ? <IoCheckbox
            className="checkbox "
            onClick={(ev) => {
                ev.preventDefault()
                onToggleTodo(ev, todo.id)
            }} />
            : <MdCheckBoxOutlineBlank onClick={(ev) => onToggleTodo(ev, todo.id)}
                className="checkbox " />}

        <div className="txt-and-btns">

            <textarea
                value={currTodo.title} className={`txt-area-normal  ${(todo.isDone) ? 'checked' : ''}`}
                onChange={(ev) => setCurrTodo({ title: ev.target.value })}
                onClick={(ev) => onToggleTextArea(ev, true)}  >
            </textarea>


            {isTextAreaOpen && <section className="todo-edit-btns">
                <div>
                    <button
                        className='btn-add'
                        onMouseDown={(ev) => {
                            onSaveTodo(ev, todo.id, currTodo)
                            onToggleTextArea(ev, false)
                        }
                        }>
                        Save
                    </button>
                    <button className="checklist-btn">Close</button>
                </div>

            </section>}

        </div>
    </div>
    )
}