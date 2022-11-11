import HandleApi from "../api/HandleAPI";

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

const AccountService = {
    //Parents
    getAccountsParents,
    getAccountsParentsById,
    updateAccountParents,
    deleteAccountParentsById,
    addAccountParents,
    GetParentsInformation
};

export default AccountService;
