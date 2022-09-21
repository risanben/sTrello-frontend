import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
// import { boardService } from '../services/board.service'
import { BoardsList } from './boards-list'
import { ImTrello } from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux'
import { loadBoards } from '../store/board.actions';

export const SideMenu = ({ isSideBarOpen, toggleMenu }) => {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boardModule.boards)

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const _getMenuClass = () => {
        if (isSideBarOpen) {
            return "side-menu open"
        } else {
            return "side-menu"
        }
    }

    return <section className={_getMenuClass()}>

        <header>
            <div className="s"><ImTrello /></div>
            <section className="header-txt">
                sTrello Workspace
            </section>
            <section className='arrow-div' onClick={toggleMenu}><FaChevronLeft className='arrow' /></section>
            <section className='open-arrow-div' onClick={toggleMenu}><FaChevronRight className='arrow' /></section>
        </header>

        <section className='main'>
            <section className='title'>Your boards</section>
        </section>

        <section className='boards'>
            {boards && <BoardsList boards={boards} />}
        </section>

    </section>
}