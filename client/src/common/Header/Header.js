import React, { useState, useEffect } from "react";
import Logo from "../../assets/image/Logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import Login from "../Login/Login";

const Header = () => {
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const HandleOpenLogin = () => {
        setIsShowLogin(!isShowLogin);
    };

    const HandleCloseLogin = () => {
        setIsShowLogin(false);
    };

    const handleRenderButtonLogin = (
        <button onClick={HandleOpenLogin} className="button-login">
            Login
        </button>
    );

    const ViewLogin = (
        <Login show={isShowLogin} HandleCloseLogin={HandleCloseLogin} />
    );

    return (
        <header>
            <nav>
                <div className="nav-content">
                    <Link to="/">
                        <div className="nav-logo">
                            <img src={Logo} alt="logo"></img>
                            <h3>Blue School</h3>
                        </div>
                    </Link>
                    {handleRenderButtonLogin}
                </div>
            </nav>
            <div>{isShowLogin ? ViewLogin : null}</div>
        </header>
    );
};

export default Header;
