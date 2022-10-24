import React, { useState, useEffect } from "react";
import "./StudentAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../config/service/StudentService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddStudent from "../../../lib/ModalInput/AddStudent/AddStudent";
import UpdateStudent from "../../../lib/ModalInput/UpdateStudent/UpdateStudent";

const StudentAdmin = () => {
    const [student, setStudent] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [name, setName] = useState("");
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getStudent();
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
                        parent: item.parent_id ? item.parent_id.person_id.person_fullname : "Empty",
                        class: item.class_id ? item.class_id.class_name : "Empty",
                        teacher:
                            item.class_id ? item.class_id.homeroom_teacher_id.person_id.person_fullname : "Empty",
                        grade: item.class_id ? item.class_id.grade_id.grade_name : "Empty",
                    };
                });
                setStudent(dataSources);
            })
            .catch((error) => {
                console.log(error);
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
                    <th>Class-Grade</th>
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
                setAddState(false);
            } else {
                setAddState(true);
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

        StudentService.updatePupil(
            id,
            formData
        ).then((res) => {
            if (res.success) {
                setIsChange(!isChange);
                setUpdateState(false);
                setErrorServer(false);
            } else {
                setUpdateState(true);
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
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Pupil</h3>
                </div>
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
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                        ></input>
                    </div>
                </div>
            </header>
            <div className="table-content">
                <TableStudent students={student} />
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