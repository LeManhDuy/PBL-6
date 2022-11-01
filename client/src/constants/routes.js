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
        PARENTS_STUDENT_PATH: "/parents/student",
        PARENTS_PARENTS_PATH: "/parents/parents",
        PARENTS_SCORE_PATH: "/parents/score",
        PARENTS_NOTIFICATION_PATH: "/parents/notification",
        PARENTS_FEE_PATH: "/parents/fee",
    },

    TEACHER_PAGE: {
        TEACHER_SCORE_PATH: "/teacher/score",
        TEACHER_CLASS_PATH: "/teacher/class",
        TEACHER_SCHEDULE_PATH: "/teacher/schedule",
        TEACHER_NOTIFICATION_PATH: "/teacher/notification",
        TEACHER_ASSOCIATION_PATH: "/teacher/association",
    },

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
