import HandleApi from "../api/HandleAPI";

const getCommentByClassId = async (id) => {
    return await HandleApi.APIGetWithToken(`statistic/get-comment-by-class-id/${id}`)
}
const getScoreByClassSubjectId = async (classID, subjectID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-by-class-subject-id/${classID}&${subjectID}`)
}
const getCommentByGradeId = async (id) => {
    return await HandleApi.APIGetWithToken(`statistic/get-comment-by-grade-id/${id}`)
}
const getCommentByGradeSubjectId = async (gradeID, subjectID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-score-by-grade-subjcet-id/${gradeID}&${subjectID}`)
}

const StatisticService = {
    getCommentByClassId,
    getScoreByClassSubjectId,
    getCommentByGradeId,
    getCommentByGradeSubjectId,
};

export default StatisticService;
