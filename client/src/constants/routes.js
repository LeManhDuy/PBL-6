const ROUTES = {
    HOME_PAGE: {
        HOME_PATH: "/",
    },

    ADMIN_PAGE: {
        ADMIN_HOME: "/admin",
        ACCOUNT_ADMIN: "/admin/account",
        CLASS_ADMIN: "/admin/class",
        GRADE_ADMIN: "/admin/grade",
        SUBJECT_ADMIN: "/admin/subject",
        SCHEDULE_ADMIN: "/admin/schedule",
        FEE_ADMIN: "/admin/fee",
        FEE_CATEGORY_ADMIN: "/admin/feecategory",
        STATISTIC_ADMIN: "/admin/statistic",
        STUDENT_ADMIN: "/admin/student",
        SUBJECT_TEACHER_ADMIN: "/admin/subject_teacher",
    },

    PARENTS_PAGE: {
        PARENTS_PARENTS_PATH: "/parents/parents",
    },

    TEACHER_PAGE: {},

    AFFAIR_PAGE: {
        AFFAIR_HOME: "/affair",
        FEE_AFFAIR: "/affair/fee",
        FEE_CATEGORY_AFFAIR: "/affair/feecategory",
        STATISTIC_AFFAIR: "/affair/statistic",
    },

    NOT_FOUND_PAGE: {
        path: "*",
    },
};

export default ROUTES;
