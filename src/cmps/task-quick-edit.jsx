
import { FaWindowMaximize } from 'react-icons/fa';
import { BsTagFill } from 'react-icons/bs';
import { HiUser } from 'react-icons/hi';
import { HiArchive } from 'react-icons/hi';
import { TaskLabel } from './task-label.jsx';


export const TaskQuickEdit = ({ task }) => {
  console.log('task:', task)
  const onChangeTitle = (ev) => {
    const taskToSave = {
      ...task
    }
    task.title = ev.target.value
  }

  const onChangeLabels = () => {

  }


  return <section className="task-quick-edit">
    <div className='left-col'>
      <div className='input-side'>
        <section className='labels'>
          {task.labelIds && <TaskLabel labelIds={task.labelIds} />}
        </section>
        <input type="text" placeholder={task.title} onChange={onChangeTitle} />
      </div>
      <button className='btn-add'>Save</button>
    </div>
    <ul className="quick-edit-actions">
      <li><FaWindowMaximize /> Open card</li>
      <li><BsTagFill /> Edit labels</li>
      <li><HiUser /> Change members</li>
      <li><HiArchive /> Archive</li>
    </ul>

    <div className="dark-screen"></div>
  </section>

}