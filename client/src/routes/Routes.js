import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ROUTES from "../constants/routes";
import MainLayout from "../layout/MainLayout";
import PublicRoute from "./PublicRoute";
import Home from "../page/Home/Home";
//Principal
import AdminRoute from "./AdminRoute/AdminRoute";
import NotFound from "../page/NotFound/NotFound";
import HomeAdmin from "../page/ComponentAdmin/HomeAdmin/HomeAdmin";
import AccountAdmin from "../page/ComponentAdmin/AccountAdmin/AccountAdmin";
import ClassAdmin from "../page/ComponentAdmin/ClassAdmin/ClassAdmin";
import GradeAdmin from "../page/ComponentAdmin/GradeAdmin/GradeAdmin";
import SubjectAdmin from "../page/ComponentAdmin/SubjectAdmin/SubjectAdmin.js";
import SubjectTeacherAdmin from "../page/ComponentAdmin/SubjectTeacherAdmin/SubjectTeacherAdmin.js";
import ScheduleAdmin from "../page/ComponentAdmin/ScheduleAdmin/ScheduleAdmin";
import StudentAdmin from "../page/ComponentAdmin/StudentAdmin/StudentAdmin";
import FeeAdmin from "../page/ComponentAdmin/FeeAdmin/FeeAdmin";
import FeeCategoryAdmin from "../page/ComponentAdmin/FeeCategoryAdmin/FeeCategoryAdmin";
import StatisticAdmin from "../page/ComponentAdmin/StatisticAdmin/StatisticAdmin";
//Parents
import ParentsRoute from "./ParentsRoute/ParentsRoute";
import Parents from "../page/Parents/Parents";
//Affair
import AffairRoute from "./AffairRoute/AffairRoute";
import HomeAffair from "../page/ComponentAffair/HomeAffair/HomeAffair";
import FeeAffair from "../page/ComponentAffair/FeeAffair/FeeAffair";
import FeeCategoryAffair from "../page/ComponentAffair/FeeCategoryAffair/FeeCategoryAffair";
import StatisticAffair from "../page/ComponentAffair/StatisticAffair/StatisticAffair";

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

                    <AdminRoute
                        component={AccountAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.ACCOUNT_ADMIN}
                    />

                    <AdminRoute
                        component={StudentAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.STUDENT_ADMIN}
                    />

                    <AdminRoute
                        component={ClassAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.CLASS_ADMIN}
                    />

                    <AdminRoute
                        component={GradeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.GRADE_ADMIN}
                    />

                    <AdminRoute
                        component={SubjectAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SUBJECT_ADMIN}
                    />

                    <AdminRoute
                        component={SubjectTeacherAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SUBJECT_TEACHER_ADMIN}
                    />

                    <AdminRoute
                        component={ScheduleAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.SCHEDULE_ADMIN}
                    />

                    <AdminRoute
                        component={FeeAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.FEE_ADMIN}
                    />

                    <AdminRoute
                        component={FeeCategoryAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.FEE_CATEGORY_ADMIN}
                    />

                    <AdminRoute
                        component={StatisticAdmin}
                        exact
                        path={ROUTES.ADMIN_PAGE.STATISTIC_ADMIN}
                    />

                    {/* Parents Route */}

                    <ParentsRoute
                        component={Parents}
                        exact
                        path={ROUTES.PARENTS_PAGE.PARENTS_PARENTS_PATH}
                    />

                    {/* Teacher Route */}

                    {/* Affair Route */}

                    <AffairRoute
                        component={HomeAffair}
                        exact
                        path={ROUTES.AFFAIR_PAGE.AFFAIR_HOME}
                    />

                    <AffairRoute
                        component={FeeAffair}
                        exact
                        path={ROUTES.AFFAIR_PAGE.FEE_AFFAIR}
                    />

                    <AffairRoute
                        component={FeeCategoryAffair}
                        exact
                        path={ROUTES.AFFAIR_PAGE.FEE_CATEGORY_AFFAIR}
                    />

                    <AffairRoute
                        component={StatisticAffair}
                        exact
                        path={ROUTES.AFFAIR_PAGE.STATISTIC_AFFAIR}
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
