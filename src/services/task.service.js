
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveTask, getActionAddTask, getActionUpdateTask } from '../store/task.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'task'

const taskChannel = new BroadcastChannel('taskChannel')


    ; (() => {
        taskChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const taskService = {
    query,
    getById,
    save,
    remove,
    getEmptyTask,

}
window.cs = taskService


function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}
function getById(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
    // return axios.get(`/api/task/${taskId}`)

}
async function remove(taskId) {
    await storageService.remove(STORAGE_KEY, taskId)
    taskChannel.postMessage(getActionRemoveTask(taskId))
}
async function save(task) {
    var savedTask
    if (task._id) {
        savedTask = await storageService.put(STORAGE_KEY, task)
        taskChannel.postMessage(getActionUpdateTask(savedTask))

    } else {
        // Later, owner is set by the backend
        task.owner = userService.getLoggedinUser()
        savedTask = await storageService.post(STORAGE_KEY, task)
        taskChannel.postMessage(getActionAddTask(savedTask))
    }
    return savedTask
}

function getEmptyTask() {
    return {

        title: 'Help me',
        status: 'in-progress',
        description: 'description',

    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {_id:101, title: 'Help me 2', status:'in-progress',description: 'description'}).then(x => console.log(x))




