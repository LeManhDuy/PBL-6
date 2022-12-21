import HandleApi from "../api/HandleAPI";

const getFee = async () => {
    return await HandleApi.APIGetWithToken("fee/");
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


const FeeService = {
    getFee,
    getFeeById,
    getFeeInforByParentId,
    getFeeStatus,
    getFeeByFeeCategoryId
};

export default FeeService;
