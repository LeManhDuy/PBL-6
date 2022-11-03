import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./UpdatePeriod.css";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";
import SubjectTeacherService from "../../../config/service/SubjectTeacherService";
import PeriodService from "../../../config/service/PeriodService";

const UpdatePeriod = (props) => {
    const [state, setState] = useState([]) 
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
    const [currentPeriod, setCurrentPeriod] = useState()



    useEffect(() => {
        getSubject();
        getTeachers();
        getSubjectTeachers();
        getSubjectTeachersById();
    }, [state]);

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
                            name: item.person_id.person_fullname,
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

    const getSubjectTeachersById = () => {
        PeriodService.getPeriodById(props.period_id)
            .then((response) => {
                const dataSources = {
                        key: 1,
                        id: response.period._id,
                        period_date: response.period.period_date,
                        period_number: response.period.period_number,
                        subject_teacher_id: response.period.subject_teacher_id._id,
                        subject_id: response.period.subject_teacher_id.subject_id._id,
                        subject_name: response.period.subject_teacher_id.subject_id.subject_name,
                        teacher_id: response.period.subject_teacher_id.teacher_id._id,
                        teacher_name: response.period.subject_teacher_id.teacher_id.person_id.person_fullname,
                        schedule_id: response.period.schedule_id
                    }
                setCurrentPeriod(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    }


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
        }else if(currentPeriod){
            return (
                <div>
                    <p className="text-justify">Teacher Name: {currentPeriod.teacher_name}</p>
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
        else if(currentPeriod){
            return (
                <div>
                    <p className="text-justify">Subject Id: {currentPeriod.subject_id}</p>
                    <p className="text-justify">Subject Name: {currentPeriod.subject_name}</p>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h4>Empty</h4>
                </div>

            )
        }
    }

    const handleTeacherChange = (event) => {
        
        if (event.value !== 'All'){
            const filteredSubjectTeacher = subjectTeachers.filter((x) => {return x.teacher_id === event.value})
            .map(x => x.subject_id)
            const fSubject = subjects.filter((x) => {return filteredSubjectTeacher.includes(x.id)})
            // console.log(fSubject)
            setFilteredSubject(fSubject)
            const st = subjectTeachers.filter((x) => {
                return x.teacher_id === event.value && x.subject_id === currentPeriod.subject_id
            })
            console.log(event.value)
            console.log(currentPeriod)
            console.log(st[0])
            if(st[0]){
                setTeacherDropValue(event);
                setCurrentPeriod({
                    ...currentPeriod,
                    subject_teacher_id: st[0].id,
                    teacher_id: st[0].teacher_id
                })
            }
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
            const st = subjectTeachers.filter((x) => {
                return x.subject_id === event.value && x.teacher_id === currentPeriod.teacher_id
            })
            console.log(event.value)
            console.log(currentPeriod)
            console.log(st[0])
            if(st[0]){
                setSubjectDropValue(event);
                setCurrentPeriod({
                    ...currentPeriod,
                    subject_teacher_id: st[0].id,
                    subject_id: st[0].subject_id
                })
            }
        }
        setSubjectTeacherError({
            ...subjectTeacherError,
            subject_id: false
        })
    }

    const handleDeletePeriod = () => {
        props.handleConfirmDeletePeriod(currentPeriod.id)
    }

    const handleUpdatePeriod = () => {
        // console.log(teacherDropValue)
        // console.log(subjectDropValue)
        let teacher_id_error = false;
        let subject_id_error = false;
        let has_error = false;

        if (!currentPeriod.teacher_id) {
            teacher_id_error = true;
            has_error = true;
        } else teacher_id_error = false;
        if (!currentPeriod.subject_id) {
            subject_id_error = true;
            has_error = true;
        } else subject_id_error = false;
        setSubjectTeacherError({
            teacher_id: teacher_id_error,
            subject_id: subject_id_error
        })
        if (!has_error) {
            // let subject_teacher_id = subjectTeachers.filter((x) => {
            //     return x.teacher_id === teacherDropValue.value && x.subject_id === subjectDropValue.value
            // })[0].id
            // console.log(subject_teacher_id)
            props.handleConfirmUpdatePeriod({
                id: currentPeriod.id,
                params: {
                    period_date: currentPeriod.period_date,
                    period_number: currentPeriod.period_number,
                    subject_teacher_id: currentPeriod.subject_teacher_id,
                    schedule_id: currentPeriod.schedule_id
                }
            });
        }
    }
    
  


    const FormAddSubjectTeacher = (
        <div className="form-admin-content">
            <h4>Update Period</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content" style={{height:500}}>
                <div className="period-content-right">
                    <div className="type-input">
                        <h4>Teacher</h4>
                        <Select
                            className="dropdown-class"
                            classNamePrefix="select"
                            options={filteredTeacher}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            placeholder={currentPeriod?teachers.find(x=>x.id===currentPeriod.teacher_id).label:"Teacher"}

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
                            <TeacherInfo teacherInfo={teacherDropValue ? teacherDropValue.info : null}/>
                        </div>
                        
                    </div>
                </div>
                <div className="period-content-left">
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
                            placeholder={currentPeriod?subjects.find(x=>x.id===currentPeriod.subject_id).name:"Subject"}
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
                            <SubjectInfo subjectInfo={subjectDropValue ? subjectDropValue : 'All'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const clickSave = (e) => {
        e.preventDefault();
        handleUpdatePeriod();
    }

    const clickDelete = (e) =>{
        e.preventDefault();
        handleDeletePeriod();
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
                <button type="submit"
                    onClick={clickDelete} 
                    className="btn-dark">
                    Delete
                </button>
            </div>
        </div>
    );
}

export default UpdatePeriod;