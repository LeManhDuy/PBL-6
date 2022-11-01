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
        <div className="student-information ">
            <img src={avatarStudent} />
            <div className="info-item">
                <label>Name</label>
                <p>{studentsInfo.studentFullName}</p>
            </div>
            <div className="info-item">
                <label>Date of birth</label>
                <p>
                    {new Date(
                        studentsInfo.studentDateOfBirth
                    ).toLocaleDateString()}
                </p>
            </div>
            <div className="info-item">
                <label>Gender</label>
                <p>{studentsInfo.studentGender ? "Male" : "Female"}</p>
            </div>
        </div>
    );

    const ParentsInfo = ({ studentsInfo }) => (
        <div className="parents-information">
            <div className="info-left">
                <img src={avatarParents}></img>
                <div className="info-item">
                    <label>Name</label>
                    <p>{studentsInfo.ParentName}</p>
                </div>
            </div>
            <div className="info-right">
                <div>
                    <div className="info-item">
                        <label>Email</label>
                        <p>{studentsInfo.ParentEmail}</p>
                    </div>
                    <div className="info-item">
                        <label>Phone</label>
                        <p>{studentsInfo.ParentPhone}</p>
                    </div>
                    <div className="info-item">
                        <label>Job</label>
                        <p>{studentsInfo.ParentJob}</p>
                    </div>
                    <div className="info-item">
                        <label>Is In Association</label>
                        <p>{studentsInfo.IsInAssociation ? "Yes" : "No"}</p>
                    </div>
                </div>
                <div>
                    <div className="info-item">
                        <label>Gender</label>
                        <p>{studentsInfo.ParentGender ? "Male" : "Female"}</p>
                    </div>
                    <div className="info-item">
                        <label>Address</label>
                        <p>{studentsInfo.address}</p>
                    </div>
                    <div className="info-item">
                        <label>Relationship</label>
                        <p>{studentsInfo.ParentRelationShip}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="form-detail-class">
            <button onClick={props.handleCloseModalCustom}>Exit</button>
            <div className="student">
                <hr />
                <h5>Student Information</h5>
                <StudentContent studentsInfo={studentsInfo} />
            </div>
            <div className="parents">
                <hr />
                <h5>Parent Information</h5>
                <ParentsInfo studentsInfo={studentsInfo} />
            </div>
            <button onClick={props.handleCloseModalCustom}>Exit</button>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default FormDetailClass;
