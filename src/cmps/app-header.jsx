import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ImTrello } from 'react-icons/im'
import { IoSearchSharp } from 'react-icons/io5'
import { SearchResult } from './search-result'
import { useDispatch, useSelector } from 'react-redux'
import { BoardEdit } from './board-edit'
import { loadBoards } from '../store/board.actions';
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
    const themeColor = useSelector(state => state.boardModule.boardThemeColor)


    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)

        return (
            () => {
                document.removeEventListener("click", handleClickOutside, false)
            }
        )
    }, [])

    useEffect(() => {
        dispatch(loadBoards())
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
        <section className={_getHeaderClass()}
            style={(_getHeaderClass() === 'app-header' ?
                { backgroundColor: themeColor + 'cc' } : { backgroundColor: '#026AA7' })}>
            < Link to="/" className='home-logo-link' >
                <ImTrello className='trello-logo' />
                <section className="logo">
                    sTrello
                </section>
            </Link >
            <section className='nav-header'>
                <ul className='nav-links-container'>
                    <Link to="board" className='workspace-link'>
                        <li className='nav-link'>
                            Workspaces
                        </li>
                    </Link>
                </ul>
                {isCreateModalOpen && <BoardEdit toggleCreateBoardModal={showCreateBoardMoadl} />}
            </section>

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
            {isUserModalOpen && <UserModal toggleUserModal={toggleUserModal} user={user} getUserImg={getUserImg} />}

            <section className='space'></section>
            <button className='login'>Log in</button>

        </section >
    )

}

