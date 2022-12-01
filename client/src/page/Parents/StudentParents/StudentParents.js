import React, { useEffect, useState } from "react";
import "./StudentParents.css";
import Logo from "../../../assets/image/Logo.png";
import NotFound from "../../../assets/image/404.png";
import StudentService from "../../../config/service/StudentService";
import Loading from "../../../lib/Loading/Loading";

const StudentParents = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        setIsLoading(true);
        await StudentService.getPupilByParentId(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                const dataSources = response.getPupilInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.pupil_name,
                            dateofbirth: new Date(
                                item.pupil_dateofbirth
                            ).toLocaleDateString(),
                            gender: item.pupil_gender,
                            image: item.pupil_image ? item.pupil_image : Logo,
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
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setStudents(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const StudentInfo = ({ students }) =>
        students.map((item) => (
            <div className="student-item">
                <div className="left-student-content">
                    <img src={item.image} alt="studentImage" />
                </div>
                <div className="between-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i className="fas fa-child"></i>
                            <div className="detail-item-content">
                                <h4>Full Name</h4>
                                <p>{item.name}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-calendar"></i>
                            <div className="detail-item-content">
                                <h4>Date Of Birth</h4>
                                <p>{item.dateofbirth}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-transgender"></i>
                            <div className="detail-item-content">
                                <h4>Gender</h4>
                                <p>{item.gender ? "Male" : "Female"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i class="fa fa-solid fa-people-roof"></i>
                            <div className="detail-item-content">
                                <h4>Class</h4>
                                <p>{`${item.class}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-school"></i>
                            <div className="detail-item-content">
                                <h4>Grade</h4>
                                <p>{`${item.grade}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-chalkboard-user"></i>
                            <div className="detail-item-content">
                                <h4>Hoomeroom Teacher</h4>
                                <p>{`${item.teacher}`}</p>
                            </div>
                        </div>
                    </div>
                    {/* <TeacherInfo id={item.teacher_id} /> */}
                </div>
                {/* <h3>Schedule</h3>
                <img
                    className="schedule"
                    src={item.scheduleLink}
                    alt="schedule"
                ></img> */}
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
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default StudentParents;
