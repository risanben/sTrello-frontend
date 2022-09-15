
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
    saveGroup,
}
window.cs = boardService


async function query(filterBy) {
    try {
        
        let boards = await storageService.query(STORAGE_KEY)
        if (filterBy?.title){
            boards = boards.filter(b=>b.title.toLowerCase().includes(filterBy.title.toLowerCase()))
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


async function saveGroup(group) {
    var savedGroup
    if (group.id) {
        savedGroup = await storageService.put('group', group)
        // boardChannel.postMessage(getActionUpdateBoard(savedGroup))

    } else {
        savedGroup = await storageService.post('group', group)
        // boardChannel.postMessage(getActionAddBoard(savedGroup))
    }
    return savedGroup
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




