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
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";

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
    const [isReset, setIsReset] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPrincipal();
        getParents();
        getTeachers();
        getAffair();
    }, [state]);

    const options = [
        { key: 1, label: "Admin", value: "principal" },
        { key: 2, label: "Parent", value: "parents" },
        { key: 3, label: "Teacher", value: "teacher" },
        { key: 4, label: "Staff", value: "affair" },
    ];

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Type
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
        setIsLoading(false);
        setDropValue(event.target.value);
        setKeyword("");
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    // Get Account

    const getPrincipal = () => {
        setIsLoading(true);
        AccountService.getAccountsPrincipal()
            .then((response) => {
                const dataSources = response.getPrincipalInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_fullname,
                            username: item.account_id.account_username,
                            account_id: item.account_id._id,
                            role: item.account_id.account_role,
                            birth: item.person_dateofbirth,
                            email: item.person_email,
                            gender: item.person_gender,
                            phone: item.person_phonenumber,
                            address: item.person_address,
                            job: item.parent_job,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setPrincipal(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getParents = () => {
        setIsLoading(true);
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
                            account_id: item.person_id.account_id._id,
                            role: item.person_id.account_id.account_role,
                            birth: item.person_id.person_dateofbirth,
                            email: item.person_id.person_email,
                            gender: item.person_id.person_gender,
                            phone: item.person_id.person_phonenumber,
                            address: item.person_id.person_address,
                            job: item.person_id.parent_job,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setParents(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getTeachers = () => {
        setIsLoading(true);
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
                            account_id: item.person_id.account_id._id,
                            role: item.person_id.account_id.account_role,
                            birth: item.person_id.person_dateofbirth,
                            email: item.person_id.person_email,
                            gender: item.person_id.person_gender,
                            phone: item.person_id.person_phonenumber,
                            address: item.person_id.person_address,
                            job: item.person_id.parent_job,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setTeacher(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAffair = () => {
        setIsLoading(true);
        AccountService.getAccountsAffair()
            .then((response) => {
                const dataSources = response.getAffairInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.person_fullname,
                            username: item.account_id.account_username,
                            account_id: item.account_id._id,
                            role: item.account_id.account_role,
                            birth: item.person_dateofbirth,
                            email: item.person_email,
                            gender: item.person_gender,
                            phone: item.person_phonenumber,
                            address: item.person_address,
                            job: item.parent_job,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setAffair(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //

    function PaginatedItems({ itemsPerPage, searchAccount }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchAccount.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchAccount.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchAccount.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableAccounts accounts={currentItems} value={dropValue} />
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

    const TableAccounts = ({ accounts, value }) => {
        const accountItem = accounts.map((item) => (
            <tr data-key={item.id} key={item.id} data-account={item.account_id}>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role.toUpperCase()}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                    <i className="fa-solid fa-shield-halved btn-reset"></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            const accountId =
                e.target.parentElement.parentElement.getAttribute(
                    "data-account"
                );
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
            } else if (e.target.className.includes("btn-reset")) {
                setIsReset(true);
                setId(accountId);
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
                    <th>User Name</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
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
        setIsReset(false);
    };

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
        setErrorMessage("");
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
                        setErrorMessage("");
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
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
                        setErrorMessage("");
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (type === "teacher") {
            var formData = new FormData();
            formData.append("account_username", allValue.username);
            formData.append("account_password", allValue.password);
            formData.append("person_fullname", allValue.name);
            formData.append("person_dateofbirth", allValue.dateOfBirth);
            formData.append("person_email", allValue.email);
            formData.append("person_gender", allValue.gender);
            formData.append("person_phonenumber", allValue.phone);
            formData.append("person_address", allValue.address);
            formData.append("graduated_school", allValue.graduated);
            formData.append("working_since", allValue.working);
            formData.append("certificate", allValue.certificate);
            if (!!allValue.img)
                formData.append(
                    "person_image",
                    allValue.img,
                    allValue.img.name
                );
            AccountService.addAccountTeachers(formData)
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setDropValue(type);
                        setErrorServer(false);
                        setErrorMessage("");
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else {
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
            AccountService.addAccountAffairs(formData)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        setState(!state);
                        setDropValue(type);
                        setErrorServer(false);
                        setErrorMessage("");
                        setAddState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        }
    };

    const handleConfirmUpdateAccount = (allValue) => {
        if (dropValue === "principal") {
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
            AccountService.updateAccountPrincipals(formData, id)
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setErrorServer(false);
                        setErrorMessage("");
                        setUpdateState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setUpdateState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (dropValue === "parents") {
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
                        setErrorMessage("");
                        setUpdateState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setUpdateState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        } else if (dropValue === "teacher") {
            var formData = new FormData();
            formData.append("account_username", allValue.username);
            formData.append("account_password", allValue.password);
            formData.append("person_fullname", allValue.name);
            formData.append("person_dateofbirth", allValue.dateOfBirth);
            formData.append("person_email", allValue.email);
            formData.append("person_gender", allValue.gender);
            formData.append("person_phonenumber", allValue.phone);
            formData.append("person_address", allValue.address);
            formData.append("graduated_school", allValue.graduated);
            formData.append("working_since", allValue.working);
            formData.append("certificate", allValue.certificate);
            if (!!allValue.img)
                formData.append(
                    "person_image",
                    allValue.img,
                    allValue.img.name
                );
            AccountService.updateAccountTeachers(formData, id)
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setErrorServer(false);
                        setErrorMessage("");
                        setUpdateState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setAddState(true);
                    }
                })
                .catch((error) => console.log("error", error));
        }
        //affair
        else {
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
            AccountService.updateAccountAffairs(formData, id)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        setState(!state);
                        setErrorServer(false);
                        setErrorMessage("");
                        setUpdateState(false);
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                        setUpdateState(true);
                    }
                })
                .catch((error) => console.log("error", error));
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
                    errorMessage={errorMessage}
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
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleAddAccount = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    // Delete

    const handleDelete = () => {
        if (dropValue === "principal")
            AccountService.deleteAccountPrincipalsById(id).then((res) => {
                if (res.success) {
                    setState(!state);
                }
            });
        else if (dropValue === "parents")
            AccountService.deleteAccountParentsById(id).then((res) => {
                if (res.success) {
                    setState(!state);
                }
            });
        else if (dropValue === "teacher")
            AccountService.deleteAccountTeachersById(id).then((res) => {
                if (res.success) {
                    setState(!state);
                }
            });
        // console.log("Hello");
        else {
            AccountService.deleteAccountAffairsById(id).then((res) => {
                if (res.success) {
                    setState(!state);
                }
            });
        }
        setIsDelete(false);
    };

    //Handle reset password
    const handleReset = () => {
        AccountService.resetPasswordById(id).then((res) => {
            if (res.success) {
                setState(!state);
            }
        });
        setIsReset(false);
    };

    //Handle Search
    const searchAccount = (account) => {
        if (dropValue === "principal") {
            return account.filter(
                (account) =>
                    account.name
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    account.email.toLowerCase().includes(keyword.toLowerCase())
            );
        } else if (dropValue === "parents") {
            return account.filter(
                (account) =>
                    account.name
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    account.email.toLowerCase().includes(keyword.toLowerCase())
            );
        } else if (dropValue === "teacher") {
            return account.filter(
                (account) =>
                    account.name
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    account.email.toLowerCase().includes(keyword.toLowerCase())
            );
        } else if (dropValue === "affair") {
            return account.filter(
                (account) =>
                    account.name
                        .toLowerCase()
                        .includes(keyword.toLowerCase()) ||
                    account.email.toLowerCase().includes(keyword.toLowerCase())
            );
        } else {
            return account;
        }
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

    const ConfirmReset = (
        <ModalCustom
            show={isReset}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleReset}
                    title={`Do you want to reset this account password?`}
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
                        Add Account
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
            {/* <div className="table-content"> */}
            {dropValue === "principal" ? (
                // <TableAccounts
                //     accounts={searchAccount(principal)}
                //     value={dropValue}
                // />
                <PaginatedItems
                    itemsPerPage={10}
                    searchAccount={searchAccount(principal)}
                />
            ) : dropValue === "parents" ? (
                // <TableAccounts
                //     accounts={searchAccount(parents)}
                //     value={dropValue}
                // />
                <PaginatedItems
                    itemsPerPage={10}
                    searchAccount={searchAccount(parents)}
                />
            ) : dropValue === "teacher" ? (
                // <TableAccounts
                //     accounts={searchAccount(teacher)}
                //     value={dropValue}
                // />
                <PaginatedItems
                    itemsPerPage={10}
                    searchAccount={searchAccount(teacher)}
                />
            ) : (
                // <TableAccounts
                //     accounts={searchAccount(affair)}
                //     value={dropValue}
                // />
                <PaginatedItems
                    itemsPerPage={10}
                    searchAccount={searchAccount(affair)}
                />
            )}
            {/* </div> */}
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
                {isDelete ? ConfirmDelete : null}
                {addState ? DivAddAccount : null}
                {updateState ? DivUpdateAccount : null}
            </footer> */}
            {isDelete ? ConfirmDelete : null}
            {isReset ? ConfirmReset : null}
            {addState ? DivAddAccount : null}
            {updateState ? DivUpdateAccount : null}
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default AccountAdmin;
