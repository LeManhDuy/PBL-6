import HandleApi from "../api/HandleAPI";

const getSchedule = async () => {
    return await HandleApi.APIGetWithToken("schedule/");
};

const getScheduleByHomeRoomTeacher = async (id) =>{
    return await HandleApi.APIGetWithToken(`schedule/home-room-teacher/${id}`)
}

const getScheduleByPupilID = async (id) =>{
    return await HandleApi.APIGetWithToken(`schedule/pupil/${id}`)
} 

const ScheduleService = {
    getSchedule,
    getScheduleByHomeRoomTeacher,
    getScheduleByPupilID,
};

export default ScheduleService;
