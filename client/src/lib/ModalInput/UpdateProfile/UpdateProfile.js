import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateProfile = (props) => {
    let date = new Date().toLocaleDateString();

    const [allValues, setAllValues] = useState({
        name: "",
        username: "",
        dateOfBirth: `${date.split("/")[2]}-${
            date.split("/")[0] < 10
                ? "0" + date.split("/")[0]
                : date.split("/")[0]
        }-${
            date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
        }`,
        email: "",
        gender: null,
        phone: "",
        img: null,
        address: "",
    });

    const [profileError, setProfileError] = useState({
        name: false,
        username: false,
        dateOfBirth: false,
        email: false,
        gender: false,
        phone: false,
        img: null,
        address: false,
    });

    // Set default Avatar
    const [avatar, setAvatar] = useState(Logo);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        AccountService.getAccountsById(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        ).then((res) => {
            console.log(res);
            !!res.personInfor.person_image
                ? setAvatar(res.personInfor.person_image)
                : setAvatar(Logo);
            setAllValues({
                name: res.personInfor.person_fullname,
                username: res.personInfor.account_id.account_username,
                dateOfBirth: res.personInfor.person_dateofbirth.split("T")[0],
                email: res.personInfor.person_email,
                gender: `${res.personInfor.person_gender}`,
                phone: res.personInfor.person_phonenumber,
                address: res.personInfor.person_address,
            });
        });
    }, []);

    const handleUpdateProfileAccount = () => {
        let name = false;
        let username = false;
        let dateOfBirth = false;
        let email = false;
        let gender = false;
        let phone = false;
        let img = null;
        let address = false;

        let check = false;
        if (allValues.name.length < 2) {
            name = true;
            check = true;
        } else name = false;

        if (validateEmail(allValues.email) === false) {
            email = true;
            check = true;
        } else email = false;

        let dateNow = new Date().toLocaleDateString();

        let dateConvert = `${dateNow.split("/")[2]}-${
            dateNow.split("/")[0] < 10
                ? "0" + dateNow.split("/")[0]
                : dateNow.split("/")[0]
        }-${
            dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
        }`;

        if (dateConvert < allValues.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValues.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (isNaN(parseInt(allValues.phone)) || allValues.phone.length !== 10) {
            phone = true;
            check = true;
        } else phone = false;

        if (allValues.address.length > 100 || allValues.address.length < 2) {
            address = true;
            check = true;
        } else address = false;

        if (!!allValues.img) {
            let imgList = allValues.img.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (allValues.address.length > 150 || allValues.address.length < 2) {
            address = true;
            check = true;
        } else address = false;

        setProfileError({
            name: name,
            username: username,
            dateOfBirth: dateOfBirth,
            email: email,
            gender: gender,
            phone: phone,
            img: img,
            address: address,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValues);
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateProfileAccount();
    };

    const changeHandlerPrincipal = (e) => {
        setAllValues({
            ...allValues,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerPrincipalIMG = (e) => {
        setAllValues({
            name: allValues.name,
            username: allValues.username,
            dateOfBirth: allValues.dateOfBirth,
            email: allValues.email,
            gender: allValues.gender,
            phone: allValues.phone,
            img: e.target.files[0],
            address: allValues.address,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountPrincipal = (
        <div className="form-admin-content">
            <h4>Update Admin Account</h4>
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
                    <div className="avatar-profile">
                        <img id="update-profile" src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerPrincipalIMG}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.img
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            The selected file is not valid
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValues.name}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Username</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={allValues.username}
                            onChange={changeHandlerPrincipal}
                            readOnly
                        />
                        <label
                            className={
                                "error" +
                                (profileError.username
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This username is not avaiable.
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValues.dateOfBirth}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.dateOfBirth
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Gender</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value={true}
                                    name="gender"
                                    onChange={changeHandlerPrincipal}
                                    checked={allValues.gender === "true"}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerPrincipal}
                                    checked={allValues.gender === "false"}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (profileError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValues.phone}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.phone
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Phone must be 10 numeric characters
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Email</h4>
                        <input
                            className="input-content"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={allValues.email}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.email
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Email
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="address"
                            placeholder="Enter home address"
                            value={allValues.address}
                            onChange={changeHandlerPrincipal}
                        />
                        <label
                            className={
                                "error" +
                                (profileError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address is required.
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const FormUpdateAccount = (
        <div className="form-update-account">
            {FormAccountPrincipal}
            <div className="form-update-profile-button">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickUpdate} className="btn-ok">
                    Update
                </button>
            </div>
        </div>
    );

    return <div className="update-account-form">{FormUpdateAccount}</div>;
};

export default UpdateProfile;
