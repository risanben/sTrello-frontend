import { NavLink, Link } from 'react-router-dom'

export const SearchResult = ({ boards }) => {

    return <section className="search-result">
        <header>BOARDS</header>
        <ul>
            {!boards.length && <li>No match found</li>}
            {boards.map(board => {
                return <Link to={`board/${board._id}`} className='boards-link' key={board._id}><li>
                    {board.title}
                </li>
                </Link>
            })}
        </ul>
    </section>
}