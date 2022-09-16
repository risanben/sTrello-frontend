import { HiOutlineStar } from 'react-icons/hi'
export const BoardHeader = ({ board }) => {

    return <section className="board-header">
        {board.title}
        <HiOutlineStar className='star' />

    </section>

}