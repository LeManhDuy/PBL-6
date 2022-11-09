import HandleApi from "../api/HandleAPI";

const createPupilComment = async (id) => {
    return await HandleApi.APIPostWithToken(`comment/${id}`);
};

const CommentService = {
    createPupilComment,
};

export default CommentService;
