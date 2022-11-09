import React, { useEffect, useState } from "react";
import "./FeeAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import AddFee from "../../../lib/ModalInput/AddFee/AddFee";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import FeeService from "../../../config/service/FeeService";
import FeeCategoryService from "../../../config/service/FeeCategoryService";
import UpdateFee from "../../../lib/ModalInput/UpdateFee/UpdateFee";
import ReactPaginate from "react-paginate";

const FeeAdmin = () => {
    const [addFeeState, setAddFeeState] = useState(false);
    const [updateFeeState, setUpdateFeeState] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [fees, setFee] = useState([]);
    const [feeCategory, setFeeCategory] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [isMultiDelete, setIsMultiDelete] = useState(false);
    const [isMultiUpdate, setIsMultiUpdate] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [listFee, setListFee] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [dropValue, setDropValue] = useState("All");
    const [dropValueFeeCateogory, setDropValueFeeCateogory] = useState("All");

    useEffect(() => {
        getFee();
        getFeeCategory();
    }, [state]);

    const options = [
        { key: 1, label: "All", value: "all" },
        { key: 2, label: "Paided", value: "paided" },
        { key: 3, label: "UnPaid", value: "unpaid" },
    ];

    const getFee = () => {
        FeeService.getFee()
            .then((response) => {
                const dataSources = response.allFee.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        fee_name: item.fee_category_id
                            ? item.fee_category_id.fee_name
                            : "Empty",
                        pupil_name: item.pupil_id
                            ? item.pupil_id.pupil_name
                            : "Empty",
                        class_name: item.pupil_id
                            ? item.pupil_id.class_id
                                ? item.pupil_id.class_id.class_name
                                : "Empty"
                            : "Empty",
                        start_date: item.fee_category_id.start_date
                            ? item.fee_category_id.start_date.split("T")[0]
                            : "YYYY-MM-DD",
                        end_date: item.fee_category_id.end_date
                            ? item.fee_category_id.end_date.split("T")[0]
                            : "YYYY-MM-DD",
                        paid_date: item.paid_date
                            ? item.paid_date.split("T")[0]
                            : "YYYY-MM-DD",
                        fee_status: item.fee_status ? "PAIDED" : "UNPAID",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.class_name > b.class_name ? 1 : -1,);
                setFee(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFeeStatus = (status) => {
        FeeService.getFeeStatus(status)
            .then((response) => {
                const dataSources = response.getfeeInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        fee_name: item.fee_category_id
                            ? item.fee_category_id.fee_name
                            : "Empty",
                        pupil_name: item.pupil_id
                            ? item.pupil_id.pupil_name
                            : "Empty",
                        start_date: item.fee_category_id.start_date
                            ? item.fee_category_id.start_date.split("T")[0]
                            : "YYYY-MM-DD",
                        end_date: item.fee_category_id.end_date
                            ? item.fee_category_id.end_date.split("T")[0]
                            : "YYYY-MM-DD",
                        paid_date: item.paid_date
                            ? item.paid_date.split("T")[0]
                            : "YYYY-MM-DD",
                        fee_status: item.fee_status ? "PAIDED" : "UNPAID",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.fee_name > b.fee_name ? 1 : -1,);
                setFee(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFeeCategory = () => {
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.fee_name,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.name > b.name ? 1 : -1,);
                setFeeCategory(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFeeByFeeCategoryId = (filter) => {
        FeeService.getFeeByFeeCategoryId(filter)
            .then((response) => {
                const dataSources = response.getfeeInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        fee_name: item.fee_category_id
                            ? item.fee_category_id.fee_name
                            : "Empty",
                        pupil_name: item.pupil_id
                            ? item.pupil_id.pupil_name
                            : "Empty",
                        class_name: item.pupil_id
                            ? item.pupil_id.class_id
                                ? item.pupil_id.class_id.class_name
                                : "Empty"
                            : "Empty",
                        start_date: item.fee_category_id.start_date
                            ? item.fee_category_id.start_date.split("T")[0]
                            : "YYYY-MM-DD",
                        end_date: item.fee_category_id.end_date
                            ? item.fee_category_id.end_date.split("T")[0]
                            : "YYYY-MM-DD",
                        paid_date: item.paid_date
                            ? item.paid_date.split("T")[0]
                            : "YYYY-MM-DD",
                        fee_status: item.fee_status ? "PAIDED" : "UNPAID",
                    }
                })
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.class_name > b.class_name ? 1 : -1,);
                setFee(dataSourcesSorted)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Status
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    };
    const DropdownFeeCategory = ({ value, options, onChange }) => {
        return (
            <label>
                Type
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
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
    const handleFeeCategoryChange = (event) => {
        setDropValueFeeCateogory(event.target.value);
        feeCategory.map((item) => {
            if (event.target.value === item.id) {
                getFeeByFeeCategoryId(item.id);
            } else if (event.target.value === "All") {
                getFee();
                setDropValue("All")
            }
        });
    };

    const handleChange = (event) => {
        setDropValue(event.target.value);
        if (event.target.value === "paided") {
            const feesArray = fees.filter(
                (fee) =>
                    fee.fee_status.toLowerCase().includes("paided")
            );
            setFee(feesArray)
        }
        if (event.target.value === "unpaid") {
            const feesArray = fees.filter(
                (fee) =>
                    fee.fee_status.toLowerCase().includes("unpaid")
            );
            setFee(feesArray)
        }
        if (event.target.value === "all") {
            getFee();
            setDropValueFeeCateogory("All")
        }
    };

    const handleInputCustom = () => {
        setAddFeeState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateFeeState(false);
    };

    const handleConfirmAddFee = (allValue, list_pupil) => {
        if (allValue.fee_status === "false" || allValue.fee_status == "") {
            allValue.paid_date = null;
        }
        FeeService.addFee({
            list_pupil: list_pupil,
            paid_date: allValue.paid_date,
            fee_status: allValue.fee_status,
            fee_category_id: allValue.fee_category,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddFeeState(false);
                    setKeyword("");
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddFeeState(true);
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                }
            })
            .catch((error) => console.log("error", error));
    };
    const DivAddFee = (
        <ModalInput
            show={addFeeState}
            handleInputCustom={handleInputCustom}
            content={
                <AddFee
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddFee={handleConfirmAddFee}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );
    const handleAddFee = () => {
        setAddFeeState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const handleConfirmUpdateFee = (allValue) => {
        if (allValue.fee_status === "false" || allValue.fee_status == "") {
            allValue.paid_date = null;
        }
        FeeService.updateFee(id, {
            paid_date: allValue.paid_date,
            fee_status: allValue.fee_status,
            fee_category_id: allValue.fee_category,
            pupil_id: allValue.pupil,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateFeeState(false)
                    setKeyword("");
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateFeeState(true);
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                }
            })
            .catch((error) => console.log("error", error));
    };

    const DivUpdateFee = (
        <ModalInput
            show={updateFeeState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateFee
                    feeID={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateFee={handleConfirmUpdateFee}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsDelete(false);
        setIsMultiDelete(false);
        setIsMultiUpdate(false);
    };

    const handleDelete = () => {
        FeeService.deleteFeeById(id).then((res) =>
            res.success ? setState(!state) : null
        );
        setIsDelete(false);
    };

    function PaginatedItems({ itemsPerPage, searchFee }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchFee.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchFee.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % searchFee.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableFee fees={currentItems} />
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

    const TableFee = ({ fees }) => {
        const feeItem = fees.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td></td>
                <td><input
                    className="check-input"
                    type="checkbox"
                    checked={listFee[item.id]}
                    name="fee"
                    onChange={() => {
                        setListFee({
                            ...listFee,
                            [item.id]: !listFee[item.id]
                        })
                    }}
                /></td>
                <td>{item.fee_name}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.paid_date}</td>
                <td>{item.pupil_name}</td>
                <td>{item.class_name}</td>
                <td>{item.fee_status}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            if (e.target.className.includes("btn-edit")) {
                setUpdateFeeState(true);
                setId(id);
            }
        }
        const headerFee = (
            <tr>
                <th>
                    <input
                        className="check-input"
                        type="checkbox"
                        onChange={toggle}
                        checked={selectAll} />
                </th>
                <th>
                    Select</th>
                <th>Fee's Name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Paid date</th>
                <th>Student's Name</th>
                <th>Class Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead>{headerFee}</thead>
                <tbody>{feeItem}</tbody>
            </table>
        );
    };
    const toggle = (event) => {
        var checkboxes = document.getElementsByName('fee');
        var hash = {};
        if (event.target.checked) {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = true;
            }
            const arrFeeID = fees.map(e => e.id);
            for (var i = 0; i < arrFeeID.length; i++)
                hash[arrFeeID[i]] = true;
            setListFee(hash)
            setSelectAll(true)
        }
        else {
            for (var i = 0, n = checkboxes.length; i < n; i++) {
                checkboxes[i].checked = false;
            }
            setSelectAll(false)
            resetListFee();
        }
    }
    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const searchFee = (fees) => {
        return fees.filter(
            (fee) =>
                fee.fee_name.toLowerCase().includes(keyword.toLowerCase()) ||
                fee.pupil_name.toLowerCase().includes(keyword.toLowerCase()) ||
                fee.fee_status.toLowerCase().includes(keyword.toLowerCase()) ||
                fee.class_name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const resetListFee = () => {
        setListFee({})
    }
    const checkClickUpdate = () => {
        setIsMultiUpdate(true);
    }

    const handleUpdateStatus = () => {
        FeeService.updateMultipleStatus({
            fee_list: listFee,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    resetListFee()
                    setSelectAll(false)
                    setErrorMessage("");
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setDropValue("All")
                    resetListFee()
                    setDropValueFeeCateogory("All")
                }
            })
            .catch((error) => console.log("error", error));
        setIsMultiUpdate(false);
    };

    const ConfirmMultiUpdate = (
        <ModalCustom
            show={isMultiUpdate}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleUpdateStatus}
                    title={`Do you want to update status?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const checkClickDelete = () => {
        setIsMultiDelete(true);
    }

    const handleMultiDelete = () => {
        FeeService.deleteMultiFee({
            fee_list: listFee,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    resetListFee()
                    setSelectAll(false)
                    setErrorMessage("");
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setDropValue("All")
                    setDropValueFeeCateogory("All")
                    resetListFee()
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
                    <h3>Manage Fee</h3>
                </div>
                <DropdownFeeCategory
                    options={feeCategory}
                    value={dropValueFeeCateogory}
                    onChange={handleFeeCategoryChange}
                />
                <Dropdown
                    options={options}
                    value={dropValue}
                    onChange={handleChange}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddFee}>
                        Add
                    </button>
                    <button className="btn-account update" onClick={checkClickUpdate}>
                        Update Status
                    </button>
                    <button className="btn-account delete" onClick={checkClickDelete}>
                        Delete
                    </button>
                    {/* <button className="btn-account" onClick={handleUpdateStatus(listFee)}>
                        Update Status
                    </button> */}
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
            <PaginatedItems itemsPerPage={2} searchFee={searchFee(fees)} />
            {/* <div className="table-content">
                <TableFee fees={searchFee(fees)} />
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
                    {updateFeeState ? DivUpdateFee : null}
                    {isDelete ? ConfirmDelete : null}
                    {isMultiDelete ? ConfirmMultiDelete : null}
                    {isMultiUpdate ? ConfirmMultiUpdate : null}
                    {addFeeState ? DivAddFee : null}
                </div>
            </footer> */}

            {updateFeeState ? DivUpdateFee : null}
            {isDelete ? ConfirmDelete : null}
            {isMultiDelete ? ConfirmMultiDelete : null}
            {isMultiUpdate ? ConfirmMultiUpdate : null}
            {addFeeState ? DivAddFee : null}
        </div>
    );
};

export default FeeAdmin;
