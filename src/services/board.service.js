
// import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard, updateBoard } from '../store/board.actions.js'
import { socketService, SOCKET_EVENT_BOARD_UPDATE } from '../services/socket.service.js'
import { store } from '../store/store'
import { httpService } from './http.service'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'board'

const boardChannel = new BroadcastChannel('boardChannel')

    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

// ; (() => {


// socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
// showSuccessMsg(`New review about me ${review.txt}`)
// })
// })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getGroupById,
    getTaskById,
    removeGroupFromBoard,
    getBackground,
    addChecklist,
    addTodo,
    addGroupToBoard,
    getTaskBackground,
    getLabelsColors,
    getBoardBackgrounds,
    getGuestUser
}
window.cs = boardService

const BASE_URL = `board/`

async function query(filterBy) {
    try {

        let boards = httpService.get(BASE_URL, { params: filterBy })
        // let boards = await storageService.query(STORAGE_KEY)
        if (filterBy?.title) {
            boards = boards.filter(b => b.title.toLowerCase().includes(filterBy.title.toLowerCase()))
        }

        return boards
    } catch (err) {
        console.log('Cannot complete the function query:', err)
        throw err
    }
}
async function getById(boardId) {
    try {
        // console.log('boardId', boardId)
        return await httpService.get(BASE_URL + boardId, boardId)
        // return await storageService.get(STORAGE_KEY, boardId)
    }
    catch (err) {
        console.log('Cannot complete the function getById:', err)
        throw err
    }
    // return axios.get(`/api/board/${boardId}`)

}

async function remove(boardId) {
    try {
        return await httpService.delete(BASE_URL + boardId)
        // await storageService.remove(STORAGE_KEY, boardId)
        boardChannel.postMessage(getActionRemoveBoard(boardId))
    }
    catch (err) {
        console.log('Cannot complete the function remove:', err)
        throw err
    }
}

async function addGroupToBoard(boardId, group, activity) {
    try {
        let boardToUpdate = await getById(boardId)
        if (boardToUpdate?.groups) boardToUpdate.groups.push({ ...group })
        else boardToUpdate.groups = [group]
        return await save(boardToUpdate, activity)
    } catch (err) {
        console.log('Cannot complete the function addGroupToBoard:', err)
        throw err
    }
}
async function removeGroupFromBoard(boardId, groupId, activity) {
    try {
        let boardToUpdate = await getById(boardId)
        boardToUpdate.groups = boardToUpdate.groups.filter(group => group.id !== groupId)
        return await save(boardToUpdate, activity)
    } catch (err) {
        console.log('Cannot complete the function removeGroup:', err)
        throw err
    }
}

async function save(board, activity = null) {

    var savedBoard
    if (activity) _addActivityDetails(activity)
    if (board._id) {
        console.log('board.activities-board service', board.activities);
        if (activity) board.activities.unshift(activity)
        savedBoard = await httpService.put(BASE_URL + board._id, board)
        // savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        if (activity) board.activities = [activity]
        // savedBoard._id = utilService.makeId()
        savedBoard = await httpService.post(BASE_URL, board)
        savedBoard.isStarred = false
        const user = userService.getLoggedinUser()
        if (user) {
            savedBoard.createdBy = {
                _id: user._id,
                fullname: user.fullname,
                // imgUrl: user.imgUrl
            }
        } else {
            savedBoard.createdBy = {
                _id: user._id,
                fullname: user.fullname,
                // imgUrl: user.imgUrl
            }
        }
        // savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

async function getGroupById(boardId, groupId) {
    try {
        const board = await httpService.get(BASE_URL + boardId)
        // const board = await storageService.get(STORAGE_KEY, boardId)
        return board.groups.find(group => group.id === groupId)
    }
    catch (err) {
        console.log('Cannot complete the function getGroupById:', err)
        throw err
    }
}

function _addActivityDetails(activity) {
    activity.id = utilService.makeId()
    activity.createdAt = Date.now()
    if (!activity.byMember) {
        const user = userService.getLoggedinUser()
        console.log('activity', activity);
        // if (activity.byMember) return activity
        if (user) {
            activity.byMember = {
                _id: user._id,
                fullname: user.fullname,
                imgUrl: user.imgUrl || "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
            }
        } else {
            activity.byMember = {
                _id: "u199",
                fullname: "Guest",
                imgUrl: "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
            }
        }
    }
    return activity
}

function getGuestUser() {
    return ({
        _id: "u199",
        fullname: "Guest",
        imgUrl: "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
    })
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task

    } catch (err) {
        console.log('Cannot complete the function getTaskById:', err)
        throw err
    }
}

async function addTodo(boardId, groupId, taskId, checklistId, title) {
    const todoToAdd = {
        id: utilService.makeId(),
        title,
        isDone: false,
    }

    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
        const checklistIdx = board.groups[groupIdx].tasks[taskIdx].checklists.findIndex(
            checklist => checklist.id === checklistId
        )
        board.groups[groupIdx].tasks[taskIdx].checklists[checklistIdx].todos.push(todoToAdd)
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add todo, Heres why:', err)
    }
}

async function addChecklist(boardId, groupId, taskObj, title) {
    const newChecklist = {
        id: utilService.makeId(),
        title,
        todos: [],
    }
    try {
        const board = await getById(boardId)
        const groupIdx = board.groups.findIndex(group => group.id === groupId)
        const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskObj.id)

        if (board.groups[groupIdx].tasks[taskIdx]?.checklists) {
            board.groups[groupIdx].tasks[taskIdx].checklists.push(newChecklist)
        } else {
            board.groups[groupIdx].tasks[taskIdx].checklists = [newChecklist]
        }
        save(board)
        return board
    } catch (err) {
        console.log('Cannot add checklist', err)
    }
}

function getBackground(type) {
    if (type === 'url') {
        return [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197071/pawel-czerwinski-lKEvGdP0Oig-unsplash_xhxxbf.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187242/karsten-winegeart-j5z0DZMWViU-unsplash_yyaw6e.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187022/maxim-berg-Tba7ds4aF_k-unsplash_1_woirqi.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196414/ian-dooley-DJ7bWa-Gwks-unsplash_hr2qyq.jpg'
            // "https://images.unsplash.com/photo-1663447000721-93a6d5bc71db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            // "https://images.unsplash.com/photo-1663138763894-0cc4a5421dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            // "https://images.unsplash.com/photo-1663104192417-6804188a9a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            // "https://images.unsplash.com/photo-1663121679412-9eeff30ef817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400"
        ]
    } else if (type === 'color') {
        return ["#0079bf", "#d29034", "#519839", "#b04632", "#89609e"]
    }
}

function getTaskBackground(type) {
    if (type === 'url') {
        return [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348742/background-img-mountains_kqtnuv.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348746/background-img-fog_qkibl9.jpg',
            'https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY2MzM0ODI4OQ&ixlib=rb-1.2.1&q=80&w=200',
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x365/0eba7de903143c66f2ac55cdb0b7de58/photo-1662943523548-373718f22124.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg'
        ]
    } else if (type === 'color') {
        return [
            '#7BC86C',//green
            '#F5DD29',//yellow
            '#FFAF3F',//orange
            '#EF7564',//red
            '#CD8DE5',//purple
            '#5BA4CF',//accent-blue
            '#29CCE5',//accent-teal
            '#6DECA9',//light-green
            '#FF8ED4',//pink
            '#172B4D',//accent-gray
        ]
    }
}

function getLabelsColors(type) {

    return [
        '#D6ECD2', '#FAF3C0', '#FCE6C6', '#F5D3CE', '#EDDBF4',
        '#B7DDB0', '#F5EA92', '#FAD29C', '#EFB3AB', '#DFC0EB',
        '#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5',
        '#5BA4CF',//accent-blue
        '#29CCE5',//accent-teal
        '#6DECA9',//light-green
        '#FF8ED4',//pink
        '#172B4D',//accent-gray
    ]
}
function getBoardBackgrounds() {
    return {
        colors: [
            '#0079bf', '#d29034', '#519839', '#b04632',
            '#89609e', '#cd5a91', '#4bbf6b', '#00aecc',
            '#838c91'
        ],
        imgsUrl: [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197071/pawel-czerwinski-lKEvGdP0Oig-unsplash_xhxxbf.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664186705/rrvviiii-EVEHo6gWzSM-unsplash_jqec7i.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187242/karsten-winegeart-j5z0DZMWViU-unsplash_yyaw6e.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196200/alexander-sinn-KgLtFCgfC28-unsplash_viu9fl.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664187022/maxim-berg-Tba7ds4aF_k-unsplash_1_woirqi.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196311/ian-dooley-DuBNA1QMpPA-unsplash_cpw29l.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196414/ian-dooley-DJ7bWa-Gwks-unsplash_hr2qyq.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664196528/jeremy-thomas-O6N9RV2rzX8-unsplash_ndcnyj.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664197377/ash-from-modern-afflatus-NQ6Lh81BTRs-unsplash_qoe8no.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664382696/katie-smith-uQs1802D0CQ-unsplash_dwxpri.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664382882/john-price-FE7ATjzRRMs-unsplash_cznmhq.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664689530/frank-mckenna-OD9EOzfSOh0-unsplash_eyotjy.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664692449/kyle-glenn-_AR74EoWdy0-unsplash_rhf2nb.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664698270/amy-shamblen-pJ_DCj9KswI-unsplash_dpiduu.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699079/raphael-biscaldi-7RQf2X6aXXI-unsplash_k6crnk.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664699491/ana-frantz-Pg6YGIJ97lw-unsplash_aj7dr4.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664704915/kelly-sikkema-IZOAOjvwhaM-unsplash_m2ivzg.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1664708145/sigmund-eTgMFFzroGc-unsplash_hg0wdj.jpg']
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




