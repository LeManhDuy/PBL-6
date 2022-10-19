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
    //Affair
};

export default AccountService;
