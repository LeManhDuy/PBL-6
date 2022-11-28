import React, { useEffect, useState } from "react";
import "./SubjectAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import SubjectService from "../../../config/service/SubjectService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import AddSubject from "../../../lib/ModalInput/AddSubject/AddSubject";
import UpdateSubject from "../../../lib/ModalInput/UpdateSubject/UpdateSubject";
import ReactPaginate from "react-paginate";

const SubjectAdmin = () => {
    const [addSubjectState, setAddSubjectState] = useState(false);
    const [updateSubjectState, setUpdateSubjectState] = useState(false);
    const [Id, setId] = useState();
    const [state, setState] = useState(false);
    const [subjects, setSubject] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [name, setName] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getSubject();
    }, [state]);

    const getSubject = () => {
        SubjectService.getSubject()
            .then((response) => {
                const dataSources = response.allSubject.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.subject_name,
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.name > b.name ? 1 : -1,);
                setSubject(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Add Subject
    const handleConfirmAddSubject = (allValue) => {
        SubjectService.addSubject({
            subject_name: allValue.name,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddSubjectState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddSubjectState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleInputCustom = () => {
        setAddSubjectState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateSubjectState(false);
    };

    const DivAddSubject = (
        <ModalInput
            show={addSubjectState}
            handleInputCustom={handleInputCustom}
            content={
                <AddSubject
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddSubject={handleConfirmAddSubject}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateSubject = (allValue) => {
        SubjectService.updateSubject(Id, {
            subject_name: allValue.name,
        })
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateSubjectState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateSubjectState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    //Component Add Subject (Form)
    const DivUpdateSubject = (
        <ModalInput
            show={updateSubjectState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateSubject
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateSubject={handleConfirmUpdateSubject}
                    errorServer={errorServer}
                    SubjectId={Id}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        SubjectService.deleteSubjectById(Id).then((res) => {
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

    const handleAddSubject = () => {
        setAddSubjectState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    function PaginatedItems({ itemsPerPage, searchSubject }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchSubject.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchSubject.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % searchSubject.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableSubject subjects={currentItems} />
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

    const TableSubject = ({ subjects }) => {
        const subjectItem = subjects.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
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
                    )[1].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateSubjectState(true);
                setId(id);
            }
        }

        const headerClass = (
            <tr>
                <th>Subject</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead className="table-head-row">{headerClass}</thead>
                <tbody className="table-row">{subjectItem}</tbody>
            </table>
        );
    };

    const searchSubject = (subjects) => {
        return subjects.filter(
            (subject) =>
                subject.name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Subject</h3>
                </div>
                <div className="right-header">
                    <a href="subject_teacher">
                        <button className="btn-account">Assign Subject</button>
                    </a>
                    <button className="btn-account" onClick={handleAddSubject}>
                        Add Subject
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
            <PaginatedItems itemsPerPage={10} searchSubject={searchSubject(subjects)}/>
            {/* <div className="table-content">
                <TableSubject subjects={subjects} />
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
                {addSubjectState ? DivAddSubject : null}
                {updateSubjectState ? DivUpdateSubject : null}
                {isDelete ? ConfirmDelete : null}
            </footer> */}
            {addSubjectState ? DivAddSubject : null}
            {updateSubjectState ? DivUpdateSubject : null}
            {isDelete ? ConfirmDelete : null}
        </div>
    );
};

export default SubjectAdmin;
