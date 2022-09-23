const initialState = {
    boards: [],
    filterBy: null,
    board: null,
    task: null,
    resizeLabel: false,
    imgJson: '',
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var board
    var resizeLabel
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SET_TASK':
            newState = { ...state, task: action.task }
            break
        case 'SET_IMG_URL':
            newState = { ...state, imgJson: (action.imgJson) }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            board = { ...action.board }
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards, board }
            break

        case 'SET_FILTER_BY':
            newState = { ...state, filterBy: [...state.filterBy, action.filter] }
            break

        case 'RESIZE_LABEL':
            resizeLabel = action.resizeLabel
            newState = { ...state, resizeLabel }
            break
        default:
    }
    // For debug:
    window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)

    return newState

}
