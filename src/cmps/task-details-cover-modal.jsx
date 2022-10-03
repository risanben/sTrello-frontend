import { useEffect, useState } from "react"
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { boardService } from "../services/board.service"

export const TaskDetailsCoverModal = ({ onSetImg, onShowModal, onSetColor, onRemoveCover, attachments }) => {

    const [backgroundImages, setBackgroundImages] = useState([])
    const [backgroundColors, setBackgroundColors] = useState([])
    // const [bg, setBg] = useState(null)

    useEffect(() => {
        loadBackGround()
    }, [])

    const loadBackGround = () => {
        setBackgroundImages(boardService.getTaskBackground('url'))
        setBackgroundColors(boardService.getTaskBackground('color'))
    }

    return (
        <section className="cover-modal">
            <img src={closeIcon} onClick={onShowModal} alt="close" className="close-btn" />
            <div className="cover-modal-title">Cover</div>
            <button className="btn-remove" onClick={onRemoveCover}>Remove cover</button>

            <section>
                <span className="sub-title">Colors</span>
                <ul className="cover-color">
                    {backgroundColors.map(color =>
                        <li className="cover-color-container" key={color}>
                            <div onClick={() => onSetColor(color)} className="cover-color" style={{ backgroundColor: color }} />
                        </li>
                    )}
                </ul>
            </section>

            {attachments?.length > 0 &&
                <section>
                    <span className="sub-title">Attachments</span>
                    <ul className="cover-imgs">
                        {attachments.map(attach =>
                            <li className="cover-img-container" key={attach.id}>
                                <img className="cover-img" alt="cover-img" src={`${attach.url}`} onClick={() => onSetImg(attach.url)}></img>
                            </li>
                        )}
                    </ul>
                </section>
            }

            <section>
                <span className="sub-title">Photos</span>
                <ul className="cover-imgs">
                    {backgroundImages.map(imgUrl =>
                        <li className="cover-img-container" key={imgUrl}>
                            <img className="cover-img" src={`${imgUrl}`} onClick={() => onSetImg(imgUrl)}></img>
                        </li>
                    )}
                </ul>
            </section>

        </section>
    )
}


