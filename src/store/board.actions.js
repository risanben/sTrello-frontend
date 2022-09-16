import { boardService } from "../services/board.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            console.log('Boards from DB:', boards)
            dispatch({
                type: 'SET_BOARDS',
                boards
            })

        } catch (err) {
            showErrorMsg('Cannot load boards')
            console.log('Cannot load boards', err)
        }
    }
}

export function getBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            console.log('board', board);
            return dispatch({
                type: 'SET_BOARD',
                board: board
            })
        } catch (err) {
            console.log('Cannot load board', err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveBoard(boardId))
            showSuccessMsg('Board removed')
        } catch (err) {
            showErrorMsg('Cannot remove board')
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return (dispatch) => {

        boardService.save(board)
            .then(savedBoard => {
                console.log('Added Board', savedBoard);
                dispatch(getActionAddBoard(savedBoard))
                showSuccessMsg('Board added')
            })
            .catch(err => {
                showErrorMsg('Cannot add board')
                console.log('Cannot add board', err)
            })
    }
}

export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            showSuccessMsg('Board updated')
            return dispatch(getActionUpdateBoard(savedBoard))
        } catch (err) {
            showErrorMsg('Cannot update board')
            console.log('Cannot save board', err)
        }
        // boardService.save(board)
        //     .then(savedBoard => {
        //         console.log('Updated Board:', savedBoard);
        //         dispatch(getActionUpdateBoard(savedBoard))
        //         showSuccessMsg('Board updated')
        //         return savedBoard
        //     })
        //     .catch(err => {
        //         showErrorMsg('Cannot update board')
        //         console.log('Cannot save board', err)
        //     })
    }
}

export function addToBoard(board) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            board
        })
    }
}
export function removeFromBoard(boardId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            boardId
        })
    }
}
export function checkout() {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.boardModule.boardt.reduce((acc, board) => acc + board.price, 0)
            const score = await userService.changeScore(-total)
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
            showSuccessMsg('Charged you: $' + total.toLocaleString())
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('BoardActions: err in checkout', err)
        }
    }
}

/*------------------------------------------------------------------------------*/
export function updateTask(boardId, groupId, taskForUpdate) {
    console.log('board action updateTask ');
    return async (dispatch) => {
        try {
            console.log(boardId, groupId, taskForUpdate);
            const groupForUpdate = await boardService.getGroupById(boardId, groupId)
            const board = await boardService.getById(boardId)

            const idx = groupForUpdate.tasks.findIndex(task => task.id === taskForUpdate.id)
            groupForUpdate.tasks.splice(idx, 1, taskForUpdate)

            const groupIdx = board.groups.findIndex(group => group.id === groupForUpdate.id)
            board.groups.splice(idx, 1, groupForUpdate)

            console.log('board to save in store', board);
            // save(board)
            await dispatch(updateBoard(board))
            // return board
        } catch (err) {
            throw err
        }
    }
}
/*------------------------------------------------------------------------------*/


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_BOARD',
            boardId
        })
        showSuccessMsg('Board removed')

        boardService.remove(boardId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove board')
                console.log('Cannot load boards', err)
                dispatch({
                    type: 'UNDO_REMOVE_BOARD',
                })
            })
    }
}