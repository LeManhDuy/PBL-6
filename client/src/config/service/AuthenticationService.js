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
    return JSON.parse(localStorage.getItem("@Login")).role === "Pricipal";
};

const isParents = () => {
    return JSON.parse(localStorage.getItem("@Login")).role === "parent";
};

const isTeacher = () => {
    return JSON.parse(localStorage.getItem("@Login")).role === "teacher";
};

const getData = () => {
    return JSON.parse(localStorage.getItem("@Login"));
};

const AuthenticationService = {
    postLogin,
    saveDataLogin,
    clearDataLogin,
    isLogin,
    isAdmin,
    isParents,
    isTeacher,
    getData,
};

export default AuthenticationService;
