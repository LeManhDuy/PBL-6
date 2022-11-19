import React, { useState, useEffect } from "react"
import "./FormShowScore.css"
import GradeService from "../../../../config/service/GradeService"
import ClassService from "../../../../config/service/ClassService"
import SubjectService from "../../../../config/service/SubjectService"
import Select from 'react-select'

const FormShowScore = (props) => {
    const [grades, setGrade] = useState([])
    const [classroom, setClass] = useState([])
    const [subject, setSubject] = useState([])
    const [scoreError, setScoreError] = useState({
        grade: false,
        classroom: false,
        subject: false,
    })
    const [dropValueGrade, setDropValueGrade] = useState("All")
    const [dropValueClass, setDropValueClass] = useState({ value: "0", label: "All" })
    const [dropValueSubject, setDropValueSubject] = useState({ value: "0", label: "All" })


    useEffect(() => {
        getGrade()
        getClass()
        getSubject()
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
    const getSubject = () => {
        SubjectService.getSubject()
            .then((response) => {
                const dataSources = response.allSubject.map((item, index) => {
                    return {
                        //key: index + 1,
                        value: item._id,
                        label: item.subject_name,
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.label > b.label ? 1 : -1,)
                dataSourcesSorted.unshift({ value: "0", label: "All" })
                setSubject(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleChangeGrade = (event) => {
        setDropValueGrade(event)
        setDropValueClass({ value: "0", label: "All" })
        setDropValueSubject({ value: "0", label: "All" })
        grades.map((item) => {
            if (event.value === item.value) {
                getClassWithFilter(item.value)
            }
        })
    }
    const handleChangeClass = (event) => {
        setDropValueClass(event)
    }
    const handleChangeSubject = (event) => {
        setDropValueSubject(event)
    }
    const clickSave = (e) => {
        let check = false
        let classroom = false;
        let subject = false
        let grade = false

        if (dropValueGrade === "All") {
            grade = true;
            check = true
        } else {
            grade = false;
            check = false
        }

        setScoreError({ classroom: classroom, subject: subject, grade: grade })
        if (!check) {
            props.handleShowScore(dropValueGrade, dropValueClass, dropValueSubject);
        }
    }
    return (
        <div className="form-add-account">
            <div className="form-admin-content">
                <h4>Show Statistic Score</h4>
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
                                    (scoreError.grade
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
                                maxMenuHeight={200}
                            />
                        </div>
                    </div>
                    <div className="teacher-content-right-show-fee">
                        <div className="type-input">
                            <h4>Subject</h4>
                            <Select
                                options={subject}
                                className="dropdown-class"
                                value={dropValueSubject}
                                onChange={handleChangeSubject}
                                placeholder="Subject"
                                maxMenuHeight={300}
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

    )
}

export default FormShowScore
