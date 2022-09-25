import { useSelector } from "react-redux"
import moment from 'moment'

export const ActivityMenu = ({ toggleBoardMenu }) => {

    const board = useSelector(state => state.boardModule.board)
    const { activities } = board

    const getTime = (activity) => {
        return moment(activity.createdAt).fromNow()
    }
    // console.log("activities", activities)

    return (
        <section className="activity-menu">

            <div className="activity-menu-container">

                <div className="menu-title-container">
                    <div className="menu-title-content">
                        <h3 className="menu-title">Menu</h3>
                        <div className="btn-close-add btn-close-menu" onClick={toggleBoardMenu}></div>
                    </div>
                    <hr className="menu-hr" />
                </div>

                <div className="main-content">

                    {/* <div className="archive-container">
                        <div className="archive-icon"></div>
                        <div className="archive-title">Archive</div>
                    </div>

                    <div className="board-background-container">
                        <div className="board-color-background"></div>
                        <div className="board-img-background"></div>
                    </div> */}

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
                </div>

            </div>
        </section >
    )
}