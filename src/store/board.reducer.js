const initialState = {
    boards: [],
    // cart: [],
    // lastRemovedBoard: null,
    filterby: null,
    board: null,
    task: null,
    boardMembers: [],
    resizeLabel: false
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var board
    var cart
    var resizeLabel
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SET_BOARD_MEMBERS':
            newState = { ...state, boardMembers: action.boardMembers }
            break
        case 'SET_TASK':
            newState = { ...state, task: action.task }
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
            console.log("board from action&&&", action.board)
            newState = { ...state, boards, board }
            break
        case 'ADD_TO_CART':
            newState = { ...state, cart: [...state.cart, action.board] }
            break
        case 'SET_FILTER_BY':
            newState = { ...state, filterby: [...state.filterby, action.filter] }
            break
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(board => board._id !== action.boardId)
            newState = { ...state, cart }
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemovedBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedBoard], lastRemovedBoard: null }
            }
            break

        case 'RESIZE_LABEL':
            // console.log('action.resizeLabel', action.resizeLabel)
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
