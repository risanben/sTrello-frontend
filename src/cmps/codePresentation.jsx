// this function in the front is listening to an event "chat-add-msg"
useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, onSaveComment);
    return () => {
        socketService.off(SOCKET_EVENT_ADD_MSG, onSaveComment)
    }
}, [])


// this function activates when the user send a message
const sendMsg = () => {
    socketService.emit(SOCKET_EMIT_SEND_MSG, (textAreaContent))
    setTextAreaContent('')
}


// this function in the backend fires an event to all users who are currently use the app.
socket.on('chat-send-msg', msg => {
    logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.myTopic}`)
    gIo.emit('chat-add-msg', msg)
})

// this function is activated at all user's browsers who registered for the event 
const onSaveComment = (newMsg) => {

    const activity = {
        txt: newMsg,
        task: { id: task.id, title: task.title },
        type: 'comment'
    }
    dispatch(updateBoard(board, activity))
}
