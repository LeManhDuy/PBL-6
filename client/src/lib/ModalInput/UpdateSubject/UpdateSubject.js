import React, { useState, useEffect } from "react";
import "./UpdateSubject.css";
import SubjectService from "../../../config/service/SubjectService";

const UpdateSubject = (props) => {
    const [allValuesSubject, setAllValuesSubject] = useState({
        name: ""
    });

    useEffect(() => {
        getSubjectById();
    },[])

    const getSubjectById = () => {
        SubjectService.getSubjectById(props.SubjectId).then((res)=>{
            setAllValuesSubject({
                name: res.getSubjectInfor[0].subject_name
            })
        })
    }

    const [subjectError, setSubjectError] = useState({
        name: false
    });

    const handleUpdateSubject = () => {
        let name = false;
        let check = false;
        if (
            allValuesSubject.name.length > 30 ||
            allValuesSubject.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        setSubjectError({
            name: name
        })
        if (!check) {
            props.handleConfirmUpdateSubject(allValuesSubject);
        }
    }

    const changeHandlerSubject = (e) => {
        setAllValuesSubject({
            ...allValuesSubject,
            [e.target.name]: e.target.value,
        });
    };



    const FormUpdateSubject = (
        <div className="form-admin-content">
            <h4>Edit Subject</h4>
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
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                        value={allValuesSubject.name}
                        onChange={changeHandlerSubject}
                        />
                        <label
                            className={
                                "error" +
                                (subjectError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This field is requied
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateSubject();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormUpdateSubject}
                <button onClick={props.handleInputCustom} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit"
                    onClick={clickUpdate} 
                    className="btn-ok">
                    Update
                </button>
            </div>
        </div>
    );
}

export default UpdateSubject;