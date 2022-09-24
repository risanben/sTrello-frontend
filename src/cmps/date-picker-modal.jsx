import { DatePicker } from "./date-picker"
import closeIcon from '../assets/img/icon-close-task-details.svg'
import { useState } from "react";


export const DatePickerModal = ({ onToggleDatePicker, task, onUpdateTask }) => {

    const [dateClicked, setDate] = useState(new Date());

    const onDayClick = (date) => {
        setDate(date)
    }

    const onUpdateDueDate = () => {
        console.log('dateClicked', dateClicked.getTime())
        task.dueDate = {
            date: dateClicked.getTime(),
            isDone: false,
            createdAt: Date.now()
        }
        onUpdateTask(task)
        onToggleDatePicker()
    }

    const onRemoveDueDate = () => {
        delete task.dueDate
        onUpdateTask(task)
        onToggleDatePicker()
    }

    return (
        <section className="date-picker-modal">
            <div className="date-picker-title-container">
                <div className="date-picker-title-content">
                    <h3 className="date-picker-title">Dates</h3>
                    {/* <div className="btn-close-date-picker" onClick={onToggleDatePicker}>X</div> */}
                    <img src={closeIcon} onClick={onToggleDatePicker} className="btn-close-date-picker" />

                </div>
                <hr className="date-picker-hr" />
            </div>
            <DatePicker onDayClick={onDayClick} dateClicked={dateClicked} />
            <div className="btn-date-container">
                <div className="btn-date-picker btn-save-date" onClick={onUpdateDueDate}>Save</div>
                <div className="btn-date-picker btn-remove-date" onClick={onRemoveDueDate}>Remove</div>
            </div>
        </section>
    )
}