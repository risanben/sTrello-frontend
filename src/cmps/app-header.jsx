import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useParams, useLocation } from 'react-router-dom';
import { ImTrello } from 'react-icons/im';
import { BsFillGrid3X3GapFill, BsChevronDown } from 'react-icons/bs';
import { IoSearchSharp } from 'react-icons/io5';
import { AiOutlineBell } from 'react-icons/ai';
import { boardService } from '../services/board.service'
import { SearchResult } from './search-result';
import { useSelector } from 'react-redux';
import { BoardEdit } from './board-edit';


export function AppHeader() {

    const refOne = useRef(null)
    const [boards, setBoards] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const pathname = useLocation().pathname


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

    const _getHeaderClass = () => {
        if (pathname === "/board") {
            return "app-header workspace"
        }
        else if (pathname.includes("/board")) {
            return "app-header"
        } else {
            return "app-header home"
        }
    }
    const showCreateBoardMoadl = () => {
        setIsCreateModalOpen(!isCreateModalOpen)
    }


    return (
        <section className={_getHeaderClass()}>

            {/* <BsFillGrid3X3GapFill className='menu-logo' /> */}

            <Link to="/" className='home-logo-link'>
                <ImTrello className='trello-logo' />
                <section className="logo">
                    sTrello
                </section>
            </Link>

            <section className='nav-header'>
                <ul className='nav-links-container'>
                    <Link to="board" className='workspace-link'>
                        <li className='nav-link'>Workspaces <BsChevronDown className='downArr' />
                        </li>
                    </Link>
                    <li className='nav-link'>Recent <BsChevronDown className='downArr' /></li>
                    <Link to="board" className='workspace-link'>
                        <li className='nav-link'>Templates <BsChevronDown className='downArr' />
                        </li>
                    </Link>
                </ul>
                <span className='create' onClick={showCreateBoardMoadl}>Create</span>
                {isCreateModalOpen && <BoardEdit toggleCreateBoardModal={showCreateBoardMoadl} />}
            </section>

            <section className={isSearching ? 'search search-wide' : 'search'} >
                <IoSearchSharp className='mag-glass' /><input type="text" onChange={onChange} placeholder='Search' onClick={onSearching} />
            </section>

            <section ref={refOne}>
                {boards && <SearchResult
                    boards={boards} />}
            </section>

            {/* <section className='bell'>
                <AiOutlineBell />
            </section> */}

            <section className='space'></section>
            <button className='login'>Log in</button>

        </section>
    )

}

