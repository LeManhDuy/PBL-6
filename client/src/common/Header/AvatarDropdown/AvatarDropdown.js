import React, { useState } from "react";
import "./AvatarDropdown.css";
import ChangePassword from "../../../lib/ModalInput/ChangePassword/ChangePassword";
import ModalInput from "../../../lib/ModalInput/ModalInput.js";
import AuthenticationService from "../../../config/service/AuthenticationService";

const AvatarDropdown = (props) => {
    const [changePassword, setChangePassword] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputCustom = () => {
        setChangePassword(false);
        setErrorServer("");
    };

    const handleConfirmChangePassword = (allValue) => {
        console.log(allValue);
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

    const handleChangePassword = () => {
        setChangePassword(true);
    };

    return (
        <div className="dropdown-avatar">
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={props.HandleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
            {changePassword ? DivChangePassword : null}
        </div>
    );
};

export default AvatarDropdown;
