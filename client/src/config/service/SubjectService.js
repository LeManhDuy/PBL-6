import HandleApi from "../api/HandleAPI";

const getSubject = async () => {
    return await HandleApi.APIGetWithToken("subject/");
};

const addSubject = async (params) => {
    return await HandleApi.APIPostWithToken(`subject/`, params);
};

const deleteSubjectById = async (id) => {
    return await HandleApi.APIDelete(`subject/${id}`);
};

const getSubjectById = async (id) => {
    return await HandleApi.APIGetWithToken(`subject/${id}`);
};

const updateSubject = async (id, params) => {
    return await HandleApi.APIPutWithToken(`subject/${id}`, params);
};

const SubjectService = {
    getSubject,
    addSubject,
    deleteSubjectById,
    getSubjectById,
    updateSubject
};

export default SubjectService;
