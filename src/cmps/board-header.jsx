import { HiOutlineStar } from 'react-icons/hi'
export const BoardHeader = ({ board }) => {

    return <section className="board-header">
        {board.title}
        <div className='star-container'><HiOutlineStar className='star' /></div>

    </section>

}