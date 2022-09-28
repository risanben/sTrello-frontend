import { useEffect, useState } from "react"
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { boardService } from "../services/board.service"

export const TaskDetailsCoverModal = ({ onSetImg, onShowModal, onSetColor, onRemoveCover, attachments }) => {

    const [backgroundImages, setBackgroundImages] = useState([])
    const [backgroundColors, setBackgroundColors] = useState([])
    const [bg, setBg] = useState(null)

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
            {/* <input type="color" onChange={changeColor} /> */}
{/* 
            <div>
                <div className="cover-modal-img-preview" style={{ backgroundImage: "url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/128x192/ce85f4faa89d899a3c325bba8bc49655/photo-1663583513676-9f6361cd859d.jpg)" }}></div>
                 linearGradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)) 
                <div className="lower-background-preview">
                    <div className="two-text-strips-module">
                        <div className="upper-strip" style={{ backgroundColor: 'rgb(207, 211, 218)' }}></div>
                    </div>
                    <div className="lower strip" style={{ backgroundColor: 'rgb(207, 211, 218)' }}></div>
                    <div></div>
                </div>
            </div> */}

            <button className="btn-remove" onClick={onRemoveCover}>Remove cover</button>

            <section>
                <span className="sub-title">Colors</span>
                <ul className="cover-color">
                    {/* {colors.map(color => */}
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
                                <img className="cover-img" src={`${attach.url}`} onClick={() => onSetImg(attach.url)}></img>
                            </li>
                        )}
                    </ul>
                </section>
            }

            <section>
                <span className="sub-title">Photos</span>
                <ul className="cover-imgs">
                    {/* {imgs.map(imgUrl => */}
                    {backgroundImages.map(imgUrl =>
                        <li className="cover-img-container" key={imgUrl}>
                            {/* <span className="cover-img" style={{ backgroundImage: `url(${img})` }}></span> */}
                            <img className="cover-img" src={`${imgUrl}`} onClick={() => onSetImg(imgUrl)}></img>
                        </li>
                    )}
                </ul>
            </section>

        </section>
    )
}


