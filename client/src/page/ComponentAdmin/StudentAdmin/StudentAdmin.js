import React, { useState, useEffect } from "react";
import "./StudentAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../config/service/StudentService";
import ClassService from "../../../config/service/ClassService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddStudent from "../../../lib/ModalInput/AddStudent/AddStudent";
import UpdateStudent from "../../../lib/ModalInput/UpdateStudent/UpdateStudent";

const StudentAdmin = () => {
    const [student, setStudent] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [dropValueClass, setDropValueClass] = useState("All");
    const [classroom, setClass] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getStudent();
        getClass();
    }, [isChange]);

    const getStudent = () => {
        StudentService.getPupils()
            .then((response) => {
                const dataSources = response.getPuilInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.pupil_name,
                        gender: item.pupil_gender,
                        parent: item.parent_id
                            ? item.parent_id.person_id.person_fullname
                            : "Empty",
                        class: item.class_id
                            ? item.class_id.class_name
                            : "Empty",
                        teacher: item.class_id
                            ? item.class_id.homeroom_teacher_id.person_id
                                  .person_fullname
                            : "Empty",
                        grade: item.class_id
                            ? item.class_id.grade_id
                                ? item.class_id.grade_id.grade_name
                                : "Empty"
                            : "Empty",
                    };
                });
                setStudent(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClass = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClass.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        class_name: item.class_name ? item.class_name : "Empty",
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

    const getStudentWithFilter = (filter) => {
        ClassService.getStudentByClassID(filter)
            .then((response) => {
                const dataSources = response.studentsInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.pupil_name,
                            gender: item.pupil_gender,
                            parent: item.parent_id
                                ? item.parent_id.person_id.person_fullname
                                : "Empty",
                            class: item.class_id
                                ? item.class_id.class_name
                                : "Empty",
                            teacher: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_fullname
                                : "Empty",
                            grade: item.class_id.grade_id
                                ? item.class_id.grade_id.grade_name
                                : "Empty",
                        };
                    }
                );
                setStudent(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Grade-Class
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option.key} value={option.id}>
                            {option.grade_name} - {option.class_name}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const handleChangeClass = (event) => {
        setDropValueClass(event.target.value);
        classroom.map((item) => {
            if (event.target.value === item.id) {
                getStudentWithFilter(item.id);
            } else if (event.target.value === "All") {
                getStudent();
            }
        });
    };

    const TableStudent = ({ students }) => {
        const studentItem = students.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{`${item.grade}-${item.class}`}</td>
                <td>{item.parent}</td>
                <td>{item.teacher}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
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
                    )[0].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateState(true);
                setId(id);
            }
        }

        let headerStudent;
        if (!headerStudent) {
            headerStudent = (
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Grade-Class</th>
                    <th>Parent</th>
                    <th>Teacher</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead className="table-head-row">{headerStudent}</thead>
                <tbody className="table-row">{studentItem}</tbody>
            </table>
        );
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        StudentService.deletePupilById(id).then((res) =>
            res.success ? setIsChange(!isChange) : null
        );
        setIsDelete(false);
    };

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorMessage("");
        setErrorServer(false);
    };

    const handleConfirmAddStudent = (allValue) => {
        var formData = new FormData();
        formData.append("pupil_name", allValue.name);
        formData.append("pupil_dateofbirth", allValue.dateOfBirth);
        formData.append("pupil_gender", allValue.gender);
        formData.append("pupil_image", allValue.img);

        StudentService.addPupil(
            allValue.classroom,
            allValue.parent,
            formData
        ).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setErrorServer(false);
                setErrorMessage("");
                setAddState(false);
                setKeyword("");
            } else {
                setAddState(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const handleConfirmUpdateStudent = (allValue) => {
        var formData = new FormData();
        formData.append("pupil_name", allValue.name);
        formData.append("pupil_dateofbirth", allValue.dateOfBirth);
        formData.append("pupil_gender", allValue.gender);
        formData.append("pupil_image", allValue.img);
        formData.append("parent_id", allValue.parent);
        formData.append("class_id", allValue.classroom);

        StudentService.updatePupil(id, formData).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setUpdateState(false);
                setErrorMessage("");
                setErrorServer(false);
                setKeyword("");
            } else {
                setUpdateState(true);
                setErrorMessage(res.message);
                setErrorServer(true);
            }
        });
    };

    const DivAddStudent = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddStudent
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddStudent={handleConfirmAddStudent}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivUpdateStudent = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateStudent
                    studentID={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateStudent={handleConfirmUpdateStudent}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

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

    const handleAddStudent = () => {
        setAddState(true);
        setErrorMessage("");
    };

    const searchStudent = (students) => {
        return students.filter(
            (student) =>
                student.name.toLowerCase().includes(keyword.toLowerCase()) ||
                student.teacher.toLowerCase().includes(keyword.toLowerCase()) ||
                student.parent.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Pupil</h3>
                </div>
                <Dropdown
                    options={classroom}
                    value={dropValueClass}
                    onChange={handleChangeClass}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddStudent}>
                        Add Pupil
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
                <TableStudent students={searchStudent(student)} />
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
                {isDelete ? ConfirmDelete : null}
                {addState ? DivAddStudent : null}
                {updateState ? DivUpdateStudent : null}
            </footer>
        </div>
    );
};

export default StudentAdmin;
