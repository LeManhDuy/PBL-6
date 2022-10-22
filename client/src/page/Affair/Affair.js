import React, { useEffect } from "react";
import "./Affair.css";
import { useHistory } from "react-router-dom";
import ROUTES from "../../constants/routes";
import AuthenticationService from "../../config/service/AuthenticationService";
import AffairLayout from "../../layout/AffairLayout/AffairLayout";

function Admin() {
    const history = useHistory();
    useEffect(() => {
        if (
            (AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "parent") ||
            (AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "teacher")
        ) {
            history.push(ROUTES.HOME_PAGE.path);
        }
    }, []);
    return (
        <div>
            <AffairLayout />
        </div>
    );
}

export default Admin;
