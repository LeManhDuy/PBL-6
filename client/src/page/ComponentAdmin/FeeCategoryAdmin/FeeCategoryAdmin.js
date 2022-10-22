import React, { useEffect, useState } from "react";
import "./FeeCategoryAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const FeeCategoryAdmin = () => {
    const TableFeeCategory = () => {
        const feecategoryItem = (
            <tr>
                <td>BHYT</td>
                <td>500.000VND</td>
                <td>
                    <i className="fa-regular fa-pen-to-square btn-edit"></i>
                    <i className="fa-regular fa-trash-can btn-delete"></i>
                    <i className="fa-regular fa-eye btn-view"></i>
                </td>
            </tr>
        );

        const headerFee = (
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        );
        return (
            <table id="table">
                <thead>{headerFee}</thead>
                <tbody>{feecategoryItem}</tbody>
            </table>
        );
    };
    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Class</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account">Add class</button>
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
                <TableFeeCategory />
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
            </footer>
        </div>
    );
};

export default FeeCategoryAdmin;
