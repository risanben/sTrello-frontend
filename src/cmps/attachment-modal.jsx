import { useDispatch } from 'react-redux'
import { getImgUrl, getImgFromUrl } from '../store/board.actions'
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useFormRegister } from '../hooks/useFormRegister'
import { useState } from 'react'
import { utilService } from '../services/util.service'


export const AttachmentModal = ({ toggleAttachmentModal,attachModalPos }) => {
    const [url, setUrl] = useState(null)
    const [urlName, setUrlName] = useState(null)

    const dispatch = useDispatch()


    const onGetImgUrl = (ev) => {
        dispatch(getImgUrl(ev))
    }

    // const onUpdateInput = (inputJson) => {
    //     console.log(inputJson);
    // }

    const onUpdateUrl = (ev) => {
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
        <section className="labels-modal" style={{ ...attachModalPos.style }}>
            <img src={closeIcon} onClick={toggleAttachmentModal} alt="close" className="close-btn" />
            {/* <div onClick={toggleAttachmentModal}>X</div> */}
            <div className="labels-modal-title">Attach from...</div>
            <label>Computer
                {/* <input onChange={(event) => onGetImgUrl(event)} type="file" /> */}
                {/* <input onChange={(event) => onGetImgUrl(event)} type="file" /> */}
                {/* <input type={"file"} onChange={onGetImgUrl} /> */}
                <input type="file" onChange={onGetImgUrl} />
            </label>

            <form onSubmit={onGetImgFromUrl}>
                <label className="sub-title">Attach a link</label>
                <input type="text" /*ref={refInput}*/ placeholder="Paste any link here..." onChange={onUpdateUrl} />
                <span className="sub-title">Link name (optional)</span>
                <input type="text" onChange={onUpdateName} />
                {/* <input {...register('name', 'text')} /> */}
                <button /*onClick={onGetImgFromUrl}*/>Attach</button>
            </form>

        </section>
    )
}