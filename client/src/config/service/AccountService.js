import HandleApi from "../api/HandleAPI";

const getAccountsAdmin = async () => {
    return await HandleApi.APIGetWithToken("admin");
};

const getAccountsAdminById = async (id) => {
    return await HandleApi.APIGetWithToken(`admin/${id}`);
};

const deleteAccountAdminById = async (id) => {
    return await HandleApi.APIDelete(`admin/${id}`);
};

const addAccountAdmin = async (params) => {
    return await HandleApi.APIPostWithToken(`admin`, params);
};

const AccountService = {
    getAccountsAdmin,
    deleteAccountAdminById,
    addAccountAdmin,
    getAccountsAdminById,
};

export default AccountService;
