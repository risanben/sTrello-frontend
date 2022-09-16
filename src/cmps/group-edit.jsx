import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { boardService } from '../services/board.service'
import { useFormRegister } from '../hooks/useFormRegister'
import { utilService } from '../services/util.service'

export const GroupEdit = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const [group, handleChange, setGroup] = useForm({
        id: utilService.makeId(),
        title: '',
        tasks: []
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        // const groupId = params.id
        // if (!groupId) return
        // groupService.getById(boardId)
        //     .then(group => {
        //         setGroup(group)
        //     })
        //     .catch(err => {
        //     })
    }, [])

    const onSaveGroup = (ev) => {
        ev.preventDefault()
        // boardService.saveGroup({ ...group }).then(() => {
        //     props.onAddingGroup()
        // })
        if (!group.title) return
        var board = props.board
        console.log('board', props.board);
        board.groups.push({ ...group })
        boardService.save({ ...board }).then(() => {
            props.onAddingGroup()
        })

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
                    <div className="btn-close-add" onClick={props.onAddingGroup}></div>
                </div>
            </form>
        </section>
    )
}