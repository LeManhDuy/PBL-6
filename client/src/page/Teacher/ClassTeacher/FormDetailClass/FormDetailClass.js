import React, { useEffect, useState } from "react";
import "./FormDetailClass.css";
import StudentService from "../../../../config/service/StudentService";
import Logo from "../../../../assets/image/Logo.png";
import Loading from "../../../../lib/Loading/Loading";

const FormDetailClass = (props) => {
    // const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/";
    const [isLoading, setIsLoading] = useState(false);
    const [studentsInfo, setStudentsInfo] = useState({
        studentImage: "",
        studentFullName: "",
        studentDateOfBirth: "",
        studentGender: "",
        ParentName: "",
        ParentPhone: "",
        address: "",
        ParentEmail: "",
        ParentJob: "",
        ParentGender: "",
        ParentImg: "",
    });
    // const [protectorInfo, setProtectorInfo] = useState([]);
    useEffect(() => {
        getStudentInfo();
    }, []);

    const [avatarParents, setAvatarParents] = useState(Logo);
    const [avatarStudent, setAvatarStudent] = useState(Logo);

    const getStudentInfo = () => {
        setIsLoading(true);
        StudentService.getStudentByStudentId(props.id)
            .then((response) => {
                if (!!response.getPupilInfor[0].pupil_image) {
                    setAvatarStudent(
                        response.getPupilInfor[0].pupil_image
                    );
                }
                if (!!response.getPupilInfor[0].parent_id.person_id.person_image) {
                    setAvatarParents(
                        response.getPupilInfor[0].parent_id.person_id.person_image
                    );
                }
                setStudentsInfo({
                    studentImage: response.getPupilInfor[0].pupil_image,
                    studentFullName: response.getPupilInfor[0].pupil_name,
                    studentDateOfBirth: response.getPupilInfor[0].pupil_dateofbirth,
                    studentGender: response.getPupilInfor[0].pupil_gender,
                    ParentName: response.getPupilInfor[0].parent_id.person_id.person_fullname,
                    ParentPhone: response.getPupilInfor[0].parent_id.person_id.person_phonenumber,
                    address: response.getPupilInfor[0].parent_id.person_id.person_address,
                    ParentEmail: response.getPupilInfor[0].parent_id.person_id.person_email,
                    ParentJob: response.getPupilInfor[0].parent_id.parent_job,
                    ParentGender: response.getPupilInfor[0].parent_id.person_id.person_gender,
                    ParentRelationShip: response.getPupilInfor[0].parent_id.parent_relationship,
                    ParentImg: response.getPupilInfor[0].parent_id.person_id.person_image,
                    IsInAssociation: response.getPupilInfor[0].parent_id.is_in_association
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const StudentContent = ({ studentsInfo }) => (
        <div className="student-item">
            <div className="left-student-content">
                <img src={avatarStudent} alt="studentImage" />
            </div>
            <div className="between-student-content">
                <div className="student-info-parents">
                    <div className="item-content">
                        <i className="fas fa-child"></i>
                        <div className="detail-item-content">
                            <h4>Full Name</h4>
                            <p>{studentsInfo.studentFullName}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fas fa-calendar"></i>
                        <div className="detail-item-content">
                            <h4>Date Of birth</h4>
                            <p>{new Date(
                                studentsInfo.studentDateOfBirth
                            ).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fas fa-transgender"></i>
                        <div className="detail-item-content">
                            <h4>Date Of birth</h4>
                            <p>{studentsInfo.studentGender ? "Male" : "Female"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ParentsInfo = ({ studentsInfo }) => (
        <div className="parents-information">

            <div className="student-item">
                <div className="left-student-content">
                    <img src={avatarParents} alt="parentIMG" />
                </div>
                <div className="between-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i className="fa fa-solid fa-user-tie"></i>
                            <div className="detail-item-content">
                                <h4>Full Name</h4>
                                <p>{studentsInfo.ParentName}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fas fa-phone"></i>
                            <div className="detail-item-content">
                                <h4>Phone Number</h4>
                                <p>{studentsInfo.ParentPhone}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-solid fa-location-dot"></i>
                            <div className="detail-item-content">
                                <h4>Address</h4>
                                <p>{studentsInfo.address}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fas fa-envelope"></i>
                            <div className="detail-item-content">
                                <h4>Email Address</h4>
                                <p>{studentsInfo.ParentEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i className="fas fa-transgender"></i>
                            <div className="detail-item-content">
                                <h4>Gender</h4>
                                <p>{studentsInfo.ParentGender ? "Male" : "Female"}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fas fa-suitcase"></i>
                            <div className="detail-item-content">
                                <h4>Job</h4>
                                <p>{studentsInfo.ParentJob}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-solid fa-heart"></i>
                            <div className="detail-item-content">
                                <h4>Relationship</h4>
                                <p>{studentsInfo.ParentRelationShip}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i className="fa fa-solid fa-people-group"></i>
                            <div className="detail-item-content">
                                <h4>Is In Association</h4>
                                <p>{studentsInfo.IsInAssociation ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

    return (
        <div className="form-detail-class">
            {/* <button onClick={props.handleCloseModalCustom}>Exit</button> */}
            <div className="student">
                <h5>Student Information</h5>
                <StudentContent studentsInfo={studentsInfo} />
            </div>
            <div className="parents">
                <hr />
                <h5>Parent Information</h5>
                <ParentsInfo studentsInfo={studentsInfo} />
            </div>
            <button className="btn-cancel" onClick={props.handleCloseModalCustom}>Exit</button>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default FormDetailClass;
