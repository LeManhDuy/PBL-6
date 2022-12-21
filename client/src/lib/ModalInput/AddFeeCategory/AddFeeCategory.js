import React, { useState, useEffect } from "react";
import "./AddFeeCategory.css";
import { NumericFormat } from 'react-number-format';

const AddFeeCategory = (props) => {
    let date = new Date().toLocaleDateString()
    const [allValuesFeeCategory, setAllValuesFeeCategory] = useState({
        name: "",
        start_date: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        end_date: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        ammount: "",
    });

    const [FeeCategoryError, setFeeCategoryError] = useState({
        name: false,
        start_date: false,
        end_date: false,
        ammount: false,
    });

    const handleAddFeeCategory = () => {
        let name = false;
        let ammount = false;
        let start_date = false
        let end_date = false
        let check = false;

        if (allValuesFeeCategory.start_date > allValuesFeeCategory.end_date) {
            start_date = true
            check = true
        } else start_date = false

        if (allValuesFeeCategory.end_date < allValuesFeeCategory.start_date) {
            end_date = true
            check = true
        } else end_date = false
        if (
            allValuesFeeCategory.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        setFeeCategoryError({
            name: name,
            start_date: start_date,
            end_date: end_date,
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
                        <h4>Start Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="start_date"
                            placeholder="Enter Start Date"
                            value={allValuesFeeCategory.start_date}
                            onChange={changeHandlerFeeCategory}
                        />
                        <label
                            className={
                                "error" +
                                (FeeCategoryError.start_date
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Start Date
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>End Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="end_date"
                            placeholder="Enter End Date"
                            value={allValuesFeeCategory.end_date}
                            onChange={changeHandlerFeeCategory}
                        />
                        <label
                            className={
                                "error" +
                                (FeeCategoryError.end_date
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid End Date
                        </label>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Fee Name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter Fee Name"
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
                    <div className="type-input">
                        <h4>Fee Amount</h4>
                        <NumericFormat
                            className="input-content"
                            type="text"
                            name="ammount"
                            placeholder="Enter Fee Amount"
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
