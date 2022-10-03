///frontend- board.jsx:
///1. user makes changes to the board like dnd
///2. call-back function activated(onEnd)
///3. dispatch to board.action.js, function handleDrag
const onEnd = result => {
    const { destination, source, type } = result
    if (!destination) return
    dispatch(
        handleDrag(board, source.droppableId, destination.droppableId, source.index, destination.index, type)
    )
}


return (
    <React.Fragment>
        <section className='board-container' style={getBoradBg()}>
            <SideMenu
                isSideBarOpen={isSideBarOpen}
                toggleMenu={toggleMenu} />

            <DragDropContext onDragEnd={onEnd}>
                <section className="board" >
                    {/* <section className="board" style={getBoradBg()}> */}
                    <BoardHeader
                        board={board} />
                    <GroupList board={board} />
                </section>
            </DragDropContext>
        </section>
    </React.Fragment>
)

///frontend-board.action.js:
///1.function handleDrag 
///2.Performs the exchange according to the selected place
///3. A save is made to the store and an updated board is sent to save in the backend

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
        }
        try {
            const boardToUpdate = await boardService.save(board)
            dispatch({
                type: 'UPDATE_BOARD',
                board: boardToUpdate,
            })
        } catch (err) {
            console.log('Cannot update board', err)
        }
    }
}

///backend- board controller
///1. updateBoard function
///2. Every change in every board goes here
///3. line 96 we have web socket- broadcasts to all users connected to the application except the user who sent the update

async function updateBoard(req, res) {
    var loggedinUser = authService.validateToken(req.cookies.loginToken)

    try {
        const board = req.body
        const updatedBoard = await boardService.update(board)

        socketService.broadcast({ type: 'board-update', data: board, userId: loggedinUser._id })

        res.send(updatedBoard)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update board' })
    }
}

///frontend-board.jsx
///Back to the board component there is a board change event listener 
///which is activated every time the component goes up and stopped when it goes down
///As soon as a notification is received about a change in the board, it is re-rendered to receive real-time changes
useEffect(() => {
    socketService.on(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)
    return () => {
        socketService.off(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)
    }
}, [])

const onBoardUpdate = (newBoard) => {
    dispatch(getActionUpdateBoard(newBoard))
}
