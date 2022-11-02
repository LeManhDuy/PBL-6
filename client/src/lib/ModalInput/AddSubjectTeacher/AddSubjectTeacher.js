import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./AddSubjectTeacher.css";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";
import SubjectTeacherService from "../../../config/service/SubjectTeacherService";

const AddSubjectTeacher = (props) => {
    const [allValuesSubjectTeacher, setAllValuesSubjectTeacher] = useState({
        teacher_id: "",
        subject_id: [],
    });
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [teacherDropValue, setTeacherDropValue] = useState ("All")
    const [subjectTeachers, setSubjectTeachers] = useState([])
    const [listSubject, setListSubject] = useState([])

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

    const Dropdown = ({ value, options, onChange }) => {
        return (
          <label>
            <select className="dropdown-account" defaultValue={value} onChange={onChange}>
              <option value="All">All</option>
              {options.map((option) => (
                <option key={option.key} value={option.id}>
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

                    <div key={option.key}>
                        <input type="checkbox" className="btn-check" 
                        
                        id={option.key} autoComplete="off"
                        checked={listSubject[option.id]}
                        onChange={()=>{
                            setListSubject({
                                ...listSubject,
                                [option.id]: !listSubject[option.id]
                            })
                            console.log(listSubject)
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
                <div>
                    <h4>Empty</h4>
                </div>

            )
        }
    }

    const handleTeacherChange = (event) => {
        setTeacherDropValue(event);
        if (event.value !== 'All'){
            let subjectList = {}
            const filtedSubject = subjectTeachers.filter((x) => {return x.teacher_id === event.value}).map(x => x.subject_id)
            for(let subject of filtedSubject){
                subjectList[subject] = true
            }
            setListSubject(subjectList)
            console.log(filtedSubject)
        }
        setSubjectTeacherError({
            ...subjectTeacherError,
            teacher_id: false
        })
    }

    const handleAddSubjectTeacher = () => {
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
            props.handleConfirmAddSubjectTeacher(teacherDropValue.value,listSubject);
        }
    }
    
  


    const FormAddSubjectTeacher = (
        <div className="form-admin-content">
            <h4>Add Subject Teacher</h4>
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
                        {/* <Dropdown
                            options={teachers}
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                        /> */}
                        <Select
                            className="dropdown-class"
                            // label="Teacher"
                            classNamePrefix="select"
                            options={teachers}
                            // isMulti
                            value={teacherDropValue}
                            onChange={handleTeacherChange}
                            placeholder="Teacher"
                            maxMenuHeight={200}
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
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Teaching Subject</h4>
                        <CheckList 
                            options={subjects}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const clickSave = (e) => {
        e.preventDefault();
        handleAddSubjectTeacher();
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

export default AddSubjectTeacher;