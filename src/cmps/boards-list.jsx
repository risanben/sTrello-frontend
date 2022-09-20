import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"

export const BoardsList = ({ boards }) => {

    const _getBoardThumbnail = (board) => {
        if (board.style?.imgUrl) return <img src={board.style.imgUrl} className="thumbnail"></img>
        if (board.style?.bgColor) return <div style={{ backgroundColor: board.style.bgColor }} className="color-thumb"></div>
        else return <div style={{ backgroundColor: "grey" }} className="color-thumb"></div>
    }
    const navigate = useNavigate()

    const _getActiveLink = (id) => {
        const pathname = useLocation().pathname
        if (pathname.includes(id)) {
            return "active"
        } else {
            return ""
        }
    }

    const onlinkClick=(boardId)=>{
        
        navigate(`/board/${boardId}`)
    }

    return <ul className="boards-list">
        {boards.map(board => {
            return <section className='boards-link' key={board._id}>
                <li className={_getActiveLink(board._id)} onClick={()=>onlinkClick(board._id)}>
                    <span className='flex-left'>{_getBoardThumbnail(board)}{board.title}</span>
                </li>
            </section>
        })}
    </ul>
}