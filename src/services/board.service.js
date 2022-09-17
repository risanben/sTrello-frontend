
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
    // updateTask,
    getTaskById
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
        throw err
    }
}
async function getById(boardId) {
    try {
        return await storageService.get(STORAGE_KEY, boardId)
    }
    catch (err) {
        throw err
    }
    // return axios.get(`/api/board/${boardId}`)

}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    boardChannel.postMessage(getActionRemoveBoard(boardId))
}
async function save(board) {
    console.log('board from service ################', board)
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))

    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
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
        // console.log('board', board);
        return board.groups.find(group => group.id === groupId)
    }
    catch (err) {
        throw err
    }
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const group = await getGroupById(boardId, groupId)
        console.log('group', group);
        const task=group.tasks.find(task => task.id === taskId)
        console.log('task', task);
        return task

    } catch (err) {
        throw err
    }
}

// async function updateTask(boardId, groupId, taskForUpdate) {
//     try {
//         console.log(boardId, groupId, taskForUpdate);
//         const group = await getGroupById(boardId, groupId)
//         const board = await getById(boardId)
//         // const taskForUpdate= group.tasks.find(task => task.id === taskId)
//         const idx = group.tasks.findIndex(task => task.id === taskForUpdate.id)
//         group.tasks.splice(idx, 1, taskForUpdate)
//         console.log('group', group);
//         // save(board)
//         await dispatch(updateBoard(board))
//         // return board
//     } catch (err) {
//         throw err
//     }
// }



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




