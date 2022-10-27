import React, { useState, useEffect } from "react";
import "./AddGrade.css";

const AddGrade = (props) => {
    const [allValuesGrade, setAllValuesGrade] = useState({
        name: ""
    });

    const [gradeError, setGradeError] = useState({
        name: false
    });

    const handleAddGrade = () => {
        let name = false;
        let check = false;
        if (
            allValuesGrade.name.length > 30
        ) {
            name = true;
            check = true;
        } else name = false;

        setGradeError({
            name: name
        })
        if (!check) {
            props.handleConfirmAddGrade(allValuesGrade);
        }
    }

    const changeHandlerGrade = (e) => {
        setAllValuesGrade({
            ...allValuesGrade,
            [e.target.name]: e.target.value,
        });
    };



    const FormAddGrade = (
        <div className="form-admin-content">
            <h4>Add Grade</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Grade already exists
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="type-input">
                        <h4>Name</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesGrade.name}
                            onChange={changeHandlerGrade}
                        />
                        <label
                            className={
                                "error" +
                                (gradeError.name
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
        handleAddGrade();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddGrade}
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

export default AddGrade;