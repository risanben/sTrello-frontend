import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import { HiArchive } from "react-icons/hi"
import { removeBoard } from "../store/board.actions"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { BoardBackgroundMenu } from "./board-background-menu"
import { RiArrowLeftSLine } from 'react-icons/ri'

export const ActivityMenu = ({ toggleBoardMenu }) => {

    const board = useSelector(state => state.boardModule.board)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isBackgroundMoadl, setIsBackgroundMoadl] = useState(false)
    const [isBackgroundMenuOpen, setIsBackgroundMenuOpen] = useState(false)
    const [backgroundTypeMenu, bsetBckgroundTypeMenu] = useState('')
    const { activities } = board

    const getTime = (activity) => {
        return moment(activity.createdAt).fromNow()
    }
    // console.log("activities", activities)
    const onRemoveBoard = () => {
        dispatch(removeBoard(board._id))
        navigate('/board')
    }

    const toggleBackgoundModal = () => {
        setIsBackgroundMoadl(!isBackgroundMoadl)
    }

    const onBackgroundMenu = (type) => {
        setIsBackgroundMenuOpen(!isBackgroundMenuOpen)
        bsetBckgroundTypeMenu(type)
    }


    return (
        <section className="activity-menu">

            <div className="activity-menu-container">

                <div className="menu-title-container">
                    <div className="menu-title-content">
                        {isBackgroundMenuOpen && <div className="btn-back" onClick={onBackgroundMenu}><RiArrowLeftSLine /></div>}
                        <h3 className="menu-title">{isBackgroundMenuOpen ? 'Change background' : 'Menu'}</h3>
                        <div className="btn-close-add btn-close-menu" onClick={toggleBoardMenu}></div>
                    </div>
                    <hr className="menu-hr" />
                </div>

                {!isBackgroundMenuOpen && <div className="main-content">
                    <div className="board-background-container">
                        <div className="background-title-container" onClick={toggleBackgoundModal}>

                            {board.style?.imgUrl && <img src={board.style.imgUrl} className="board-background-img" />}
                            {board.style?.bgColor && <div className="board-background-img" style={{ backgroundColor: board.style.bgColor }}></div>}
                            <h3 className="background-title">Change background</h3>
                        </div>
                        {isBackgroundMoadl && <div className="backgrounds-content">
                            <div className="board-img-background-container">
                                <div className="board-select-background img-background" onClick={() => onBackgroundMenu('img')}></div>
                                <div className="board-img-title">Photos</div>
                            </div>
                            <div className="board-color-background-container" onClick={() => onBackgroundMenu('color')}>
                                <div className="board-select-background color-background"></div>
                                <div className="board-color-title">Colors</div>
                            </div>

                        </div>}
                    </div>
                    <hr className="menu-hr" />
                    <div className="archive-container" onClick={onRemoveBoard}>
                        <div className="archive-icon"><HiArchive /></div>
                        <h3 className="archive-title">Delete board</h3>
                    </div>
                    <hr className="menu-hr" />


                    <div className="activity-container">
                        <div className="activity-title-container">
                            <div className="activity-icon"></div>
                            <div className="activity-title">Activity</div>
                        </div>

                        <div className="activities-content">
                            {activities && activities.map(activity => {
                                return <div key={activity.id} className="activity-container">
                                    <div className="user-icon" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>

                                    <div className="activity-content">
                                        <span className="user-name">{activity.byMember.fullname} </span>
                                        <span className="activity-action">{activity.txt} </span>
                                        <span className="activity-task-title">{activity.task.title}</span>
                                        {activity?.groupTitle && <span className="activity-group-title">{activity.groupTitle} </span>}
                                        <div className="activity-time"> {getTime(activity)}</div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>}
                {isBackgroundMenuOpen && <BoardBackgroundMenu board={board} type={backgroundTypeMenu} />}
            </div>
        </section >
    )
}