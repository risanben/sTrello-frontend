import { useSelector } from "react-redux"
import { TaskMember } from "./task-members"
import moment from 'moment'



export const ActivityList = ({ task }) => {

    const board = useSelector(state => state.boardModule.board)
    if (!board.activities) return <section></section>

    const taskActivities = board.activities.filter(activity => activity.task.id === task.id)
    if (!taskActivities.length) return <section></section>

    const getTime = (activity) => {
        return moment(activity.createdAt).fromNow()
    }

    return <section>
        {taskActivities.map(activity => {
            return <section className="activity-list" key={activity.id}>
                <div className="user-icon" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>

                <div className="activity-content">
                    <span className="user-name">{activity.byMember.fullname} </span>
                    <span className="activity-action">{activity.txt} </span>
                    <span className="activity-task-title">{activity.task.title}</span>
                    {activity?.groupTitle && <span className="activity-group-title">{activity.groupTitle} </span>}
                    <div className="activity-time"> {getTime(activity)}</div>
                </div>

            </section>
        })}
    </section>
}