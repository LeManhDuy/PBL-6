import React, { useState, useEffect } from "react";
import "./AffairSideBar.css";
import Logo from "../../assets/image/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faHouse,
    faRightFromBracket,
    faMoneyBillTrendUp,
    faCommentsDollar,
    faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";

function AffairSideBar() {
    let history = useHistory();
    const [isLogout, setIsLogout] = useState(false);
    const [fullName, setFullName] = useState("");
    useEffect(() => {
        getAdmin();
    }, []);
    const getAdmin = () => {
        if (AuthenticationService.isLogin()) {
            setFullName(
                JSON.parse(localStorage.getItem("@Login")).AccountUserName
            );
        }
    };

    const handleLogout = () => {
        if (AuthenticationService.isLogin()) {
            AuthenticationService.clearDataLogin();
            history.push("/");
        }
    };

    const handleCloseModalCustom = () => {
        setIsLogout(false);
    };

    const handleClickLogout = () => {
        setIsLogout(true);
    };

    const DivConfirmLogout = (
        <ModalCustom
            show={isLogout}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleLogout}
                    title={"Do you want to logout? "}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div>
            <div className="side-bar-main">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo"></img>
                        <h3>Blue School</h3>
                    </Link>
                </div>
                <div className="list-button">
                    <ul>
                        <li>
                            <Link
                                key={1}
                                className={
                                    "item" +
                                    (window.location.pathname === "/affair"
                                        ? " active"
                                        : "")
                                }
                                to={"/affair"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faHouse}
                                />
                                <p>Home</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname === "/affair"
                                            ? " show"
                                            : " arrow"
                                    }
                                    icon={faAngleRight}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link
                                key={1}
                                className={
                                    "item" +
                                    (window.location.pathname === "/affair/fee"
                                        ? " active"
                                        : "")
                                }
                                to={"/affair/fee"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faMoneyBillTrendUp}
                                />
                                <p>Fee</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/affair/fee"
                                            ? " show"
                                            : " arrow"
                                    }
                                    icon={faAngleRight}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link
                                key={1}
                                className={
                                    "item" +
                                    (window.location.pathname ===
                                    "/affair/feecategory"
                                        ? " active"
                                        : "")
                                }
                                to={"/affair/feecategory"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faCommentsDollar}
                                />
                                <p>FeeCategory</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/affair/feecategory"
                                            ? " show"
                                            : " arrow"
                                    }
                                    icon={faAngleRight}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link
                                key={1}
                                className={
                                    "item" +
                                    (window.location.pathname ===
                                    "/affair/statistic"
                                        ? " active"
                                        : "")
                                }
                                to={"/affair/statistic"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faArrowTrendUp}
                                />
                                <p>Statistic</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/affair/statistic"
                                            ? " show"
                                            : " arrow"
                                    }
                                    icon={faAngleRight}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="account">
                    <img src={Logo} alt="Logo"></img>
                    <div className="name-role">
                        <h5>{fullName}</h5>
                        <p>Affair</p>
                    </div>
                    <button className="logout" onClick={handleClickLogout}>
                        <FontAwesomeIcon
                            className="icon"
                            icon={faRightFromBracket}
                        />
                    </button>
                </div>
                {isLogout ? DivConfirmLogout : null}
            </div>
        </div>
    );
}

export default AffairSideBar;
