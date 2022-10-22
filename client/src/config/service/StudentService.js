import HandleApi from "../api/HandleAPI";

const getStudents = async () => {
    return await HandleApi.APIGetWithToken("pupil/");
};

const StudentService = {
    getStudents,
};

export default StudentService;
