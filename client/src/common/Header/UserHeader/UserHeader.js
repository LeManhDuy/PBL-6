import React, { useEffect, useRef, useState } from "react";
import "./UserHeader.css";
import AuthenticationService from "../../../config/service/AuthenticationService";
import ROUTES from "../../../constants/routes";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../../assets/image/Logo.png";
import AvatarDropdown from "../AvatarDropdown/AvatarDropdown";
import ChangePassword from "../../../lib/ModalInput/ChangePassword/ChangePassword";
import ModalInput from "../../../lib/ModalInput/ModalInput.js";

function useOutsideAlerter(ref, handle) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handle(event);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handle]);
}

function UserHeader() {
    let history = useHistory();
    const REACT_APP_API_ENDPOINT = "http://localhost:8000/";
    const [avatar, setAvatar] = useState(Logo);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setOpen(false);
    });

    useEffect(() => {
        // if (AuthenticationService.isTeacher()) {
        //     if (
        //         !!JSON.parse(localStorage.getItem("@Login")).teacher.teacher_img
        //     ) {
        //         setAvatar(
        //             `${REACT_APP_API_ENDPOINT}${
        //                 JSON.parse(localStorage.getItem("@Login")).teacher
        //                     .teacher_img
        //             }`
        //         );
        //     }
        // } else if (AuthenticationService.isParents()) {
        //     if (
        //         !!JSON.parse(localStorage.getItem("@Login")).parent.parent_img
        //     ) {
        //         setAvatar(
        //             `${REACT_APP_API_ENDPOINT}${
        //                 JSON.parse(localStorage.getItem("@Login")).parent
        //                     .parent_img
        //             }`
        //         );
        //     }
        // }
        if (AuthenticationService.isLogin()) {
            if (!!JSON.parse(localStorage.getItem("@Login")).AccountImage) {
                setAvatar(
                    JSON.parse(localStorage.getItem("@Login")).AccountImage
                );
            }
        }
    }, []);

    const optionsParents = [
        { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
        {
            key: 2,
            label: "Student",
            link: ROUTES.PARENTS_PAGE.PARENTS_STUDENT_PATH,
        },
        {
            key: 3,
            label: "Parents",
            link: ROUTES.PARENTS_PAGE.PARENTS_PARENTS_PATH,
        },
        {
            key: 4,
            label: "Score",
            link: ROUTES.PARENTS_PAGE.PARENTS_SCORE_PATH,
        },
        {
            key: 5,
            label: "Notification",
            link: ROUTES.PARENTS_PAGE.PARENTS_NOTIFICATION_PATH,
        },
        {
            key: 6,
            label: "Fee",
            link: ROUTES.PARENTS_PAGE.PARENTS_FEE_PATH,
        },
        {
            key: 7,
            label: "Schedule",
            link: ROUTES.PARENTS_PAGE.PARENTS_SCHEDULE_PATH,
        },
    ];

    const optionsTeacher = [
        { key: 1, label: "Home", link: ROUTES.HOME_PAGE.HOME_PATH },
        {
            key: 2,
            label: "Class",
            link: ROUTES.TEACHER_PAGE.TEACHER_CLASS_PATH,
        },
        {
            key: 3,
            label: "Score",
            link: ROUTES.TEACHER_PAGE.TEACHER_SCORE_PATH,
        },
        {
            key: 4,
            label: "Schedule",
            link: ROUTES.TEACHER_PAGE.TEACHER_SCHEDULE_PATH,
        },
        {
            key: 5,
            label: "Notification",
            link: ROUTES.TEACHER_PAGE.TEACHER_NOTIFICATION_PATH,
        },
        {
            key: 6,
            label: "Association",
            link: ROUTES.TEACHER_PAGE.TEACHER_ASSOCIATION_PATH,
        },
    ];

    const optionsAdmin = [
        {
            key: 2,
            label: "Admin",
            link: ROUTES.ADMIN_PAGE.ADMIN_HOME,
        },
        {
            key: 3,
            label: "Accounts",
            link: ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN,
        },
        {
            key: 4,
            label: "Class",
            link: ROUTES.ADMIN_PAGE.CLASS_ADMIN,
        },
        {
            key: 5,
            label: "Grade",
            link: ROUTES.ADMIN_PAGE.GRADE_ADMIN,
        },
        {
            key: 6,
            label: "Subject",
            link: ROUTES.ADMIN_PAGE.SUBJECT_ADMIN,
        },
        {
            key: 7,
            label: "Student",
            link: ROUTES.ADMIN_PAGE.STUDENT_ADMIN,
        },
        {
            key: 8,
            label: "Schedule",
            link: ROUTES.ADMIN_PAGE.SCHEDULE_ADMIN,
        },
    ];

    const optionsAffair = [
        {
            key: 2,
            label: "Manage",
            link: ROUTES.AFFAIR_PAGE.AFFAIR_HOME,
        },
        {
            key: 3,
            label: "Fee",
            link: ROUTES.AFFAIR_PAGE.FEE_AFFAIR,
        },
        {
            key: 4,
            label: "Fee Category",
            link: ROUTES.AFFAIR_PAGE.FEE_CATEGORY_AFFAIR,
        },
        {
            key: 5,
            label: "Statistics",
            link: ROUTES.AFFAIR_PAGE.STATISTIC_AFFAIR,
        },
    ];

    const ItemHeader = ({ options }) => {
        return (
            <div className="item-header">
                {options.map((option) => (
                    <Link
                        className={
                            window.location.pathname === option.link
                                ? "active-menu"
                                : ""
                        }
                        key={option.key}
                        to={option.link}
                    >
                        {option.label}
                    </Link>
                ))}
            </div>
        );
    };

    const HandleLogout = () => {
        AuthenticationService.clearDataLogin();
        history.push("/");
    };

    return (
        <div className="user-header">
            <ItemHeader
                options={
                    AuthenticationService.isAdmin()
                        ? optionsAdmin
                        : AuthenticationService.isParents()
                        ? optionsParents
                        : AuthenticationService.isTeacher()
                        ? optionsTeacher
                        : optionsAffair
                }
            />
            <div className="info-header">
                <h5>
                    {AuthenticationService.isAdmin()
                        ? AuthenticationService.getData().AccountName.toString()
                        : AuthenticationService.isParents()
                        ? AuthenticationService.getData().AccountName.toString()
                        : AuthenticationService.getData().AccountName.toString()}
                </h5>
                <h6>
                    {AuthenticationService.getData().AccountRole.toUpperCase()}
                </h6>
            </div>
            <div className="avatar" ref={wrapperRef}>
                <img src={avatar} alt="avatar" onClick={() => setOpen(!open)} />
                {open ? <AvatarDropdown HandleLogout={HandleLogout} /> : null}
            </div>
        </div>
    );
}

export default UserHeader;
