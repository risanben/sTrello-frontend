import { HiOutlineStar } from 'react-icons/hi'
import { TaskMember } from './task-members'
import memberSvg from '../assets/img/add-mem.svg'
export const BoardHeader = ({ board }) => {


    const getMembersIds = () => {
        let idsArr = []
        board.members.forEach(mem => {
            idsArr.push(mem._id)
        })
        return idsArr
    }

    if (!board) return <section>Loading...</section>
    return <section className="board-header">
        {board.title}
        <div className='star-container'><HiOutlineStar className='star' /></div>
       <section className='space'>
       </section>
        
        <section className='flex-end-side'>
            <section className='members'>
                {board.members?.length && <TaskMember memberIds={getMembersIds()} />}
            </section>
            <button className='btn-add'><img className='mem-svg' src={memberSvg}/> Share</button>
        </section>

    </section>

}