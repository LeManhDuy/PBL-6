import React, { useEffect, useState } from "react";
import "./ScoreTeacher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../config/service/StudentService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import FormSubject from "./FormSubject/FormSubject";
import ReactPaginate from "react-paginate";
import ShowAllScore from "./ShowAllScore/ShowAllScore";
import AddScoreExcel from "./AddScoreExcel/AddScoreExcel";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import Loading from "../../../lib/Loading/Loading";
import ScoreService from "../../../config/service/ScoreService";

const ScoreTeacher = () => {
    const [students, setStudents] = useState([]);
    const [isMark, setIsMark] = useState(false);
    const [id, setId] = useState("");
    const [nameClass, setNameClass] = useState("");
    const [keyword, setKeyword] = useState("");
    const [classId, setClassID] = useState("");
    const [isShowAll, setIsShowAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [addExcelState, setAddExcelState] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getStudentByTeacherId();
    }, []);

    const getStudentByTeacherId = async () => {
        setIsLoading(true);
        await StudentService.getStudentByTeacherIdAtTeacherRole(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                if (response.success === false) setStudents([]);
                else {
                    setNameClass(response.class_name);
                    setClassID(response.getPupilsInfor[0].class_id._id);
                    const dataSources = response.getPupilsInfor.map(
                        (item, index) => {
                            return {
                                key: index + 1,
                                id: item._id,
                                student_name: item.pupil_name,
                                student_date_of_birth: item.pupil_dateofbirth,
                                student_image: item.pupil_image,
                                student_gender: item.pupil_gender,
                                parentsId: item.parent_id._id,
                                parent_name:
                                    item.parent_id.person_id.person_fullname,
                                parent_address:
                                    item.parent_id.person_id.person_address,
                                parent_phone:
                                    item.parent_id.person_id.person_phonenumber,
                            };
                        }
                    );
                    const dataSourcesSorted = [...dataSources].sort((a, b) =>
                        a.student_name > b.student_name ? 1 : -1
                    );
                    setStudents(dataSourcesSorted);
                    setIsLoading(false);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleCloseModalCustom = () => {
        setIsMark(false);
        setIsShowAll(false);
        setAddExcelState(false);
    };

    const handleMark = (e) => {
        setId(e.target.parentElement.parentElement.getAttribute("data-key"));
        setIsMark(true);
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const searchStudent = (students) => {
        return students.filter((students) =>
            students.student_name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    function PaginatedItems({ itemsPerPage, searchStudent }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchStudent.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchStudent.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchStudent.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableAccounts students={currentItems} />
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
                        previousClassName="previous-btn ml-5 page-item"
                        previousLinkClassName="page-link"
                        nextClassName="next-btn mr-5 page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    />
                </footer>
            </>
        );
    }

    const TableAccounts = ({ students }) => {
        const accountItem = students.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.student_name}</td>
                <td>
                    {new Date(item.student_date_of_birth).toLocaleDateString()}
                </td>
                <td>{item.student_gender ? "Male" : "Female"}</td>
                <td>{item.parent_name}</td>
                <td>{item.parent_phone}</td>
                <td>{item.parent_address}</td>
                <td>
                    <button id="btn-detail" onClick={handleMark}>
                        Mark
                    </button>
                </td>
            </tr>
        ));

        return (
            <table id="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Date Of Birth</th>
                        <th>Gender</th>
                        <th>Parent Name</th>
                        <th>Parent Phone Number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{accountItem}</tbody>
            </table>
        );
    };

    const DivFormSubject = (
        <ModalCustom
            show={isMark}
            handleCloseModalCustom={handleCloseModalCustom}
            content={
                <FormSubject
                    handleCloseModalCustom={handleCloseModalCustom}
                    id={id}
                />
            }
        />
    );

    const showAllScore = () => {
        setIsShowAll(true);
    };

    const DivShowAllScore = (
        <ModalCustom
            show={isShowAll}
            handleCloseModalCustom={handleCloseModalCustom}
            content={
                <ShowAllScore
                    classID={classId}
                    handleCloseModalCustom={handleCloseModalCustom}
                />
            }
        />
    );

    const handleAddExcel = () => {
        setAddExcelState(true);
    };

    const handleConfirmAddExcel = (props) => {
        setIsLoading(true);
        let scoreFile = props.scoreFile;
        setAddExcelState(false);
        ScoreService.AddScoreByFile(classId, scoreFile).then((res) => {
            if (res.success) {
                setIsLoading(false);
                setAddExcelState(false);
                setErrorServer(false);
                setErrorMessage("");
            } else {
                setIsLoading(false);
                setAddExcelState(true);
                setErrorServer(true);
                setErrorMessage(res.message);
            }
        });
    };

    const handleInputCustom = () => {
        setAddExcelState(false);
        setErrorMessage("");
        setErrorServer(false);
    };

    const DivAddScoreExcel = (
        <ModalInput
            show={addExcelState}
            handleInputCustom={handleInputCustom}
            content={
                <AddScoreExcel
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddExcel={handleConfirmAddExcel}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    return (
        <div className="class-teacher">
            <div className="class-teacher-header">
                <header>
                    <div className="title">
                        <h4>{"List Student Of The Class " + nameClass}</h4>
                        <h4>{"Total: " + students.length}</h4>
                        <div className="right-header">
                            <button
                                className="btn-account"
                                onClick={showAllScore}
                            >
                                Show all score
                            </button>
                            <button
                                className="btn-account update"
                                onClick={handleAddExcel}
                            >
                                Add File Excel
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
                    </div>
                </header>
            </div>
            {/* <div className="table-content">
                <TableAccounts students={searchStudent(students)} />
            </div> */}
            <PaginatedItems
                itemsPerPage={10}
                searchStudent={searchStudent(students)}
            />
            {isMark ? DivFormSubject : null}
            {isShowAll ? DivShowAllScore : null}
            {addExcelState ? DivAddScoreExcel : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ScoreTeacher;
