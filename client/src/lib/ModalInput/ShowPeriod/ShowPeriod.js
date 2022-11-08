import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./ShowPeriod.css";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";
import PeriodService from "../../../config/service/PeriodService";

const ShowPeriod = (props) => {
    const [state, setState] = useState([]) 
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState()

    useEffect(() => {
        getSubject();
        getTeachers();
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

    const SubjectInfo = () => {
        if(currentPeriod){
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

    const FormShowSubjectTeacher = (
        <div className="form-admin-content">
            <h4>Show Period</h4>
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
                            isDisabled
                            className="dropdown-class"
                            classNamePrefix="select"
                            placeholder={currentPeriod ? teachers.find(x=>x.id===currentPeriod.teacher_id).label : "Teacher"}
                            isSearchable={true}
                        /> 
                        <div style={{marginTop:50}}>
                            <TeacherInfo teacherInfo={currentPeriod ? teachers.find(x=>x.id===currentPeriod.teacher_id).info : null}/>
                        </div>
                        
                    </div>
                </div>
                <div className="period-content-left">
                    <div className="type-input">
                    <h4>Subject</h4>
                        <Select
                            isDisabled
                            className="dropdown-class"
                            // label="Teacher"
                            classNamePrefix="select"
                            // isMulti
                            placeholder={currentPeriod ? subjects.find(x=>x.id===currentPeriod.subject_id).name:"Subject"}
                            maxMenuHeight={350}
                            // isClearable={true}
                            isSearchable={true}
                        />
                        <div style={{marginTop:50}}>
                            <SubjectInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormShowSubjectTeacher}
                <button onClick={props.handleInputCustom} className="btn-cancel">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ShowPeriod;