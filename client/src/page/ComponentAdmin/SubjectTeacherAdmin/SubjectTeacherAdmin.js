import React, { useEffect, useState } from "react";
import Select from 'react-select';
import "./SubjectTeacherAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import SubjectTeacherService from "../../../config/service/SubjectTeacherService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import SubjectService from "../../../config/service/SubjectService";
import AccountService from "../../../config/service/AccountService";
import AddSubjectTeacher from "../../../lib/ModalInput/AddSubjectTeacher/AddSubjectTeacher";
import UpdateSubjectTeacher from "../../../lib/ModalInput/UpdateSubjectTeacher/UpdateSubjectTeacher";

const SubjectTeacherAdmin = () => {
    const [addSubjectTeacherState, setAddSubjectTeacherState] = useState(false);
    const [updateSubjectTeacherState, setUpdateSubjectTeacherState] =
        useState(false);
    const [Id, setId] = useState();
    const [state, setState] = useState(false);
    const [subjectsTeacher, setSubjectTeacher] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [name, setName] = useState();
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [dropValueSubject, setDropValueSubject] = useState({value:"All",label:'All Subject'});
    const [dropValueTeacher, setDropValueTeacher] = useState({value:"All",label:'All Teacher'});
    const [filtered, setFiltered] = useState([]);



    useEffect(() => {
        getSubjectTeacher();
        getSubject();
        getTeachers();
    }, [state]);

    const getSubjectTeacher = () => {
        SubjectTeacherService.getSubjectTeacher()
            .then((response) => {
                const dataSources = response.allSubjectTeacher.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            subject_id: item.subject_id._id,
                            subject_name: item.subject_id.subject_name,
                            teacher_id: item.teacher_id._id,
                            teacher_name:
                                item.teacher_id.person_id.person_fullname,
                        };
                    }
                );
                setSubjectTeacher(dataSources);
                setFiltered(dataSources)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubjectTeacherWithFilter = (filter) => {
        SubjectTeacherService.getSubjectTeacherById(filter)
            .then((response) => {
                const dataSources = response.allSubjectTeacher.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            subject_id: item.subject_id._id,
                            subject_name: item.subject_id.subject_name,
                            teacher_id: item.teacher_id._id,
                            teacher_name:
                                item.teacher_id.person_id.person_fullname,
                        };
                    }
                );
                setSubjectTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                {/* <input list="brow"/> */}
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option.key} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const getSubject = () => {
        SubjectService.getSubject()
            .then((response) => {
                const dataSources = response.allSubject.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            value: item._id,
                            label: item.subject_name,
                            id: item._id,
                            name: item.subject_name
                        }
                    }
                );
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTeachers = () => {
        AccountService.getAccountsTeacher()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            value: item._id,
                            label: item.person_id.person_fullname +"-"+item.person_id.person_email,
                            id: item._id,
                            name: item.person_id.person_fullname,
                            email: item.person_id.person_email,
                        };
                    }
                );
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChangeSubject = (event) => {
        // console.log(event.value+ '---'+dropValueTeacher.value)
        setDropValueSubject(event);
        let filterST = subjectsTeacher
        if(event.value!=='All'){
            filterST = filterST.filter(x =>{return x.subject_id=== event.value})
        }
        // console.log(filterST)
        if(dropValueTeacher.value!=='All'){
            filterST = filterST.filter(x =>{return x.teacher_id=== dropValueTeacher.value})
        }
        // console.log(filterST)
        setFiltered(filterST)
        // console.log(filtered)
      };
    const handleChangeTeacher = (event) => {
        // console.log(dropValueSubject.value+'---'+ event.value)
        setDropValueTeacher(event);
        let filterST = subjectsTeacher
        if(event.value!=='All'){
            filterST = filterST.filter(x => { 
                return x.teacher_id === event.value
            })
        }
        // console.log(filterST)
        if(dropValueSubject.value!=='All'){
            filterST = filterST.filter(x => { 
                return x.subject_id === dropValueSubject.value
            })
        }
        // console.log(filterST)
        setFiltered(filterST)
        // console.log(filtered)
      };

    // Add Subject Teacher
    const handleConfirmAddSubjectTeacher = (teacher_id,subject_list) => {
        SubjectTeacherService.addMultipleSubjectTeacher({
            teacher_id: teacher_id,
            subject_list: subject_list,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddSubjectTeacherState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddSubjectTeacherState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleInputCustom = () => {
        setAddSubjectTeacherState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateSubjectTeacherState(false);
    };

    const DivAddSubjectTeacher = (
        <ModalInput
            show={addSubjectTeacherState}
            handleInputCustom={handleInputCustom}
            content={
                <AddSubjectTeacher
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddSubjectTeacher={
                        handleConfirmAddSubjectTeacher
                    }
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateSubjectTeacher = (teacher_id,subject_list) => {
        SubjectTeacherService.updateMultipleSubjectTeacher(Id, {
            teacher_id: teacher_id,
            subject_list: subject_list,
        }).then((res) => {
            if (res.success) {
                setState(!state);
                setErrorServer(false);
                setUpdateSubjectTeacherState(false);
            } else {
                setErrorServer(true);
                setUpdateSubjectTeacherState(true);
            }
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateSubjectTeacherState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateSubjectTeacherState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    // Component Add Subject (Form)
    const DivUpdateSubjectTeacher = (
        <ModalInput
            show={updateSubjectTeacherState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateSubjectTeacher
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateSubjectTeacher={
                        handleConfirmUpdateSubjectTeacher
                    }
                    errorServer={errorServer}
                    TeacherId={Id}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        SubjectTeacherService.deleteSubjectTeacherById(Id).then((res) => {
            if (res.success) {
                setState(!state);
            }
        });
        setIsDelete(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete this subject?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleAddSubjectTeacher = () => {
        setAddSubjectTeacherState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const TableSubjectTeacher = ({ subjectsTeacher }) => {
        const subjectTeacherItem = subjectsTeacher.map((item) => (
            <tr data-key={item.teacher_id} key={item.id}>
                <td>{item.subject_name}</td>
                <td>{item.teacher_name}</td>
                <td onClick={click}>
                    {/* <i className="fa-regular fa-pen-to-square btn-edit"></i> */}
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            if (e.target.className.includes("btn-delete")) {
                setIsDelete(true);
                setId(id);
                setName(
                    e.target.parentElement.parentElement.querySelectorAll(
                        "td"
                    )[1].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateSubjectTeacherState(true);
                setId(id);
            }
        }

        const headerClass = (
            <tr>
                <th>Subject Name</th>
                <th>Teacher Name</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead className="table-head-row">{headerClass}</thead>
                <tbody className="table-row">{subjectTeacherItem}</tbody>
            </table>
        );
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Subject Teacher</h3>
                </div>
                <div className="right-header" >
                    <button className="btn-account" onClick={handleAddSubjectTeacher}>Add Subject Teacher</button>
                    {/* <div className="search-box"> */}
                    <label style={{width: 300}}>
                        <Select
                            className="dropdown-class"
                            // label="Subject"
                            classNamePrefix="select"
                            options={[{ label: "All Subject", value: "All" }, ...subjects]}
                            // isMulti
                            value={dropValueSubject}
                            onChange={handleChangeSubject}
                            placeholder="Subject"
                            maxMenuHeight={200}
                            // isClearable={true}
                            isSearchable={true}
                        />
                    </label>
                    <label style={{width: 300}}>
                        <Select
                            className="dropdown-class"
                            // label="Teacher"
                            classNamePrefix="select"
                            options={[{ label: "All Teacher", value: "All" }, ...teachers]}
                            // isMulti
                            value={dropValueTeacher}
                            onChange={handleChangeTeacher}
                            placeholder="Teacher"
                            maxMenuHeight={200}
                            // isClearable={true}
                            isSearchable={true}
                        />
                    </label>
                    {/* </div> */}
                </div>
            </header>
            <div className="table-content">
                <TableSubjectTeacher  subjectsTeacher={filtered}/>
            </div>
            <footer>
                <hr></hr>
                <div className="paging">
                    <button className="previous">
                        <FontAwesomeIcon
                            className="icon icon-previous"
                            icon={faArrowLeftLong}
                        />
                        Previous
                    </button>
                    <div className="list-number">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>...</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </div>
                    <button className="next">
                        Next
                        <FontAwesomeIcon
                            className="icon icon-next"
                            icon={faArrowRightLong}
                        />
                    </button>
                </div>
                {addSubjectTeacherState ? DivAddSubjectTeacher : null}
                {updateSubjectTeacherState ? DivUpdateSubjectTeacher : null}
                {isDelete ? ConfirmDelete : null}
            </footer>
        </div>
    );
};

export default SubjectTeacherAdmin;
