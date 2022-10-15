import React, { useState } from "react";
import "./Login.css";
import loginPicture from "../../assets/image/login_picture.png";
import Logo from "../../assets/image/Logo.png";
import "../../lib/ModalCustom/ModalCustom";
import AuthenticationService from "../../config/service/AuthenticationService";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = (event) => {
        event.preventDefault();

        var check = false;
        if (check) {
            return;
        } else {
            AuthenticationService.postLogin({
                account_username:
                    document.querySelector("#input-username").value,
                account_password:
                    document.querySelector("#input-password").value,
            })
                .then((res) => {
                    if (res.success) {
                        props.HandleCloseLogin();
                        props.HandleLoginSuccess();
                        AuthenticationService.saveDataLogin(res);
                        if (res.role === "admin")
                            history.push(ROUTES.ADMIN_PAGE.ADMIN_HOME);
                        else if (res.role === "parent")
                            history.push(
                                ROUTES.PARENTS_PAGE.PARENTS_NOTIFICATION_PATH
                            );
                        else
                            history.push(
                                ROUTES.TEACHER_PAGE.TEACHER_NOTIFICATION_PATH
                            );
                    } else {
                        setErrorServer(true);
                        // setErrorMessage("Does Not Exists");
                    }
                })
                .catch(() => setIsLoading(false));
        }
    };

    const handleChange = (e) => {
        if (e.target.id === "input-username") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    };

    return (
        <div>
            <ModalCustom
                show={props.show}
                handleCloseModalCustom={props.HandleCloseLogin}
                content={
                    <div className="login-container">
                        <form onSubmit={handleLogin}>
                            <div className="login-content">
                                <div className="left-content">
                                    <h1>Blue School</h1>
                                    <img
                                        src={loginPicture}
                                        alt="loginpicture"
                                    ></img>
                                </div>
                                <div className="line-middle"></div>
                                <div className="right-content">
                                    <img src={Logo} alt="logo"></img>
                                    <h1>Login</h1>
                                    <label
                                        className={
                                            "error" +
                                            (errorServer
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Incorrect email or password
                                    </label>
                                    <input
                                        id="input-username"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        value={email}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (errorEmail
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Invalid Email
                                    </label>
                                    <input
                                        id="input-password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    <label
                                        className={
                                            "error" +
                                            (errorPassword
                                                ? " error-show"
                                                : " error-hidden")
                                        }
                                    >
                                        Password must be at least 6 chars long
                                    </label>
                                    <button type="submit" className="login">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    );
};

export default Login;
