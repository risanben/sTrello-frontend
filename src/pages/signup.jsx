import { ImTrello } from "react-icons/im"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { utilService } from "../services/util.service"
import { onSignup } from "../store/user.actions"

export const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, handleChange] = useForm({
        fullname: '',
        username: '',
        password: '',
        id: utilService.makeId()
    })

    const onUserSignup = (ev) => {
        ev.stopPropagation()
        // console.log('submit form')
        if (!user.username || !user.password || !user.fullname) return
        // console.log('user', user)
        dispatch(onSignup(user))
        navigate('/board')
    }

    return (
        <section className="sginup-login">

            <div className="home-logo-link">
                <ImTrello className="trello-logo" />
                <section className="logo">
                    sTrello
                </section>
            </div>
            <div className="form-container">
                <h1 className="signup-title">Sign up for your account</h1>
                <form onSubmit={onUserSignup}>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter Full Name"
                        id="fullname"
                        value={user.fullname}
                        onChange={handleChange}
                        required />
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        required />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        required />
                    <button className=
                        {"btn-submit " + (user.username && user.password && user.fullname ? "enabled" : "")}>
                        Continue
                    </button>
                </form>
                <hr className="signup-separate-line" />
                <Link to='/login'><span className="login-link">Already have account? Log In</span></Link>
                <Link to='/'><span className="login-link">Back Home</span></Link>
            </div >

        </section >
    )
}