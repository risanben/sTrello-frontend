import React from 'react'
import { NavLink, Link } from 'react-router-dom';

import menu from '../assets/img/menu.svg'
import trello from '../assets/img/trelloLogo.svg'
import { ImTrello } from 'react-icons/im';
import { BsFillGrid3X3GapFill, BsChevronDown } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { AiOutlineBell } from 'react-icons/ai';


export function AppHeader() {

    return (
        <section className="app-header">

            <BsFillGrid3X3GapFill className='menu-logo' />
            <ImTrello className='trello-logo' />
            <section className="logo">
                sTrello
            </section>

            <section className='nav-header'>
                <ul>
                    <Link to="board"><li>Workspaces <BsChevronDown className='downArr' /></li></Link>
                    <li>Recent <BsChevronDown className='downArr' /></li>
                    <li>Starred <BsChevronDown className='downArr' /></li>
                </ul>
                <span className='create'>Create</span>
            </section>

            <section className='search'>
                <IoSearchSharp className='mag-glass' /><input type="text" placeholder='Search' />
            </section>
            <section className='bell'>
            <AiOutlineBell />
            </section>

        </section>
    )

}

