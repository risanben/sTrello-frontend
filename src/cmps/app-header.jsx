import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { ImTrello } from 'react-icons/im';
import { BsFillGrid3X3GapFill, BsChevronDown } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { AiOutlineBell } from 'react-icons/ai';
import { TempCmp } from './temp-cmp-render-task-details';


export function AppHeader() {

    return (
        <section className="app-header">

            <BsFillGrid3X3GapFill className='menu-logo' />
            <Link to="/" className='home-logo-link'>
                <ImTrello className='trello-logo' />
                <section className="logo">
                    sTrello
                </section>
            </Link>

            <section className='nav-header'>
                <ul>
                    <Link to="board" className='workspace-link'><li>Workspaces <BsChevronDown className='downArr' /></li></Link>
                    <li>Recent <BsChevronDown className='downArr' /></li>
                    {/* <li>Starred <BsChevronDown className='downArr' /></li> */}
                    {/* <Link to="/task/edit/Pdpsl" className='workspace-link'><li>Temp <BsChevronDown className='downArr' /></li></Link> */}
                    {/* <Link to="board/:boardId/:groupId/Pdpsl" className='workspace-link'><li>Temp <BsChevronDown className='downArr' /></li></Link> */}
                    <Link to="board/wr7XP/g101/c101" className='workspace-link'><li>Temp <BsChevronDown className='downArr' /></li></Link>
                </ul>
                {/* <Route path="board/:boardId/:groupId/:id" element={<TaskDetails />} /> */}
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

