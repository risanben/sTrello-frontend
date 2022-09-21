import { NavLink, Link, useNavigate } from 'react-router-dom'

export const SearchResult = ({ results, setResults, setIsSearching }) => {


    const _getBoardThumbnail=(board)=>{
        if (board.style?.imgUrl) return <img src={board.style.imgUrl} className="thumbnail"></img>
        if (board.style?.bgColor) return <div style={{backgroundColor:board.style.bgColor}} className="color-thumb"></div>
     else return <div style={{backgroundColor:"grey"}} className="color-thumb"></div>
    }

    const onLinkClicked=()=>{
        setResults(null)
        setIsSearching(false)
    }
    
    return <section className="search-result">
        <header>BOARDS</header>
        <ul>
            {!results.length && <li>No match found</li>}
            {results.map(board => {
                return <Link to={`board/${board._id}`} className='boards-link' key={board._id} onClick={onLinkClicked}>
                    <li>
                        <span className='flex-left'>{_getBoardThumbnail(board)}{board.title}</span>
                        <span className='flex-middle'></span>
                        <span className='flex-end'>sTrello Workspace</span>
                    </li>
                </Link>
            })}
        </ul>
    </section>
}


// return <Link to={`board/${board._id}`} className='boards-link' key={board._id}><li>
//                     {board.title}
//                 </li>
//                 </Link>
//             })}