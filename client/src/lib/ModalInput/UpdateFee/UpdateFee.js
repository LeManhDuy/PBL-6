import React, { useState, useEffect } from "react";
import FeeService from "../../../config/service/FeeService";
import GradeService from "../../../config/service/GradeService";
import "./UpdateFee.css";


const UpdateFee = (props) => {
    const [teacher, setTeacher] = useState([]);
    const [grade, setGrade] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState();
    const [gradeDropValue, setGradeDropValue] = useState();
    const [allValuesFee, setAllValuesFee] = useState({
        name: "",
        teacher: "",
        grade: "",
    });
    const [FeeError, setFeeError] = useState({
        name: false,
        teacher: false,
        grade: false,
    });

    useEffect(()=>{
        getTeachers();
        getGrades();
        FeeService.getFeeById(props.FeeID).then((res)=>{
            setAllValuesFee({
                name: res.getFeeInfor[0].Fee_name,
                teacher: res.getFeeInfor[0].homeroom_teacher_id._id,
                grade: res.getFeeInfor[0].grade_id._id

            })
        })
    }, []);

    const getTeachers = () => {
        FeeService.getTeachers()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        teacher: item.person_id.person_fullname,
                    };
                });
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGrades= () => {
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

    const changeHandlerFee = (e) => {
        setAllValuesFee({
            ...allValuesFee,
            [e.target.name]: e.target.value,
        });

    };

    const TeacherDropDown = ({ value, options, onChange, teacherValue }) => {
        return (
            <select
                FeeName="dropdown-Fee"
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
                FeeName="dropdown-Fee"
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
        setTeacherDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesFee({
                ...allValuesFee,
                teacher: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        } else {
            setAllValuesFee({
                ...allValuesFee,
                teacher: null,
            })
        }
    };

    const handleGradeChange = (event) => {
        setGradeDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesFee({
                ...allValuesFee,
                grade: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        } else {
            setAllValuesFee({
                ...allValuesFee,
                grade: null,
            })
        }
    };


    const FormFee = (
        <div FeeName="form-admin-content">
            <h4>Add Fee</h4>
            <label
                FeeName={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Add Failed.
            </label>
            <div FeeName="form-teacher-content">
                <div FeeName="teacher-content-left">
                    <div FeeName="type-input">
                        <h4>Fee Name</h4>
                        <input
                            FeeName="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter Fee name"
                            value={allValuesFee.name}
                            onChange={changeHandlerFee}
                        />
                        <label
                            FeeName={
                                "error" +
                                (FeeError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be less than 30 chars
                        </label>
                    </div>
                </div>
                <div FeeName="teacher-content-right">
                    <div FeeName="type-input">
                        <h4>Teacher</h4>
                        <TeacherDropDown
                            options={teacher}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            teacherValue={allValuesFee.teacher}
                        />
                        <label
                            FeeName={
                                "error" +
                                (FeeError.teacher
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Teacher
                        </label>
                    </div>
                    <div FeeName="type-input">
                        <h4>Grade</h4>
                        <GradeDropDown
                            options={grade}
                            value={gradeDropValue}
                            onChange={handleGradeChange}
                            gradeValue={allValuesFee.grade}
                        />
                        <label
                            FeeName={
                                "error" +
                                (FeeError.grade
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Fee
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleUpdateFee = () => {
        let name = false;
        let teacher = false;
        let grade = false;
        let check = false;

        if (
            allValuesFee.name.length > 30 ||
            allValuesFee.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        if (!allValuesFee.teacher) {
            teacher = true;
            check = true
        }else  {
            grade = false
        }

        if (!allValuesFee.grade) {
            grade = true;
            check = true
        } else {
            grade = false
        }


        setFeeError({
            name: name,
            grade: grade,
            teacher: teacher
        })

        if (!check) {
            props.handleConfirmUpdateFee(allValuesFee);
        }




    }

    const clickSave = (e) => {
        e.preventDefault();
        handleUpdateFee();
    };

    const FormAddFee = (
        <div FeeName="form-add-account">
            {FormFee}
            <button onClick={props.handleInputCustom} FeeName="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} FeeName="btn-ok">
                Save
            </button>
        </div>
    );

    return(
        <div FeeName="add-account-form">{FormAddFee}</div>
    );

}

export default UpdateFee;