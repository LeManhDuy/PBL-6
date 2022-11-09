import HandleApi from '../api/HandleAPI'

const postLogin = async (params) => {
    return await HandleApi.APIPost("authentication/login", params);
};

const ChangePassword = async (id, params) => {
    return await HandleApi.APIPutWithToken(`authentication/${id}`, params);
};

const AuthenticationService = {
    postLogin,
    ChangePassword,
};

export default AuthenticationService;
