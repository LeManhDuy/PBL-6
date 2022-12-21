import React, { useState, useEffect } from "react";
import ClassService from "../../../config/service/ClassService";
import GradeService from "../../../config/service/GradeService";
import "./AddClass.css";
import Select from 'react-select';

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
        ClassService.getTeacherDontHaveClass()
            .then((response) => {
                const dataSources = response.getTeacherDontHaveClass.map(
                    (item, index) => {
                        return {
                            //key: index + 1,
                            value: item._id,
                            label: item.person_id.person_fullname,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setTeacher(dataSourcesSorted);
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
                        //key: index + 1,
                        value: item._id,
                        label: item.grade_name,
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setGrade(dataSourcesSorted)
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
        setTeacherDropValue(event);
        setAllValuesClass({
            ...allValuesClass,
            teacher: event.value
        });
    };

    const handleGradeChange = (event) => {
        setGradeDropValue(event);
        setAllValuesClass({
            ...allValuesClass,
            grade: event.value,
            gradeName: event.label
        });
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
                {props.errorMessage}
            </label>
            <div className="form-teacher-content" style={{ height: 240 }}>
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <Select
                            className="dropdown-class"
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            options={teacher}
                            placeholder="Teacher's Name"
                            maxMenuHeight={150}
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
                <div className="teacher-content-right-class">
                    <div className="type-input">
                        <h4>Grade</h4>
                        <Select
                            className="dropdown-class"
                            value={gradeDropValue}
                            onChange={handleGradeChange}
                            options={grade}
                            placeholder="Grade's Name"
                            maxMenuHeight={150}
                        />
                        <label
                            className={
                                "error" +
                                (classError.grade
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Grade
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Class Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter Class Name"
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
                            Name must be less than 30 chars and not null
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

        if (allValuesClass.name.length > 30 || allValuesClass.name.length == 0) {
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

            <div className="test">
                <button onClick={props.handleInputCustom} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Save
                </button>
            </div>

        </div>
    );

    return <div className="add-account-form">{FormAddClass}</div>;
};

export default AddClass;
