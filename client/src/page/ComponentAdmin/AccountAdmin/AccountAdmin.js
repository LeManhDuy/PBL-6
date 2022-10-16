import React, { useEffect, useState } from "react";
import "./AccountAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../../config/service/AccountService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddAccount from "../../../lib/ModalInput/AddAccount/AddAccount";

function AccountAdmin() {
    const [admin, setAdmin] = useState([]);
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getAdmins();
    }, [state]);

    const getAdmins = () => {
        AccountService.getAccountsAdmin()
            .then((response) => {
                const dataSources = response.alladmin.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.admin_username,
                        email: item.admin_email,
                    };
                });
                setAdmin(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableAccounts = ({ accounts, value }) => {
        const accountItem = accounts.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{value.toUpperCase()}</td>
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
                console.log("delete");
            } else if (e.target.className.includes("btn-edit")) {
                console.log("edit");
            } else if (e.target.className.includes("btn-view")) {
                console.log("view");
            }
        }

        let headerAccount;
        if (value === "parents" || value === "admin" || value === "teacher") {
            headerAccount = (
                <tr>
                    <th>User name</th>
                    <th>Full name</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead>{headerAccount}</thead>
                <tbody>{accountItem}</tbody>
            </table>
        );
    };

    const handleInputCustom = () => {
        setAddState(false);
        setErrorServer(false);
    };

    const handleConfirmAddAccount = (allValue) => {
        AccountService.addAccountAdmin({
            admin_username: allValue.name,
            admin_password: allValue.password,
            admin_email: allValue.email,
        })
            .then((res) => {
                if (res.success) {
                    setState(!state);
                    setErrorServer(false);
                    setAddState(false);
                } else {
                    setErrorServer(true);
                    setAddState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const DivAddAccount = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddAccount
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddAccount={handleConfirmAddAccount}
                    errorServer={errorServer}
                />
            }
        />
    );

    const handleAddAccount = () => {
        setAddState(true);
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Account</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account">Add account</button>
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
                <TableAccounts accounts={admin} value={"admin"} />
            </div>
            <footer>
                {/* <hr></hr>
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
                </div> */}
                {addState ? DivAddAccount : null}
            </footer>
        </div>
    );
}

export default AccountAdmin;
