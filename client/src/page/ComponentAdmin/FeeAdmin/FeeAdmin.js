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
    const [state, setState] = useState(false);
    const [fees, setFee] = useState([])
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [viewState, setViewState] = useState(false);
    useEffect(() => {
        getFee();
    }, [state]);

    const getFee = () => {
        FeeService.getFee()
            .then((response) => {
                const dataSources = response.allFee.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            fee_name: item.fee_category_id ? item.fee_category_id.fee_name : "NULL",
                            //fee_amount: item.allFee[0].fee_category_id.fee_amount,
                            pupil_name: item.pupil_id.pupil_name,
                            // person_fullname: item.allFee[0].pupil_id.parent_id.person_id.pupil_name,
                            start_date: item.start_date.split("T")[0],
                            end_date: item.end_date.split("T")[0],
                            paid_date: item.paid_date ? item.paid_date.split("T")[0] : "YYYY-MM-DD",
                            fee_status: item.fee_status ? "PAID" : "UNPAID",
                            // class_name: item.allFee[0].class_id.class_name,
                        }
                    }
                );
                setFee(dataSources);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleInputCustom = () => {
        setAddFeeState(false);
        setErrorServer(false);
        setUpdateFeeState(false);
    };

    const handleConfirmAddFee = (allValue) => {
        console.log(allValue);
        FeeService.addFee({
            fee_status: allValue.fee_status,
            start_date: allValue.start_date,
            end_date: allValue.end_date,
            paid_date: allValue.paid_date,
            fee_category: allValue.fee_category,
            pupil: allValue.pupil
        })
            .then((res) => {
                console.log(res)
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setAddFeeState(false);
                } else {
                    setErrorServer(true);
                    setAddFeeState(true);
                }
            })
            .catch((error) => console.log("error", error));
    }
    const DivAddFee = (
        <ModalInput
            show={addFeeState}
            handleInputCustom={handleInputCustom}
            content={
                <AddFee
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddFee={handleConfirmAddFee}
                    errorServer={errorServer}
                />
            }
        />
    );
    const handleAddFee = () => {
        setAddFeeState(true);
        setErrorServer(false);
    }

    const TableFee = ({ fees }) => {
        const feeItem = fees.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.fee_name}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.paid_date}</td>
                <td>{item.pupil_name}</td>
                <td>{item.fee_status}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                    <i className="fa-regular fa-eye btn-view"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            if (e.target.className.includes("btn-delete")) {
                // setIsDelete(true);
                // setId(id);
                // setName(
                //     e.target.parentElement.parentElement.querySelectorAll(
                //         "td"
                //     )[0].textContent
                // );
            } else if (e.target.className.includes("btn-edit")) {
                // setUpdateClassState(true);
                // setId(id);
            }
        }

        const handleCloseModalCustom = () => {
            setIsDelete(false);
        };

        const headerFee = (
            <tr>
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

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Fee</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddFee}>Add Fee</button>
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
                <TableFee fees={fees} />
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
                    {addFeeState ? DivAddFee : null}
                </div>
            </footer>
        </div>
    );
};

export default FeeAdmin;