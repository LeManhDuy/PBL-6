import React, { useState, useEffect } from "react";
import ClassService from "../../../config/service/ClassService";
import GradeService from "../../../config/service/GradeService";
import "./AddClass.css";

const AddClass = (props) => {
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState();
    const [gradeDropValue, setGradeDropValue] = useState();
    const [allValuesClass, setAllValuesClass] = useState({
        name: "",
        teacher: "",
        grade: "",
        gradeName: "",
    });
    const [classError, setClassError] = useState({
        name: false,
        teacher: false,
        grade: false,
    });

    useEffect(() => {
        getTeachers();
        getGrades();
    }, []);

    const getTeachers = () => {
        ClassService.getTeachers()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            teacher: item.person_id.person_fullname,
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
                        key: index + 1,
                        id: item._id,
                        grade: item.grade_name,
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

    const TeacherDropDown = ({ value, options, onChange }) => {
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
                    >
                        {option.teacher}
                    </option>
                ))}
            </select>
        );
    };

    const GradeDropDown = ({ value, options, onChange }) => {
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
                    >
                        {option.grade}
                    </option>
                ))}
            </select>
        );
    };

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesClass({
                ...allValuesClass,
                teacher:
                    event.target.options[
                        event.target.selectedIndex
                    ].getAttribute("data-key"),
            });
        } else {
            setAllValuesClass({
                ...allValuesClass,
                teacher: null,
            });
        }
    };

    const handleGradeChange = (event) => {
        setGradeDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesClass({
                ...allValuesClass,
                grade: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
                gradeName:
                    event.target.options[event.target.selectedIndex].value,
            });
        } else {
            setAllValuesClass({
                ...allValuesClass,
                grade: null,
            });
        }
    };

    const FormClass = (
        <div className="form-admin-content">
            <h4>Add Class</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Add Failed. {props.errorMessage}
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
                        <h4>Teacher</h4>
                        <TeacherDropDown
                            options={teacher}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
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
                    <div className="type-input">
                        <h4>Grade</h4>
                        <GradeDropDown
                            options={grade}
                            value={gradeDropValue}
                            onChange={handleGradeChange}
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
                </div>
            </div>
        </div>
    );

    const handleAddClass = () => {
        let name = false;
        let teacher = false;
        let grade = false;
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
        });

        if (!check) {
            props.handleConfirmAddClass(allValuesClass);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddClass();
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

export default AddClass;
