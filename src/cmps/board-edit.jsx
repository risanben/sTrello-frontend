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
        // visibility: '',
        style: {
            bgColor: null,
            imgUrl: boardService.getBackground('url')[0]
        }
        // groups: [{
        //     "id": "g101",
        //     "title": "Group 1",
        //     "archivedAt": 1589983468418,
        //     "tasks": [
        //         {
        //             "id": "c101",
        //             "title": "Replace logo"
        //         },
        //         {
        //             "id": "c102",
        //             "title": "Add Samples"
        //         }
        //     ],
        // },
        // {
        //     "id": "g102",
        //     "title": "Group 2",
        //     "archivedAt": 1589983468419,
        //     "tasks": [
        //         {
        //             "id": "c101",
        //             "title": "Replace logo"
        //         },
        //         {
        //             "id": "c102",
        //             "title": "Add Samples"
        //         }
        //     ],
        // }
        // ]
    })

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
        // const boardId = params.id
        // if (!boardId) return
        // boardService.getById(boardId)
        //     .then(board => {
        //         setBoard(board)
        //     })
        //     .catch(err => {
        //     })
    }, [])

    const onSaveBoard = (ev) => {
        ev.preventDefault()
        boardService.save({ ...board }).then(() => {
            navigate('/board')
        })
    }

    const getBackground = (type) => {
        const imgUrl = boardService.getBackground(type)
        return imgUrl
    }

    const setBoardBackground = (type, background) => {
        const boardToUpdate = board
        if (type === 'url') {
            boardToUpdate.style.imgUrl = background
            boardToUpdate.style.bgColor = null
        }
        else if (type === 'color') {
            boardToUpdate.style.bgColor = background
            boardToUpdate.style.imgUrl = null
        }
        setBoard({ ...boardToUpdate })
    }
    const checkIsSelected = (background) => {
        if (board.style.imgUrl === background || board.style.bgColor === background) {
            return true
        }
    }

    const getCoverBackground = () => {
        let style = {}
        if (board.style.imgUrl) {
            style.backgroundImage = `url(${board.style.imgUrl})`
        }
        else if (board.style.bgColor) {
            style.backgroundColor = board.style.bgColor
        }
        return style
    }

    return (
        <section className="add-board">
            <div className="add-board-title-container">
                <div className="add-board-title">Create board</div>
            </div>

            <div className="scroll-container">

                <div className="cover-display-container">
                    {/* <div className="cover-display" style={{ backgroundImage: `url(${board.style.imgUrl})` }}> */}
                    <div className="cover-display" style={getCoverBackground()}>
                        <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
                        {/* <img src={board.style.imgUrl} /> */}
                    </div>
                </div>

                <div className="background-picker-container">
                    <div className="background-picker-label-container">
                        <label>Background</label>
                    </div>
                    <div className="background-picker">
                        <ul className="image-picker">
                            {getBackground("url").map(imgUrl => {
                                return <li key={imgUrl}>
                                    <button
                                        style={{ backgroundImage: `url(${imgUrl})` }}
                                        onClick={() => setBoardBackground('url', imgUrl)}>
                                        {checkIsSelected(imgUrl) &&
                                            <span className="marked" style={{ backgroundColor: "#091e4233" }}>v</span>}
                                        {!checkIsSelected(imgUrl) &&
                                            <span className="marked" style={{ backgroundColor: "#091e4233" }}>v</span>}
                                    </button>
                                </li>
                            })}
                        </ul>
                        <ul className="color-picker">
                            {getBackground("color").map(color => {
                                return <li key={color}>
                                    <button
                                        style={{ backgroundColor: color }}
                                        onClick={() => setBoardBackground('color', color)}>
                                        {checkIsSelected(color) &&
                                            <span className="marked" style={{ backgroundColor: "#091e4233" }}>v</span>}
                                    </button>
                                </li>
                            })}
                            <li>
                                <button style={{ backgroundColor: "#091e420a" }}>
                                    <span className="full-color-picker"></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <form onSubmit={onSaveBoard}>
                    <div className="title-label-container">
                        <label htmlFor="title">Board title<span>*</span></label>
                    </div>
                    <input
                        ref={inputRef}
                        value={board.title}
                        onChange={handleChange}
                        type="text"
                        name="title"
                        id="title"
                        required />
                    {!board.title && <div className="user-msg-container">
                        <span>👋</span>
                        <p>Board title is required</p>
                    </div>}
                    {/* <label htmlFor="isPrivate">visibility</label> */}
                    {/* <input value={board.visibility} onChange={handleChange} type="number" name="visibility" id="visibility" /> */}
                    {/* <select name="visibility" onChange={handleChange} type="select">
                        <option value="public" defaultValue>Public</option>
                        <option value="private">Private</option>
                    </select> */}
                    <button className={"btn-create-board " + (board.title ? "btn-enabled" : "btn-disabled")}>Create</button>
                </form>

            </div>

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

        </section >
    )
}
