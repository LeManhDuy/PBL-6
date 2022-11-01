import React, { useState, useEffect } from "react";
import "./AddStudent.css";
import Logo from "../../../assets/image/Logo.png";
import ClassService from "../../../config/service/ClassService";
import AccountService from "../../../config/service/AccountService";
import Select from 'react-select';


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
            // <Select
            //     name="form-field-name"
            //     value={value}
            //     options={options}
            //     onChange={onChange}
            // />


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
        // setParentDropValue({ event }, () =>
        //     console.log(`Option selected:`, this.state.event)
        // );
        setParentDropValue(event);
        //console.log(parent);
        //setParentDropValue(event.target.value);
        // if (event.target.value !== "Pick") {
        setAllValuesStudent({
            ...allValuesStudent,
            // parent: event.options[
            //     event.selectedIndex
            // ].getAttribute("data-key"),
            parent: event.value
        });
    };

    const handleClassChange = (event) => {
        setClassDropValue(event)
        setAllValuesStudent({
            ...allValuesStudent,
            classroom: event.value
        });
        setTeacher(
            // event.target.options[event.target.selectedIndex].getAttribute(
            //     "data-teacher"
            // )
            event.teacher
        );
        // setClassDropValue(event.target.value);
        // if (event.target.value !== "Pick") {
        //     setAllValuesStudent({
        //         ...allValuesStudent,
        //         classroom:
        //             event.target.options[
        //                 event.target.selectedIndex
        //             ].getAttribute("data-key"),
        //     });
        //     setTeacher(
        //         event.target.options[event.target.selectedIndex].getAttribute(
        //             "data-teacher"
        //         )
        //     );
        // } else {
        //     setTeacher("");
        // }
    };

    const getParents = () => {
        AccountService.getAccountsParents()
            .then((response) => {
                const dataSources = response.getParentsInfor
                    .map((item, index) => {
                        return {
                            //key: index + 1,
                            value: item._id,
                            label: item.person_id.person_fullname + " - " + item.person_id.person_phonenumber,
                        };
                    });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setParent(dataSourcesSorted);
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
                        //key: index + 1,
                        value: item._id,
                        label: item.class_name,
                        grade: item.grade_id ? item.grade_id.grade_name : "Empty",
                        teacher: item.homeroom_teacher_id
                            ? item.homeroom_teacher_id.person_id
                                ? item.homeroom_teacher_id.person_id.person_fullname
                                : "Empty"
                            : "Empty",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setClassroom(dataSourcesSorted);
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

    // var getOptions = function (input, callback) {
    //     setTimeout(function () {
    //         callback(null, {
    //             options: [
    //                 options.map((option) => (
    //                     <option
    //                         key={option.key}
    //                         value={option.name}
    //                         data-key={option.id}
    //                     >
    //                         {option.name}
    //                     </option>
    //                 ))
    //             ],
    //             // CAREFUL! Only set this to true when there are no more options,
    //             // or more specific queries will not be sent to the server.
    //             complete: true
    //         });
    //     }, 500);
    // };

    const FormAccountStudents = (
        <div className="form-admin-content">
            <h4>Add Pupil</h4>
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
                    <div className="avatar-teacher">
                        <img src={avatar} />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose Image
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
                            Name must be greater than 2 chars
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Date Of Birth</h4>
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
                        <Select
                            className="dropdown-class"
                            value={parentDropValue}
                            onChange={handleParentChange}
                            options={parent}
                            placeholder="Name - Phone Number"
                            maxMenuHeight={150}
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
                        <Select
                            className="dropdown-class"
                            value={classDropValue}
                            onChange={handleClassChange}
                            options={classroom}
                            placeholder="Grade - Class"
                            maxMenuHeight={150}
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
                            disabled
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
