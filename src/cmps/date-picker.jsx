import { useState } from "react"
import Calendar from 'react-calendar';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

export function DatePicker({ dateClicked, onDayClick }) {

    const [value, onChange] = useState(new Date());


    const handleDayColors = ({ date }) => {
        let tileClassName = "day-view "
        if (dateClicked.getMonth() === date.getMonth()) {
            tileClassName += "curr-month-day "
        }
        if (dateClicked.getDate() === date.getDate() &&
            dateClicked.getMonth() === date.getMonth()) {
            tileClassName += "clicked "
        }

        return tileClassName
    }

    return (
        <div className="date-picker">
            <Calendar
                onChange={onChange}
                value={value}
                calendarType="US"
                defaultView="month"
                locale="en-US"
                maxDetail="month"
                minDetail="month"
                nextLabel={<RiArrowRightSLine />}
                prevLabel={<RiArrowLeftSLine />}
                next2Label=""
                prev2Label=""
                tileClassName={handleDayColors}
                className="calendar-view"
                onClickDay={(val, ev) => onDayClick(val)}
            />
        </div>
    )
}
