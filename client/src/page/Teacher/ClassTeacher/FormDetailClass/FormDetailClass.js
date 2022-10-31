import React, { useEffect, useState } from "react";
import "./FormDetailClass.css";
import StudentService from "../../../../config/service/StudentService";
import Logo from "../../../../assets/image/Logo.png";
import Loading from "../../../../lib/Loading/Loading";

const FormDetailClass = (props) => {
    const REACT_APP_API_ENDPOINT = "https://blue-school-project.herokuapp.com/";
    const [isLoading, setIsLoading] = useState(false);
    const [studentsInfo, setStudentsInfo] = useState({
        studentImage: "",
        studentFullName: "item.studentFullName",
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
    const [protectorInfo, setProtectorInfo] = useState([]);
    useEffect(() => {
        getStudentInfo();
    }, []);

    const [avatarParents, setAvatarParents] = useState(Logo);
    const [avatarStudent, setAvatarStudent] = useState(Logo);

    const getStudentInfo = () => {
        setIsLoading(true);
        StudentService.getStudentByStudentId(props.id)
            .then((response) => {
                if (!!response.studentImage) {
                    setAvatarStudent(
                        `${REACT_APP_API_ENDPOINT}${response.studentImage}`
                    );
                }
                if (!!response.ParentImg) {
                    setAvatarParents(
                        `${REACT_APP_API_ENDPOINT}${response.ParentImg}`
                    );
                }
                setStudentsInfo({
                    studentImage: response.studentImage,
                    studentFullName: response.studentFullName,
                    studentDateOfBirth: response.studentDateOfBirth,
                    studentGender: response.studentGender,
                    ParentName: response.ParentName,
                    ParentPhone: response.ParentPhone,
                    address: response.studentAddress,
                    ParentEmail: response.ParentEmail,
                    ParentJob: response.ParentJob,
                    ParentGender: response.ParentGender,
                    ParentImg: response.ParentImg,
                });
                const dataSources = response.ProtectorInformation.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            protector_name: item.protector_name,
                            protector_address: item.protector_address,
                            protector_phone: item.protector_phone,
                            protector_relationship: item.protector_relationship,
                        };
                    }
                );
                setProtectorInfo(dataSources);
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
                </div>
            </div>
        </div>
    );

    const ProtectorInfo = ({ protectorInfo }) =>
        protectorInfo.map((item) => (
            <div className="protector-information" key={item.key}>
                <div>
                    <div className="info-item">
                        <label>Name</label>
                        <p>{item.protector_name}</p>
                    </div>
                    <div className="info-item">
                        <label>Address</label>
                        <p>{item.protector_address}</p>
                    </div>
                </div>
                <div>
                    <div className="info-item">
                        <label>Phone</label>
                        <p>{item.protector_phone}</p>
                    </div>
                    <div className="info-item">
                        <label>Relationship</label>
                        <p>{item.protector_relationship}</p>
                    </div>
                </div>
            </div>
        ));

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
                <h5>Parents Information</h5>
                <ParentsInfo studentsInfo={studentsInfo} />
            </div>
            <hr />
            <div className="protector">
                <h5>Protector Information</h5>
                <ProtectorInfo protectorInfo={protectorInfo} />
            </div>
            <hr />
            <button onClick={props.handleCloseModalCustom}>Exit</button>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default FormDetailClass;
