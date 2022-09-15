import { Link } from 'react-router-dom';
import heroImg from '../assets/img/hero.png';

export const Hero = () => {

    return (
        <section className="hero">
            <article className='hero-txt'>
                <header>sTrello helps teams move work forward.</header>
                <p className='main-hero-txt'>
                    Collaborate, manage projects, and reach new productivity peaks. From high rises to the home
                    office, the way your team works is unique - accomplish it all with sTrello.
                </p>
                <Link to="/board" className='try-yourself'>
                    Try it yourself
                </Link>           
            </article>
            <section className='hero-img-container'>
                <img className="hero-img" src={heroImg} alt="" />
            </section>
        </section >
    )

}