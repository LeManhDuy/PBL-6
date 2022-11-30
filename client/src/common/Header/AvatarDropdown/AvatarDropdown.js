import React, { useState } from "react";
import "./AvatarDropdown.css";
import ChangePassword from "../../../lib/ModalInput/ChangePassword/ChangePassword";
import ModalInput from "../../../lib/ModalInput/ModalInput.js";
import AuthenticationService from "../../../config/service/AuthenticationService";
import ChangeProfile from "../../../lib/ModalInput/UpdateProfile/UpdateProfile";
import AccountService from "../../../config/service/AccountService";

const AvatarDropdown = (props) => {
    const [changePassword, setChangePassword] = useState(false);
    const [changeProfile, setChangeProfile] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputCustom = () => {
        setChangePassword(false);
        setChangeProfile(false);
        setErrorServer("");
    };

    const handleConfirmChangePassword = (allValue) => {
        AuthenticationService.ChangePassword(
            JSON.parse(localStorage.getItem("@Login")).AccountId,
            {
                account_password: allValue.newP,
            }
        ).then((res) => {
            if (res.success) {
                setChangePassword(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setChangePassword(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivChangePassword = (
        <ModalInput
            show={changePassword}
            handleInputCustom={handleInputCustom}
            content={
                <ChangePassword
                    handleInputCustom={handleInputCustom}
                    handleConfirmChangePassword={handleConfirmChangePassword}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateAccount = (allValues) => {
        console.log(allValues);
        var formData = new FormData();
        formData.append("person_fullname", allValues.name);
        formData.append("person_dateofbirth", allValues.dateOfBirth);
        formData.append("person_email", allValues.email);
        formData.append("person_gender", allValues.gender);
        formData.append("person_phonenumber", allValues.phone);
        formData.append("person_address", allValues.address);
        if (!!allValues.img)
            formData.append("person_image", allValues.img, allValues.img.name);
        AccountService.updateAccountsById(
            JSON.parse(localStorage.getItem("@Login")).AccountId,
            formData
        ).then((res) => {
            if (res.success) {
                setChangeProfile(false);
                setErrorMessage("");
                setErrorServer(false);
            } else {
                setChangeProfile(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivChangeProfile = (
        <ModalInput
            show={changeProfile}
            handleInputCustom={handleInputCustom}
            content={
                <ChangeProfile
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateAccount={handleConfirmUpdateAccount}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleChangePassword = () => {
        setChangePassword(true);
    };

    const handleChangeProfile = () => {
        setChangeProfile(true);
    };

    return (
        <div className="dropdown-avatar">
            <button onClick={handleChangeProfile}>Change Profile</button>
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={props.HandleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
            {changePassword ? DivChangePassword : null}
            {changeProfile ? DivChangeProfile : null}
        </div>
    );
};

export default AvatarDropdown;
