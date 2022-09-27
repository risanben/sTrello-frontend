import { ImTrello } from "react-icons/im"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { onLogin } from "../store/user.actions"

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [credentials, handleChange, setUser] = useForm({
        username: '',
        password: ''
    })

    const onUserLogin = (ev) => {
        ev.stopPropagation()
        if (!credentials.username || !credentials.password) return
        dispatch(onLogin(credentials))
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
                <h1 className="signup-title">Login to sTrello</h1>
                <form onSubmit={onUserLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required />
                    <button className=
                        {"btn-submit " + (credentials.username && credentials.password ? "enabled" : "")}>
                        Continue
                    </button>
                </form>
                <hr className="signup-separate-line" />
                <Link to='/signup'><span className="login-link">Sign up for account</span></Link>
                <Link to='/'><span className="login-link">Back Home</span></Link>
            </div >

        </section >
    )
}