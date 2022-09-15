import { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { boardService } from '../services/board.service'
import { useFormRegister } from '../hooks/useFormRegister'
import { utilService } from '../services/util.service'

export const BoardEdit = (props) => {
    // console.log('BoardEdit-props', props);
    const params = useParams()
    const navigate = useNavigate()

    // const [register] = useFormRegister({
    //     name: '',
    //     visibility: '',
    //     date: new Date(),
    // }, props.onChangeFilter)

    const [board, handleChange, setBoard] = useForm({
        // _id: utilService.makeId(),
        title: '',
        visibility: '',
        style: { bgColor: "#26de81" },
        groups:[ {
            "id": "g101",
            "title": "Group 1",
            "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
        },
        {
            "id": "g102",
            "title": "Group 2",
            "archivedAt": 1589983468419,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
        }
    ]
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        const boardId = params.id
        if (!boardId) return
        boardService.getById(boardId)
            .then(board => {
                setBoard(board)
            })
            .catch(err => {
            })
    }, [])

    const onSaveBoard = (ev) => {
        ev.preventDefault()
        boardService.save({ ...board }).then(() => {
            navigate('/board')
        })
    }

    return (
        <section className='board-edit-container'>
            <h1>{board._id ? 'Edit' : 'Add'} board</h1>

            <form onSubmit={onSaveBoard}>
                <label htmlFor="title">title</label>
                <input ref={inputRef} value={board.title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="isPrivate">visibility</label>
                {/* <input value={board.visibility} onChange={handleChange} type="number" name="visibility" id="visibility" /> */}
                <select name="visibility" onChange={handleChange} type="select">
                    <option value="public" defaultValue>Public</option>
                    <option value="private">Private</option>
                </select>

                <button>Create</button>
            </form>

            {/* <form className="board-edit">
                <section>
                    <label htmlFor="name">Name</label>
                    <input {...register('name', 'text')} />
                </section>

                <section>
                    <label htmlFor="isPrivate">Is Private</label>
                    <input {...register('isPrivate', 'checkbox')} />
                </section>
                <button>Create</button>
            </form> */}

        </section>
    )
}
