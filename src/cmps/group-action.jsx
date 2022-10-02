import { useState } from "react"
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { utilService } from "../services/util.service"
import { getVidUrl } from "../store/board.actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"


export const GroupActionModal = ({ group, leftPos, onOpenGroupAction, onDeleteGroup, addTask, setIsOpenGroupAction }) => {

    const [isVideoModalOpen, toggleVideoModal] = useState(false)
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true })
    const dispatch = useDispatch()

    const vidJson = useSelector(state => state.boardModule.vidJson)

    useEffect(() => {
        if (vidJson) addTaskVideo()
    }, [vidJson])


    const clickedModal = (ev) => {
        ev.stopPropagation()
    }

    const ontoggleVideoModal = () => {
        if (isVideoModalOpen) {
            toggleVideoModal(false)
        } else {
            toggleVideoModal(true)
        }
    }

    const onAddTaskVideo = () => {

        let ev = {
            target: {
                files: [mediaBlobUrl]
            }
        }
        dispatch(getVidUrl(ev))
    }

    const addTaskVideo = () => {
        console.log('addTaskVideo was activated')
        let task = {
            title: vidJson,
            id: utilService.makeId(),
            key: "video"
        }

        console.log('task:', task)
        // let task = {
        //     title: mediaBlobUrl,
        //     id: utilService.makeId(),
        //     key: "video"
        // }

        const groupToSave = { ...group }
        if (groupToSave?.tasks) groupToSave.tasks.push(task)
        else groupToSave.tasks = [task]
        const activity = {
            txt: 'added',
            groupTitle: ` to ${groupToSave.title}`,
            task: {
                id: task.id,
                title: task.title
            }
        }
        addTask(groupToSave, activity)
        toggleVideoModal(false)
        setIsOpenGroupAction(false)
    }



    return (
        <section className="group-action" style={{ left: leftPos }} onClick={clickedModal}>
            <div className="group-action-container">
                <div className="group-action-title">Actions</div>
                <div className="group-action-close" onClick={onOpenGroupAction}></div>
            </div>
            <div className="group-action-delete" onClick={() => onDeleteGroup(group)}>Delete</div>
            <div className="add-video" onClick={ontoggleVideoModal}>Add Video</div>


            {isVideoModalOpen && <section className="videoModal">
                <section>Status: {status}</section>
                <section className="btns-container">
                    <button onClick={startRecording} className="btn btn-start">Start</button>
                    <button onClick={stopRecording} className="btn btn-stop">Stop</button>
                    <button onClick={onAddTaskVideo} className="btn btn-post">Post as a card</button>
                </section>
                <video src={mediaBlobUrl} autoPlay controls></video>

            </section>}

        </section>
    )
}