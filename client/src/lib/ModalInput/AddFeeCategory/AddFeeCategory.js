import React, { useState, useEffect } from "react";
import "./AddFeeCategory.css";
import { NumericFormat } from 'react-number-format';

const AddFeeCategory = (props) => {
    const [allValuesFeeCategory, setAllValuesFeeCategory] = useState({
        name: "",
        ammount: "",
    });

    const [FeeCategoryError, setFeeCategoryError] = useState({
        name: false,
        ammount: false,
    });

    const handleAddFeeCategory = () => {
        let name = false;
        let ammount = false;
        let check = false;
        if (
            allValuesFeeCategory.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        setFeeCategoryError({
            name: name,
            ammount: ammount,
        });
        if (!check) {
            props.handleConfirmAddFeeCategory(allValuesFeeCategory);
        }
    };

    const changeHandlerFeeCategory = (e) => {
        setAllValuesFeeCategory({
            ...allValuesFeeCategory,
            [e.target.name]: e.target.value,
        });
    };
    const FormAddFeeCategory = (
        <div className="form-admin-content">
            <h4>Add Fee Category</h4>
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
                        <h4>Fee Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter fee name"
                            value={allValuesFeeCategory.name}
                            onChange={changeHandlerFeeCategory}
                        />
                        <label
                            className={
                                "error" +
                                (FeeCategoryError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            This field is requied
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right">
                <div className="type-input">
                        <h4>Fee Ammount</h4>
                        <NumericFormat
                            className="input-content"
                            type="text"
                            name="ammount"
                            placeholder="Enter fee ammount"
                            value={allValuesFeeCategory.ammount}
                            onChange={changeHandlerFeeCategory}
                            allowLeadingZeros
                            thousandSeparator=","
                        />
                        <label
                            className={
                                "error" +
                                (FeeCategoryError.name
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
        handleAddFeeCategory();
    };

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddFeeCategory}
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddFeeCategory;
