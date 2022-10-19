import HandleApi from "../api/HandleAPI";

//Principal

//Parents

const getAccountsParents = async () => {
    return await HandleApi.APIGetWithToken("admin/parent");
};

const getAccountsParentsById = async (id) => {
    return await HandleApi.APIGetWithToken(`admin/parent/${id}`);
};

const deleteAccountParentsById = async (id) => {
    return await HandleApi.APIDelete(`admin/parent/${id}`);
};

const updateAccountParents = async (params, id) => {
    return await HandleApi.APIPutWithTokenIMG(`admin/parent/${id}`, params);
};

//Teacher

//Affair

const AccountService = {
    //Principal
    //Parents
    getAccountsParents,
    getAccountsParentsById,
    updateAccountParents,
    deleteAccountParentsById,
    //Teacher
    //Affair
};

export default AccountService;
