
import { FaWindowMaximize } from 'react-icons/fa';
import { BsTagFill } from 'react-icons/bs';
import { HiUser } from 'react-icons/hi';
import { HiArchive } from 'react-icons/hi';
import { TaskLabel } from './task-label.jsx';
import { useState, useRef, useEffect } from 'react'
import { LabelModal } from './label-modal'
import { TaskMember } from './task-members.jsx';


export const TaskQuickEdit = ({ task, pos }) => {

  // console.log('pos.style:', pos.style)

  const [title, setTaskTitle] = useState(task.title)
  const [labelModal, setLabelModal] = useState(false)
  const refLabelModal = useRef(null)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
  }, [])

  const handleClickOutside = (e) => {
    if (!refLabelModal.current) return
    if (!refLabelModal.current.contains(e.target)) {
      //todo: close modal
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
    // console.log('task:', task)
  }

  const openLabelModal = () => {
    setLabelModal(true)
  }

  const onEditClick = (ev) => {
    ev.stopPropagation()
  }

  const _getTaskCoverStyle = (bg) => {
    // console.log('bg:', bg)
    if (bg.color) {
      return bg.color
    }

    return "red"

  }

// console.log('style:', style)
  return <section className="task-quick-edit" onClick={onEditClick} >
    {/* <div className="dark-screen"></div> */}
    <div className='left-col' style={{top:`${pos.top}`, left:`${pos.left}`}}>
      {task.style?.bg?.imgUrl && <div className='task-cover' style={{ backgroundImage: `url(${task.style.bg.imgUrl})`, height: "180px", backgroundSize: "cover" }}></div>}
      {task.style?.bg?.color && <div className='task-cover' style={{ background: _getTaskCoverStyle(task.style.bg), height: "32px"}}></div>}
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
      <li><FaWindowMaximize /> Open card</li>
      <li onClick={openLabelModal}><BsTagFill /> Edit labels</li>
      {labelModal && <section ref={refLabelModal}><LabelModal /></section>}
      <li><HiUser /> Change members</li>
      <li><HiArchive /> Archive</li>
    </ul>

  </section>

}