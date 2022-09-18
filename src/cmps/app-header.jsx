import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { ImTrello } from 'react-icons/im';
import { BsFillGrid3X3GapFill, BsChevronDown } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { AiOutlineBell } from 'react-icons/ai';
import { boardService } from '../services/board.service'
import { TempCmp } from './temp-cmp-render-task-details';
import { SearchResult } from './search-result';


export function AppHeader() {

    const refOne = useRef(null)
    const [boards, setBoards] = useState(null)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, [])

    const handleClickOutside = (e) => {
        if (!refOne.current) return
        if (!refOne.current.contains(e.target)) {
            setBoards(null)
            setIsSearching(false)
        }
    }

    const onChange = ({ target }) => {
        if (!target.value) {
            setBoards(null)
            return
        }
        let filterBy = {
            title: target.value
        }
        boardService.query(filterBy)
            .then(boards => setBoards(boards))
    }

    const onSearching = () => {
        setIsSearching(true)
    }


    // console.log('isSearching:', isSearching)
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
                    <Link to="board" className='workspace-link'><li>Templates <BsChevronDown className='downArr' /></li></Link>
                </ul>
                <span className='create'>Create</span>
            </section>

            <section className={isSearching ? 'search-wide' : 'search'} >
                <IoSearchSharp className='mag-glass' /><input type="text" onChange={onChange} placeholder='Search' onClick={onSearching} />
            </section>

            <section ref={refOne}>
                {boards && <SearchResult
                    boards={boards} />}
            </section>

            <section className='bell'>
                <AiOutlineBell />
            </section>

        </section>
    )

}

