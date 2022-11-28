import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ClassService from "../../../config/service/ClassService";
import "./AssociationTeacher.css";
import ReactPaginate from "react-paginate";

const AssociationTeacher = () => {
    const [parents, setParent] = useState([]);
    const [state, setState] = useState(false);
    const [className, setClassName] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getParent();
    }, [state])

    const getParent = () => {
        const personID = JSON.parse(localStorage.getItem("@Login")).AccountId;
        ClassService.getParentAssociations(personID)
            .then((response) => {
                const dataSources = response.parentInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.person_id.person_fullname,
                        dateOfBirth: item.person_id.person_dateofbirth.split("T")[0],
                        gender: item.person_id.person_gender,
                        mail: item.person_id.person_email,
                        phone: item.person_id.person_phonenumber,
                        isInAssociation: item.is_in_association
                    };
                });
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.name > b.name ? 1 : -1,);
                setClassName(response.class_name);
                setParent(dataSourcesSorted);
            }).catch((error) => {
                console.log(error);
            });
    }

    const changeIsAssociation = (id) => {
        ClassService.changeIsAssociation(id)
            .then((response) => {
                if (response.success) {
                    setState(!state);
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const searchParent = (parents) => {
        return parents.filter(
            (parents) =>
                parents.name
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                parents.mail.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    function PaginatedItems({ itemsPerPage, searchParent }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchParent.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchParent.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % searchParent.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableParents parents={currentItems} />
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
                        previousClassName="previous-btn ml-5 page-item"
                        previousLinkClassName="page-link"
                        nextClassName="next-btn mr-5 page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    />
                </footer>

            </>
        );
    }

    const TableParents = ({ parents }) => {
        const parentItem = parents.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.name}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{item.phone}</td>
                <td>{item.mail}</td>
                <td>
                    <button onClick={click}>
                        {item.isInAssociation ? "Yes" : "No"}
                    </button>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            // setId(id);
            changeIsAssociation(id);
        }

        let headerParent;
        if (!headerParent) {
            headerParent = (
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>In Parent Association</th>
                </tr>
            );
        }

        return (
            <table id="table">
                <thead className="table-head-row">{headerParent}</thead>
                <tbody className="table-row">{parentItem}</tbody>
            </table>
        )


    };

    return (
        <div className="class-teacher">
            <div className="class-teacher-header">
                <header>
                    <div className="title">
                        <h3>Manage Parent Association Class { className }</h3>
                        <div className="right-header">
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
                    </div>
                </header>
            </div>
            <PaginatedItems itemsPerPage={10} searchParent={searchParent(parents)}/>
            {/* <div className="table-content">
                <TableParents parents={searchParent(parents)} />
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
            </footer> */}
        </div>
    );
}

export default AssociationTeacher