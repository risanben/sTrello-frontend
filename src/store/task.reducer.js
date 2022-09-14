const initialState = {
    tasks: [],
    lastRemovedTask: null
}
export function taskReducer(state = initialState, action) {
    var newState = state
    var tasks
    switch (action.type) {
        case 'SET_TASKS':
            newState = { ...state, tasks: action.tasks }
            break
        case 'REMOVE_TASK':
            const lastRemovedTask = state.tasks.find(task => task._id === action.taskId)
            tasks = state.tasks.filter(task => task._id !== action.taskId)
            newState = { ...state, tasks, lastRemovedTask}
            break
        case 'ADD_TASK':
            newState = { ...state, tasks:[...state.tasks, action.task]}
            break
        case 'UPDATE_TASK':
            tasks = state.tasks.map(task => (task._id === action.task._id)? action.task : task)
            newState = { ...state, tasks}
            break
      
        case 'UNDO_REMOVE_TASK':
            if (state.lastRemovedTask) {
                newState = { ...state, tasks: [...state.tasks, state.lastRemovedTask], lastRemovedTask: null}
            }
            break
        default:
    }
    // For debug:
    window.taskState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
