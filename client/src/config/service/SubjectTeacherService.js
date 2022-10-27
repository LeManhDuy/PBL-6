import HandleApi from "../api/HandleAPI";

const getSubjectTeacher = async () => {
    return await HandleApi.APIGetWithToken("subject_teacher/");
};

const addSubjectTeacher = async (params) => {
    return await HandleApi.APIPostWithToken(`subject_teacher/`, params);
};

const deleteSubjectTeacherById = async (id) => {
    return await HandleApi.APIDelete(`subject_teacher/${id}`);
};

const getSubjectTeacherById = async (filters) => {
    return await HandleApi.APIGetWithToken(`subject_teacher/search?subject_teacher_id=${filters.subject_teacher_id}&subject_id=${filters.subject_id}&teacher_id=${filters.teacher_id}`);
};

const updateSubjectTeacher = async (id, params) => {
    return await HandleApi.APIPutWithToken(`subject_teacher/${id}`, params);
};

const SubjectTeacherService = {
    getSubjectTeacher,
    addSubjectTeacher,
    deleteSubjectTeacherById,
    getSubjectTeacherById,
    updateSubjectTeacher
};

export default SubjectTeacherService;
