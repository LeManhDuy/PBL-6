import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./AddPeriod.css";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";
import SubjectTeacherService from "../../../config/service/SubjectTeacherService";

const AddPeriod = (props) => {
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState ("All")
    const [subjectDropValue, setSubjectDropValue] = useState ("All")
    const [subjectTeachers, setSubjectTeachers] = useState([])
    const [filteredSubject, setFilteredSubject] = useState()
    const [filteredTeacher, setFilteredTeacher] = useState()
    const [subjectTeacherError, setSubjectTeacherError] = useState({
        subject_id: false,
        teacher_id: false,
    });



    useEffect(() => {
        getSubject();
        getTeachers();
        getSubjectTeachers()
    }, []);

    const getSubject = () => {
        SubjectService.getSubject()
            .then((response) => {
                const dataSources = response.allSubject.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.subject_name,
                            value: item._id,
                            label: item.subject_name
                        }
                    }
                );
                setSubject(dataSources);
                setFilteredSubject(dataSources)
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
                            value: item._id,
                            label: item.person_id.person_fullname +'-'+item.person_id.person_email,
                            info: item.person_id
                        };
                    }
                );
                setTeacher(dataSources);
                setFilteredTeacher(dataSources)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubjectTeachers = () => {
        SubjectTeacherService.getSubjectTeacher()
            .then((response) => {
                const dataSources = response.allSubjectTeacher.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            subject_id: item.subject_id._id,
                            teacher_id: item.teacher_id._id
                        };
                    }
                );
                setSubjectTeachers(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TeacherInfo = ({teacherInfo}) => {
        if(teacherInfo){
            return (
                <div>
                    <p className="text-justify">Teacher Name: {teacherInfo.person_fullname}</p>
                    <p className="text-justify">Teacher Email: {teacherInfo.person_email}</p>
                    <p className="text-justify">Teacher Gender: {teacherInfo.person_gender?'Male':'Female'}</p>
                    <p className="text-justify">Teacher Phone: {teacherInfo.person_phonenumber}</p>
                </div>
            )
        }
        else{
            return(
                <div style={{zIndex:-1}}>
                    <h4>Empty</h4>
                </div>

            )
        }
    }

    const SubjectInfo = ({subjectInfo}) => {
        if(subjectInfo!=='All'){
            return (
                <div>
                    <p className="text-justify">Subject Id: {subjectInfo.id}</p>
                    <p className="text-justify">Subject Name: {subjectInfo.name}</p>
                </div>
            )
        }
        else{
            return(
                <div style={{zIndex:-1}}>
                    <h4>Empty</h4>
                </div>

            )
        }
    }

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event);
        if (event.value !== 'All'){
            const filteredSubjectTeacher = subjectTeachers.filter((x) => {return x.teacher_id === event.value})
            .map(x => x.subject_id)
            const fSubject = subjects.filter((x) => {return filteredSubjectTeacher.includes(x.id)})
            // console.log(fSubject)
            setFilteredSubject(fSubject)
        }
        setSubjectTeacherError({
            ...subjectTeacherError,
            teacher_id: false
        })
    }

    const handleSubjectChange = (event) => {
        setSubjectDropValue(event);
        if (event.value !== 'All'){
            const filteredSubjectTeacher = subjectTeachers.filter((x) => {return x.subject_id === event.value})
            .map(x => x.teacher_id)
            const fTeacher = teachers.filter((x) => {return filteredSubjectTeacher.includes(x.id)})
            // console.log(fTeacher)
            setFilteredTeacher(fTeacher)
        }
        setSubjectTeacherError({
            ...subjectTeacherError,
            subject_id: false
        })
    }

    const handleAddPeriod = () => {
        // console.log(teacherDropValue)
        // console.log(subjectDropValue)
        let teacher_id_error = false;
        let subject_id_error = false;
        let has_error = false;

        if (teacherDropValue==='All') {
            teacher_id_error = true;
            has_error = true;
        } else teacher_id_error = false;
        if (subjectDropValue==='All') {
            subject_id_error = true;
            has_error = true;
        } else subject_id_error = false;
        setSubjectTeacherError({
            teacher_id: teacher_id_error,
            subject_id: subject_id_error
        })
        if (!has_error) {
            let subject_teacher_id = subjectTeachers.filter((x) => {
                return x.teacher_id === teacherDropValue.value && x.subject_id === subjectDropValue.value
            })[0].id
            // console.log(subject_teacher_id)
            props.handleConfirmAddPeriod(subject_teacher_id);
        }
    }
    
  


    const FormAddSubjectTeacher = (
        <div className="form-admin-content">
            <h4>Add Period</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content" style={{height:500}}>
                <div className="period-content-left">
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <Select
                            className="dropdown-class"
                            classNamePrefix="select"
                            options={filteredTeacher}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            placeholder="Teacher"
                            // maxMenuHeight={200}
                            // isClearable={true}
                            isSearchable={true}
                        />
                        <label
                            style={{marginTop:50}}
                            className={
                                "error" +
                                (subjectTeacherError.teacher_id
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Teacher
                        </label>
                        <div style={{marginTop:50}}>
                            <TeacherInfo teacherInfo={teacherDropValue.info}/>
                        </div>
                        
                    </div>
                </div>
                <div className="period-content-right">
                    <div className="type-input">
                    <h4>Subject</h4>
                        <Select
                            className="dropdown-class"
                            // label="Teacher"
                            classNamePrefix="select"
                            options={filteredSubject}
                            // isMulti
                            value={subjectDropValue}
                            onChange={handleSubjectChange}
                            placeholder="Subject"
                            maxMenuHeight={350}
                            // isClearable={true}
                            isSearchable={true}
                        />
                        <label
                            style={{marginTop:50}}
                            className={
                                "error" +
                                (subjectTeacherError.subject_id
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Subject
                        </label>
                        <div style={{marginTop:50}}>
                            <SubjectInfo subjectInfo={subjectDropValue}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const clickSave = (e) => {
        e.preventDefault();
        handleAddPeriod();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddSubjectTeacher}
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

export default AddPeriod;