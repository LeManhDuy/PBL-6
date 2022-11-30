import HandleApi from "../api/HandleAPI";

//Principal

const getAccountsPrincipal = async () => {
    return await HandleApi.APIGetWithToken("principal");
};

const getAccountsPrincipalsById = async (id) => {
    return await HandleApi.APIGetWithToken(`principal/${id}`);
};

const addAccountPrincipals = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`principal`, params);
};

const deleteAccountPrincipalsById = async (id) => {
    return await HandleApi.APIDelete(`principal/${id}`);
};

const updateAccountPrincipals = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`principal/${id}`, params);
};

//Parents

const getAccountsParents = async () => {
    return await HandleApi.APIGetWithToken("parent");
};

const getAccountsParentsById = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/${id}`);
};

const addAccountParents = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`parent`, params);
};

const deleteAccountParentsById = async (id) => {
    return await HandleApi.APIDelete(`parent/${id}`);
};

const updateAccountParents = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`parent/${id}`, params);
};

const GetParentsInformation = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/get-parents-info/${id}`);
};

//Teacher

const getAccountsTeacher = async () => {
    return await HandleApi.APIGetWithToken("teacher");
};
const getAccountsTeachersById = async (id) => {
    return await HandleApi.APIGetWithToken(`teacher/${id}`);
};

const addAccountTeachers = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`teacher`, params);
};

const deleteAccountTeachersById = async (id) => {
    return await HandleApi.APIDelete(`teacher/${id}`);
};

const updateAccountTeachers = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`teacher/${id}`, params);
};

//Affair

const getAccountsAffair = async () => {
    return await HandleApi.APIGetWithToken("affair");
};

const getAccountsAffairsById = async (id) => {
    return await HandleApi.APIGetWithToken(`affair/${id}`);
};

const addAccountAffairs = async (params) => {
    return await HandleApi.APIPostWithTokenIMG(`affair`, params);
};

const deleteAccountAffairsById = async (id) => {
    return await HandleApi.APIDelete(`affair/${id}`);
};

const updateAccountAffairs = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`affair/${id}`, params);
};

// Account

const getAccountsById = async (id) => {
    return await HandleApi.APIGetWithToken(`account/${id}`);
};

const updateAccountsById = async (id, params) => {
    return await HandleApi.APIPutWithTokenIMG(`account/${id}`, params);
};

const AccountService = {
    //Principal
    getAccountsPrincipal,
    getAccountsPrincipalsById,
    addAccountPrincipals,
    deleteAccountPrincipalsById,
    updateAccountPrincipals,
    //Parents
    getAccountsParents,
    getAccountsParentsById,
    updateAccountParents,
    deleteAccountParentsById,
    addAccountParents,
    GetParentsInformation,
    //Teacher
    getAccountsTeacher,
    getAccountsTeachersById,
    addAccountTeachers,
    deleteAccountTeachersById,
    updateAccountTeachers,
    //Affair
    getAccountsAffair,
    addAccountAffairs,
    deleteAccountAffairsById,
    updateAccountAffairs,
    getAccountsAffairsById,
    //Account
    getAccountsById,
    updateAccountsById,
};

export default AccountService;
