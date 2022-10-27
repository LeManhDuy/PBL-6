import React, { useEffect, useState } from "react";
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
    const [updateSubjectTeacherState, setUpdateSubjectTeacherState] = useState(false);
    const [Id, setId] = useState();
    const [state, setState] = useState(false);
    const [subjectsTeacher, setSubjectTeacher] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [name, setName] = useState();
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([]);
    const [dropValueSubject, setDropValueSubject] = useState("All");
    const [dropValueTeacher, setDropValueTeacher] = useState("All");
    const [filter, setFilter] = useState([]);


    useEffect(() => {
        getSubjectTeacher();
        getSubject();
        getTeachers();
        setFilter({subject_id:"",teacher_id:""});
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
                            teacher_name: item.teacher_id.person_id.person_fullname,
                        }
                    }
                );
                setSubjectTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            })
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
                            teacher_name: item.teacher_id.person_id.person_fullname,
                        }
                    }
                );
                setSubjectTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const Dropdown = ({ value, options, onChange }) => {
        return (
          <label>
            {/* <input list="brow"/> */}
            <select className="dropdown-account" value={value} onChange={onChange}>
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
                            id: item._id,
                            name: item.subject_name
                        }
                    }
                );
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const getTeachers = () => {
        AccountService.getAccountsTeacher()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
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
        console.log(event.target.value)
        setDropValueSubject(event.target.value);
        console.log(dropValueSubject)
        // handleFilter();
      };
    const handleChangeTeacher = (event) => {
        setDropValueTeacher(event.target.value);
        console.log(event.target.value)
        console.log(dropValueTeacher)
        // teacher_id = event.target.selectedValue
        // handleFilter();
      };

    const handleFilter = () => {
        let f = {subject_teacher_id:"",subject_id:"",teacher_id:""}
        if (dropValueSubject !== "All"){
            f.subject_id = dropValueSubject
            console.log(f)
        }
        if (dropValueTeacher !== "All"){
            f.teacher_id = dropValueTeacher
            console.log(f)
        }
        // setFilter()
        getSubjectTeacherWithFilter(f)
        // console.log(filter)
    }

    // Add Subject Teacher
    const handleConfirmAddSubjectTeacher = (allValue) => {
        // console.log("save");
        SubjectTeacherService.addSubjectTeacher({
            subject_id: allValue.subject_id,
            teacher_id: allValue.teacher_id,
        })
        .then((res) => {
            if (res.success) {
                setState(!state);
                setErrorServer(false);
                setAddSubjectTeacherState(false);
            } else {
                setErrorServer(true);
                setAddSubjectTeacherState(true);
            }
        })
        .catch((error) => console.log("error", error));
    }

    
    const handleInputCustom = () => {
        setAddSubjectTeacherState(false);
        setErrorServer(false);
        setUpdateSubjectTeacherState(false);
    };

    const DivAddSubjectTeacher = (
        <ModalInput
            show={addSubjectTeacherState}
            handleInputCustom={handleInputCustom}
            content={
                <AddSubjectTeacher
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddSubjectTeacher={handleConfirmAddSubjectTeacher}
                    errorServer={errorServer}
                />
            }
        />
    );

    const handleConfirmUpdateSubjectTeacher = (allValue) => {
        SubjectTeacherService.updateSubjectTeacher(Id, {
            subject_id:  allValue.subject_id,
            teacher_id: allValue.teacher_id
        }).then((res) => {
            console.log(res);
            if (res.success) {
                setState(!state);
                setErrorServer(false);
                setUpdateSubjectTeacherState(false);
            } else {
                setErrorServer(true);
                setUpdateSubjectTeacherState(true);
            }
        })
        .catch((error) => console.log("error", error));
    }

    // Component Add Subject (Form)
    const DivUpdateSubjectTeacher = (
        <ModalInput
            show={updateSubjectTeacherState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateSubjectTeacher
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateSubjectTeacher={handleConfirmUpdateSubjectTeacher}
                    errorServer={errorServer}
                    SubjectTeacherId={Id}
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
    }

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
    }

    const TableSubjectTeacher = ({subjectsTeacher}) => {
        const subjectTeacherItem = subjectsTeacher.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.subject_name}</td>
                <td>{item.teacher_name}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =  e.target.parentElement.parentElement.getAttribute("data-key");
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
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddSubjectTeacher}>Add Subject Teacher</button>
                    <div className="search-box">
                        <Dropdown
                            label="Subject"
                            options={subjects}
                            value={dropValueSubject}
                            onChange={handleChangeSubject}
                        />
                        <Dropdown
                            label="Teacher"
                            options={teachers}
                            value={dropValueTeacher}
                            onChange={handleChangeTeacher}
                        />
                        <button className="btn-account" onClick={handleFilter}>
                            Search
                            {/* <FontAwesomeIcon
                                className="icon-search"
                                icon={faMagnifyingGlass}
                            /> */}
                        </button>
                    </div>
                </div>
            </header>
            <div className="table-content">
                <TableSubjectTeacher  subjectsTeacher={subjectsTeacher}/>
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
