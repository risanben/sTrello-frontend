
import React from 'react';
import { Hero } from '../cmps/hero';
import { SneakPeek } from '../cmps/sneak-peek';



export const HomePage = () => {

    return (
        <section className='home-page'>
            <Hero />
            <hr className='line-through'/>
            <SneakPeek />
        </section>
    )
}
