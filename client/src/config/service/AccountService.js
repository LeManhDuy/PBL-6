import HandleApi from "../api/HandleAPI";

//Principal

const getAccountsPrincipal = async () => {
    return await HandleApi.APIGetWithToken("principal");
};

//Parents

const getAccountsParents = async () => {
    return await HandleApi.APIGetWithToken("parent");
};

const getAccountsParentsById = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/${id}`);
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

const AccountService = {
    //Principal
    getAccountsPrincipal,
    //Parents
    getAccountsParents,
    getAccountsParentsById,
    updateAccountParents,
    deleteAccountParentsById,
    //Teacher
    getAccountsTeacher,
    //Affair
};

export default AccountService;
