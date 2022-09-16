import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { UserDetails } from './pages/user-details'
// import './assets/styles/main.scss'
import './assets/styles/main.scss'
import { BoardPage } from './pages/board-page'
import { TaskPreview } from './cmps/Task-Preview'
import { HomePage } from './pages/home-page'
import { Board } from './cmps/board'
import { TempCmp } from './cmps/temp-cmp-render-task-details'
import { BoardEdit } from './cmps/board-edit'
import { GroupEdit } from './cmps/group-edit'
import { TaskDetails } from './pages/task-details'
import { Dnd } from './pages/dnd'


export class App extends React.Component {

    render() {
        return (
            <div>
                <AppHeader />
                <main>
                    <Routes>
                        {/* {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)} */}
                        <Route path='' element={<HomePage />} />
                        {/* <Route path="user/:id" element={<UserDetails />} /> */}
                        <Route path='board/edit/:id' element={<BoardEdit />} />
                        <Route path='dnd' element={<Dnd />} />
                        <Route path='board/edit' element={<BoardEdit />} />
                        <Route path="board" element={<BoardPage />} />
                        <Route path="board/:id" element={<Board />} />
                        {/* <Route path="group" element={<GroupEdit />} /> */}
                        <Route path="task/:id" element={<TaskPreview />} />
                        <Route path="task/edit" element={<TaskDetails />} />
                        {/* <Route path="task/edit/:id" element={<TaskDetails />} /> */}
                        <Route path="board/:boardId/:groupId/:id" element={<TaskDetails />} />
                        <Route path="temp" element={< TempCmp />} />
                    </Routes>
                </main>
            </div>
        )
    }
}


