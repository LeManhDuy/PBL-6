import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = (props) => {
    const [allValuesPassword, setAllValuesPassword] = useState({
        old: "",
        newP: "",
        confirm: "",
    });
    const [passwordError, setPasswordError] = useState({
        old: false,
        newP: false,
        confirm: false,
    });

    const changeHandler = (e) => {
        setAllValuesPassword({
            ...allValuesPassword,
            [e.target.name]: e.target.value,
        });
    };

    const FormPassword = (
        <div className="form-admin-content">
            <h4>Change Password</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Old Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="old"
                            placeholder="Enter Your Old Password"
                            value={allValuesPassword.old}
                            onChange={changeHandler}
                        />
                        <label
                            className={
                                "error" +
                                (passwordError.old
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Old Password Must Be Less Than 30 Chars
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>New Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="newP"
                            placeholder="Enter Your New Password"
                            value={allValuesPassword.newP}
                            onChange={changeHandler}
                        />
                        <label
                            className={
                                "error" +
                                (passwordError.newP
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password Must Be At Least 6 Chars Long
                        </label>
                    </div>
                </div>
            </div>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirm"
                            placeholder="Enter Your Confirm Password"
                            value={allValuesPassword.confirm}
                            onChange={changeHandler}
                        />
                        <label
                            className={
                                "error" +
                                (passwordError.confirm
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password Must Be The Same
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleChangePassword = () => {
        let old = false;
        let newP = false;
        let confirm = false;
        let check = false;

        if (allValuesPassword.old.length < 6) {
            old = true;
            check = true;
        } else old = false;

        if (allValuesPassword.newP.length < 6) {
            newP = true;
            check = true;
        }
        if (allValuesPassword.confirm !== allValuesPassword.newP) {
            confirm = true;
            check = true;
        } else {
            newP = false;
            confirm = false;
        }

        setPasswordError({
            old: old,
            newP: newP,
            confirm: confirm,
        });

        if (!check) {
            props.handleConfirmChangePassword(allValuesPassword);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleChangePassword();
    };

    const FormChangePassword = (
        <div className="form-change-password">
            {FormPassword}
            <div className="form-change-password-btn-box">
                <div className="form-change-password-btn">
                    <button type="submit" onClick={clickSave} className="btn-ok">
                        Save
                    </button>
                    <button onClick={props.handleInputCustom} className="btn-cancel">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return <div className="add-account-form">{FormChangePassword}</div>;
};

export default ChangePassword;
