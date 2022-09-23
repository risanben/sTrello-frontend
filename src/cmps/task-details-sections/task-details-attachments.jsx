import { GrAttachment } from "react-icons/gr"
import moment from 'moment'

export const TaskDetailsAttachments = ({ task, imgJson, onSetAttachment, currentBoardId, currentGroupId }) => {

    const getTime = (imgJson) => {
        return moment(imgJson.addedAt).fromNow()
    }

    return (
        <section className="attachment">
            <div className="attachment-title">
                <span className="icon"><GrAttachment /></span>
                <span className="ability">Attachment</span>
            </div>
            {task?.attachments.map(attachment => {
                return <div className="attachment-body" key={attachment.id}>
                    <img className="img-attached" src={`${attachment.url}`} />
                    <div className="attachment-details">
                        <span className="url-name">{attachment.urlName}.{attachment.fileFormat ? attachment.fileFormat : ''}</span>
                        <span className="Added-at">Added {getTime(attachment)}</span>
                        <span className="btn-delete-attachment" onClick={() => onSetAttachment(true, attachment.id, task, currentBoardId, currentGroupId)}>Delete</span>
                    </div>
                </div>
            })}
        </section>
    )
}
