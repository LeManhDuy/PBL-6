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
import UpdateFee from "../../../lib/ModalInput/UpdateFee/UpdateFee";

const FeeAdmin = () => {
    const [addFeeState, setAddFeeState] = useState(false);
    const [updateFeeState, setUpdateFeeState] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [fees, setFee] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [listFee, setListFee] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [dropValue, setDropValue] = useState("All");

    useEffect(() => {
        getFee();
    }, [state]);

    const options = [
        { key: 1, label: "All", value: "all" },
        { key: 2, label: "Paid", value: "paid" },
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
                        start_date: item.start_date.split("T")[0],
                        end_date: item.end_date.split("T")[0],
                        paid_date: item.paid_date
                            ? item.paid_date.split("T")[0]
                            : "YYYY-MM-DD",
                        fee_status: item.fee_status ? "PAID" : "UNPAID",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.fee_name > b.fee_name ? 1 : -1,);
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
                        start_date: item.start_date.split("T")[0],
                        end_date: item.end_date.split("T")[0],
                        paid_date: item.paid_date
                            ? item.paid_date.split("T")[0]
                            : "YYYY-MM-DD",
                        fee_status: item.fee_status ? "PAID" : "UNPAID",
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.fee_name > b.fee_name ? 1 : -1,);
                setFee(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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

    const handleChange = (event) => {
        setDropValue(event.target.value);
        if (event.target.value === "paid")
            getFeeStatus(true);
        if (event.target.value === "unpaid")
            getFeeStatus(false);
        if (event.target.value === "all") {
            getFee();
        }
        setKeyword("");
    };

    const handleInputCustom = () => {
        setAddFeeState(false);
        setErrorServer(false);
        setErrorMessage("");
        setUpdateFeeState(false);
    };

    const handleConfirmAddFee = (allValue) => {
        if (allValue.fee_status === "false" || allValue.fee_status == "") {
            allValue.paid_date = null;
        }
        FeeService.addFee({
            start_date: allValue.start_date,
            end_date: allValue.end_date,
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
                    setAddFeeState(false);
                    setKeyword("");
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setAddFeeState(true);
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
            start_date: allValue.start_date,
            end_date: allValue.end_date,
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
                    //setDropValue(all);
                    setKeyword("");
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateFeeState(true);
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
    };

    const handleDelete = () => {
        FeeService.deleteFeeById(id).then((res) =>
            res.success ? setState(!state) : null
        );
        setIsDelete(false);
    };
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
                <td>{item.fee_status}</td>
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
                    title={`Do you want to delete the ${name}?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const searchFee = (fees) => {
        return fees.filter(
            (fee) =>
                fee.fee_name.toLowerCase().includes(keyword.toLowerCase()) ||
                fee.pupil_name.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const resetListFee = () => {
        setListFee({})
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
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                }
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Fee</h3>
                </div>
                <Dropdown
                    options={options}
                    value={dropValue}
                    onChange={handleChange}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddFee}>
                        Add Fee
                    </button>
                    <button className="btn-account" onClick={handleUpdateStatus}>
                        Update Status
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
            <div className="table-content">
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
                    {addFeeState ? DivAddFee : null}
                </div>
            </footer>
        </div>
    );
};

export default FeeAdmin;
