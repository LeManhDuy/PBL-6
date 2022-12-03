import React, { useEffect, useState } from "react";
import "./Parents.css";
import Logo from "../../assets/image/Logo.png";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../lib/ModalInput/ModalInput";
import AccountService from "../../config/service/AccountService";
import Loading from "../../lib/Loading/Loading";

const Parents = () => {
    const [parentsInfo, setParentsInfo] = useState({
        parent_img: "",
        parent_name: "",
        parent_email: "",
        parent_phone: "",
        parent_job: "",
        parent_dateofbirth: "",
        parent_gender: "",
        parent_address: "",
        parent_relationship: "",
        parent_job_address: "",
        is_in_association: "",
        parent_username: "",
    });
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInfoParents();
    }, [state]);

    const getInfoParents = () => {
        setIsLoading(true);
        AccountService.GetParentsInformation(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        ).then((res) => {
            let parentsImg = "";
            if (!!res.getParentInfor[0].person_id.person_image) {
                parentsImg = `${res.getParentInfor[0].person_id.person_image}`;
            } else parentsImg = Logo;
            setParentsInfo({
                parent_img: parentsImg,
                parent_name: res.getParentInfor[0].person_id.person_fullname,
                parent_email: res.getParentInfor[0].person_id.person_email,
                parent_phone:
                    res.getParentInfor[0].person_id.person_phonenumber,
                parent_dateofbirth:
                    res.getParentInfor[0].person_id.person_dateofbirth,
                parent_gender: res.getParentInfor[0].person_id.person_gender,
                parent_address: res.getParentInfor[0].person_id.person_address,
                parent_job: res.getParentInfor[0].parent_job,
                parent_relationship: res.getParentInfor[0].parent_relationship,
                parent_job_address: res.getParentInfor[0].parent_job_address,
                is_in_association: res.getParentInfor[0].is_in_association,
                parent_username: JSON.parse(localStorage.getItem("@Login"))
                    .AccountUserName,
            });
            setIsLoading(false);
        });
    };

    const ParentsContent = ({ parentsInfo }) => (
        // <div className="parents-item">
        <div className="student-item">
            <div className="left-student-content">
                <img src={parentsInfo.parent_img} alt="parentImage" />
            </div>
            <div className="between-student-content">
                <div className="student-info-parents">
                    <div className="item-content">
                        <i class="fa fa-solid fa-user-tie"></i>
                        <div className="detail-item-content">
                            <h4>Username</h4>
                            <p>{parentsInfo.parent_username}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-envelope"></i>
                        <div className="text">
                            <h4>Email</h4>
                            <p>{parentsInfo.parent_email}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-phone"></i>
                        <div className="text">
                            <h4>Phone Number</h4>
                            <p>{parentsInfo.parent_phone}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-cake-candles"></i>
                        <div className="text">
                            <h4>Date Of birth</h4>
                            <p>
                                {new Date(
                                    parentsInfo.parent_dateofbirth
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-mars-and-venus"></i>
                        <div className="text">
                            <h4>Gender</h4>
                            <p>
                                {parentsInfo.parent_gender ? "Male" : "Female"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-student-content">
                <div className="student-info-parents">
                    <div className="item-content">
                        <i className="fa fa-suitcase" aria-hidden="true"></i>
                        <div className="text">
                            <h4>Job</h4>
                            <p>{parentsInfo.parent_job}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i className="fa fa-solid fa-location-dot"></i>
                        <div className="text">
                            <h4>Address</h4>
                            <p>{parentsInfo.parent_address}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-address-card"></i>
                        <div className="text">
                            <h4>Job Address</h4>
                            <p>{parentsInfo.parent_job_address}</p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-people-group"></i>
                        <div className="text">
                            <h4>In Association</h4>
                            <p>
                                {parentsInfo.is_in_association
                                    ? "True"
                                    : "False"}
                            </p>
                        </div>
                    </div>
                    <div className="item-content">
                        <i class="fa fa-solid fa-heart"></i>
                        <div className="text">
                            <h4>Relationship</h4>
                            <p>{parentsInfo.parent_relationship}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="main-student-container">
            <div className="header-title">
                <h3>PARENT INFORMATION</h3>
            </div>
            <div className="detail-content">
                <ParentsContent parentsInfo={parentsInfo} />
            </div>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Parents;
