import { useDispatch } from 'react-redux'
import { getImgUrl, getImgFromUrl } from '../store/board.actions'
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useFormRegister } from '../hooks/useFormRegister'
import { useState } from 'react'
import { utilService } from '../services/util.service'
import { useRef } from 'react'

export const AttachmentModal = ({ toggleAttachmentModal, attachModalPos }) => {
    const [url, setUrl] = useState(null)
    const [urlName, setUrlName] = useState(null)
    const [isLinkName, setIsLinkName] = useState(null)

    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null)


    const handleClick = event => {
        hiddenFileInput.current.click()
    }

    const onGetImgUrl = (ev) => {
        dispatch(getImgUrl(ev))
    }

    // const onUpdateInput = (inputJson) => {
    //     console.log(inputJson);
    // }

    const onUpdateUrl = (ev) => {
        if (!ev.target.value) {
            setIsLinkName(false)
            return
        }
        setIsLinkName(true)
        setUrl(ev.target.value)
    }

    const onUpdateName = (ev) => {
        setUrlName(ev.target.value)
    }

    const onGetImgFromUrl = (ev) => {
        ev.preventDefault()
        const imgJson = {
            id: utilService.makeId(),
            url,
            urlName,
            addedAt: new Date(),
        }
        dispatch(getImgFromUrl(imgJson))
    }

    // const [register, setUrl, url] = useFormRegister({}, onUpdateInput)

    return (
        <section className="attachment-modal" style={{ ...attachModalPos.style }}>
            <img src={closeIcon} onClick={toggleAttachmentModal} alt="close" className="close-btn" />
            {/* <div onClick={toggleAttachmentModal}>X</div> */}
            <div className="labels-modal-title">Attach from...</div>
            <button className='btn-computer' onClick={handleClick}>Computer</button>
            <input type="file"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={onGetImgUrl} />
            <form onSubmit={onGetImgFromUrl}>
                <label className="sub-title">Attach a link</label>
                <input className="link-input" type="text" /*ref={refInput}*/ placeholder="Paste any link here..." onChange={onUpdateUrl} />

                {isLinkName &&
                    <div className="link-name">
                        <span className="sub-title">Link name (optional)</span>
                        <input className="link-input" type="text" onChange={onUpdateName} />
                    </div>
                }

                <button className="btn-attach">Attach</button>
            </form>

        </section>
    )
}



// const FileUploader = ({onFileSelect}) => {
//     const fileInput = useRef(null)

//     const handleFileInput = (e) => {
//         // handle validations
//         onFileSelect(e.target.files[0])
//     }

//     return (
//         <div className="file-uploader">
//             <input type="file" onChange={handleFileInput}/>
//             <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"/>
//         </div>
//     )
// }