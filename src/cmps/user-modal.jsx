import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { onLogout } from "../store/user.actions"


export const UserModal = ({ toggleUserModal, user, getUserImg }) => {
    const dispatch = useDispatch()
    const onUserLogout = () => {
        dispatch(onLogout())
    }
    // console.log('user', user)
    return (
        <section className="user-modal">
            <div className="user-modal-title-container">
                <div className="user-modal-title-content">
                    <h3 className="user-modal-title">Account</h3>
                    <div className="btn-close-user-modal btn-close-add" onClick={toggleUserModal}></div>
                </div>
                <hr className="user-modal-hr" />
                {user?.username && <div className="user-details">
                    <div className="user-icon" style={getUserImg()}></div>
                    <div className="username">{user.fullname}</div>
                </div>}
                {!user?.username && <div className="user-modal-main-container">

                </div>}
                <div className="user-modal-main-container">
                    {user?.username && <div className="user-modal-title logout" onClick={onUserLogout}>Log out</div>}
                    {!user?.username && <React.Fragment>
                        <Link to='/signup' ><div className="user-modal-title logout">Sign Up</div></Link>
                        <hr className="user-modal-hr" />
                        <Link to='/login' ><div className="user-modal-title logout">Log In</div></Link>
                    </React.Fragment>}
                </div>
            </div>
        </section >
    )
}