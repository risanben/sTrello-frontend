import { boardService } from "../services/board.service.js"
import { userService } from "../services/user.service.js"
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

export function loadBoards(filterBY = {}) {
    return async (dispatch) => {
        try {
            const boards = await boardService.query(filterBY)
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
            const updatedBoard = await boardService.getById(boardId)
            // console.log('board', updatedBoard);
            const { board } = dispatch({
                type: 'SET_BOARD',
                board: updatedBoard
            })
            return board
        } catch (err) {
            // console.log('Cannot load board', err)
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

export function removeGroup(boardId, groupId) {
    return async (dispatch) => {
        try {
            const updateBoard = await boardService.removeGroup(boardId, groupId)
            console.log('board after delete group', updateBoard)
            console.log('Deleted Succesfully!');
            return dispatch(getActionUpdateBoard(updateBoard))
        } catch (err) {
            console.log('Cannot remove board', err)
        }
    }
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            console.log('Added Board', savedBoard);
            return dispatch(getActionAddBoard(savedBoard)).board
        } catch (err) {
            console.log('Cannot add board', err)
        }
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
    // console.log('board action updateTask');
    return async (dispatch) => {
        try {
            const groupForUpdate = await boardService.getGroupById(boardId, groupId)
            const board = await boardService.getById(boardId)

            const idx = groupForUpdate.tasks.findIndex(task => task.id === taskForUpdate.id)
            groupForUpdate.tasks.splice(idx, 1, taskForUpdate)

            const groupIdx = board.groups.findIndex(group => group.id === groupForUpdate.id)
            board.groups.splice(groupIdx, 1, groupForUpdate)

            // console.log('board to save in store', board);
            // save(board)
            await dispatch(updateBoard(board))
            return board
        } catch (err) {
            throw err
        }
    }
}

export function removeTask(boardId, groupId, taskForUpdate) {
    return async (dispatch) => {
        try {
            // console.log(boardId, groupId, taskForUpdate);
            const groupForUpdate = await boardService.getGroupById(boardId, groupId)
            const board = await boardService.getById(boardId)

            const idx = groupForUpdate.tasks.findIndex(task => task.id === taskForUpdate.id)
            groupForUpdate.tasks.splice(idx, 1)

            const groupIdx = board.groups.findIndex(group => group.id === groupForUpdate.id)
            board.groups.splice(groupIdx, 1, groupForUpdate)

            // console.log('board to save in store', board);
            // save(board)
            await dispatch(updateBoard(board))
            return board
        } catch (err) {
            throw err
        }
    }
}

export function getTask(boardId, groupId, taskId) {
    return async (dispatch) => {
        try {
            const updatedTask = await boardService.getTaskById(boardId, groupId, taskId)
            // console.log('updatedTask', updatedTask);
            const { task } = dispatch({
                type: 'SET_TASK',
                task: updatedTask
            })
            // console.log('task', task);
            return task
        } catch (err) {
            console.log('Cannot load task', err)
        }
    }
}

export function resizeLabel(resizeLabel) {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'RESIZE_LABEL',
                resizeLabel
            })
        } catch (err) {
            console.log('Cannot resize label', err)

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
                // console.log('Server Reported - Deleted Succesfully');
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


export function handleDrag(
    board,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
) {
    return async dispatch => {
        if (type === 'group') {
            // remove group from origin
            const group = board.groups.splice(droppableIndexStart, 1)
            // put group in new place
            board.groups.splice(droppableIndexEnd, 0, ...group)
        } else {
            // task within same group
            if (droppableIdStart === droppableIdEnd) {
                const group = board.groups.find(group => group.id === droppableIdStart)
                const task = group.tasks.splice(droppableIndexStart, 1)
                group.tasks.splice(droppableIndexEnd, 0, ...task)
            } else {
                // tasks in diff groups
                const groupStart = board.groups.find(group => group.id === droppableIdStart)

                // remove task from origin
                const task = groupStart.tasks.splice(droppableIndexStart, 1)

                // find destination group
                const groupEnd = board.groups.find(group => group.id === droppableIdEnd)

                // insert task in group
                groupEnd.tasks.splice(droppableIndexEnd, 0, ...task)
            }
            // }
        }
        const boardToUpdate = await boardService.save(board)

        dispatch({
            type: 'UPDATE_BOARD',
            board: boardToUpdate,
        })
    }
}