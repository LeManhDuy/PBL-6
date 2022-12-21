import React, { useState, useEffect } from "react";
import "./UpdateFeeCategory.css";
import FeeCategoryService from "../../../config/service/FeeCategoryService";
import { NumericFormat } from 'react-number-format';
const UpdateFeeCategory = (props) => {
    let date = new Date().toLocaleDateString();
    const [allValuesFeeCategory, setAllValuesFeeCategory] = useState({
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
        name: "",
        ammount: "",
    });

    useEffect(() => {
        getFeeCategoryById();
    }, []);

    const getFeeCategoryById = () => {
        FeeCategoryService.getFeeCategoryById(props.FeeCategoryId).then(
            (res) => {
                setAllValuesFeeCategory({
                    name: res.getFeeCategoryInfor[0].fee_name,
                    start_date: res.getFeeCategoryInfor[0].start_date.split("T")[0],
                    end_date: res.getFeeCategoryInfor[0].end_date.split("T")[0],
                    ammount: res.getFeeCategoryInfor[0].fee_amount,
                });
            }
        );
    };

    const [FeeCategoryError, setFeeCategoryError] = useState({
        name: false,
        ammount: false,
        check: false,
        start_date: false,
        end_date: false,
    });

    const handleUpdateFeeCategory = () => {
        let name = false;
        let check = false;
        let start_date = false;
        let end_date = false;
        let ammount = false;
        if (allValuesFeeCategory.start_date > allValuesFeeCategory.end_date) {
            start_date = true;
            check = true;
        } else start_date = false;

        if (allValuesFeeCategory.end_date < allValuesFeeCategory.start_date) {
            end_date = true;
            check = true;
        } else end_date = false;
        if (
            allValuesFeeCategory.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        setFeeCategoryError({
            name: name,
            ammount: ammount,
            start_date: start_date,
            end_date: end_date,
        });
        if (!check) {
            props.handleConfirmUpdateFeeCategory(allValuesFeeCategory);
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
            <h4>Update Fee Category</h4>
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
                        <h4>Name</h4>
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

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateFeeCategory();
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
                <button type="submit" onClick={clickUpdate} className="btn-ok">
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateFeeCategory;
