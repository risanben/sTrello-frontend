import { HiOutlineStar } from 'react-icons/hi'
export const BoardHeader = ({ board }) => {
    // console.log('board:', board)


    return <section className="board-header">
        {board.title}
        <HiOutlineStar className='star' />

    </section>

}