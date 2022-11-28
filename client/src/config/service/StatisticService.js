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
const getFeeByFeeCategoryAndClassId = async (feeCategoryID, classID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-and-class-id/${feeCategoryID}&${classID}`)
}
const getFeeByClassId = async (classID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-class-id/${classID}`)
}
const getFeeByFeeCategoryAndGradeId = async (feeCategoryID, gradeID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-and-grade-id/${feeCategoryID}&${gradeID}`)
}
const getFeeByGradeId = async (gradeID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-grade-id/${gradeID}`)
}
const getFeeByFeeCategoryId = async (feeCategoryID) => {
    return await HandleApi.APIGetWithToken(`statistic/get-fee-by-fee-category-id/${feeCategoryID}`)
}
const getFee = async () => {
    return await HandleApi.APIGetWithToken("statistic/get-fee");
};
const StatisticService = {
    getCommentByClassId,
    getScoreByClassSubjectId,
    getCommentByGradeId,
    getCommentByGradeSubjectId,
    getFeeByFeeCategoryAndClassId,
    getFeeByClassId,
    getFeeByFeeCategoryAndGradeId,
    getFeeByGradeId,
    getFeeByFeeCategoryId,
    getFee
};

export default StatisticService;
