import React, { useEffect, useState } from "react";
import "./ClassTeacher.css";
import TeacherService from "../../../config/service/TeacherService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import StudentService from "../../../config/service/StudentService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import FormDetailClass from "./FormDetailClass/FormDetailClass";
import Loading from "../../../lib/Loading/Loading";

const ClassTeacher = () => {
    const [students, setStudents] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [id, setId] = useState("");
    const [nameClass, setNameClass] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStudentByTeacherId();
    }, []);

    const getStudentByTeacherId = () => {
        setIsLoading(true);
        StudentService.getStudentByTeacherId(
            JSON.parse(localStorage.getItem("@Login")).teacher._id
        )
            .then((response) => {
                if (response.success == false) setStudents([]);
                else {
                    setNameClass(response.classes.class_name);
                    const dataSources = response.studentInformation.map(
                        (item, index) => {
                            return {
                                key: index + 1,
                                id: item._id,
                                student_name: item.student_fullname,
                                student_date_of_birth: item.student_dateofbirth,
                                student_image: item.student_image,
                                parentsId: item.parent_id._id,
                                parent_name: item.parent_id.parent_name,
                                parent_address: item.parent_id.parent_address,
                                parent_phone: item.parent_id.parent_phone,
                            };
                        }
                    );
                    setStudents(dataSources);
                    setIsLoading(false);
                }
            })
            .catch((error) => console.log("error", error));
    };

    const handleCloseModalCustom = () => {
        setIsDetail(false);
    };

    const handleDetail = (e) => {
        setId(e.target.parentElement.parentElement.getAttribute("data-key"));
        setIsDetail(true);
    };

    const TableAccounts = ({ students }) => {
        const accountItem = students.map((item) => (
            <tr data-key={item.id} key={item.id}>
                <td>{item.student_name}</td>
                <td>
                    {new Date(item.student_date_of_birth).toLocaleDateString()}
                </td>
                <td>{item.parent_name}</td>
                <td>{item.parent_phone}</td>
                <td>{item.parent_address}</td>
                <td>
                    <button id="btn-detail" onClick={handleDetail}>
                        Detail
                    </button>
                </td>
            </tr>
        ));

        return (
            <table id="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Date Of Birth</th>
                        <th>Parent Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{accountItem}</tbody>
            </table>
        );
    };

    const DivDetailClass = (
        <ModalCustom
            show={isDetail}
            content={
                <FormDetailClass
                    handleCloseModalCustom={handleCloseModalCustom}
                    id={id}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div className="class-teacher">
            <header>
                <div className="title">
                    <h4>{"List Student Of The Class " + nameClass}</h4>
                    <h4>{"Total: " + students.length}</h4>
                </div>
            </header>
            <div className="table-content">
                <TableAccounts students={students} />
            </div>
            {isDetail ? DivDetailClass : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ClassTeacher;
