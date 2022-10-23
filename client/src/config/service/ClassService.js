import HandleApi from "../api/HandleAPI";

const getClass = async () => {
    return await HandleApi.APIGetWithToken("class/");
};

const addClass = async (params) => {
    return await HandleApi.APIPostWithToken(`class`, params);
};

const getClassById = async (id) => {
    return await HandleApi.APIGetWithToken(`class/${id}`);
}

const deleteClassById = async (id) => {
    return await HandleApi.APIDelete(`class/${id}`);
};

const updateClass = async (id, params) => {
    return await HandleApi.APIPutWithToken(`class/${id}`, params);
};

const getTeachers = async () => {
    return await HandleApi.APIGetWithToken("teacher/")
}

const getStudentByClassID = async (id) => {
    return await HandleApi.APIGetWithToken(`class/get-pupil-by-class/${id}`)
}

const ClassService = {
    getClass,
    addClass,
    getClassById,
    deleteClassById,
    updateClass,
    getTeachers,
    getStudentByClassID
};

export default ClassService;
