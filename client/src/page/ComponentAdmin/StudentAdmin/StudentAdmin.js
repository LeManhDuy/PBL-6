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

const StudentAdmin = () => {
    const [student, setStudent] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getStudent();
    }, [isChange]);

    const getStudent = () => {
        StudentService.getStudents()
            .then((response) => {
                const dataSources = response.getPuilInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.pupil_name,
                        gender: item.pupil_gender,
                        parent: item.parent_id.person_id.person_fullname,
                        class: item.class_id.class_name,
                        teacher:
                            item.class_id.homeroom_teacher_id.person_fullname,
                        grade: item.class_id.grade_id.grade_name,
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
                console.log("hello");
            } else if (e.target.className.includes("btn-edit")) {
                //TODO edited
                console.log("hello");
            }
        }

        let headerStudent;
        if (!headerStudent) {
            headerStudent = (
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Class</th>
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

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
    };

    const handleConfirmAddStudent = (allValue) => {
        //todo
    };

    const handleConfirmUpdateStudent = (allValue) => {
        //todo
    };

    const DivAddStudent = null;

    const DivUpdateStudent = null;

    const ConfirmDelete = null;

    const handleAddStudent = () => {
        setAddState(true);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Student</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddStudent}>
                        Add Student
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
