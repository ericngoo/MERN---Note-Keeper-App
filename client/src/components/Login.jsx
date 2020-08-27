import React, { useState } from 'react'
import axios from "axios"

function Login(props) {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    const [registerStatus, setRegisterStatus] = useState(false)

    function handleClick(buttonCalled, event) {
        submitCredentials(loginInfo, buttonCalled)
        event.preventDefault();
    }

    async function submitCredentials(user, method) {
        try {
            const resp = await axios.post("/" + method, user)
            if (method === "login") {
                props.sessionStatus(resp.data.requestStatus)
                props.currentUser(resp.data.userID)
            } else {
                setLoginInfo({ username: "", password: "" })
                setRegisterStatus(resp.data.requestStatus)
                alert('User registered, now sign in.')
            }

        } catch (err) {
            console.log(err);
        }

    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setLoginInfo((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    return (
        <div>
            <div className="welcome-title">
                <h1 className="h1-title">Note Keeper App </h1>
                <img className="github-logo" src={ process.env.PUBLIC_URL + "/Github-Mark-64px.png"}
                    alt=""
                    href=""/>
                <h2 className="h2-title">Built with MonogoDB - ExpressJS - ReactJS - NodeJS -  PassportJS</h2>
            </div>
            <div className="login-container">
                <form>
                    <h1 className="sign">Please sign in</h1>

                    <input
                        className="user-name"
                        name="username"
                        type="email"
                        value={loginInfo.username}
                        onChange={handleInputChange}
                        placeholder="Email address" />

                    <input
                        className="user-pass"
                        type="password"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleInputChange}
                        placeholder="Password" />

                    <button className="submit" onClick={(event) => handleClick('login', event)}>Sign in</button>
                    {!registerStatus ?
                        <div>
                            <div className="register-btn">
                                <h2 className="strike-through"><span>or</span></h2>
                            </div>
                            <button className="submit" onClick={(event) => handleClick('register', event)}>Sign Up</button>
                        </div> : null}

                    <p className="copyright">&copy; {new Date().getFullYear()}</p>
                </form>
            </div>
        </div>
    );
}

export default Login