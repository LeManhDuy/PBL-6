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
    const [listPupil, setListPupil] = useState([])
    const [selectAll, setSelectAll] = useState(false)
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
                        key: index + 1,
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
        resetListPupil()
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
        resetListPupil()
    }

    const CheckList = ({ options }) => {
        return (
            <div className="div-scroll">
                {options.map(option => (
                    <div key={option.key}>
                        <input
                            name="pupil"
                            type="checkbox"
                            className="btn-check"
                            id={option.key}
                            //autoComplete="off"
                            checked={listPupil[option.value]}
                            onChange={() => {
                                setListPupil({
                                    ...listPupil,
                                    [option.value]: !listPupil[option.value]
                                })
                            }}
                        />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor={option.key}
                            style={{
                                width: "300px"
                            }}>
                            {option.label}
                        </label><br />
                    </div>
                ))}

            </div>
        );
    }

    const resetListPupil = () => {
        setListPupil({})
    }
    const toggle = (event) => {
        var checkboxes = document.getElementsByName('pupil');
        var hash = {};
        if (event.target.checked) {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = true;
            }
            const arrFeeID = pupil.map(e => e.value);
            for (var i = 0; i < arrFeeID.length; i++)
                hash[arrFeeID[i]] = true;
            setListPupil(hash)
            setSelectAll(true)
        }
        else {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
            }
            setSelectAll(false)
            resetListPupil();
        }
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
                        <div className="type-header">
                            <h4 className="type-header input">Pupil </h4>

                            <input
                                className="check-input"
                                type="checkbox"
                                onChange={toggle}
                                checked={selectAll} />
                        </div>
                        <CheckList
                            options={pupil}
                        />
                        <label
                            className={
                                "error" +
                                (FeeError.list_pupil
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Invalid Pupil
                        </label>
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
        let list_pupil = false

        if (!allValuesFee.fee_category) {
            fee_category = true
            check = true
        } else {
            fee_category = false
        }
        if (Object.keys(listPupil).length === 0 && listPupil.constructor === Object) {
            check = true
            list_pupil = true
        } else {
            list_pupil = false
        }
        setFeeError({
            fee_status: fee_status,
            paid_date: paid_date,
            fee_category: fee_category,
            pupil: pupil,
            list_pupil: list_pupil
        })
        if (!check) {
            console.log(listPupil);
            props.handleConfirmAddFee(allValuesFee, listPupil)
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
