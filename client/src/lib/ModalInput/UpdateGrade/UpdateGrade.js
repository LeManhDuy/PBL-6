import React, { useState, useEffect } from "react";
import "./UpdateGrade.css";
import GradeService from "../../../config/service/GradeService";

const UpdateGrade = (props) => {
    const [allValuesGrade, setAllValuesGrade] = useState({
        name: ""
    });

    useEffect(() => {
        getGradeById();
    },[])

    const getGradeById = () => {
        GradeService.getGradeById(props.GradeId).then((res)=>{
            setAllValuesGrade({
                name: res.getGradeInfor[0].grade_name
            })
        })
    }

    const [gradeError, setGradeError] = useState({
        name: false
    });

    const handleUpdateGrade = () => {
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
            props.handleConfirmUpdateGrade(allValuesGrade);
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
            <h4>Update Grade</h4>
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
                            type="text"
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

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateGrade();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddGrade}
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

export default UpdateGrade;