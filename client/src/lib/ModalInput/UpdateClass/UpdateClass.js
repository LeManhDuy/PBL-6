import React, { useState, useEffect } from "react";
import ClassService from "../../../config/service/ClassService";
import GradeService from "../../../config/service/GradeService";
import "./UpdateClass.css";
import Select from 'react-select';

const UpdateClass = (props) => {
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState();
    const [gradeDropValue, setGradeDropValue] = useState();
    const [allValuesClass, setAllValuesClass] = useState({
        name: "",
        teacher: "",
        grade: "",

        teacher_name: "",
        grade_name: "",
    });
    const [classError, setClassError] = useState({
        name: false,
        teacher: false,
        grade: false,

        teacher_name: false,
        grade_name: false,
    });

    useEffect(() => {
        getTeachers();
        getGrades();
        ClassService.getClassById(props.classID).then((res) => {
            setAllValuesClass({
                name: res.getClassInfor[0].class_name,
                teacher: res.getClassInfor[0]
                    ? res.getClassInfor[0].homeroom_teacher_id
                        ? res.getClassInfor[0].homeroom_teacher_id._id
                        : null
                    : null,
                grade: res.getClassInfor[0]
                    ? res.getClassInfor[0].grade_id
                        ? res.getClassInfor[0].grade_id._id
                        : null
                    : null,

                teacher_name: res.getClassInfor[0]
                    ? res.getClassInfor[0].homeroom_teacher_id
                        ? res.getClassInfor[0].homeroom_teacher_id.person_id
                            ? res.getClassInfor[0].homeroom_teacher_id.person_id.person_fullname
                            : "Empty"
                        : "Empty"
                    : "Empty",
                grade_name: res.getClassInfor[0]
                    ? res.getClassInfor[0].grade_id
                        ? res.getClassInfor[0].grade_id.grade_name
                        : "Empty"
                    : "Empty",
            });
        });
    }, []);

    const getTeachers = () => {
        ClassService.getTeachers()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            value: item._id,
                            label: item.person_id.person_fullname,
                        };
                    }
                );
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGrades = () => {
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrade.map((item, index) => {
                    return {
                        value: item._id,
                        label: item.grade_name,
                    };
                });
                setGrade(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeHandlerClass = (e) => {
        setAllValuesClass({
            ...allValuesClass,
            [e.target.name]: e.target.value,
        });
    };

    const TeacherDropDown = ({ value, options, onChange, teacherValue }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Teachers
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.teacher}
                        data-key={option.id}
                        selected={teacherValue === option.id}
                    >
                        {option.teacher}
                    </option>
                ))}
            </select>
        );
    };

    const GradeDropDown = ({ value, options, onChange, gradeValue }) => {
        return (
            <select
                className="dropdown-class"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Grades
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.grade}
                        data-key={option.id}
                        selected={gradeValue === option.id}
                    >
                        {option.grade}
                    </option>
                ))}
            </select>
        );
    };

    const handleTeacherChange = (event) => {
        // setTeacherDropValue(event.target.value);
        // if (event.target.value !== "Pick") {
        //     setAllValuesClass({
        //         ...allValuesClass,
        //         teacher:
        //             event.target.options[
        //                 event.target.selectedIndex
        //             ].getAttribute("data-key"),
        //     });
        // } else {
        //     setAllValuesClass({
        //         ...allValuesClass,
        //         teacher: null,
        //     });
        // }
        setTeacherDropValue(event);
        setAllValuesClass({
            ...allValuesClass,
            teacher: event.value
        });
    };

    const handleGradeChange = (event) => {
        // setGradeDropValue(event.target.value);
        // if (event.target.value !== "Pick") {
        //     setAllValuesClass({
        //         ...allValuesClass,
        //         grade: event.target.options[
        //             event.target.selectedIndex
        //         ].getAttribute("data-key"),
        //     });
        // } else {
        //     setAllValuesClass({
        //         ...allValuesClass,
        //         grade: null,
        //     });
        // }
        setGradeDropValue(event);
        setAllValuesClass({
            ...allValuesClass,
            grade: event.value,
            gradeName: event.label
        });
    };

    const FormClass = (
        <div className="form-admin-content">
            <h4>Update Class</h4>
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
                        <h4>Class Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter class name"
                            value={allValuesClass.name}
                            onChange={changeHandlerClass}
                        />
                        <label
                            className={
                                "error" +
                                (classError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Grade</h4>
                        <Select
                            className="dropdown-class"
                            value={gradeDropValue}
                            onChange={handleGradeChange}
                            options={grade}
                            placeholder={allValuesClass.grade_name}
                            maxMenuHeight={200}
                        />
                        <label
                            className={
                                "error" +
                                (classError.grade
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Class
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <Select
                            className="dropdown-class"
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            options={teacher}
                            placeholder={allValuesClass.teacher_name}
                            maxMenuHeight={200}
                        />
                        <label
                            className={
                                "error" +
                                (classError.teacher
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Teacher
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleUpdateClass = () => {
        let name = false;
        let teacher = false;
        let grade = false;

        let teacher_name = false;
        let grade_name = false;

        let check = false;

        if (allValuesClass.name.length > 30) {
            name = true;
            check = true;
        } else name = false;

        if (!allValuesClass.teacher) {
            teacher = true;
            check = true;
        } else {
            grade = false;
        }

        if (!allValuesClass.grade) {
            grade = true;
            check = true;
        } else {
            grade = false;
        }

        setClassError({
            name: name,
            grade: grade,
            teacher: teacher,
            teacher_name: teacher_name,
            grade_name: grade_name
        });

        if (!check) {
            props.handleConfirmUpdateClass(allValuesClass);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleUpdateClass();
    };

    const FormAddClass = (
        <div className="form-add-account">
            {FormClass}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return <div className="add-account-form">{FormAddClass}</div>;
};

export default UpdateClass;
