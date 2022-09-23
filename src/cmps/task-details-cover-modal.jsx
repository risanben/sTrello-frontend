import { useEffect } from "react"
import closeIcon from '../assets/img/icon-close-task-details.svg'

export const TaskDetailsCoverModal = ({ onSetImg, onShowModal,onSetColor }) => {
    const colors =
        [
            '#7BC86C',//green
            '#F5DD29',//yellow
            '#FFAF3F',//orange
            '#EF7564',//red
            '#CD8DE5',//purple
            '#5BA4CF',//accent-blue
            '#29CCE5',//accent-teal
            '#6DECA9',//light-green
            '#FF8ED4',//pink
            '#172B4D',//accent-gray
        ]

    const imgs =
        [
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348742/background-img-mountains_kqtnuv.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348746/background-img-fog_qkibl9.jpg',
            'https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY2MzM0ODI4OQ&ixlib=rb-1.2.1&q=80&w=200',
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x365/0eba7de903143c66f2ac55cdb0b7de58/photo-1662943523548-373718f22124.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg',
            'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg'
        ]

    // useEffect(() => {
    //     loadImgs()
    // }, [])

    // const loadImgs = async () => {
    //     try {
    //         imgs=await dispatch(getImgs())
    //     } catch (err) {
    //         throw err
    //     }
    // }

    return (
        <section className="cover-modal">
            <img src={closeIcon} onClick={onShowModal} alt="close" className="close-btn" />
            <div className="cover-modal-title">Cover</div>
            {/* <input type="color" onChange={changeColor} /> */}

            <section>
                <span className="sub-title">Colors</span>
                <ul className="cover-imgs">
                    {colors.map(color =>
                        <li className="cover-img-container" key={color}>
                            <div onClick={()=>onSetColor({color})} className="cover-img" style={{ backgroundColor:  color }}/>
                        </li>
                    )}
                </ul>
            </section>

            <section>
            <span className="sub-title">Photos</span>
                <ul className="cover-imgs">
                    {imgs.map(imgUrl =>
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


