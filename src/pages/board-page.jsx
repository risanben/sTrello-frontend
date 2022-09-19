import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBoards, removeBoard, addToBoard } from '../store/board.actions'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { useState } from 'react'
import { BoardEdit } from '../cmps/board-edit'
import { HiOutlineStar } from 'react-icons/hi';


export function BoardPage() {
    const boards = useSelector(state => state.boardModule.boards)
    const [isModalNewBoard, setIsModalNewBoard] = useState(false)
    const [starredBoards, setStarredBoards] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        onLoad()
        // dispatch(loadBoards())
        // setStarredBoards(boards.filter(board => board.isStarred))

    }, [])

    const onLoad = async () => {
        try {
            await dispatch(loadBoards())
            filterBaordsByStarred()
        } catch (err) {
            console.log('Cannot load boards', err)
        }
    }

    const onRemoveBoard = (boardId) => {
        removeBoard(boardId)
    }

    const onAddToBoard = (board) => {
        addToBoard(board)
        showSuccessMsg('Added to Board')
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

    const filterBaordsByStarred = () => {
        setStarredBoards(boards.filter(board => board.isStarred))
        return starredBoards
    }

    if (!boards) return <div>Loading...</div>
    // console.log('boards', boards)
    return (
        <div className="board-page">
            <div className="board-list-conatiner">
                {starredBoards[0] && <div className="baord-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Starred boards</h3>
                </div>}
                <ul className="board-list">

                    {starredBoards.map(board =>
                        <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoradBg(board)}>
                                <div className="baord-preview-content">
                                    <div className="board-title">{board.title}</div>
                                </div>
                            </li>
                        </Link>)}
                </ul>
            </div>

            <div className="board-list-conatiner">
                <div className="baord-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Your boards</h3>
                </div>
                <ul className="board-list">
                    {boards.map(board =>
                        <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoradBg(board)}>
                                <div className="baord-preview-content">
                                    <div className="board-title">{board.title}</div>
                                    {/* <div className="star"><HiOutlineStar /></div> */}
                                </div>
                            </li>
                        </Link>)}

                    <li className="board-preview" onClick={toggleCreateBoardModal}>
                        <div className="baord-preview-content">
                            <div className="board-title create-new">Create new board</div>
                        </div>
                    </li>
                </ul>
            </div>
            {isModalNewBoard && <BoardEdit toggleCreateBoardModal={toggleCreateBoardModal} />}
        </div >
    )
}
