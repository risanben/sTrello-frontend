import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { addChecklist } from '../store/board.actions';



export const ChecklistModal = ({ toggleChecklistModal, pos, boardId, groupId, task }) => {

    const dispatch = useDispatch()
    

    const onAddChecklist = (ev) => {
        ev.preventDefault()
        if (!ev.target.checklistTitle.value) return
        const title = ev.target.checklistTitle.value
        toggleChecklistModal()
        dispatch(addChecklist(boardId, groupId, task, title))

    }


    console.log('pos:', pos)
    return (
        <section className="checklist-modal" style={{ ...pos }}>
            <section className="header">
                Add checklist
                <img src={closeIcon} onClick={toggleChecklistModal} alt="close" className="close-btn" />
            </section>
            <section className='main'>
                <section className='title'>
                    Title
                </section>

                <form onSubmit={onAddChecklist}>
                    <label htmlFor="checklistTitle">
                        <input type="text" placeholder="Checklist" name="checklistTitle" className="checklist-search-input" />
                    </label>
                    <section className='btn-add'>Add</section>
                </form>

            </section>
        </section>
    )
}