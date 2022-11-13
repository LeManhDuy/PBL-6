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
import GradeService from "../../../config/service/GradeService";
import ReactPaginate from 'react-paginate';
import AddStudentExcel from "../../../lib/ModalInput/AddStudentExcel/AddStudentExcel";
import PupilService from "../../../config/service/StudentService";

const StudentAdmin = () => {
    const [student, setStudent] = useState([]);
    const [listPupil, setListPupil] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [id, setId] = useState("");
    const [addState, setAddState] = useState(false);
    const [addExcelState, setAddExcelState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [dropValueClass, setDropValueClass] = useState("All");
    const [dropValueGrade, setDropValueGrade] = useState("All");
    const [classroom, setClass] = useState([]);
    const [grades, setGrade] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [selectAll, setSelectAll] = useState(false)
    const [isMultiDelete, setIsMultiDelete] = useState(false);

    useEffect(() => {
        getStudent();
        getClass();
        getGrade();
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
                            ? item.class_id.homeroom_teacher_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                    .person_fullname
                                : "Empty"
                            : "Empty",
                        grade: item.class_id
                            ? item.class_id.grade_id
                                ? item.class_id.grade_id.grade_name
                                : "Empty"
                            : "Empty",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.class > b.class ? 1 : -1,);
                setStudent(dataSourcesSorted);
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
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.grade_name > b.grade_name ? 1 : -1,);
                setGrade(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClassWithFilter = (filter) => {
        GradeService.getClassByGradeId(filter)
            .then((response) => {
                const dataSources = response.getClassByGradeId.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        class_name: item.class_name ? item.class_name : "Empty",
                        homeroomteacher_name: item.homeroom_teacher_id
                            ? item.homeroom_teacher_id.person_id
                                ? item.homeroom_teacher_id.person_id.person_fullname
                                : "Empty"
                            : "Empty",
                        grade_name: item.grade_id
                            ? item.grade_id.grade_name
                            : "Empty",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.class_name > b.class_name ? 1 : -1,);
                setClass(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
                Class
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    <option value="All">All</option>
                    {options.map((option) => (
                        <option key={option.key} value={option.id}>
                            {option.class_name}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const GradeDropdown = ({ value, options, onChange }) => {
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

    const handleChangeGrade = (event) => {
        setDropValueGrade(event.target.value);
        setDropValueClass(null)
        grades.map((item) => {
            if (event.target.value === item.id) {
                getClassWithFilter(item.id);
            } else if (event.target.value === "All") {
                getClass();
            }
        });
        setKeyword("");
    };

    function PaginatedItems({ itemsPerPage, searchStudent }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchStudent.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchStudent.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % searchStudent.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableStudent isLoading={isLoading} students={currentItems} />
                </div>
                <footer>
                    <hr></hr>
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item mr-2 ml-2"
                        pageLinkClassName="page-link"
                        previousClassName="previous-btn page-item"
                        previousLinkClassName="page-link"
                        nextClassName="next-btn page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    />
                </footer>

            </>
        );
    }

    const TableStudent = ({ isLoading, students }) => {
        const studentItem = students.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td></td>
                <td><input
                    className="check-input"
                    type="checkbox"
                    checked={listPupil[item.id]}
                    name="pupil"
                    onChange={() => {
                        setListPupil({
                            ...listPupil,
                            [item.id]: !listPupil[item.id]
                        })
                    }}
                /></td>
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
                    <th>
                        <input
                            className="check-input"
                            type="checkbox"
                            onChange={toggle}
                            checked={selectAll} />
                    </th>
                    <th>Select</th>
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
            <>
                <h4 hidden={!isLoading} style={{ color: 'red' }}>Loading...</h4>
                <table hidden={isLoading} id="table">
                    <thead className="table-head-row">{headerStudent}</thead>
                    <tbody className="table-row">{studentItem}</tbody>
                </table>
            </>
        );
    };
    const toggle = (event) => {
        var checkboxes = document.getElementsByName('pupil');
        var hash = {};
        if (event.target.checked) {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = true;
            }
            const arrFeeID = student.map(e => e.id);
            for (var i = 0; i < arrFeeID.length; i++)
                hash[arrFeeID[i]] = true;
            setSelectAll(true);
            setListPupil(hash)
        }
        else {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
            }
            setSelectAll(false);
            setListPupil({})
        }
    }
    const handleCloseModalCustom = () => {
        setIsDelete(false);
        setIsMultiDelete(false);
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
        setAddExcelState(false)
        setSelectAll(false)
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
                setSelectAll(false)
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
                setSelectAll(false)
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

    const handleConfirmAddExcel = (props) => {
        setIsLoading(true)
        let pupilFile = props.pupilFile
        setAddExcelState(false);
        PupilService.AddStudentByFile(pupilFile)
            .then((res) => {
                if (res.success) {
                    setIsChange(!isChange)
                    setErrorServer(false);
                    setIsLoading(false)
                    setErrorMessage("")
                    setKeyword("");
                    setSelectAll(false)
                } else {
                    setErrorMessage(res.message)
                    setErrorServer(true);
                    setIsLoading(false)
                }
            })
    }

    const DivAddStudentExcel = (
        <ModalInput
            show={addExcelState}
            handleInputCustom={handleInputCustom}
            content={
                <AddStudentExcel
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddExcel={
                        handleConfirmAddExcel
                    }
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleAddStudent = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const handleAddExcel = () => {
        setAddExcelState(true);
        setErrorServer(false);
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

    const checkClickDelete = () => {
        setIsMultiDelete(true);
    }
    const handleMultiDelete = () => {
        setIsLoading(true)
        PupilService.deleteMultiPupil({
            pupil_list: listPupil,
        })
            .then((res) => {
                if (res.success) {
                    setIsLoading(false)
                    setIsChange(!isChange);
                    setErrorServer(false);
                    setListPupil({})
                    setSelectAll(false)
                    setErrorMessage("");
                    setDropValueClass("All")
                    setDropValueGrade("All")
                } else {
                    setIsLoading(false)
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setDropValueClass("All")
                    setDropValueGrade("All")
                    setListPupil({})
                }
            })
            .catch((error) => console.log("error", error));
        setIsMultiDelete(false);
    };

    const ConfirmMultiDelete = (
        <ModalCustom
            show={isMultiDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleMultiDelete}
                    title={`Do you want to delete?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Pupil</h3>
                </div>
                <GradeDropdown
                    options={grades}
                    value={dropValueGrade}
                    onChange={handleChangeGrade}
                />
                <Dropdown
                    options={classroom}
                    value={dropValueClass}
                    onChange={handleChangeClass}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddStudent}>
                        Add Pupil
                    </button>
                    <button className="btn-account update" onClick={handleAddExcel}>Add File Excel</button>
                    <button className="btn-account delete" onClick={checkClickDelete}>
                        Delete
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
            <PaginatedItems itemsPerPage={9} searchStudent={searchStudent(student)} />
            {isDelete ? ConfirmDelete : null}
            {addState ? DivAddStudent : null}
            {addExcelState ? DivAddStudentExcel : null}
            {isMultiDelete ? ConfirmMultiDelete : null}
            {updateState ? DivUpdateStudent : null}
        </div>
    );
};

export default StudentAdmin;
