import HandleApi from "../api/HandleAPI";

//Parents

const getAccountsParents = async () => {
    return await HandleApi.APIGetWithToken("parent");
};

const getAccountsParentsById = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/${id}`);
};

const GetParentsInformation = async (id) => {
    return await HandleApi.APIGetWithToken(`parent/get-parents-info/${id}`);
};

const AccountService = {
    //Parents
    getAccountsParents,
    getAccountsParentsById,
    GetParentsInformation
};

export default AccountService;
