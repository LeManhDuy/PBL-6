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
const getFeeInforByParentId = async (id) => {
    return await HandleApi.APIGetWithToken(`fee/get-fee-infor-by-parent-id/${id}`);
}
const getFeeByFeeCategoryId = async (id) => {
    return await HandleApi.APIGetWithToken(`fee/get-fee-by-category-id/${id}`);
}
const getFeeStatus = async (status) => {
    return await HandleApi.APIGetWithToken(`fee/get-fee-status/${status}`);
}

const deleteFeeById = async (id) => {
    return await HandleApi.APIDelete(`fee/${id}`);
};
const deleteMultiFee = async (array_params) => {
    return await HandleApi.APIPostWithToken(`fee/multi/delete/`, array_params);
};
const updateMultipleStatus = async (array_params) => {
    return await HandleApi.APIPostWithToken(`fee/multi/`, array_params);
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
    getFeeInforByParentId,
    getFeeStatus,
    updateMultipleStatus,
    deleteMultiFee,
    getFeeByFeeCategoryId
};

export default FeeService;
