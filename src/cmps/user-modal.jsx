import { useDispatch } from "react-redux"
import { onLogout } from "../store/user.actions"


export const UserModal = ({ toggleUserModal }) => {
    const dispatch = useDispatch()
    const onUserLogout = () => {
        dispatch(onLogout())
    }

    return (
        <section className="user-modal">
            <div className="user-modal-title-container">
                <div className="user-modal-title-content">
                    <h3 className="user-modal-title">Account</h3>
                    <div className="btn-close-user-modal btn-close-add" onClick={toggleUserModal}></div>
                </div>
                <hr className="user-modal-hr" />
                <div className="user-modal-main-container">
                    <div className="user-modal-title logout" onClick={onUserLogout}>Log out</div>
                </div>
            </div>
        </section>
    )
}