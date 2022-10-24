import React from "react";
import { Redirect, Route } from "react-router-dom";
import AffairSideBar from "../../common/AffairSideBar/AffairSideBar";
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
                            <AffairSideBar />
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
