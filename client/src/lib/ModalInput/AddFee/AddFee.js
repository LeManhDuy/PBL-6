import React, { useState, useEffect } from "react";
import FeeCategoryService from "../../../config/service/FeeCategoryService";
import PupilService from "../../../config/service/StudentService";
import "./AddFee.css";

const AddFee = (props) => {
    let date = new Date().toLocaleDateString();
    const [feeCategory, setFeeCategory] = useState([]);
    const [pupil, setPupil] = useState([]);
    const [feeCategoryDropValue, setFeeCategoryDropValue] = useState();
    const [pupilDropValue, setPupilDropValue] = useState();
    const [allValuesFee, setAllValuesFee] = useState({
        fee_status: "",
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
        paid_date: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        fee_category: "",
        pupil: "",
    });
    const [FeeError, setFeeError] = useState({
        fee_status: false,
        start_date: false,
        end_date: false,
        paid_date: false,
        fee_category: false,
        pupil: false,
    });

    useEffect(() => {
        getFeeCategory();
        getPupil();
    }, []);

    const getFeeCategory = () => {
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        fee_category: item.fee_name,
                    };
                });
                setFeeCategory(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPupil = () => {
        PupilService.getPupils()
            .then((response) => {
                const dataSources = response.getPuilInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        pupil: item.pupil_name,
                    };
                });
                setPupil(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changeHandlerFee = (e) => {
        setAllValuesFee({
            ...allValuesFee,
            [e.target.name]: e.target.value,
        });
        if (e.target.value === "true") {
            document.getElementById("paiddate").classList.remove("hidden");
        }
        if (e.target.value === "false") {
            document.getElementById("paiddate").classList.add("hidden");
        }
    };

    const FeeCategoryDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-Fee"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    FeeCategory
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.fee_category}
                        data-key={option.id}
                    >
                        {option.fee_category}
                    </option>
                ))}
            </select>
        );
    };

    const PupilDropDown = ({ value, options, onChange }) => {
        return (
            <select
                className="dropdown-Fee"
                value={value}
                onChange={onChange}
            >
                <option key={10000} value="Pick">
                    Pupils
                </option>
                {options.map((option) => (
                    <option
                        key={option.key}
                        value={option.pupil}
                        data-key={option.id}
                    >
                        {option.pupil}
                    </option>
                ))}
            </select>
        );
    };

    const handleFeeCategoryChange = (event) => {
        setFeeCategoryDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesFee({
                ...allValuesFee,
                fee_category: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        } else {
            setAllValuesFee({
                ...allValuesFee,
                teacher: null,
            })
        }
    };

    const handlePupilChange = (event) => {
        setPupilDropValue(event.target.value);
        if (event.target.value !== "Pick") {
            setAllValuesFee({
                ...allValuesFee,
                pupil: event.target.options[
                    event.target.selectedIndex
                ].getAttribute("data-key"),
            });
        } else {
            setAllValuesFee({
                ...allValuesFee,
                grade: null,
            })
        }
    };


    const FormFee = (
        <div className="form-admin-content">
            <h4>Add Fee</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                Add Failed.
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
                            value={allValuesFee.start_date}
                            onChange={changeHandlerFee}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.start_date
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
                            value={allValuesFee.end_date}
                            onChange={changeHandlerFee}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.end_date
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid End Date
                        </label>
                    </div>
                    {/* show type-input */}
                    <div className="type-input hidden" id="paiddate">
                        <h4>Paid Date</h4>
                        <input
                            className="input-content"
                            type="date"
                            name="paid_date"
                            placeholder="Enter Paid Date"
                            value={allValuesFee.paid_date}
                            onChange={changeHandlerFee}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.paid_date
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid End Date
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Status</h4>
                        <div className="radio-btn">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value={true}
                                    name="fee_status"
                                    onChange={changeHandlerFee}
                                />
                                Paid
                                <input
                                    type="radio"
                                    value={false}
                                    name="fee_status"
                                    onChange={changeHandlerFee}
                                />
                                UnPaid
                            </div>
                            <label
                                className={
                                    "error" +
                                    (FeeError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No status is selected
                            </label>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input">
                        <h4>Fee Category</h4>
                        <FeeCategoryDropDown
                            options={feeCategory}
                            value={feeCategoryDropValue}
                            onChange={handleFeeCategoryChange}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.fee_category
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Fee Category
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Pupil</h4>
                        <PupilDropDown
                            options={pupil}
                            value={pupilDropValue}
                            onChange={handlePupilChange}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.pupil
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Pupil
                        </label>
                    </div>
                </div>
            </div>
        </div >
    );

    const handleAddFee = () => {
        let check = false;
        let fee_status = false
        let start_date = false
        let end_date = false
        let paid_date = false
        let fee_category = false
        let pupil = false

        let dateNow = new Date().toLocaleDateString()
        let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[0] < 10
            ? "0" + dateNow.split("/")[0]
            : dateNow.split("/")[0]
            }-${dateNow.split("/")[1] < 10
                ? "0" + dateNow.split("/")[1]
                : dateNow.split("/")[1]
            }`;
        // if (!allValuesFee.fee_status) {
        //     fee_status = true;
        //     check = true;
        // } else fee_status = false;
        // console.log("Hello fee_status", check);
        if (dateConvert < allValuesFee.start_date) {
            start_date = true;
            check = true;
        } else start_date = false;
        if (dateConvert < allValuesFee.end_date) {
            end_date = true;
            check = true;
        } else end_date = false;
        if (dateConvert < allValuesFee.paid_date) {
            paid_date = true;
            check = true;
        } else paid_date = false;
        if (!allValuesFee.fee_category) {
            fee_category = true;
            check = true
        } else {
            fee_category = false
        }
        if (!allValuesFee.pupil) {
            pupil = true;
            check = true
        } else {
            pupil = false
        }
        // if (allValuesFee.fee_status == "false") {
        //     allValuesFee.paid_date = null;
        //     paid_date = false
        // }

        setFeeError({
            fee_status: fee_status,
            start_date: start_date,
            end_date: end_date,
            paid_date: paid_date,
            fee_category: fee_category,
            pupil: pupil
        })
        if (!check) {
            props.handleConfirmAddFee(allValuesFee);
        }
    }

    const clickSave = (e) => {
        e.preventDefault();
        handleAddFee();
    };

    const FormAddFee = (
        <div className="form-add-account">
            {FormFee}
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button type="submit" onClick={clickSave} className="btn-ok">
                Save
            </button>
        </div>
    );

    return (
        <div className="add-account-form">{FormAddFee}</div>
    );

}

export default AddFee;