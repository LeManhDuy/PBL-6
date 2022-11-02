import React, { useState, useEffect } from "react";
import "./AddSubject.css";

const AddSubject = (props) => {
    const [allValuesSubject, setAllValuesSubject] = useState({
        name: ""
    });

    const [subjectError, setSubjectError] = useState({
        name: false
    });

    const handleAddSubject = () => {
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
            props.handleConfirmAddSubject(allValuesSubject);
        }
    }

    const changeHandlerSubject = (e) => {
        setAllValuesSubject({
            ...allValuesSubject,
            [e.target.name]: e.target.value,
        });
    };



    const FormAddSubject = (
        <div className="form-admin-content">
            <h4>Add Subject</h4>
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
                            placeholder="Enter Name"
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

    const clickSave = (e) => {
        e.preventDefault();
        handleAddSubject();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddSubject}
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

export default AddSubject;