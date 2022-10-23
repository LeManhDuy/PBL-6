import HandleApi from "../api/HandleAPI"

const getFeeCategory = async () => {
    return await HandleApi.APIGetWithToken("feecategory/")
}

const addFeeCategory = async (params) => {
    return await HandleApi.APIPostWithToken(`feecategory`, params)
}

const getFeeCategoryById = async (id) => {
    return await HandleApi.APIGetWithToken(`feecategory/${id}`)
}

const deleteFeeCategoryById = async (id) => {
    return await HandleApi.APIDelete(`feecategory/${id}`)
}

const updateFeeCategory = async (id, params) => {
    return await HandleApi.APIPutWithToken(`feecategory/${id}`, params)
}

const FeeCategoryService = {
    getFeeCategory,
    addFeeCategory,
    getFeeCategoryById,
    deleteFeeCategoryById,
    updateFeeCategory
}

export default FeeCategoryService
