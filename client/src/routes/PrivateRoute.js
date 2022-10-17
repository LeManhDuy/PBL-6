import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import ROUTES from "../constants/routes";
import AuthenticationService from "../config/service/AuthenticationService";
import { useHistory } from "react-router-dom";

const PrivateRoute = ({ ...rest }) => {
    const history = useHistory();

    useEffect(() => {
        if (!AuthenticationService.isLogin()) {
            history.push(ROUTES.HOME_PAGE.path);
        }
    }, []);

    return <Route {...rest} />;
};

export default PrivateRoute;
