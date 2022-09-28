import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { ImTrello } from 'react-icons/im'
import { BsFillGrid3X3GapFill, BsChevronDown } from 'react-icons/bs'
import { IoSearchSharp } from 'react-icons/io5'
import { AiOutlineBell } from 'react-icons/ai'
import { boardService } from '../services/board.service'
import { SearchResult } from './search-result'
import { useDispatch, useSelector } from 'react-redux'
import { BoardEdit } from './board-edit'
import { loadBoards } from '../store/board.actions';
import { userService } from '../services/user.service'
import { onSignup } from '../store/user.actions'
import { UserModal } from './user-modal'

export function AppHeader() {
    const navigate = useNavigate()
    const refOne = useRef(null)
    const [results, setResults] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const pathname = useLocation().pathname
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boardModule.boards)
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)

        return (
            () => {
                document.removeEventListener("click", handleClickOutside, false)
                // console.log('listener disabled:')
            }
        )
    }, [])

    useEffect(() => {
        dispatch(loadBoards())
        // dispatch(onSignup(userService.getLoggedinUser()))
    }, [])

    const handleClickOutside = (e) => {
        if (!refOne.current) return
        if (!refOne.current.contains(e.target)) {
            setResults(null)
            setIsSearching(false)
        }
    }

    const onChange = ({ target }) => {
        if (!target.value) {
            setResults(null)
            return
        }
        setResults(boards.filter(b => b.title.toLowerCase().includes(target.value.toLowerCase())))
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

    const getUserImg = () => {
        const guestImgUrl = "https://trello-members.s3.amazonaws.com/63197a231392a3015ea3b649/1af72162e2d7c08fd66a6b36476c1515/170.png"
        if (!user?.imgUrl) return {
            backgroundImage: `url(${guestImgUrl})`
        }
        return { backgroundImage: `url(${user.imgUrl}` }
    }

    const toggleUserModal = () => {
        setIsUserModalOpen(!isUserModalOpen)
    }

    if (pathname.includes("/signup") || pathname.includes("/login")) return <section></section>
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
                        <li className='nav-link'>
                            Workspaces
                        </li>
                    </Link>
                    {/* <li className='nav-link'>
                        Recent <BsChevronDown className='downArr' />
                    </li>
                    <Link to="board" className='workspace-link'>
                        <li className='nav-link'>
                            Templates <BsChevronDown className='downArr' />
                        </li>
                    </Link> */}
                </ul>
                {/* <span className='create' onClick={showCreateBoardMoadl}>Create</span> */}
                {isCreateModalOpen && <BoardEdit toggleCreateBoardModal={showCreateBoardMoadl} />}
            </section>

            {user?.fullname && <div className='user-full-name'>{user.fullname}</div>}

            <section className={isSearching ? 'search search-wide' : 'search'} >
                <IoSearchSharp className='mag-glass' /><input type="text" onChange={onChange} placeholder='Search' onClick={onSearching} />
            </section>

            <section ref={refOne}>
                {results && <SearchResult
                    results={results}
                    setIsSearching={setIsSearching}
                    setResults={setResults} />}
            </section>
            <div className="user-icon" style={getUserImg()} onClick={toggleUserModal}></div>
            {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} />}
            {/* <section className='bell'>
                <AiOutlineBell />
            </section> */}

            <section className='space'></section>
            <button className='login'>Log in</button>
            {/* <Link to='/signup' className='sign-up'>Sing up</Link> */}

        </section >
    )

}

