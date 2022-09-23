import { useState } from "react"
import Calendar from 'react-calendar';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

export function DatePicker() {

    const [value, onChange] = useState(new Date());
    const [isClicked, setIsClicked] = useState(false);

    const setTielColor = (ev) => {
        // console.log('ev', ev)
        setIsClicked(!isClicked)
    }

    const selectedDatStyle = () => {
        const style = {
            backgroundColor: "blue"
        }
        return style
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
                minDetail="year"
                // nextLabel="›"
                nextLabel={<RiArrowRightSLine />}
                prevLabel={<RiArrowLeftSLine />}
                next2Label=""
                prev2Label=""
                // tileClassName={"day-view " + (isClicked ? "clicked" : "")}
                dayPropGetter={selectedDatStyle()}
                tileClassName="day-view"
                className="calendar-view"
                se
                // onClickDay={(value, event) => console.log('Clicked day: ', value)}
                onClickDay={(val, ev) => setTielColor(ev)}
            // onDrillDown={({ activeStartDate, view }) => alert('Drilled down to: ', activeStartDate, view)}
            // returnValue="start"
            />
        </div>
    )
}
