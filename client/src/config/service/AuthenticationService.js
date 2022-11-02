import HandleApi from "../api/HandleAPI";

const postLogin = async (params) => {
    return await HandleApi.APIPost("authentication/login", params);
};

const saveDataLogin = (data) => {
    localStorage.setItem("@Login", JSON.stringify(data));
};

const clearDataLogin = () => {
    localStorage.removeItem("@Login");
};

const isLogin = () => {
    return !!localStorage.getItem("@Login");
};

const isAdmin = () => {
    return (
        JSON.parse(localStorage.getItem("@Login")).AccountRole === "Principal"
    );
};

const isParents = () => {
    return JSON.parse(localStorage.getItem("@Login")).AccountRole === "Parents";
};

const isTeacher = () => {
    return JSON.parse(localStorage.getItem("@Login")).AccountRole === "Teacher";
};

const isAffair = () => {
    return JSON.parse(
        localStorage.getItem("@Login").AccountRole === "Academic Affair"
    );
};

const getData = () => {
    return JSON.parse(localStorage.getItem("@Login"));
};

const ChangePassword = async (id, params) => {
    return await HandleApi.APIPutWithToken(`authentication/${id}`, params);
};

const AuthenticationService = {
    postLogin,
    saveDataLogin,
    clearDataLogin,
    isLogin,
    isAdmin,
    isParents,
    isTeacher,
    isAffair,
    getData,
    ChangePassword,
};

export default AuthenticationService;
