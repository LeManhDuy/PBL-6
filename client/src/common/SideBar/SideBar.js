import React, { useState, useEffect } from "react";
import "./SideBar.css";
import Logo from "../../assets/image/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faHouse,
    faUsers,
    faRightFromBracket,
    faBoxesStacked,
    faBookOpenReader,
    faChalkboardUser,
    faCalendarDays,
    faPeopleGroup,
    faMoneyBillTrendUp,
    faCommentsDollar,
    faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";

function SideBar() {
    let history = useHistory();
    const [isLogout, setIsLogout] = useState(false);
    const [fullName, setFullName] = useState("");
    useEffect(() => {
        getAdmin();
    }, []);
    const getAdmin = () => {
        if (AuthenticationService.isAdmin()) {
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
                    title={"Do You Want To Logout? "}
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
                                    (window.location.pathname === "/admin"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faHouse}
                                />
                                <p>Home</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname === "/admin"
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
                                    "/admin/account"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/account"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faUsers}
                                />
                                <p>Account</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/account"
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
                                    "/admin/student"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/student"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faPeopleGroup}
                                />
                                <p>Student</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/student"
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
                                    (window.location.pathname === "/admin/class"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/class"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faChalkboardUser}
                                />
                                <p>Class</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/class"
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
                                    (window.location.pathname === "/admin/grade"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/grade"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faBoxesStacked}
                                />
                                <p>Grade</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/grade"
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
                                    "/admin/subject"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/subject"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faBookOpenReader}
                                />
                                <p>Subject</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/subject"
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
                                    "/admin/schedule"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/schedule"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faCalendarDays}
                                />
                                <p>Schedule</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/schedule"
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
                                    (window.location.pathname === "/admin/fee"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/fee"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faMoneyBillTrendUp}
                                />
                                <p>Fee</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/fee"
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
                                    "/admin/feecategory"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/feecategory"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faCommentsDollar}
                                />
                                <p>FeeCategory</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/feecategory"
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
                                    "/admin/statistic"
                                        ? " active"
                                        : "")
                                }
                                to={"/admin/statistic"}
                            >
                                <FontAwesomeIcon
                                    className="icon"
                                    icon={faArrowTrendUp}
                                />
                                <p>Statistic</p>
                                <FontAwesomeIcon
                                    className={
                                        window.location.pathname ===
                                        "/admin/statistic"
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
                        <p>Admin</p>
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

export default SideBar;
