import { useEffect } from "react"

export const TaskDetailsCoverModal = (props) => {
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
            <div className="cover-modal-title">
                <span>Cover</span>
                <span>X</span>
            </div>
            <input type="color" onChange={props.onSetColor} />

            <section>
                <ul className="cover-imgs">
                    {imgs.map(imgUrl =>
                        <li className="cover-img-container" >
                            {/* <span className="cover-img" style={{ backgroundImage: `url(${img})` }}></span> */}
                            <img className="cover-img" src={`${imgUrl}`} onClick={() => props.onSetImg(imgUrl)}></img>
                        </li>
                    )}
                </ul>
            </section>

        </section>
    )
}


