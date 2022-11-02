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
    const [teacherDropValue, setTeacherDropValue] = useState ()
    const [listSubject, setListSubject] = useState([])
    const [subjectTeacherError, setSubjectTeacherError] = useState({
        subject_id: false,
        teacher_id: false,
    });


    useEffect(() => {
        getSubject();
        getTeachers();
        SubjectTeacherService.getSubjectTeacherById({subject_teacher_id:"",subject_id:"",teacher_id:props.TeacherId})
            .then((res)=>{
            setTeacherDropValue(res.allSubjectTeacher[0].teacher_id._id)
            const subject_list = res.allSubjectTeacher.map(subject_teacher => subject_teacher.subject_id._id)
            const l = {}
            for(let s of subject_list){
                l[s] = true
            }     
            setListSubject(l)
        });
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

    const Dropdown = ({ value, options, onChange}) => {
        return (
          <label>
            {/* <input list="brow"/> */}
            <select className="dropdown-account" defaultValue={value} onChange={onChange}>
              {/* <option value="All">All</option> */}
              {options.map((option) => (
                <option 
                    key={option.key} 
                    value={option.id} 
                    // selected={selectedValue === option.id}
                >
                  {option.name}
                  
                </option>
              ))}
            </select>
          </label>
        );
    };
    const CheckList = ({ options }) => {
        return (
            <div>
                {options.map(option => (
                    // <CheckObj option={option} key={option.key}/>

                    <div key={option.id}>
                        <input type="checkbox" className="btn-check" 
                        id={option.key} autoComplete="off"
                        checked={listSubject[option.id]}
                        onChange={()=>{
                            setListSubject({
                                ...listSubject,
                                [option.id]: !listSubject[option.id]
                            })
                        }}
                        />
                        <label className="btn btn-outline-primary"
                            htmlFor={option.key}
                            style={{
                                width: "100%"
                            }}
                        >
                            {option.name}
                        </label><br />
                    </div>
                ))}
                
            </div>
        );
    }

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event.target.value);
        if (event.target.value !== 'All'){
            setAllValuesSubjectTeacher({
                ...allValuesSubjectTeacher,
                teacher_id: event.target.value,
            });
        }
    }

    const handleUpdateSubjectTeacher = () => {
        let teacher_id_error = false;
        let has_error = false;

        if (teacherDropValue==='All') {
            teacher_id_error = true;
            has_error = true;
        } else teacher_id_error = false;
        setSubjectTeacherError({
            teacher_id: teacher_id_error,
        })
        if (!has_error) {
            props.handleConfirmUpdateSubjectTeacher(teacherDropValue,listSubject);
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
                        <h4>Teacher</h4>
                        <h4>{teacherDropValue}</h4>
                        {/* <Dropdown
                            options={teachers}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                        /> */}
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
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Teaching Subject</h4>
                        <CheckList 
                            // key={subjects.id}
                            options={subjects}
                        />
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