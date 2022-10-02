import { useEffect } from "react"
import { useState } from "react"
import { HiStar } from "react-icons/hi"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { BarChart } from "../cmps/dashboard-charts/bar-chart.jsx"
import { PieChart } from "../cmps/dashboard-charts/Pie-chart.jsx"
import { PolarChart } from "../cmps/dashboard-charts/polar-chart.jsx"
import { TaskMember } from "../cmps/task-members.jsx"
import { BiTask } from 'react-icons/bi'
import { BsListTask } from 'react-icons/bs'
import { MdSettings, MdOutlineDoneAll } from 'react-icons/md'
import { FcTodoList } from 'react-icons/fc'

export const Dashboard = ({ toggleDashboard }) => {

    const board = useSelector(state => state.boardModule.board)

    let [memberCount, setMemberCount] = useState(0)
    const [labelsValues, setLabelsValues] = useState([])
    const [labelsIds, setLabelsIds] = useState([])
    const [boardMembersIds, setBoardMembersIds] = useState([])
    const [memberTaskCount, setMemberTaskCount] = useState([])
    const [memberIds, setMemberIds] = useState([])
    const [gTaskCount, setTaskCount] = useState(0)
    const [gDoneCounter, setDoneCounter] = useState(0)
    // const [gGroupsTasksCount, setGgroupsTasksCount] = useState([])
    const [groupsTasksCount, setGroupsTasksCount] = useState([])

    useEffect(() => {
        getMembersIds()
        getTaskStat()
    }, [])

    const clickedOnModal = (ev) => {
        ev.stopPropagation()
    }

    const getMembersIds = () => {
        let idsArr = []
        board.members.forEach(mem => {
            idsArr.push(mem._id)
        })
        setMemberCount(idsArr.length)
        setBoardMembersIds(idsArr)
    }

    const getTaskStat = () => {
        let taskCount = 0
        let doneCounter = 0
        const labelsMap = {}
        const membersMap = {}
        // const groupsTasksCount = []
        // const groupsCount = board.groups.length
        // let taskCount = board.groups.reduce((acc, group) => acc + group.tasks.length)
        board.groups.map(group => {
            taskCount = taskCount + group.tasks.length
            if (group.title === 'Done') doneCounter = group.tasks.length
        })
        board.groups.map(group => {
            // groupsTasksCount.push(group.tasks.length)
            // console.log('groupsTasksCount', groupsTasksCount);
            setGroupsTasksCount(prevGroupsTasksCount => {
                // console.log('prevGroupsTasksCount', prevGroupsTasksCount);
                return [...prevGroupsTasksCount, group.tasks.length]
            })
            // setGroupsTasksCount(prevGroupsTasksCount => ({ groupsTasksCount: [...prevGroupsTasksCount, group.tasks.length] }))
            group.tasks.map(task => {
                if (task.labelIds) {
                    task.labelIds.forEach(label => {
                        const labelId = label
                        if (!labelsMap[labelId]) labelsMap[labelId] = 1
                        else labelsMap[labelId] = labelsMap[labelId] + 1
                    })
                }
                if (task.memberIds) {
                    task.memberIds.forEach(member => {
                        const memberId = member
                        if (!membersMap[memberId]) membersMap[memberId] = 1
                        else membersMap[memberId] = membersMap[memberId] + 1
                    })
                }
            })
        })
        ///for pie chart
        setLabelsValues(Object.values(labelsMap))
        setLabelsIds(Object.keys(labelsMap))
        ///for bar chart
        setMemberTaskCount(Object.values(membersMap))
        setMemberIds(Object.keys(membersMap))
        ///for polar chart
        console.log('groupsTasksCount', groupsTasksCount);
        // groupsTasksCount.map(taskCount=>setGgroupsTasksCount([...gGroupsTasksCount,taskCount]))

        setTaskCount(taskCount)
        setDoneCounter(doneCounter)
    }

    if (!board || !board.groups || board.groups === 0) return <div>No statistics yet</div>
    return (
        <section className="dashboard" >
            <div className="black-screen" onClick={toggleDashboard}>
                <div className="dashboard-container" onClick={clickedOnModal}>
                    <section className="dashboard-title">
                        {board.title}
                        {board.isStarred && <div className="star-marked"><HiStar /></div>}
                    </section>
                    <section className="dashboard-subtitle">
                        <span>Created by: </span> {board.createdBy.fullname}
                    </section>

                    <div className="board-info">

                        <div className="board-members" >
                            <div className="board-members-count">{memberCount} <span>Board members</span></div>
                            <div className="board-members-imgs"> <TaskMember memberIds={boardMembersIds} /></div>
                        </div>

                        <div className="task-stat">
                            <span className="left">
                                <div className="counter">
                                    <BiTask /><span className="txt">{gTaskCount} tasks</span>
                                </div>
                                <hr ></hr>
                                <div className="counter"><BsListTask /> <span className="txt"> In {board.groups.length} lists</span> </div>
                            </span>
                        </div>

                        <div className="task-stat-right">
                            <span className="right">
                                <div className="counter">
                                    <MdSettings /><span className="txt"> {gTaskCount - gDoneCounter} Tasks in process</span>
                                </div>
                                <hr class="rounded"></hr>
                                <div className="counter"><MdOutlineDoneAll /><span className="txt"> {gDoneCounter} Tasks completed</span> </div>
                            </span>
                        </div>

                    </div>
                    <div className="charts-row-container">
                        <div className="chart-container">
                            <h3 className="dashboard-subtitle">Tasks by labels</h3>
                            <PieChart labelsIds={labelsIds} labelsValues={labelsValues} />
                        </div>
                        <div className="chart-container">
                            <h3 className="dashboard-subtitle">Load distribution per team mate</h3>
                            < BarChart boardMembers={board.members} memberIds={memberIds} memberTaskCount={memberTaskCount} />
                        </div>
                        <div className="chart-container">
                            <h3 className="dashboard-subtitle">Load distribution per list</h3>
                            <PolarChart groupsArr={board.groups} board={board} groupsTasksCount={groupsTasksCount} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

