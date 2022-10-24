import React, { useEffect } from "react";
import "./Affair.css";
import { useHistory } from "react-router-dom";
import ROUTES from "../../constants/routes";
import AuthenticationService from "../../config/service/AuthenticationService";
import AffairLayout from "../../layout/AffairLayout/AffairLayout";

function Affair() {
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
                    "Principal")
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

export default Affair;
