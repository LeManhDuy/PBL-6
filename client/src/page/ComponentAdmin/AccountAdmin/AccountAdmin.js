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
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import AddAccount from "../../../lib/ModalInput/AddAccount/AddAccount";
import UpdateAccount from "../../../lib/ModalInput/UpdateAccount/UpdateAccount";

function AccountAdmin() {
    const [parents, setParents] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [principal, setPrincipal] = useState([]);
    const [affair, setAffair] = useState([]);
    const [dropValue, setDropValue] = useState("principal");
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [addState, setAddState] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [errorServer, setErrorServer] = useState(false);

    useEffect(() => {
        getPrincipal();
        getParents();
        getTeachers();
        getAffair();
    }, [state]);

    const options = [
        { key: 1, label: "Principal", value: "principal" },
        { key: 2, label: "Parents", value: "parents" },
        { key: 3, label: "Teacher", value: "teacher" },
        { key: 4, label: "Affair", value: "affair" },
    ];

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Type of account
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
        setKeyword("");
    };

    // Get Account

    const getPrincipal = () => {
        AccountService.getAccountsPrincipal()
            .then((response) => {
                const dataSources = response.getPrincipalInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_fullname,
                            username: item.account_id.account_username,
                            birth: item.person_dateofbirth,
                            email: item.person_email,
                            gender: item.person_gender,
                            phone: item.person_phonenumber,
                            address: item.person_address,
                            job: item.parent_job,
                        };
                    }
                );
                setPrincipal(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getParents = () => {
        AccountService.getAccountsParents()
            .then((response) => {
                const dataSources = response.getParentsInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_id.person_fullname,
                            username:
                                item.person_id.account_id.account_username,
                            birth: item.person_id.person_dateofbirth,
                            email: item.person_id.person_email,
                            gender: item.person_id.person_gender,
                            phone: item.person_id.person_phonenumber,
                            address: item.person_id.person_address,
                            job: item.person_id.parent_job,
                        };
                    }
                );
                setParents(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTeachers = () => {
        AccountService.getAccountsTeacher()
            .then((response) => {
                const dataSources = response.getTeacherInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_id.person_fullname,
                            username:
                                item.person_id.account_id.account_username,
                            birth: item.person_id.person_dateofbirth,
                            email: item.person_id.person_email,
                            gender: item.person_id.person_gender,
                            phone: item.person_id.person_phonenumber,
                            address: item.person_id.person_address,
                            job: item.person_id.parent_job,
                        };
                    }
                );
                setTeacher(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAffair = () => {
        AccountService.getAccountsAffair()
            .then((response) => {
                const dataSources = response.getAffairInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_fullname,
                            username: item.account_id.account_username,
                            birth: item.person_dateofbirth,
                            email: item.person_email,
                            gender: item.person_gender,
                            phone: item.person_phonenumber,
                            address: item.person_address,
                            job: item.parent_job,
                        };
                    }
                );
                setAffair(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //

    const TableAccounts = ({ accounts, value }) => {
        const accountItem = accounts.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
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
                setIsDelete(true);
                setId(id);
                setName(
                    e.target.parentElement.parentElement.querySelectorAll(
                        "td"
                    )[1].textContent
                );
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateState(true);
                setId(id);
                console.log(id);
            } else if (e.target.className.includes("btn-view")) {
                console.log("view");
            }
        }

        let headerAccount;
        if (
            value === "parents" ||
            value === "principal" ||
            value === "teacher" ||
            value === "affair"
        ) {
            headerAccount = (
                <tr>
                    <th>User name</th>
                    <th>Full name</th>
                    <th>Email</th>
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

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
    };

    //Add Account
    const handleConfirmAddAccount = (allValue, type) => {
        if (type === "principal") {
            var formData = new FormData();
            formData.append("account_username", allValue.username);
            formData.append("account_password", allValue.password);
            formData.append("person_fullname", allValue.name);
            formData.append("person_dateofbirth", allValue.dateOfBirth);
            formData.append("person_email", allValue.email);
            formData.append("person_gender", allValue.gender);
            formData.append("person_phonenumber", allValue.phone);
            formData.append("person_address", allValue.address);
            if (!!allValue.img)
                formData.append(
                    "person_image",
                    allValue.img,
                    allValue.img.name
                );
            AccountService.addAccountPrincipals(formData)
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setDropValue(type);
                        setErrorServer(false);
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (type === "parents") {
            var formData = new FormData();
            formData.append("account_username", allValue.username);
            formData.append("account_password", allValue.password);
            formData.append("person_fullname", allValue.name);
            formData.append("person_dateofbirth", allValue.dateOfBirth);
            formData.append("person_email", allValue.email);
            formData.append("person_gender", allValue.gender);
            formData.append("person_phonenumber", allValue.phone);
            formData.append("person_address", allValue.address);
            formData.append("parent_job", allValue.job);
            formData.append("parent_relationship", allValue.relationship);
            formData.append("is_in_association", allValue.association);
            formData.append("parent_job_address", allValue.jobAddress);
            if (!!allValue.img)
                formData.append(
                    "person_image",
                    allValue.img,
                    allValue.img.name
                );
            AccountService.addAccountParents(formData)
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setDropValue(type);
                        setErrorServer(false);
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (type === "teacher") {
        }
        //affair
        else {
            //todo
        }
    };

    const handleConfirmUpdateAccount = (allValue) => {
        if (dropValue === "principal") {
            //todo
        } else if (dropValue === "parents") {
            console.log(allValue);
            var formData = new FormData();
            formData.append("account_username", allValue.username);
            formData.append("account_password", allValue.password);
            formData.append("person_fullname", allValue.name);
            formData.append("person_dateofbirth", allValue.dateOfBirth);
            formData.append("person_email", allValue.email);
            formData.append("person_gender", allValue.gender);
            formData.append("person_phonenumber", allValue.phone);
            formData.append("person_address", allValue.address);
            formData.append("parent_job", allValue.job);
            formData.append("parent_relationship", allValue.relationship);
            formData.append("is_in_association", allValue.association);
            formData.append("parent_job_address", allValue.jobAddress);
            if (!!allValue.img)
                formData.append(
                    "person_image",
                    allValue.img,
                    allValue.img.name
                );
            console.log(allValue);
            AccountService.updateAccountParents(formData, id)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        setState(!state);
                        setErrorServer(false);
                        setUpdateState(false);
                    } else {
                        setErrorServer(true);
                        setUpdateState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (dropValue === "teacher") {
        }
        //affair
        else {
            //todo
        }
    };

    //Component Add Account (Form)
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

    //Componet Update Account
    const DivUpdateAccount = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateAccount
                    AccountId={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateAccount={handleConfirmUpdateAccount}
                    errorServer={errorServer}
                    dropValue={dropValue}
                />
            }
        />
    );

    const handleAddAccount = () => {
        setAddState(true);
    };

    // Delete

    const handleDelete = () => {
        if (dropValue === "principal")
            //todo
            console.log("hello");
        else if (dropValue === "parents")
            AccountService.deleteAccountParentsById(id).then((res) => {
                if (res.success) {
                    setState(!state);
                }
            });
        else if (dropValue === "teacher")
            //todo
            console.log("Hello");
        else {
            //todo
            console.log("Hello");
        }
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

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Account</h3>
                </div>
                <Dropdown
                    options={options}
                    value={dropValue}
                    onChange={handleChange}
                />
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddAccount}>
                        Add account
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
                {dropValue === "principal" ? (
                    <TableAccounts accounts={principal} value={dropValue} />
                ) : dropValue === "parents" ? (
                    <TableAccounts accounts={parents} value={dropValue} />
                ) : dropValue === "teacher" ? (
                    <TableAccounts accounts={teacher} value={dropValue} />
                ) : (
                    <TableAccounts accounts={affair} value={dropValue} />
                )}
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
                {addState ? DivAddAccount : null}
                {updateState ? DivUpdateAccount : null}
            </footer>
        </div>
    );
}

export default AccountAdmin;
