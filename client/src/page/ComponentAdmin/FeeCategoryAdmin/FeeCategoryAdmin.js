import React, { useEffect, useState } from "react";
import "./FeeCategoryAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import FeeCategoryService from "../../../config/service/FeeCategoryService";
import AddFeeCategory from "../../../lib/ModalInput/AddFeeCategory/AddFeeCategory";
import UpdateFeeCategory from "../../../lib/ModalInput/UpdateFeeCategory/UpdateFeeCategory";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";

const FeeCategoryAdmin = () => {
    const [addFeeCategoryState, setAddFeeCategoryState] = useState(false);
    const [updateFeeCategoryState, setUpdateFeeCategoryState] = useState(false);
    const [Id, setId] = useState();
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [feecategories, setFeeCategory] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [name, setName] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFeeCategory();
    }, [state]);

    const getFeeCategory = () => {
        setIsLoading(true);
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.fee_name,
                            ammount: item.fee_amount,
                            start_date: item.start_date.split("T")[0],
                            end_date: item.end_date.split("T")[0],
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setFeeCategory(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleConfirmAddFeeCategory = (allValue) => {
        FeeCategoryService.addFeeCategory({
            fee_name: allValue.name,
            fee_amount: allValue.ammount,
            start_date: allValue.start_date,
            end_date: allValue.end_date,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddFeeCategoryState(false);
                    setKeyword("");
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddFeeCategoryState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };
    const handleInputCustom = () => {
        setAddFeeCategoryState(false);
        setErrorServer(false);
        setUpdateFeeCategoryState(false);
    };
    const DivAddFeeCategory = (
        <ModalInput
            show={addFeeCategoryState}
            handleInputCustom={handleInputCustom}
            content={
                <AddFeeCategory
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddFeeCategory={handleConfirmAddFeeCategory}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleConfirmUpdateFeeCategory = (allValue) => {
        FeeCategoryService.updateFeeCategory(Id, {
            fee_name: allValue.name,
            fee_amount: allValue.ammount,
            start_date: allValue.start_date,
            end_date: allValue.end_date,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateFeeCategoryState(false);
                    setKeyword("");
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateFeeCategoryState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const DivUpdateFeeCategory = (
        <ModalInput
            show={updateFeeCategoryState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateFeeCategory
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateFeeCategory={
                        handleConfirmUpdateFeeCategory
                    }
                    errorServer={errorServer}
                    FeeCategoryId={Id}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        FeeCategoryService.deleteFeeCategoryById(Id).then((res) => {
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

    const handleAddFeeCategory = () => {
        setAddFeeCategoryState(true);
        setErrorServer(false);
        setErrorMessage("");
        setKeyword("");
    };

    function PaginatedItems({ itemsPerPage, searchFeeCategory }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchFeeCategory.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchFeeCategory.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchFeeCategory.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableFeeCategory feecategories={currentItems} />
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

    const TableFeeCategory = ({ feecategories }) => {
        const feecategoryItem = feecategories.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.ammount}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
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
                setUpdateFeeCategoryState(true);
                setId(id);
            }
        }

        const headerFee = (
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead className="table-head-row">{headerFee}</thead>
                <tbody className="table-row">{feecategoryItem}</tbody>
            </table>
        );
    };

    const searchFeeCategory = (feecategory) => {
        return feecategory.filter((fee) =>
            fee.name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Fee Category</h3>
                </div>
                <div className="right-header">
                    <button
                        className="btn-account"
                        onClick={handleAddFeeCategory}
                    >
                        Add Fee Category
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
                searchFeeCategory={searchFeeCategory(feecategories)}
            />
            {/* <div className="table-content">
                <TableFeeCategory
                    feecategories={searchFeeCategory(feecategories)}
                />
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
                {addFeeCategoryState ? DivAddFeeCategory : null}
                {updateFeeCategoryState ? DivUpdateFeeCategory : null}
                {isDelete ? ConfirmDelete : null}
            </footer> */}
            {addFeeCategoryState ? DivAddFeeCategory : null}
            {updateFeeCategoryState ? DivUpdateFeeCategory : null}
            {isDelete ? ConfirmDelete : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default FeeCategoryAdmin;
