import React, { useEffect, useState } from "react"
import "./FeeCategoryAdmin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons"
import ModalInput from "../../../lib/ModalInput/ModalInput"
import FeeCategoryService from "../../../config/service/FeeCategoryService"
import AddFeeCategory from "../../../lib/ModalInput/AddFeeCategory/AddFeeCategory"
import UpdateFeeCategory from "../../../lib/ModalInput/UpdateFeeCategory/UpdateFeeCategory"
import ModalCustom from "../../../lib/ModalCustom/ModalCustom"
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert"

const FeeCategoryAdmin = () => {
    const [addFeeCategoryState, setAddFeeCategoryState] = useState(false)
    const [updateFeeCategoryState, setUpdateFeeCategoryState] = useState(false)
    const [Id, setId] = useState()
    const [state, setState] = useState(false)
    const [feecategories, setFeeCategory] = useState([])
    const [isDelete, setIsDelete] = useState(false)
    const [errorServer, setErrorServer] = useState(false)
    const [name, setName] = useState()

    useEffect(() => {
        getFeeCategory()
    }, [state])

    const getFeeCategory = () => {
        FeeCategoryService.getFeeCategory()
            .then((response) => {
                const dataSources = response.allFeeCategory.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.fee_name,
                            ammount: item.fee_amount
                        }
                    }
                )
                setFeeCategory(dataSources)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleConfirmAddFeeCategory = (allValue) => {
        FeeCategoryService.addFeeCategory({
            fee_name: allValue.name,
            fee_amount: allValue.ammount
        })
            .then((res) => {
                if (res.success) {
                    setState(!state)
                    setErrorServer(false)
                    setAddFeeCategoryState(false)
                } else {
                    setErrorServer(true)
                    setAddFeeCategoryState(true)
                }
            })
            .catch((error) => console.log("error", error))
    }
    const handleInputCustom = () => {
        setAddFeeCategoryState(false)
        setErrorServer(false)
        setUpdateFeeCategoryState(false)
    }
    const DivAddFeeCategory = (
        <ModalInput
            show={addFeeCategoryState}
            handleInputCustom={handleInputCustom}
            content={
                <AddFeeCategory
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddFeeCategory={handleConfirmAddFeeCategory}
                    errorServer={errorServer}
                />
            }
        />
    )

    const handleConfirmUpdateFeeCategory = (allValue) => {
        FeeCategoryService.updateFeeCategory(Id, {
            fee_name: allValue.name,
            fee_amount: allValue.ammount
        }).then((res) => {
            if (res.success) {
                setState(!state);
                setErrorServer(false);
                setUpdateFeeCategoryState(false);
            } else {
                setErrorServer(true);
                setUpdateFeeCategoryState(true);
            }
        })
            .catch((error) => console.log("error", error));
    }

    const DivUpdateFeeCategory = (
        <ModalInput
            show={updateFeeCategoryState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateFeeCategory
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateFeeCategory={handleConfirmUpdateFeeCategory}
                    errorServer={errorServer}
                    FeeCategoryId={Id}
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

    const handleAddFeeCategory = () => {
        setAddFeeCategoryState(true);
        setErrorServer(false);
    }

    const TableFeeCategory = ({ feecategories }) => {
        const feecategoryItem = feecategories.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.ammount}</td>
                <td onClick={click}>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                </td>
            </tr>
        ))

        function click(e) {
            const id = e.target.parentElement.parentElement.getAttribute("data-key")
            if (e.target.className.includes("btn-delete")) {
                setIsDelete(true)
                setId(id)
                setName(
                    e.target.parentElement.parentElement.querySelectorAll(
                        "td"
                    )[1].textContent
                )
            } else if (e.target.className.includes("btn-edit")) {
                setUpdateFeeCategoryState(true)
                setId(id)
            }
        }

        const headerFee = (
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        )
        return (
            <table id="table">
                <thead className="table-head-row">{headerFee}</thead>
                <tbody className="table-row">{feecategoryItem}</tbody>
            </table>
        )
    }
    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Fee Category</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddFeeCategory}>Add Fee Category</button>
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
                <TableFeeCategory feecategories={feecategories} />
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
            </footer>
        </div>
    )
}

export default FeeCategoryAdmin
