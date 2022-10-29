import React, { useEffect, useState } from "react";
import "./ClassAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import AddClass from "../../../lib/ModalInput/AddClass/AddClass";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ClassService from "../../../config/service/ClassService";
import GradeService from "../../../config/service/GradeService";
import UpdateClass from "../../../lib/ModalInput/UpdateClass/UpdateClass";
import ViewClass from "../../../lib/ModalInput/ViewClass/ViewClass";

const ClassAdmin = () => {
    const [addClassState, setAddClassState] = useState(false);
    const [updateClassState, setUpdateClassState] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [classRooms, setClass] = useState([]);
    const [grades, setGrade] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [viewState, setViewState] = useState(false);
    const [dropValueGrade, setDropValueGrade] = useState("All");
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getClass();
        getGrade();
    }, [state]);

    const getClass = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClass.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        class_name: item.class_name,
                        homeroomteacher_name: item.homeroom_teacher_id
                            ? item.homeroom_teacher_id.person_id.person_fullname
                            : "Empty",
                        grade_name: item.grade_id
                            ? item.grade_id.grade_name
                            : "Empty",
                    };
                });
                setClass(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGrade = () => {
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrade.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        grade_name: item ? item.grade_name : "Empty",
                    };
                });
                setGrade(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Grade
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option.key} value={option.id}>
                            {option.grade_name}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const handleChangeGrade = (event) => {
        setDropValueGrade(event.target.value);
        setKeyword("");
        // grades.map((item) => {
        //     if (event.target.value === item.id) {
        //         getStudentWithFilter(item.id);
        //     } else if (event.target.value === "All") {
        //         getStudent();
        //     }
        // });
    };

    const handleInputCustom = () => {
        setAddClassState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateClassState(false);
        setViewState(false);
    };

    // Add Class
    const handleConfirmAddClass = (allValue) => {
        ClassService.addClass({
            class_name: allValue.gradeName + '/' + allValue.name.toUpperCase(),
            grade_id: allValue.grade,
            homeroom_teacher_id: allValue.teacher,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddClassState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddClassState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleConfirmUpdateClass = (allValue) => {
        ClassService.updateClass(id, {
            class_name: allValue.name,
            grade_id: allValue.grade,
            homeroom_teacher_id: allValue.teacher,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setUpdateClassState(false);
                    setErrorMessage("");
                    setKeyword("");
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateClassState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    //Component Add Class (Form)
    const DivAddClass = (
        <ModalInput
            show={addClassState}
            handleInputCustom={handleInputCustom}
            content={
                <AddClass
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddClass={handleConfirmAddClass}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivUpdateClass = (
        <ModalInput
            show={updateClassState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateClass
                    classID={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateClass={handleConfirmUpdateClass}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivViewClass = (
        <ModalInput
            show={viewState}
            handleInputCustom={handleInputCustom}
            content={
                <ViewClass classID={id} handleInputCustom={handleInputCustom} />
            }
        />
    );

    const handleAddClass = () => {
        setAddClassState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const TableClasses = ({ classRooms }) => {
        const classItem = classRooms.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.class_name}</td>
                <td>{item.grade_name}</td>
                <td>{item.homeroomteacher_name}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                    <i className="fa-regular fa-eye btn-view"></i>
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
                    )[0].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateClassState(true);
                setId(id);
            } else if (e.target.className.includes("btn-view")) {
                setViewState(true);
                setId(id);
            }
        }

        const headerClass = (
            <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Teacher</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead>{headerClass}</thead>
                <tbody>{classItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        ClassService.deleteClassById(id).then((res) =>
            res.success ? setState(!state) : null
        );
        setIsDelete(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete the ${name}?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const searchClass = (classroom) => {
        if (dropValueGrade === "All") {
            return classroom.filter((classroom) =>
                classroom.homeroomteacher_name
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
            );
        } else {
            return classroom;
        }
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Class</h3>
                </div>
                <Dropdown
                    options={grades}
                    value={dropValueGrade}
                    onChange={handleChangeGrade}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddClass}>
                        Add Class
                    </button>
                    <div className="search-box">
                        <button className="btn-search">
                            <FontAwesomeIcon
                                className="icon-search"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                        <input
                            onChange={handleChangeSearch}
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                        ></input>
                    </div>
                </div>
            </header>
            <div className="table-content">
                <TableClasses classRooms={searchClass(classRooms)} />
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
                {addClassState ? DivAddClass : null}
                {updateClassState ? DivUpdateClass : null}
                {isDelete ? ConfirmDelete : null}
                {viewState ? DivViewClass : null}
            </footer>
        </div>
    );
};

export default ClassAdmin;
