import React from 'react'
import { connect } from 'react-redux'
import { TaskDetails } from './task-details.jsx'

import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}


    render() {
        // const { count } = this.props
        return (
            <section>
                <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} />
                <TaskDetails props={'Um7Ow'}/>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)