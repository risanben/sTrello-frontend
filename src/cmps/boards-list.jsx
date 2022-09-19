import { Link, useLocation } from "react-router-dom"

export const BoardsList = ({ boards }) => {

    const _getBoardThumbnail = (board) => {
        if (board.style?.imgUrl) return <img src={board.style.imgUrl} className="thumbnail"></img>
        if (board.style?.bgColor) return <div style={{ backgroundColor: board.style.bgColor }} className="color-thumb"></div>
        else return <div style={{ backgroundColor: "grey" }} className="color-thumb"></div>
    }

    const _getActiveLink = (id) => {
        const pathname = useLocation().pathname
        if (pathname.includes(id)) {
            return "active"
        } else {
            return ""
        }
    }

    return <ul className="boards-list">
        {boards.map(board => {
            return <Link to={`board/${board._id}`} className='boards-link' key={board._id}>
                <li className={_getActiveLink(board._id)}>
                    <span className='flex-left'>{_getBoardThumbnail(board)}{board.title}</span>
                </li>
            </Link>
        })}
    </ul>
}