import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { boardService } from '../services/board.service'
import { useFormRegister } from '../hooks/useFormRegister'
import { utilService } from '../services/util.service'
import { addGroup } from '../store/board.actions'
import { useDispatch } from 'react-redux'

export const GroupEdit = ({ boardId, onAddingGroup }) => {
    const disapcth = useDispatch()
    const [group, handleChange, setGroup] = useForm({
        id: utilService.makeId(),
        title: '',
        tasks: []
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const onSaveGroup = (ev) => {
        ev.preventDefault()
        if (!group.title) return
        const activity = {
            txt: `added ${group.title} list to this board`,
            task: {
                task: "",
                title: ""
            }
        }
        disapcth(addGroup(boardId, group, activity))
        onAddingGroup()

    }

    return (
        <section className="group-edit">
            <form onSubmit={onSaveGroup}>
                {/* <label htmlFor="title">title</label> */}
                <input
                    ref={inputRef}
                    value={group.title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter list title..."
                />
                <div className="add-list-btn-container">
                    <button className="btn-add">Add list</button>
                    <div className="btn-close-add" onClick={onAddingGroup}></div>
                </div>
            </form>
        </section>
    )
}