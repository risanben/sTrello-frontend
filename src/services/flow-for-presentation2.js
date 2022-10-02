///frontend- task-details-activities.jsx:
///1. user Writing a comment on a task
///2. dispatch to board.action.js, function updateBoard
///3. the comment saved in board.activities arr in the stor object

const onSaveComment = () => {
    const user = userService.getLoggedinUser()
    const activity = {
        txt: textAreaContent,
        byMember: user,
        task: { id: task.id, title: task.title },
        type: 'comment'
    }
    setTextAreaContent('')
    dispatch(updateBoard(board, activity))
}

///frontend-board.action.js:
///1.function updateBoard 
///2. the updated comment saved in stor object in board.activities arr
///3. the board sent to baekend to save in DB

export function updateBoard(board, activity) {
    
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board, activity)
            return dispatch(getActionUpdateBoard(savedBoard))
        } catch (err) {
            console.log('Cannot save board', err)
        }
    }
}

///backend- board controller
///1. updateBoard function
///2. Every change in every board goes here
///3. line 47 we have web socket- broadcasts to all users connected to the application except the user who sent the update
///4. when there is no user connected we assign as gust 
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
    socketService.on(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate);
    return () => {
        socketService.off(SOCKET_EVENT_BOARD_UPDATE, onBoardUpdate)
    }
}, [])

const onBoardUpdate = (newBoard) => {
    dispatch(getActionUpdateBoard(newBoard))
}



/////////////////////////////////////////////////////////////////////////////////////////



    const board = useSelector(state => state.boardModule.board)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MEMBER, goToSetMember);
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MEMBER, goToSetMember)
        }
    }, [])

    const goToSetMember=(memberObj)=>{
        onSetMember(memberObj)
    } 

    const sendMsg = (addOrRemove, memberId, fullname) => {
       const memberObj={addOrRemove, memberId, fullname}
        socketService.emit(SOCKET_EMIT_MEMBER, (memberObj))
    }



    const getMemberName = (memberId) => {
        const member = board.members.find(member => member._id === memberId)

        const fullname = member.fullname.split(' ')
        let initials = fullname[0][0]
        if (fullname.length >= 2) {
            initials += fullname[1][0]
        }

        if (member.imgUrl) {
            return (
                <section className="member-details">
                    <div className="member-img-container">
                        <div style={{
                            backgroundImage: `url(${member.imgUrl})`,
                            backgroundSize: "cover",
                            height: "28px",
                            width: "28px",
                            borderRadius: "50%"
                        }}></div>
                    </div>
                    <div className="member-fullname">{member.fullname}</div>
                </section>
            )
        }

        return (
            <section className="member-details">
                <div className="member-initials-container">
                    <div className="member-initials">{initials}</div>
                    <div className="member-fullname">{member.fullname}</div>
                </div>
            </section>
        )
    }

    const checkTaskMember = (memberId) => {
        if (!memberIds) return
        const checkedMember = memberIds.find(member => member === memberId)
        if (checkedMember) return true
        return false
    }
    

    if (!board.members) return <div>No board members found</div>
    return (
        <div className="board-member-container">
            {board.members.map(member => {
                return <div className="member"
                    key={member._id}
                    // onClick={() => onSetMember(checkTaskMember(member._id), member._id, member.fullname)}>
                    onClick={() => sendMsg(checkTaskMember(member._id), member._id, member.fullname)}>
                    {getMemberName(member._id)}
                    {checkTaskMember(member._id) && <span className="isMember">✔</span>}
                </div>
            })}
        </div>
    )
