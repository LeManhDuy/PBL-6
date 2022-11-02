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
const getClassByGradeId = async (id) => {
    return await HandleApi.APIGetWithToken(`grade/get-class-by-grade-id/${id}`);
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
    getClassByGradeId,
    deleteGradeById,
    updateGrade
};

export default GradeService;
