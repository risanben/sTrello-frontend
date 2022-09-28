import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import './assets/styles/main.scss'
import { BoardPage } from './pages/board-page'
import { TaskPreview } from './cmps/task-preview'
import { HomePage } from './pages/home-page'
import { Board } from './cmps/board'
import { Dnd } from './pages/dnd'
import { Signup } from './pages/signup'
import { TaskDetails } from './pages/task-details'
import { LoginSignup } from './cmps/login-signup'
import { Login } from './pages/login'


export class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='' element={<HomePage />} />
                        <Route path='dnd' element={<Dnd />} />
                        <Route path='signup' element={<Signup />} />
                        <Route path='login' element={<Login />} />
                        {/* <Route path='signup' element={<LoginSignup />} /> */}
                        <Route path="board" element={<BoardPage />} />
                        <Route path="board/:id" element={<Board />} />
                        <Route path="board/:id" element={<TaskPreview />} />
                        <Route path="board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                    </Routes>
                </main>
            </div>
        )
    }
}


