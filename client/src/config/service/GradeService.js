import HandleApi from "../api/HandleAPI";

const getGrades = async () => {
    return await HandleApi.APIGetWithToken("grade/");
};

const addGrade = async (params) => {
    return await HandleApi.APIPostWithToken(`grade`, params);
};

const getGradeById = async (id) => {
    return await HandleApi.APIGetWithToken(`grade/${id}`);
}

const deleteGradeById = async (id) => {
    return await HandleApi.APIDelete(`grade/${id}`);
};

const updateGrade = async (id, params) => {
    return await HandleApi.APIPutWithToken(`grade/${id}`, params);
};

const GradeService = {
    getGrades,
    addGrade,
    getGradeById,
    deleteGradeById,
    updateGrade
};

export default GradeService;
