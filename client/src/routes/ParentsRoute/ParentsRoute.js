import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationService from "../../config/service/AuthenticationService";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import "./ParentsRoute.css";

const ParentsRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        component={(props) =>
            AuthenticationService.isLogin() &&
            JSON.parse(localStorage.getItem("@Login")).AccountRole ===
                "Parents" ? (
                <div>
                    <Header />
                    <div className="main-content-parents">
                        <Component {...props} />
                    </div>
                    <Footer />
                </div>
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

export default ParentsRoute;
