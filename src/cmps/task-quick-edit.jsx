
import { FaWindowMaximize } from 'react-icons/fa'
import { BsTagFill } from 'react-icons/bs'
import { HiUser } from 'react-icons/hi'
import { HiArchive } from 'react-icons/hi'
import { TaskLabel } from './task-label.jsx'
import { useState, useRef, useEffect } from 'react'
import { LabelModal } from './label-modal'
import { TaskMember } from './task-members.jsx'
import { Link } from 'react-router-dom'


export const TaskQuickEdit = ({ task, pos, toggaleQuickEdit }) => {

  const [title, setTaskTitle] = useState(task.title)
  const [labelModal, setLabelModal] = useState(false)
  const refLabelModal = useRef(null)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
  }, [])

  const handleClickOutside = (e) => {
    if (!refLabelModal.current) return
    if (!refLabelModal.current.contains(e.target)) {
      setLabelModal(false)
    }
  }

  const handleChange = (ev) => {
    setTaskTitle(ev.target.value)
  }

  const onEditTaskTitle = (ev) => {
    ev.preventDefault()
    const taskToSave = {
      ...task
    }
    task.title = title
  }

  const openLabelModal = () => {
    setLabelModal(true)
  }

  const onEditClick = (ev) => {
    ev.stopPropagation()
  }


  return <section className="task-quick-edit" onClick={onEditClick} style={{...pos.style}}>
    <div className='left-col' style={{width: pos.position.width}}>
      {task.style?.bg?.imgUrl && <div className='task-cover' style={{backgroundImage: `url(${task.style.bg.imgUrl})`, height:"180px", backgroundSize:"cover",width:`${pos.width}px`}}></div>}
      {task.style?.bg?.color && <div className='task-cover' style={{background:`${task.style.bg.color}`, height:"32px",width:`${pos.width}px`}}></div>}
      <div className='input-side'>
        <section className='labels'>
          {task?.labelIds && <TaskLabel labelIds={task.labelIds} />}
        </section>
        <form onSubmit={onEditTaskTitle}>
          <input type="text" value={title} onChange={handleChange} />
        </form>
        {task.memberIds && <TaskMember memberIds={task.memberIds} />}
      </div>
      <button className='btn-add'>Save</button>
    </div>
    <ul className="quick-edit-actions">
      <li onClick={toggaleQuickEdit}><FaWindowMaximize /> Open card</li>
      <li onClick={openLabelModal}><BsTagFill /> Edit labels</li>
      {labelModal && <section ref={refLabelModal}><LabelModal /></section>}
      <li><HiUser /> Change members</li>
      <li><HiArchive /> Archive</li>
    </ul>
  </section>

}