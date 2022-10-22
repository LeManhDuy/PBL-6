import React from "react";
import "./HomeAffair.css";
import PictureWelcome from "../../../assets/image/welcome.png";
import { useHistory } from "react-router-dom";

const HomeAffair = () => {
    const history = useHistory();
    const HandleBackToHome = () => {
        history.push("/");
    };
    return (
        <div className="common">
            <div className="home-message">
                <i className="fa fa-circle one"></i>
                <i className="fa fa-circle two"></i>
                <i className="fa fa-circle three"></i>
                <i className="fa fa-circle four"></i>
                <i className="fa fa-circle five"></i>
                <i className="fa fa-circle six"></i>
                <i className="fa fa-circle seven"></i>
                <i className="fa fa-circle eight"></i>
                <h1>Hello</h1>
                <h3>Welcome to the affair page.</h3>
                <button class="btnBack" onClick={HandleBackToHome}>
                    Go to Home
                </button>
            </div>
            <div className="home-image">
                <img src={PictureWelcome} alt="welcome" />
            </div>
        </div>
    );
};

export default HomeAffair;
