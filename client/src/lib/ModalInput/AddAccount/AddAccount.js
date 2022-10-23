import React, { useState, useEffect } from "react";
import "./AddAccount.css";
import Logo from "../../../assets/image/Logo.png";

const AddAccount = (props) => {
    let date = new Date().toLocaleDateString();
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [dropValue, setDropValue] = useState("principal");

    //properties
    const [allValuesPrincipal, setAllValuesPrincipal] = useState();
    const [allValuesTeacher, setAllValuesTeacher] = useState({
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
        graduated: "",
        working: "",
        certificate: null,
        jobAddress: "",
        password: "",
        confirmPassword: "",
    });
    const [allValuesAffair, setAllValuesAffair] = useState();
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
    const [teacherError, setTeacherError] = useState({
        name: false,
        username: false,
        dateOfBirth: false,
        email: false,
        gender: false,
        phone: false,
        img: false,
        address: false,
        graduated: false,
        working: false,
        certificate: false,
        password: false,
        confirmPassword: false,
    });
    const [affairError, setAffairError] = useState();
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

    const options = [
        { key: 1, label: "Principal", value: "principal" },
        { key: 2, label: "Parents", value: "parents" },
        { key: 3, label: "Teacher", value: "teacher" },
        { key: 4, label: "Affair", value: "affair" },
    ];

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Type of account
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const handleChange = (event) => {
        setDropValue(event.target.value);
    };

    const ChooseAccount = (
        <div className="choose-account">
            <h5>Please select the type of account you want to add!</h5>
            <Dropdown
                options={options}
                value={dropValue}
                onChange={handleChange}
            />
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button onClick={() => setIsShowAdd(true)} className="btn-ok">
                Ok
            </button>
        </div>
    );

    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleAddPrincipalAccount = () => {};

    const handleAddTeacherAccount = () => {
        let name = false;
        let username = false;
        let dateOfBirth = false;
        let email = false;
        let gender = false;
        let phone = false;
        let img = false;
        let address = false;
        let graduated = false;
        let working = false;
        let certificate = false;
        let password = false;
        let confirmPassword = false;

        let check = false;
        if (
            allValuesTeacher.name.length > 30 ||
            allValuesTeacher.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (validateEmail(allValuesTeacher.email) === false) {
            email = true;
            check = true;
        } else email = false;

        if (allValuesTeacher.password.length < 6) {
            password = true;
            check = true;
        } else if (
            allValuesTeacher.confirmPassword !== allValuesTeacher.password
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

        if (dateConvert < allValuesTeacher.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesTeacher.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (
            isNaN(parseInt(allValuesTeacher.phone)) ||
            allValuesTeacher.phone.length !== 10
        ) {
            phone = true;
            check = true;
        } else phone = false;

        if (!!allValuesTeacher.img) {
            let imgList = allValuesTeacher.img.name.split(".");
            if (
                imgList[imgList.length - 1] !== "png" &&
                imgList[imgList.length - 1] !== "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (
            allValuesTeacher.address.length > 150 ||
            allValuesTeacher.address.length < 2
        ) {
            address = true;
            check = true;
        } else address = false;

        if (
            allValuesTeacher.graduated.length > 100 ||
            allValuesTeacher.graduated.length < 2
        ) {
            graduated = true;
            check = true;
        } else graduated = false;

        if (dateConvert < allValuesTeacher.working) {
            working = true;
            check = true;
        } else working = false;

        setTeacherError({
            name: name,
            username: username,
            dateOfBirth: dateOfBirth,
            email: email,
            gender: gender,
            phone: phone,
            img: img,
            address: address,
            graduated: graduated,
            working: working,
            certificate: certificate,
            password: password,
            confirmPassword: confirmPassword,
        });
        if (!check) {
            props.handleConfirmAddAccount(allValuesTeacher, dropValue);
        }
    };

    const handleAddAffairAccount = () => {};

    const handleAddParentsAccount = () => {
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
            props.handleConfirmAddAccount(allValuesParents, dropValue);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        if (dropValue === "principal") {
            handleAddPrincipalAccount();
        } else if (dropValue === "parents") {
            handleAddParentsAccount();
        } else if (dropValue === "teacher") {
            handleAddTeacherAccount();
        }
        //affair
        else {
            handleAddAffairAccount();
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
        setAllValuesTeacher({
            name: allValuesTeacher.name,
            username: allValuesTeacher.username,
            dateOfBirth: allValuesTeacher.dateOfBirth,
            email: allValuesTeacher.email,
            gender: allValuesTeacher.gender,
            phone: allValuesTeacher.phone,
            img: e.target.files[0],
            address: allValuesTeacher.address,
            graduated: allValuesTeacher.graduated,
            working: allValuesTeacher.working,
            certificate: allValuesTeacher.certificate,
            password: allValuesTeacher.password,
            confirmPassword: allValuesTeacher.confirmPassword,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountTeacher = (
        <div className="form-admin-content">
            <h4>Add Teacher account</h4>
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
                            onChange={changeHandlerTeacherIMG}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.img
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
                            value={allValuesTeacher.name}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.name
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
                            value={allValuesTeacher.username}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.username
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
                            value={allValuesTeacher.dateOfBirth}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.dateOfBirth
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Graduated School</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="graduated"
                            placeholder="Enter graduated school"
                            value={allValuesTeacher.graduated}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.graduated
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This graduated shool is wrong.
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
                                    onChange={changeHandlerTeacher}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerTeacher}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (teacherError.gender
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
                        <h4>Certificate</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="certificate"
                            placeholder="Enter certificate"
                            value={allValuesTeacher.certificate}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.certificate
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Certificate Error
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Phone Number</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="phone"
                            placeholder="Enter phone"
                            value={allValuesTeacher.phone}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.phone
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
                            value={allValuesTeacher.email}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.email
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
                            value={allValuesTeacher.address}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.address
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Home Address must be less than 150 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Working since</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="working"
                            placeholder="Enter Date Of Birth"
                            value={allValuesTeacher.working}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.working
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid birthday
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Password</h4>
                        <input
                            className="input-content"
                            type="password"
                            name="password"
                            placeholder="Enter password "
                            value={allValuesTeacher.password}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.password
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
                            value={allValuesTeacher.confirmPassword}
                            onChange={changeHandlerTeacher}
                        />
                        <label
                            className={
                                "error" +
                                (teacherError.confirmPassword
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

    const changeHandlerAffair = (e) => {
        setAllValuesAffair({
            ...allValuesAffair,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerAffairIMG = (e) => {
        //todo
    };

    const FormAccountAffair = null;

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
            <h4>Add Parents account</h4>
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
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerParents}
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
                                />
                                True
                                <input
                                    type="radio"
                                    value={false}
                                    name="association"
                                    onChange={changeHandlerParents}
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

    const FormAddAccount = (
        <div className="form-add-account">
            {dropValue === "principal"
                ? FormAccountPrincipal
                : dropValue === "parents"
                ? FormAccountParents
                : dropValue === "teacher"
                ? FormAccountTeacher
                : FormAccountAffair}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return (
        <div className="add-account-form">
            {isShowAdd ? FormAddAccount : ChooseAccount}
        </div>
    );
};

export default AddAccount;
