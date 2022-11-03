import HandleApi from "../api/HandleAPI";

const getPeriod = async () => {
    return await HandleApi.APIGetWithToken("period/");
};

const getPeriodById = async (id) =>{
    return await HandleApi.APIGetWithToken(`period/${id}`)
}

const addPeriod = async (params) => {
    return await HandleApi.APIPostWithToken("period/",params)
}

const updatePeriod = async (id,params) =>{
    return await HandleApi.APIPutWithToken(`period/${id}`,params)
}

const deletePeriod = async (id) =>{
    return await HandleApi.APIDelete(`period/${id}`)
}


const PeriodService = {
    getPeriod,
    getPeriodById,
    addPeriod,
    updatePeriod,
    deletePeriod
};

export default PeriodService;
