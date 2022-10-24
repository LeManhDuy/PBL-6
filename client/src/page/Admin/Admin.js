import React, { useEffect } from "react";
import "./Admin.css";
import { useHistory } from "react-router-dom";
import ROUTES from "../../constants/routes";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import AuthenticationService from "../../config/service/AuthenticationService";

function Admin() {
    const history = useHistory();
    useEffect(() => {
        if (
            (AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "Parents") ||
            (AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "Teacher") ||
            (AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "Academic Affair")
        ) {
            history.push(ROUTES.HOME_PAGE.path);
        }
    }, []);
    return (
        <div>
            <AdminLayout />
        </div>
    );
}

export default Admin;
