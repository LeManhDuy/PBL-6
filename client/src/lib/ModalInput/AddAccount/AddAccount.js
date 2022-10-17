import React, { useState, useEffect } from "react";
import "./AddAccount.css";
import Logo from "../../../assets/image/Logo.png";

const AddAccount = (props) => {
    const [allValuesAdmin, setAllValuesAdmin] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [adminError, setAdminError] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleAddAdminAccount = () => {
        let check = false;
        let name = false;
        let email = false;
        let password = false;
        let confirmPassword = false;
        if (allValuesAdmin.name.length > 30 || allValuesAdmin.name.length < 2) {
            name = true;
            check = true;
        } else name = false;
        if (validateEmail(allValuesAdmin.email) === false) {
            email = true;
            check = true;
        } else email = false;
        if (allValuesAdmin.password.length < 6) {
            password = true;
            check = true;
        } else if (allValuesAdmin.confirmPassword !== allValuesAdmin.password) {
            confirmPassword = true;
            check = true;
        } else {
            password = false;
            confirmPassword = false;
        }

        setAdminError({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmAddAccount(allValuesAdmin);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddAdminAccount();
    };

    const changeHandler = (e) => {
        setAllValuesAdmin({
            ...allValuesAdmin,
            [e.target.name]: e.target.value,
        });
        // e.target.focus;
    };

    const FormAccountAdmin = (
        <div className="form-admin-content">
            <h2>Add admin account</h2>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Account already exists
            </label>
            <input
                value={allValuesAdmin.name}
                id="input-name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={changeHandler}
                required
            />
            <label
                className={
                    "error" +
                    (adminError.name ? " error-show" : " error-hidden")
                }
            >
                Name must be less than 30 chars long
            </label>
            <input
                id="input-email"
                type="email"
                name="email"
                placeholder="Email"
                value={allValuesAdmin.email}
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.email ? " error-show" : " error-hidden")
                }
            >
                Invalid Email
            </label>
            <input
                value={allValuesAdmin.password}
                id="input-password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.password ? " error-show" : " error-hidden")
                }
            >
                Password must be at least 6 chars long
            </label>

            <input
                value={allValuesAdmin.confirmPassword}
                id="input-password-confirm"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={changeHandler}
            />
            <label
                className={
                    "error" +
                    (adminError.confirmPassword
                        ? " error-show"
                        : " error-hidden")
                }
            >
                Password incorrect
            </label>
        </div>
    );

    const handleBack = () => {
        setAllValuesAdmin({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        setAdminError({
            name: false,
            email: false,
            password: false,
            confirmPassword: false,
        });
    };

    const FormAddAccount = (
        <div className="form-add-account">
            <i onClick={handleBack} className="fa-regular fa-circle-left"></i>
            {FormAccountAdmin}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddAccount}</div>;
};

export default AddAccount;
