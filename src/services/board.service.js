
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'board'

const boardChannel = new BroadcastChannel('boardChannel')

    ; (() => {
        boardChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getGroupById,
    getTaskById,
    removeGroup,
    getBackground,
    addChecklist,
    addTodo
}
window.cs = boardService


async function query(filterBy) {
    try {

        let boards = await storageService.query(STORAGE_KEY)
        if (filterBy?.title) {
            boards = boards.filter(b => b.title.toLowerCase().includes(filterBy.title.toLowerCase()))
        }

        return boards
    } catch (err) {
        console.log('Cannot complete the function:', err)
        throw err
    }
}
async function getById(boardId) {
    try {
        return await storageService.get(STORAGE_KEY, boardId)
    }
    catch (err) {
        console.log('Cannot complete the function:', err)
        throw err
    }
    // return axios.get(`/api/board/${boardId}`)

}

async function remove(boardId) {
    try {
        await storageService.remove(STORAGE_KEY, boardId)
        boardChannel.postMessage(getActionRemoveBoard(boardId))
    }
    catch (err) {
        console.log('Cannot complete the function:', err)
        throw err
    }
}

async function removeGroup(boardId, groupId) {
    try {
        let boardToUpdate = await getById(boardId)
        // console.log('boardToUpdate', boardToUpdate)
        boardToUpdate.groups = boardToUpdate.groups.filter(group => group.id !== groupId)
        return await save(boardToUpdate)
    } catch (err) {
        console.log('Cannot complete the function:', err)
        throw err
    }
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
    } else {
        // Later, owner is set by the backend
        // console.log('new board')
        // board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
        boardChannel.postMessage(getActionAddBoard(savedBoard))
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        _id: utilService.makeId(),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}

async function getGroupById(boardId, groupId) {
    try {
        const board = await storageService.get(STORAGE_KEY, boardId)
        return board.groups.find(group => group.id === groupId)
    }
    catch (err) {
        console.log('Cannot complete the function:', err)
        throw err
    }
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        const task = group.tasks.find(task => task.id === taskId)
        return task

    } catch (err) {
        console.log('Cannot complete the function:', err)
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
        console.log('Cannot add todo,Heres why:', err)
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

        if ( board.groups[groupIdx].tasks[taskIdx]?.checklists){
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
            "https://images.unsplash.com/photo-1663447000721-93a6d5bc71db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            "https://images.unsplash.com/photo-1663138763894-0cc4a5421dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            "https://images.unsplash.com/photo-1663104192417-6804188a9a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400",
            "https://images.unsplash.com/photo-1663121679412-9eeff30ef817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjYzNTA2ODA5&ixlib=rb-1.2.1&q=80&w=400"
        ]
    } else if (type === 'color') {
        return ["#0079bf", "#d29034", "#519839", "#b04632", "#89609e"]
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




