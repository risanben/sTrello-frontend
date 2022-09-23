import { useDispatch } from 'react-redux'
import closeIcon from '../../assets/img/icon-close-task-details.svg'
import { useState } from 'react'

// import { getImgFromUrl } from '../../store/board.actions'


export const AttachmentNameEditModal = ({ toggleEditAttachNameModal,attachment,task,onUpdateTask }) => {

    const [urlName, setUrlName] = useState(null)
    // const dispatch = useDispatch()

    const onUpdateName = (ev) => {
        setUrlName(ev.target.value)
    }

    const onGetImgFromUrl = (ev) => {
        ev.preventDefault()
        toggleEditAttachNameModal()
        const attachmentForUpdate = {...attachment,urlName}
        console.log('urlName',urlName);
        console.log('attachment',attachment);
        console.log('attachmentForUpdate',attachmentForUpdate);
        const updatedTask= task.attachments.map(attach => (attach.id === attachment.id) ? attachmentForUpdate : attach)
        console.log('task',updatedTask);
        onUpdateTask(updatedTask)
   
    }

    // const onUpdateTask = (taskForUpdate, activity = { "_id": "u999", "fullname": "Guset", "imgUrl": null }) => {
    //     if (!taskForUpdate) return
    //     dispatch(updateTask(currentBoardId, currentGroupId, taskForUpdate, activity))
    // }

    return (
        <section className="labels-modal" /*style={{ ...attachModalPos.style }}*/>
            <img src={closeIcon} onClick={toggleEditAttachNameModal} alt="close" className="close-btn" />
            <div className="labels-modal-title">Edit attachment</div>

            <form onSubmit={onGetImgFromUrl}>
                <label className="sub-title">Link name</label>
                <input type="text" onChange={onUpdateName} />
                <button>Update</button>
            </form>

        </section>
    )
}