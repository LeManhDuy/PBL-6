import HandleApi from "../api/HandleAPI";

const getFee = async () => {
    return await HandleApi.APIGetWithToken("fee/");
};

const addFee = async (params) => {
    return await HandleApi.APIPostWithToken(`fee`, params);
};

const getFeeById = async (id) => {
    return await HandleApi.APIGetWithToken(`fee/${id}`);
}

const deleteFeeById = async (id) => {
    return await HandleApi.APIDelete(`fee/${id}`);
};

const updateFee = async (id, params) => {
    return await HandleApi.APIPutWithToken(`fee/${id}`, params);
};

const FeeService = {
    getFee,
    addFee,
    getFeeById,
    deleteFeeById,
    updateFee,
};

export default FeeService;
