import { taskService } from "../services/task.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveTask(taskId) {
    return {
        type: 'REMOVE_TASK',
        taskId
    }
}
export function getActionAddTask(task) {
    return {
        type: 'ADD_TASK',
        task
    }
}
export function getActionUpdateTask(task) {
    return {
        type: 'UPDATE_TASK',
        task
    }
}

export function loadTasks() {
    return async (dispatch) => {
        try {
            const tasks = await taskService.query()
            console.log('tasks from DB:', tasks)
            dispatch({
                type: 'SET_TASKS',
                tasks
            })

        } catch (err) {
            showErrorMsg('Cannot load tasks')
            console.log('Cannot load tasks', err)
        }
    }
}

export function removeTask(taskId) {
    return async (dispatch) => {
        try {
            await taskService.remove(taskId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveTask(taskId))
            showSuccessMsg('task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
            console.log('Cannot remove task', err)
        }
    }
}

export function addTask(task) {
    return (dispatch) => {

        taskService.save(task)
            .then(savedTask => {
                console.log('Added task', savedTask);
                dispatch(getActionAddTask(savedTask))
                showSuccessMsg('task added')
            })
            .catch(err => {
                showErrorMsg('Cannot add task')
                console.log('Cannot add task', err)
            })
    }
}

export function updateTask(task) {
    return (dispatch) => {
        taskService.save(task)
            .then(savedTask => {
                console.log('Updated task:', savedTask);
                dispatch(getActionUpdateTask(savedTask))
                showSuccessMsg('task updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update task')
                console.log('Cannot save task', err)
            })
    }
}





// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemovetaskOptimistic(taskId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_task',
            taskId
        })
        showSuccessMsg('task removed')

        taskService.remove(taskId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove task')
                console.log('Cannot load tasks', err)
                dispatch({
                    type: 'UNDO_REMOVE_task',
                })
            })
    }
}