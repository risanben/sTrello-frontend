import { useDispatch } from 'react-redux'
import closeIcon from '../../assets/img/icon-close-task-details.svg'
import { useState } from 'react'

// import { getImgFromUrl } from '../../store/board.actions'


export const AttachmentNameEditModal = ({ toggleEditAttachNameModal, attachmentId, task, onUpdateTask ,/*editAttachNameModalPos*/}) => {

    const [urlName, setUrlName] = useState(null)
    // const dispatch = useDispatch()

    const onUpdateName = (ev) => {
        setUrlName(ev.target.value)
    }

    const onGetImgFromUrl = (ev) => {
        ev.preventDefault()
        toggleEditAttachNameModal()

        const attachmentForUpdate = task.attachments.find(att => att.id === attachmentId)
        const updatedAtt = { ...attachmentForUpdate, urlName }
        const idx = task.attachments.findIndex(attach => attach.id === attachmentId)
        task.attachments.splice(idx, 1, updatedAtt)
        onUpdateTask(task)
    }

    return (
        <section className="labels-modal" /*style={{ ...editAttachNameModalPos.style }}*/>
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