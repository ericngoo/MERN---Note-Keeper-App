import React, { useState } from 'react'
import axios from "axios"

function Login(props) {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    const [signUpStatus, setSignUpStatus] = useState(false)

    const [securePassword, setSecurePassword] = useState("")

    function handleLogin(event) {
        submitLogin(loginInfo)
        event.preventDefault();
    }

    async function submitLogin(user) {
        if (loginValidation(user)) {
            try {
                const resp = await axios.post("/login", user)
                props.sessionStatus(resp.data.requestStatus)
                props.currentUser(resp.data.userID)

            } catch (err) {
                alert('Incorrect email or password. Please enter credentials again.')
                setLoginInfo({ username: "", password: "" })
                console.log(err);
            }
        }
    }

    function loginValidation(user) {
        if (user.username === "" || user.password === "") {
            alert('Make sure the username and password fields are filled out!')
            return false;
        }

        if (!emailIsValid(user.username)) {
            alert('Email is not in standard format: "__@__.__" ')
            return false;
        }
        return true;
    }

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }



    function handleSignUp(event) {
        setSignUpStatus(true)
    }

    function handleSecurePassword(event) {
        setSecurePassword(event.target.value)
     }

     function handleRegister(event) {
        submitRegister(loginInfo, securePassword)
        event.preventDefault();
     }

     async function submitRegister(user, additionalPassword) {
        if (registerValidation(user, additionalPassword)) {
            try {
                const resp = await axios.post("/register", user)
                setLoginInfo({ username: "", password: "" })
                setSignUpStatus(false)
                setSecurePassword("")
                alert('User registered, now sign in.')
            } catch (err) {
                alert('Incorrect email or password. Please enter credentials again.')
                setLoginInfo({ username: "", password: "" })
                console.log(err);
            }
        }
    }

    function registerValidation(user, additionalPassword) {
        if(!loginValidation(user)) {
            return false
        } 

        if(user.password.length < 6) {
            alert('Password needs to be 6 characters or longer!')
            return false
        }

        if(user.password !== additionalPassword) {
            alert("Passwords don't match up!")
            return false
        }

        return true
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

    function redirectToSignIn() {
        setSignUpStatus(false)
    }

    return (
        <div>
            <div className="welcome-title">
                <h1 className="h1-title">Note Keeper App </h1>

                <a href="https://github.com/ericngoo/MERN---Note-Keeper-App" target="_blank">
                    <img className="github-logo" src={process.env.PUBLIC_URL + "/GitHub-Mark-64px.png"} alt="" />
                </a>

                <h2 className="h2-title">Built with MonogoDB - ExpressJS - ReactJS - NodeJS -  PassportJS</h2>
            </div>
            <div className={ !signUpStatus ? 'login-container' : 'register-container'} >
                <form>
                    <h1 className="sign">Welcome!</h1>

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

                    {!signUpStatus ?
                        <div>
                            <button className="submit" onClick={handleLogin}>Sign in</button>
                            <div className="register-btn">
                                <h2 className="strike-through"><span>or</span></h2>
                            </div>
                            <button className="submit" onClick={handleSignUp}>Sign Up</button>
                        </div> :
                        <div>
                            <input
                                className="user-pass"
                                type="password"
                                name="reenterPassword"
                                value={securePassword}
                                onChange={handleSecurePassword}
                                placeholder="Re-enter Password" />

                            <button className="submit" onClick={handleRegister}>Register</button>
                            <div className="register-btn">
                                <h2 className="strike-through"><span>or</span></h2>
                            </div>
                            <button className="submit" onClick={redirectToSignIn}>Sign In</button>             
                        </div>}

                    <p className="copyright">&copy; {new Date().getFullYear()}</p>
                </form>
            </div>
        </div>
    );
}

export default Login