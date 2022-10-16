import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ROUTES from "../constants/routes";
import MainLayout from "../layout/MainLayout";
import PublicRoute from "./PublicRoute";
import Home from "../page/Home/Home";
import AdminRoute from "./AdminRoute/AdminRoute";
import NotFound from "../page/NotFound/NotFound";
import HomeAdmin from "../page/ComponentAdmin/HomeAdmin/HomeAdmin";

const Routes = () => {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <PublicRoute
                        component={Home}
                        exact
                        path={ROUTES.HOME_PAGE.HOME_PATH}
                    />

                    <AdminRoute
                        component={HomeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ADMIN_HOME}
                    />

                    <PublicRoute
                        component={NotFound}
                        path={ROUTES.NOT_FOUND_PAGE.path}
                    />
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default Routes;
