import HandleApi from "../api/HandleAPI";

//Principal

const getAccountsPrincipal = async () => {
    return await HandleApi.APIGetWithToken("principal");
};

const getAccountsPrincipalsById = async (id) => {
    return await HandleApi.APIGetWithToken(`principal/${id}`);
}

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

//Teacher

const getAccountsTeacher = async () => {
    return await HandleApi.APIGetWithToken("teacher");
};

//Affair

const getAccountsAffair = async () => {
    return await HandleApi.APIGetWithToken("affair");
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
    //Teacher
    getAccountsTeacher,
    //Affair
    getAccountsAffair,
};

export default AccountService;
