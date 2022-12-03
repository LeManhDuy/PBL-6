import React, { useEffect, useState } from "react";
import "./GradeAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import GradeService from "../../../config/service/GradeService";
import AddGrade from "../../../lib/ModalInput/AddGrade/AddGrade";
import UpdateGrade from "../../../lib/ModalInput/UpdateGrade/UpdateGrade";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";

const GradeAdmin = () => {
    const [addGradeState, setAddGradeState] = useState(false);
    const [updateGradeState, setUpdateGradeState] = useState(false);
    const [Id, setId] = useState();
    const [state, setState] = useState(false);
    const [grades, setGrade] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [name, setName] = useState();
    const [keyword, setKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getGrade();
    }, [state]);

    const getGrade = () => {
        setIsLoading(true);
        GradeService.getGrades()
            .then((response) => {
                const dataSources = response.allGrade.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.grade_name,
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setGrade(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Add Grade
    const handleConfirmAddGrade = (allValue) => {
        GradeService.addGrade({
            grade_name: allValue.name,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddGradeState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddGradeState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleInputCustom = () => {
        setAddGradeState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateGradeState(false);
    };
    //Component Add Grade (Form)
    const DivAddGrade = (
        <ModalInput
            show={addGradeState}
            handleInputCustom={handleInputCustom}
            content={
                <AddGrade
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddGrade={handleConfirmAddGrade}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateGrade = (allValue) => {
        GradeService.updateGrade(Id, {
            grade_name: allValue.name,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateGradeState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateGradeState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    //Component Add Grade (Form)
    const DivUpdateGrade = (
        <ModalInput
            show={updateGradeState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateGrade
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateGrade={handleConfirmUpdateGrade}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                    GradeId={Id}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        GradeService.deleteGradeById(Id).then((res) => {
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
                    title={`Do you want to delete the ${name}?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleAddGrade = () => {
        setAddGradeState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const searchGrade = (grades) => {
        return grades.filter((grade) =>
            grade.name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    function PaginatedItems({ itemsPerPage, searchGrade }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchGrade.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchGrade.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchGrade.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableGrade grades={currentItems} />
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

    const TableGrade = ({ grades }) => {
        const gradeItem = grades.map((item) => (
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
                setUpdateGradeState(true);
                setId(id);
            }
        }

        const headerClass = (
            <tr>
                <th>Grade</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead className="table-head-row">{headerClass}</thead>
                <tbody className="table-row">{gradeItem}</tbody>
            </table>
        );
    };
    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Grade</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddGrade}>
                        Add Grade
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
            <PaginatedItems
                itemsPerPage={10}
                searchGrade={searchGrade(grades)}
            />
            {/* <div className="table-content">
                <TableGrade grades={searchGrade(grades)} />
            </div> */}
            {/* <footer>
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
                {addGradeState ? DivAddGrade : null}
                {updateGradeState ? DivUpdateGrade : null}
                {isDelete ? ConfirmDelete : null}
            </footer> */}
            {addGradeState ? DivAddGrade : null}
            {updateGradeState ? DivUpdateGrade : null}
            {isDelete ? ConfirmDelete : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default GradeAdmin;
