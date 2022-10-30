import React, { useEffect, useState } from "react";
import "./StudentParents.css";
import Logo from "../../../assets/image/Logo.png";
import NotFound from "../../../assets/image/404.png";
import StudentService from "../../../config/service/StudentService";

const StudentParents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        let dataSources = [];
        await StudentService.getPupils()
            .then((response) => {
                const dataSources = response.getPuilInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.pupil_name,
                        gender: item.pupil_gender,
                        parent: item.parent_id
                            ? item.parent_id.person_id.person_fullname
                            : "Empty",
                        class: item.class_id
                            ? item.class_id.class_name
                            : "Empty",
                        teacher: item.class_id
                            ? item.class_id.homeroom_teacher_id.person_id
                                  .person_fullname
                            : "Empty",
                        grade: item.class_id
                            ? item.class_id.grade_id
                                ? item.class_id.grade_id.grade_name
                                : "Empty"
                            : "Empty",
                    };
                });
                setStudents(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const StudentInfo = ({ students }) =>
        students.map((item) => (
            <div className="student-item">
                <div className="left-student-content">
                    <img src={item.student_image} alt="studentImage" />
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i className="fas fa-child"></i>
                            <div className="detail-item-content">
                                <h4>Name</h4>
                                <p>{item.student_fullname}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-calendar"></i>
                            <div className="detail-item-content">
                                <h4>Date of Birth</h4>
                                <p>{item.student_dateofbirth}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-transgender"></i>
                            <div className="detail-item-content">
                                <h4>Gender</h4>
                                <p>{item.student_gender ? "Male" : "Female"}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-people-roof"></i>
                            <div className="detail-item-content">
                                <h4>Class</h4>
                                <p>{`${item.grade_name}-${item.class_name}`}</p>
                            </div>
                        </div>
                    </div>
                    {/* <TeacherInfo id={item.teacher_id} /> */}
                </div>
                <h3>Schedule</h3>
                <img
                    className="schedule"
                    src={item.scheduleLink}
                    alt="schedule"
                ></img>
            </div>
        ));

    return (
        <div className="main-student-container">
            <div className="header-title">
                <h3>STUDENT INFORMATION</h3>
            </div>
            <div className="detail-content">
                <StudentInfo students={students} />
            </div>
        </div>
    );
};

export default StudentParents;
