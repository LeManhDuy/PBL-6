import React, { useState, useEffect } from "react";
import Logo from "../../assets/image/Logo.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
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
                    <button
                        onClick={() => console.log("Login")}
                        className="button-login"
                    >
                        Login
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
