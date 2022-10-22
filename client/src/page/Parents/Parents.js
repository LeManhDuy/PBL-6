import React, { useEffect, useState } from "react";
import "./Parents.css";
import Logo from "../../assets/image/Logo.png";
import ModalCustom from "../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../lib/ModalInput/ModalInput";

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
    });
    const [id, setId] = useState(false);
    const [state, setState] = useState(false);

    const ParentsContent = ({ parentsInfo }) => (
        <div className="parents-item">
            <div className="image">
                <img src={parentsInfo.parent_img} alt="parent image" />
                <div className="type parents-name">
                    <div className="text">
                        <h3>{parentsInfo.parent_name}</h3>
                    </div>
                </div>
            </div>
            <div className="detail-info">
                <div className="type parents-email">
                    {/* <i class="fa fa-solid fa-envelope"></i> */}
                    <div className="text">
                        <p>Email</p>
                        <p>{parentsInfo.parent_email}</p>
                    </div>
                </div>
                <div className="type parents-phone">
                    {/* <i className="fa fa-phone"></i> */}
                    <div className="text">
                        <p>Phone Number</p>
                        <p>{parentsInfo.parent_phone}</p>
                    </div>
                </div>
                <div className="type parents-dateOfBirth">
                    {/* <i class="fa fa-solid fa-cake-candles"></i> */}
                    <div className="text">
                        <p>Date of birth</p>
                        <p>
                            {new Date(
                                parentsInfo.parent_dateofbirth
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="type parent-job">
                    {/* <i className="fa fa-suitcase" aria-hidden="true"></i> */}
                    <div className="text">
                        <p>Job</p>
                        <p>{parentsInfo.parent_job}</p>
                    </div>
                </div>
                <div className="type parents-gender">
                    {/* <i class="fa fa-solid fa-mars-and-venus"></i> */}
                    <div className="text">
                        <p>Gender</p>
                        <p>{parentsInfo.parent_gender ? "Male" : "Female"}</p>
                    </div>
                </div>
                <div className="type parents-address">
                    {/* <i className="fa fa-solid fa-location-dot"></i> */}
                    <div className="text">
                        <p>Address</p>
                        <p>{parentsInfo.parent_address}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="parents-info">
            <h3>PARENT INFORMATION</h3>
            <div className="parents-content">
                {/* <ParentsContent parentsInfo={parentsInfo} /> */}
            </div>
        </div>
    );
};

export default Parents;
