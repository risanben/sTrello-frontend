import { Link } from 'react-router-dom'
import screenshot from '../assets/img/peek.jpg'

export const SneakPeek = () => {

    return (
        <section className="sneak-peek">
            <header> It's more than work. It's a way of working together.</header>
            <p>
                Start with a sTrello board,
                lists, and cards. Customize and expand with more features as your
                teamwork grows. Manage projects, organize tasks, and build team
                spirit—all in one place.
            </p>
            <Link to="/board" className='start-doing'>
                Start Doing
            </Link>
            <img src={screenshot} className='screenshot-container' />
            <div className='txt-area'>
                <section className='mini-header'>Features to help your team succeed</section>
                <p>
                    Powering a productive team means using a powerful tool - and plenty of snacks. From meetings and projects to events and goal setting, Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about anything.
                </p>
            </div>
        </section>
    )
}