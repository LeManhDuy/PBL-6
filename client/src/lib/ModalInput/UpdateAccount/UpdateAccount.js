import React, { useState, useEffect } from "react";
import "./UpdateAccount.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateAccount = (props) => {
    let date = new Date().toLocaleDateString();

    //properties
    const [allValuesPrincipal, setAllValuesPrincipal] = useState();
    const [allValuesTeacher, setAllValuesTeacher] = useState();
    const [allValuesAffair, setAllValuesAffair] = useState({
        name: "",
        username: "",
        dateOfBirth: `${date.split("/")[2]}-${date.split("/")[0] < 10
                ? "0" + date.split("/")[0]
                : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        email: "",
        gender: null,
        phone: "",
        img: null,
        address: "",
        password: "",
        confirmPassword: "",
    });
    const [allValuesParents, setAllValuesParents] = useState({
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
        job: "",
        relationship: "",
        association: null,
        jobAddress: "",
        password: "",
        confirmPassword: "",
    });

    //Error for validate
    const [principalError, setPrincipalError] = useState();
    const [teacherError, setTeacherError] = useState();
    const [affairError, setAffairError] = useState({
        name: false,
        username: false,
        dateOfBirth: false,
        email: false,
        gender: false,
        phone: false,
        img: null,
        address: false,
        password: false,
        confirmPassword: false,
    });
    const [parentsError, setParentsError] = useState({
        name: false,
        username: false,
        dateOfBirth: false,
        email: false,
        gender: false,
        phone: false,
        img: false,
        address: false,
        job: false,
        relationship: false,
        association: false,
        jobAddress: false,
        password: false,
        confirmPassword: false,
    });

    // Set default Avatar
    const [avatar, setAvatar] = useState(Logo);

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    //fetch data
    useEffect(() => {
        if (props.dropValue === "principal") {
            //todo
        } else if (props.dropValue === "parents") {
            AccountService.getAccountsParentsById(props.AccountId).then(
                (res) => {
                    !!res.getParentInfor[0].person_id.person_image
                        ? setAvatar(
                              res.getParentInfor[0].person_id.person_image
                          )
                        : setAvatar(Logo);
                    setAllValuesParents({
                        name: res.getParentInfor[0].person_id.person_fullname,
                        username:
                            res.getParentInfor[0].person_id.account_id
                                .account_username,
                        dateOfBirth:
                            res.getParentInfor[0].person_id.person_dateofbirth.split(
                                "T"
                            )[0],
                        email: res.getParentInfor[0].person_id.person_email,
                        gender: `${res.getParentInfor[0].person_id.person_gender}`,
                        phone: res.getParentInfor[0].person_id
                            .person_phonenumber,
                        address: res.getParentInfor[0].person_id.person_address,
                        job: res.getParentInfor[0].parent_job,
                        relationship: res.getParentInfor[0].parent_relationship,
                        association: `${res.getParentInfor[0].is_in_association}`,
                        jobAddress: res.getParentInfor[0].parent_job_address,
                        password: "",
                        confirmPassword: "",
                    });
                }
            );
        } else if (props.dropValue === "teacher") {
            //todo
        }
        // Affair
        else {
            AccountService.getAccountsAffairsById(props.AccountId).then(
                (res) => {
                    !!res.getAffairInfor[0].person_image
                        ? setAvatar(
                              res.getAffairInfor[0].person_image
                          )
                        : setAvatar(Logo);
                    setAllValuesAffair({
                        name: res.getAffairInfor[0].person_fullname,
                        username:
                            res.getAffairInfor[0].account_id
                                .account_username,
                        dateOfBirth:
                            res.getAffairInfor[0].person_dateofbirth.split(
                                "T"
                            )[0],
                        email: res.getAffairInfor[0].person_email,
                        gender: `${res.getAffairInfor[0].person_gender}`,
                        phone: res.getAffairInfor[0]
                            .person_phonenumber,
                        address: res.getAffairInfor[0].person_address,
                        password: "",
                        confirmPassword: "",
                    });
                }
            );
        }
    }, []);

    const handleUpdatePrincipalAccount = () => {};

    const handleUpdateTeacherAccount = () => {};

    const handleUpdateAffairAccount = () => {
        let name = false;
        let username = false;
        let dateOfBirth = false;
        let email = false;
        let gender = false;
        let phone = false;
        let img = null;
        let address = false;
        let password = false;
        let confirmPassword = false;

        let check = false;
        if (
            allValuesAffair.name.length > 30 ||
            allValuesAffair.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (
            allValuesAffair.username.length > 30 ||
            allValuesAffair.username.length < 2
        ) {
            username = true;
            check = true;
        } else username = false;

        if (validateEmail(allValuesAffair.email) === false) {
            email = true;
            check = true;
        } else email = false;

        if (allValuesAffair.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValuesAffair.confirmPassword !== allValuesAffair.password
        ) {
            confirmPassword = true;
            check = true;
        } else {
            password = false;
            confirmPassword = false;
        }

        let dateNow = new Date().toLocaleDateString();

        let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[0] < 10
                ? "0" + dateNow.split("/")[0]
                : dateNow.split("/")[0]
            }-${dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
            }`;

        if (dateConvert < allValuesAffair.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesAffair.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValuesAffair.phone)) ||
            allValuesAffair.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        if (
            allValuesAffair.address.length > 100 ||
            allValuesAffair.address.length < 2
        ) {
            address = true;
            check = true;
        } else address = false;

        if (!!allValuesAffair.img) {
            let imgList = allValuesAffair.img.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (
            allValuesAffair.address.length > 150 ||
            allValuesAffair.address.length < 2
        ) {
            address = true;
            check = true;
        } else address = false;

        setAffairError({
            name: name,
            username: username,
            dateOfBirth: dateOfBirth,
            email: email,
            gender: gender,
            phone: phone,
            img: img,
            address: address,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValuesAffair);
        }
    };

    const handleUpdateParentsAccount = () => {
        let name = false;
        let username = false;
        let dateOfBirth = false;
        let email = false;
        let gender = false;
        let phone = false;
        let img = false;
        let address = false;
        let job = false;
        let relationship = false;
        let association = false;
        let jobAddress = false;
        let password = false;
        let confirmPassword = false;

        let check = false;
        if (
            allValuesParents.name.length > 30 ||
            allValuesParents.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (validateEmail(allValuesParents.email) === false) {
            email = true;
            check = true;
        } else email = false;

        if (allValuesParents.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValuesParents.confirmPassword !== allValuesParents.password
        ) {
            confirmPassword = true;
            check = true;
        } else {
            password = false;
            confirmPassword = false;
        }

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

        if (dateConvert < allValuesParents.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesParents.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (!allValuesParents.association) {
            association = true;
            check = true;
        } else association = false;

        if (
            isNaN(parseInt(allValuesParents.phone)) ||
            allValuesParents.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        if (!!allValuesParents.img) {
            let imgList = allValuesParents.img.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (
            allValuesParents.address.length > 150 ||
            allValuesParents.address.length < 2
        ) {
            address = true;
            check = true;
        } else address = false;

        if (
            allValuesParents.job.length > 100 ||
            allValuesParents.job.length < 2
        ) {
            job = true;
            check = true;
        } else job = false;

        setParentsError({
            name: name,
            username: username,
            dateOfBirth: dateOfBirth,
            email: email,
            gender: gender,
            phone: phone,
            img: img,
            address: address,
            job: job,
            relationship: relationship,
            association: association,
            jobAddress: jobAddress,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmUpdateAccount(allValuesParents);
        }
    };

    const clickUpdate = (e) => {
        e.preventDefault();
        if (props.dropValue === "principal") {
            //todo
            handleUpdatePrincipalAccount();
        } else if (props.dropValue === "parents") {
            handleUpdateParentsAccount();
        } else if (props.dropValue === "teacher") {
            //todo
            handleUpdateTeacherAccount();
        }
        //affair
        else {
            handleUpdateAffairAccount();
        }
    };

    const changeHandlerPrincipal = (e) => {
        setAllValuesPrincipal({
            ...allValuesPrincipal,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerPrincipalIMG = (e) => {
        //todo
    };

    const FormAccountPrincipal = null;

    const changeHandlerTeacher = (e) => {
        setAllValuesTeacher({
            ...allValuesTeacher,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerTeacherIMG = (e) => {
        //todo
    };

    const FormAccountTeacher = null;

    const changeHandlerAffair = (e) => {
        setAllValuesAffair({
            ...allValuesAffair,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerAffairIMG = (e) => {
        setAllValuesAffair({
            name: allValuesAffair.name,
            username: allValuesAffair.username,
            dateOfBirth: allValuesAffair.dateOfBirth,
            email: allValuesAffair.email,
            gender: allValuesAffair.gender,
            phone: allValuesAffair.phone,
            img: e.target.files[0],
            address: allValuesAffair.address,
            password: allValuesAffair.password,
            confirmPassword: allValuesAffair.confirmPassword,
        })
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountAffair = (
        <div className="form-admin-content">
            <h4>Add Affair Account</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Account already exists
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerAffairIMG}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.img
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
                            value={allValuesAffair.name}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Username</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={allValuesAffair.username}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.username
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This username is required   .
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValuesAffair.dateOfBirth}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.dateOfBirth
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
                                    onChange={changeHandlerAffair}
                                    checked={allValuesAffair.gender == "true"}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerAffair}
                                    checked={allValuesAffair.gender == "false"}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (affairError.gender
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
                            value={allValuesAffair.phone}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.phone
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
                            value={allValuesAffair.email}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.email
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
                            value={allValuesAffair.address}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address is required.
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesAffair.password}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.password
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password must be at least 6 chars long
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter password "
                            value={allValuesAffair.confirmPassword}
                            onChange={changeHandlerAffair}
                        />
                        <label
                            className={
                                "error" +
                                (affairError.confirmPassword
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password incorrect
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    //Handle data input

    const changeHandlerParents = (e) => {
        setAllValuesParents({
            ...allValuesParents,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerParentsIMG = (e) => {
        setAllValuesParents({
            name: allValuesParents.name,
            username: allValuesParents.username,
            dateOfBirth: allValuesParents.dateOfBirth,
            email: allValuesParents.email,
            gender: allValuesParents.gender,
            phone: allValuesParents.phone,
            img: e.target.files[0],
            address: allValuesParents.address,
            job: allValuesParents.job,
            relationship: allValuesParents.relationship,
            association: allValuesParents.association,
            jobAddress: allValuesParents.jobAddress,
            password: allValuesParents.password,
            confirmPassword: allValuesParents.confirmPassword,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountParents = (
        <div className="form-admin-content">
            <h4>Update Parents account</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Update failed.
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerParentsIMG}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.img
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
                            value={allValuesParents.name}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Username</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={allValuesParents.username}
                            onChange={changeHandlerParents}
                            readOnly
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.username
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
                            value={allValuesParents.dateOfBirth}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.dateOfBirth
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Relationship</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="relationship"
                            placeholder="Enter relationship"
                            value={allValuesParents.relationship}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.relationship
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This relationsip is wrong.
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
                                    onChange={changeHandlerParents}
                                    checked={allValuesParents.gender == "true"}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerParents}
                                    checked={allValuesParents.gender == "false"}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (parentsError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label>
                        </div>
                    </div>
                    <div className="type-input">
                        <h4>In Parent Association</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value={true}
                                    name="association"
                                    onChange={changeHandlerParents}
                                    checked={
                                        allValuesParents.association === "true"
                                    }
                                />
                                True
                                <input
                                    type="radio"
                                    value={false}
                                    name="association"
                                    onChange={changeHandlerParents}
                                    checked={
                                        allValuesParents.association === "false"
                                    }
                                />
                                False
                            </div>
                            <label
                                className={
                                    "error" +
                                    (parentsError.association
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No association selected
                            </label>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Job</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="job"
                            placeholder="Enter job"
                            value={allValuesParents.job}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.job
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Job must be less than 100 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValuesParents.phone}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.phone
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
                            value={allValuesParents.email}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.email
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
                            value={allValuesParents.address}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Home Address must be less than 150 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Job Address</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="jobAddress"
                            placeholder="Enter Job Address"
                            value={allValuesParents.jobAddress}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.jobAddress
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Address must be less than 150 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesParents.password}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.password
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password must be at least 6 chars long
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Confirm Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="confirmPassword"
                            placeholder="Enter password "
                            value={allValuesParents.confirmPassword}
                            onChange={changeHandlerParents}
                        />
                        <label
                            className={
                                "error" +
                                (parentsError.confirmPassword
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Password incorrect
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const FormUpdateAccount = (
        <div className="form-add-account">
            {props.dropValue === "principal"
                ? FormAccountPrincipal
                : props.dropValue === "parents"
                ? FormAccountParents
                : props.dropValue === "teacher"
                ? FormAccountTeacher
                : FormAccountAffair}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickUpdate} className="btn-ok">
                Update
            </button>
        </div>
    );

    return <div className="add-account-form">{FormUpdateAccount}</div>;
};

export default UpdateAccount;
