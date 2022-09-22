import { useDispatch } from 'react-redux'
import { getImgUrl } from '../store/board.actions'

export const AttachmentModal = ({ toggleAttachmentModal }) => {

    const dispatch = useDispatch()

    const onGetImgUrl = (ev) => {
        dispatch(getImgUrl(ev))
    }

    return (
        <section className="members-modal">
            <div onClick={toggleAttachmentModal}>X</div>
            <div className="members-modal-title">Attach from...</div>
            <span>Computer</span>
            <label>Computer
                <input onChange={(event) => onGetImgUrl(event)} type="file" />
            </label>

            <span>Strello</span>
            <span>Google Drive</span>
            <span>Dropbox</span>

            <span className="sub-title">Attach a link</span>
            <input type="text" placeholder="Paste any link here..." />


        </section>
    )
}