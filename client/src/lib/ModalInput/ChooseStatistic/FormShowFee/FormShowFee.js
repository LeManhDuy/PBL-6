import React, { useState, useEffect } from "react";
import GradeService from "../../../../config/service/GradeService"
import ClassService from "../../../../config/service/ClassService"
import FeeCategoryService from "../../../../config/service/FeeCategoryService"
import Select from 'react-select'
import "./FormShowFee.css";

const FormShowFee = (props) => {
    const [grades, setGrade] = useState([])
    const [fees, setFee] = useState([])
    const [classroom, setClass] = useState([])
    const [feeError, setFeeError] = useState({
        grade: false,
        classroom: false,
        fee: false,
    })
    const [allValuesFee, setAllValuesFee] = useState({
        fee_amount: "",
    })
    const [dropValueGrade, setDropValueGrade] = useState({ value: "0", label: "All" })
    const [dropValueFee, setDropValueFee] = useState({ value: "0", label: "All" })
    const [dropValueClass, setDropValueClass] = useState({ value: "0", label: "All" })

    useEffect(() => {
        getGrade()
        getClass()
        getFee()
    }, [])
    const getGrade = () => {
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrade.map((item, index) => {
                    return {
                        value: item._id,
                        label: item ? item.grade_name : "Empty",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,)
                dataSourcesSorted.unshift({ value: "0", label: "All" })
                setGrade(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getClass = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClass.map((item, index) => {
                    return {
                        //key: index + 1,
                        value: item._id,
                        label: item.class_name ? item.class_name : "Empty",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,)
                dataSourcesSorted.unshift({ value: "0", label: "All" })
                setClass(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getClassWithFilter = (filter) => {
        GradeService.getClassByGradeId(filter)
            .then((response) => {
                const dataSources = response.getClassByGradeId.map((item) => {
                    return {
                        //key: index + 1,
                        value: item._id,
                        label: item.class_name ? item.class_name : "Empty",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,)
                dataSourcesSorted.unshift({ value: "0", label: "All" })
                setClass(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getFee = () => {
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map((item) => {
                    return {
                        value: item._id,
                        label: item ? item.fee_name : "Empty",
                        ammount: item ? item.fee_amount : "Empty",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,)
                dataSourcesSorted.unshift({ value: "0", label: "All" })
                setFee(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleChangeGrade = (event) => {
        setDropValueGrade(event)
        setDropValueClass({ value: "0", label: "All" })
        setDropValueFee({ value: "0", label: "All" })
        grades.map((item) => {
            if (event.value === item.value) {
                getClassWithFilter(item.value)
            }
        })
    }
    const handleChangeClass = (event) => {
        setDropValueClass(event)
    }
    const handleChangeFee = (event) => {
        setDropValueFee(event)
        setAllValuesFee({
            ...allValuesFee,
            fee_amount: event.ammount
        })
    }
    const clickSave = (e) => {
        let check = false
        let classroom = false;
        let fee = false
        let grade = false

        if (dropValueGrade === "All") {
            grade = true;
            check = true
        } else {
            grade = false;
            check = false
        }
        setFeeError({ classroom: classroom, fee: fee, grade: grade })
        if (!check) {
            props.handleShowFee(dropValueGrade, dropValueClass, dropValueFee);
        }
    };
    return (
        <div className="form-add-account">
            <div className="form-admin-content">
                <h4>Show Statistic Fee</h4>
                <div className="form-teacher-content" style={{ height: 400 }}>
                    <div className="teacher-content-left-show-score">
                        <div className="type-input">
                            <h4>Grade</h4>
                            <Select
                                options={grades}
                                className="dropdown-class score"
                                value={dropValueGrade}
                                onChange={handleChangeGrade}
                                placeholder="Grade"
                                maxMenuHeight={250}
                            />
                            <label
                                className={
                                    "error" +
                                    (feeError.grade
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                Invalid Grade
                            </label>
                        </div>
                        <div className="type-input class">
                            <h4>Class</h4>
                            <Select
                                options={classroom}
                                className="dropdown-class"
                                value={dropValueClass}
                                onChange={handleChangeClass}
                                placeholder="Class"
                                maxMenuHeight={175}
                            />
                        </div>
                    </div>
                    <div className="teacher-content-right-show-fee">
                        <div className="type-input">
                            <h4>Fee</h4>
                            <Select
                                options={fees}
                                className="dropdown-class score"
                                value={dropValueFee}
                                onChange={handleChangeFee}
                                placeholder="Fee's Name"
                                maxMenuHeight={250}
                            />
                        </div>
                        <div className="type-input class">
                            <h4>Fee Ammount</h4>
                            <input
                                className="input-content-fee"
                                placeholder="Fee Ammount"
                                value={allValuesFee.fee_amount}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Back
            </button>
            <button onClick={clickSave} className="btn-ok">
                Show
            </button>
        </div>

    );
};

export default FormShowFee;
