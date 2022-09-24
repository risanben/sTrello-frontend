
export const ProgressBar = ({ checklist }) => {


    const getProgressData = () => {
        const { todos } = checklist
        const numOfDoneTodos = todos.filter(todo => todo.isDone).length;
        const progress = (!numOfDoneTodos) ? 0 : numOfDoneTodos / todos.length * 100;
        return Math.floor(progress);
    }

    return (
        <section className="progress-bar">

            <span className="checklist-progress-percentage">
                {getProgressData() + '%'}
            </span>
            
            <div className="bar-container">
                <div className={`progress ${(getProgressData() === 100) ? 'done' : ''}`} style={{ width: getProgressData() + '%' }} ></div>
            </div>


        </section>
    )
}