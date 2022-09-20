import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBoards, updateBoard } from '../store/board.actions'
import { useState } from 'react'
import { BoardEdit } from '../cmps/board-edit'
import { HiOutlineStar, HiStar } from 'react-icons/hi'


export function BoardPage() {
    const boards = useSelector(state => state.boardModule.boards)
    const [isModalNewBoard, setIsModalNewBoard] = useState(false)
    // const [starredBoards, setStarredBoards] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        onLoad()
    }, [])


    const onLoad = () => {
        try {
            dispatch(loadBoards())
                .then((boards1) => {
                    // filterBoardsByStarred()
                    console.log('boards', boards)
                })
            console.log('after diapatch')
        } catch (err) {
            console.log('Cannot load boards', err)
        }
    }

    const getBoradBg = (board) => {
        let style = {}
        if (board.style?.imgUrl) {
            style = {
                backgroundImage: `url(${board.style.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "50%"
            }
        } else style = { backgroundColor: board.style.bgColor }
        return style
    }

    const toggleCreateBoardModal = () => {
        setIsModalNewBoard(!isModalNewBoard)
    }

    const filterBoardsByStarred = () => {
        return boards.filter(board => board.isStarred)
    }

    const toggleStarredBoard = async (ev, board) => {
        ev.preventDefault()
        ev.stopPropagation()
        board.isStarred = !board.isStarred
        await dispatch(updateBoard(board))
        // filterBoardsByStarred()
    }

    if (!boards) {
        // console.log('lal')
        return <div>Loading...</div>
    }
    // console.log('render BOARD PAGE', boards)
    return (
        <div className="board-page">
            <div className="board-list-conatiner">
                {filterBoardsByStarred()[0] && <div className="baord-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Starred boards</h3>
                </div>}
                <ul className="board-list">

                    {filterBoardsByStarred().map(board => {
                        return <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoradBg(board)}>
                                <div className="baord-preview-content">
                                    <div className="board-title">{board.title}</div>
                                    <div className="star marked"
                                        onClick={(ev) => toggleStarredBoard(ev, board)}>
                                        <HiStar />
                                    </div>
                                </div>
                            </li>
                        </Link>
                    })}
                </ul>
            </div>

            <div className="board-list-conatiner">
                <div className="baord-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Your boards</h3>
                </div>
                <ul className="board-list">
                    {boards.map(board => {
                        return <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoradBg(board)}>
                                <div className="baord-preview-content">
                                    <div className="board-title">{board.title}</div>
                                    {board.isStarred &&
                                        <div
                                            className="star marked"
                                            onClick={(ev) => toggleStarredBoard(ev, board)}>
                                            <HiStar />
                                        </div>}
                                    {!board.isStarred &&
                                        <div
                                            className="star"
                                            onClick={(ev) => toggleStarredBoard(ev, board)}>
                                            <HiOutlineStar />
                                        </div>}
                                </div>
                            </li>
                        </Link>
                    })}

                    <li className="board-preview" onClick={toggleCreateBoardModal}>
                        <div className="baord-preview-content full">
                            <div className="board-title create-new"><span>Create new board</span></div>
                        </div>
                    </li>
                </ul>
            </div>
            {isModalNewBoard && <BoardEdit toggleCreateBoardModal={toggleCreateBoardModal} />}
        </div >
    )
}
