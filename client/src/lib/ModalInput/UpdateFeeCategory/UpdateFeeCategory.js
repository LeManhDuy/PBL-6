import React, { useState, useEffect } from "react";
import "./UpdateFeeCategory.css";
import FeeCategoryService from "../../../config/service/FeeCategoryService";

const UpdateFeeCategory = (props) => {
    const [allValuesFeeCategory, setAllValuesFeeCategory] = useState({
        name: "",
        ammount: ""
    });

    useEffect(() => {
        getFeeCategoryById();
    }, [])

    const getFeeCategoryById = () => {
        FeeCategoryService.getFeeCategoryById(props.FeeCategoryId).then((res) => {
            console.log(res);
            setAllValuesFeeCategory({
                name: res.getFeeCategoryInfor[0].fee_name,
                ammount: res.getFeeCategoryInfor[0].fee_amount
            })
        })
    }

    const [FeeCategoryError, setFeeCategoryError] = useState({
        name: false,
        ammount: false,
        check: false
    });

    const handleUpdateFeeCategory = () => {
        let name = false;
        let check = false;
        let ammount = false;
        if (
            allValuesFeeCategory.name.length > 30 ||
            allValuesFeeCategory.name.length < 2
        ) {
            name = true;
            check = true;
        } else name = false;

        setFeeCategoryError({
            name: name,
            ammount: ammount
        })
        if (!check) {
            props.handleConfirmUpdateFeeCategory(allValuesFeeCategory);
        }
    }

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
                Update failed.
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
                        <h4>Fee Ammount</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="ammount"
                            placeholder="Enter fee ammount"
                            value={allValuesFeeCategory.ammount}
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
            </div>
        </div>
    );

    const clickUpdate = (e) => {
        e.preventDefault();
        handleUpdateFeeCategory();
    }

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                {FormAddFeeCategory}
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

export default UpdateFeeCategory;