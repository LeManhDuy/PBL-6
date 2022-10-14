import React from "react";
import "./Login.css";
import loginPicture from "../../assets/image/login_picture.png";
import Logo from "../../assets/image/Logo.png";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";

const Login = (props) => {
    return (
        <div>
            <ModalCustom
                show={props.show}
                handleCloseModalCustom={props.HandleCloseLogin}
                content={
                    <div className="login-container">
                        <form>
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
                                    <input
                                        id="input-username"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    <input
                                        id="input-password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
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
