import React, { useState, useEffect } from "react";
import "./AddStudent.css";
import Logo from "../../../assets/image/Logo.png";
import ClassService from "../../../config/service/ClassService";
import AccountService from "../../../config/service/AccountService";

const AddStudent = (props) => {
    let date = new Date().toLocaleDateString();
    const [classroom, setClassroom] = useState([]);
    const [parent, setParent] = useState([]);
    const [teacher, setTeacher] = useState();
    const [parentDropValue, setParentDropValue] = useState();
    const [classDropValue, setClassDropValue] = useState();
    const [allValuesStudent, setAllValuesStudent] = useState({
        name: "",
        dateOfBirth: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        gender: null,
        img: null,
        parent: "",
        classroom: "",
    });
    const [studentsError, setStudentsError] = useState({
        name: false,
        dateOfBirth: false,
        gender: false,
        img: false,
        parent: false,
        classroom: false,
    });

    const [avatar, setAvatar] = useState(Logo);

    useEffect(() => {
        getClasses();
        getParents();
    }, []);

    const ParentDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Parents
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.name}
                        data-key={option.id}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        );
    };

    const ClassDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Class
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.name + " - " + option.grade}
                        data-key={option.id}
                        data-teacher={option.teacher}
                    >
                        {option.name} - {option.grade}
                    </option>
                ))}
            </select>
        );
    };

    const handleParentChange = (event) => {
        setParentDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesStudent({
                ...allValuesStudent,
                parent: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        }
        console.log(parent);
    };

    const handleClassChange = (event) => {
        setClassDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesStudent({
                ...allValuesStudent,
                classroom:
                    event.target.options[
                        event.target.selectedIndex
                    ].getAttribute("data-key"),
            });
            setTeacher(
                event.target.options[event.target.selectedIndex].getAttribute(
                    "data-teacher"
                )
            );
        } else {
            setTeacher("");
        }
    };

    const getParents = () => {
        AccountService.getAccountsParents()
            .then((response) => {
                const dataSources = response.getParentsInfor
                    .map((item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_id.person_fullname,
                        };
                    });
                setParent(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClasses = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClass.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.class_name,
                        grade: item.grade_id.grade_name,
                        teacher: item.homeroom_teacher_id.person_id.person_fullname,
                    };
                });
                setClassroom(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddStudentsAccount = () => {
        let name = false;
        let dateOfBirth = false;
        let gender = false;
        let img = false;
        let parent = false;
        let classroom = false;
        let check = false;
        if (
            allValuesStudent.name.length > 30 ||
            allValuesStudent.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        let dateNow = new Date().toLocaleDateString();

        let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[0] < 10
            ? "0" + dateNow.split("/")[0]
            : dateNow.split("/")[0]
            }-${dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
            }`;

        if (dateConvert < allValuesStudent.dateOfBirth) {
            dateOfBirth = true;
            check = true;
        } else dateOfBirth = false;

        if (!allValuesStudent.gender) {
            gender = true;
            check = true;
        } else gender = false;

        if (!!allValuesStudent.img) {
            let imgList = allValuesStudent.img.name.split(".");
            if (
                imgList[imgList.length - 1] != "png" &&
                imgList[imgList.length - 1] != "jpg"
            ) {
                img = true;
                check = true;
            } else img = false;
        }

        if (!allValuesStudent.classroom) {
            classroom = true;
            check = true;
        } else {
            classroom = false;
        }

        if (!allValuesStudent.parent) {
            parent = true;
            check = true;
        } else {
            parent = false;
        }

        setStudentsError({
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            img: img,
            parent: parent,
            classroom: classroom,
        });
        if (!check) {
            props.handleConfirmAddStudent(allValuesStudent);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddStudentsAccount();
    };

    const changeHandlerStudents = (e) => {
        setAllValuesStudent({
            ...allValuesStudent,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerStudentsIMG = (e) => {
        setAllValuesStudent({
            name: allValuesStudent.name,
            dateOfBirth: allValuesStudent.dateOfBirth,
            gender: allValuesStudent.gender,
            img: e.target.files[0],
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    const FormAccountStudents = (
        <div className="form-admin-content">
            <h4>Add Pupil</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Add Failed.
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="img"
                            onChange={changeHandlerStudentsIMG}
                        />
                        <label
                            className={
                                "error" +
                                (studentsError.img
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
                            value={allValuesStudent.name}
                            onChange={changeHandlerStudents}
                        />
                        <label
                            className={
                                "error" +
                                (studentsError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date of Birth</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter Date Of Birth"
                            value={allValuesStudent.dateOfBirth}
                            onChange={changeHandlerStudents}
                        />
                        <label
                            className={
                                "error" +
                                (studentsError.dateOfBirth
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
                                    onChange={changeHandlerStudents}
                                />
                                Male
                                <input
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerStudents}
                                />
                                Female
                            </div>
                            <label
                                className={
                                    "error" +
                                    (studentsError.gender
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
                        <h4>Parent</h4>
                        <ParentDropDown
                            options={parent}
                            value={parentDropValue}
                            onChange={handleParentChange}
                        />
                        <label
                            className={
                                "error" +
                                (studentsError.parent
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Parent
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Class</h4>
                        <ClassDropDown
                            options={classroom}
                            value={classDropValue}
                            onChange={handleClassChange}
                        />
                        <label
                            className={
                                "error" +
                                (studentsError.classroom
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Class
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <input
                            className="input-content"
                            placeholder="Teacher's name..."
                            value={teacher}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const FormAddAccount = (
        <div className="form-add-account">
            {FormAccountStudents}
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

export default AddStudent;
