import React, { useState, useEffect } from "react";
import "./UpdateSubjectTeacher.css";
import SubjectTeacherService from "../../../config/service/SubjectTeacherService";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";

const UpdateSubjectTeacher = (props) => {
    const [allValuesSubjectTeacher, setAllValuesSubjectTeacher] = useState({
        subject_id: "",
        teacher_id: "",
    });
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [subjectDropValue, setSubjectDropValue] = useState ()
    const [teacherDropValue, setTeacherDropValue] = useState ()
    const [subjectTeacherError, setSubjectTeacherError] = useState({
        subject_id: false,
        teacher_id: false,
    });


    useEffect(() => {
        getSubject();
        getTeachers();
        SubjectTeacherService.getSubjectTeacherById({subject_teacher_id:props.SubjectTeacherId,subject_id:"",teacher_id:""})
            .then((res)=>{
            setAllValuesSubjectTeacher({
                subject_id: res.allSubjectTeacher[0].subject_id._id,
                teacher_id: res.allSubjectTeacher[0].teacher_id._id,
            })
        });
        // setSubjectDropValue(allValuesSubjectTeacher.subject_id);
        // setTeacherDropValue(allValuesSubjectTeacher.teacher_id);
    }, []);

    const getSubject = () => {
        SubjectService.getSubject()
            .then((response) => {
                const dataSources = response.allSubject.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.subject_name
                        }
                    }
                );
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const getTeachers = () => {
        AccountService.getAccountsTeacher()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_id.person_fullname,
                            email: item.person_id.person_email,
                        };
                    }
                );
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Dropdown = ({ value, options, onChange ,selectedValue}) => {
        return (
          <label>
            {/* <input list="brow"/> */}
            <select className="dropdown-account" value={value} onChange={onChange}>
              {/* <option value="All">All</option> */}
              {options.map((option) => (
                <option 
                    key={option.key} 
                    value={option.id} 
                    selected={selectedValue === option.id}
                >
                  {option.name}
                  
                </option>
              ))}
            </select>
          </label>
        );
    };

    const handleSubjectChange = (event) => {
        setSubjectDropValue(event.target.value);
        if (event.target.value !== 'All'){
            setAllValuesSubjectTeacher({
                ...allValuesSubjectTeacher,
                subject_id: event.target.value,
            });
        }
        // else {
        //     setAllValuesSubjectTeacher({
        //         ...allValuesSubjectTeacher,
        //         subject_id: null,
        //     })
        // }
    }

    const handleTeacherChange = (event) => {
        // console.log(event.target.value)  
        setTeacherDropValue(event.target.value);
        if (event.target.value !== 'All'){
            setAllValuesSubjectTeacher({
                ...allValuesSubjectTeacher,
                teacher_id: event.target.value,
            });
        }
        // else {
        //     setAllValuesSubjectTeacher({
        //         ...allValuesSubjectTeacher,
        //         teacher_id: null,
        //     })
        // }
    }

    const handleUpdateSubjectTeacher = () => {
        let subject_id = false;
        let teacher_id = false;
        let check = false;
        if (!allValuesSubjectTeacher.subject_id) {
            subject_id = true;
            check = true;
        } else subject_id = false;
        if (!allValuesSubjectTeacher.teacher_id) {
            teacher_id = true;
            check = true;
        } else teacher_id = false;
        setSubjectTeacherError({
            subject_id: subject_id,
            teacher_id: teacher_id,
        })
        if (!check) {
            props.handleConfirmUpdateSubjectTeacher(allValuesSubjectTeacher);
        }
    }



    const FormUpdateSubjectTeacher = (
        <div className="form-admin-content">
            <h4>Update Subject Teacher</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Subject Teacher already exists
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Subject</h4>
                            <Dropdown
                                options={subjects}
                                value={subjectDropValue}
                                onChange={handleSubjectChange}
                                selectedValue={allValuesSubjectTeacher.subject_id}
                            />
                            <label
                                className={
                                    "error" +
                                    (subjectTeacherError.subject_id
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                Invalid Subject
                            </label>
                    </div>
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <Dropdown
                            options={teachers}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            selectedValue={allValuesSubjectTeacher.teacher_id}
                        />
                        <label
                            className={
                                "error" +
                                (subjectTeacherError.teacher_id
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

    const clickSave = (e) => {
        e.preventDefault();
        handleUpdateSubjectTeacher();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormUpdateSubjectTeacher}
                <button onClick={props.handleInputCustom} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit"
                    onClick={clickSave} 
                    className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );
}

export default UpdateSubjectTeacher;