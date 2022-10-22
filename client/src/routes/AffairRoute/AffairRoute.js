import React from "react";
import { Redirect, Route } from "react-router-dom";
import Sidebar from "../../common/SideBar/SideBar";
import AuthenticationService from "../../config/service/AuthenticationService";
import "./AffairRoute.css";

const AffairRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) =>
                AuthenticationService.isLogin() &&
                JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                    "Academic Affair" ? (
                    <div className="">
                        <div className="main-content">
                            <Sidebar />
                            <Component {...props} />
                        </div>
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default AffairRoute;
