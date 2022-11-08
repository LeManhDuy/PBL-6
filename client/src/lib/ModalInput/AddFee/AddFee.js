import React, { useState, useEffect } from "react"
import FeeCategoryService from "../../../config/service/FeeCategoryService"
import GradeService from "../../../config/service/GradeService"
import ClassService from "../../../config/service/ClassService"
import "./AddFee.css"
import Select from 'react-select'

const AddFee = (props) => {
    let date = new Date().toLocaleDateString()
    const [feeCategory, setFeeCategory] = useState([])
    const [pupil, setPupil] = useState([])
    const [grade, setGrade] = useState([])
    const [classroom, setClassroom] = useState([])
    const [feeCategoryDropValue, setFeeCategoryDropValue] = useState()
    const [classDropValue, setClassDropValue] = useState()
    const [gradeDropValue, setGradeDropValue] = useState()
    const [pupilDropValue, setPupilDropValue] = useState()
    const [allValuesFee, setAllValuesFee] = useState({
        fee_status: "",
        paid_date: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        fee_category: "",
        pupil: "",
        grade: "",
        gradeName: "",
        classroom: "",
        fee_amount: "",
    })
    const [FeeError, setFeeError] = useState({
        fee_status: false,
        paid_date: false,
        fee_category: false,
        pupil: false,
        grade: false,
        classroom: false,
        fee_amount: false,
    })

    useEffect(() => {
        getFeeCategory()
        getPupil()
        getGrades()
        getClasses()
    }, [])

    const getFeeCategory = () => {
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map(
                    (item, index) => {
                        return {
                            value: item._id,
                            label: item.fee_name,
                            fee_amount: item.fee_amount
                        }
                    }
                )
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setFeeCategory(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getPupil = (studentID) => {
        ClassService.getStudentByClassID(studentID)
            .then((response) => {
                const dataSources = response.studentsInfor.map((item, index) => {
                    return {
                        //key: index + 1,
                        value: item ? item._id : null,
                        label: item ? item.pupil_name : null
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setPupil(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getGrades = () => {
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrade.map((item, index) => {
                    return {
                        value: item._id,
                        label: item.grade_name,
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setGrade(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getClasses = (gradeID) => {
        GradeService.getClassByGradeId(gradeID)
            .then((response) => {
                const dataSources = response.getClassByGradeId.map((item, index) => {
                    return {
                        //key: index + 1,
                        value: item._id,
                        label: item.class_name,
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,);
                setClassroom(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const changeHandlerFee = (e) => {
        setAllValuesFee({
            ...allValuesFee,
            [e.target.name]: e.target.value,
        })
        if (e.target.value === "true") {
            document.getElementById("paiddate").classList.remove("hidden")
        }
        if (e.target.value === "false") {
            document.getElementById("paiddate").classList.add("hidden")
        }
    }

    const handleFeeCategoryChange = (event) => {
        setFeeCategoryDropValue(event)
        setAllValuesFee({
            ...allValuesFee,
            fee_category: event.value,
            fee_amount: event.fee_amount
        })
    }

    const handlePupilChange = (event) => {
        setPupilDropValue(event)
        setAllValuesFee({
            ...allValuesFee,
            pupil: event.value
        })
    }

    const handleGradeChange = (event) => {
        let gradeID = null;
        setGradeDropValue(event)
        setAllValuesFee({
            ...allValuesFee,
            grade: event.value,
            gradeName: event.label
        })
        gradeID = event.value
        getClasses(gradeID)
    }

    const handleClassChange = (event) => {
        let studentID = null;
        setClassDropValue(event)
        setAllValuesFee({
            ...allValuesFee,
            classroom: event.value
        })
        studentID = event.value
        getPupil(studentID)
    }

    const CheckList = ({ options }) => {
        return (
            <div>
                {options.map(option => (
                    <div key={option.key}>
                        <input type="checkbox" className="btn-check"
                            id={option.key} autoComplete="off"
                        // checked={listSubject[option.id]}
                        // onChange={() => {
                        //     setListSubject({
                        //         ...listSubject,
                        //         [option.id]: !listSubject[option.id]
                        //     })
                        // }}
                        />
                        <label className="btn btn-outline-primary"
                            htmlFor={option.key}
                            style={{
                                width: "300px"
                            }}
                        >
                            {option.label}
                        </label><br />
                    </div>
                ))}

            </div>
        );
    }

    const FormFee = (
        <div className="form-admin-content">
            <h4>Add Fee</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content-fee" style={{ height: 430 }}>
                <div className="teacher-content-left-fee">
                    <div className="type-input">
                        <h4>Fee Category</h4>
                        <Select
                            className="dropdown-class"
                            value={feeCategoryDropValue}
                            onChange={handleFeeCategoryChange}
                            options={feeCategory}
                            placeholder="Fee Category"
                            maxMenuHeight={200}
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
                        <h4>Fee Ammount</h4>
                        <input
                            className="input-content-fee"
                            placeholder="Fee Ammount"
                            value={allValuesFee.fee_amount}
                            disabled
                        />
                    </div>
                    <div className="type-input" id="paiddate">
                        <h4>Paid Date</h4>
                        <input
                            className="input-content date"
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
                            Invalid Paid Date
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
                <div className="teacher-content-center-fee">
                    <div className="type-input">
                        <h4>Grade</h4>
                        <Select
                            className="dropdown-class"
                            value={gradeDropValue}
                            onChange={handleGradeChange}
                            options={grade}
                            placeholder="Grade's Name"
                            maxMenuHeight={200}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.grade
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Grade
                        </label>
                    </div>
                    <div className="type-input">
                        <h4>Class</h4>
                        <Select
                            className="dropdown-class"
                            value={classDropValue}
                            onChange={handleClassChange}
                            options={classroom}
                            placeholder="Grade - Class"
                            maxMenuHeight={200}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.classroom
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Class
                        </label>
                    </div>

                </div>
                <div className="teacher-content-right-fee">
                    <div className="type-input">
                        <h4>Pupil</h4>
                        <CheckList
                            options={pupil}
                        />
                        {/* <Select
                            className="dropdown-class"
                            value={pupilDropValue}
                            onChange={handlePupilChange}
                            options={pupil}
                            placeholder="Name - Class"
                            maxMenuHeight={135}
                        //isMulti={true}
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
                        </label> */}
                    </div>

                </div>
            </div>
        </div>
    )

    const handleAddFee = () => {
        let check = false
        let fee_status = false
        let paid_date = false
        let fee_category = false
        let pupil = false

        // let dateNow = new Date().toLocaleDateString()
        // let dateConvert = `${dateNow.split("/")[2]}-${dateNow.split("/")[0] < 10
        //     ? "0" + dateNow.split("/")[0]
        //     : dateNow.split("/")[0]
        //     }-${dateNow.split("/")[1] < 10
        //         ? "0" + dateNow.split("/")[1]
        //         : dateNow.split("/")[1]
        //     }`
        // if (!allValuesFee.fee_status) {
        //     fee_status = true
        //     check = true
        // } else fee_status = false
        // console.log("Hello fee_status", check)
        // if (allValuesFee.paid_date < allValuesFee.start_date) {
        //     paid_date = true
        //     check = true
        // } else paid_date = false

        if (!allValuesFee.fee_category) {
            fee_category = true
            check = true
        } else {
            fee_category = false
        }
        if (!allValuesFee.pupil) {
            pupil = true
            check = true
        } else {
            pupil = false
        }
        // if (allValuesFee.fee_status == "false") {
        //     allValuesFee.paid_date = null
        //     paid_date = false
        // }

        setFeeError({
            fee_status: fee_status,

            paid_date: paid_date,
            fee_category: fee_category,
            pupil: pupil,
        })
        if (!check) {
            props.handleConfirmAddFee(allValuesFee)
        }
    }

    const clickSave = (e) => {
        e.preventDefault()
        handleAddFee()
    }

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
    )

    return <div className="add-account-form">{FormAddFee}</div>
}

export default AddFee
