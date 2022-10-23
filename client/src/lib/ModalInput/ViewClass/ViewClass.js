import React, { useEffect, useState } from "react";
import "./ViewClass.css";
import ClassService from "../../../config/service/ClassService";

const ViewClass = (props) => {
    const [student, setStudent] = useState([]);
    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = () => {
        ClassService.getStudentByClassID(props.classID)
            .then((res) => {
                const dataSources = res.studentsInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item.id,
                        name: item.pupil_name,
                        date: item.pupil_dateofbirth
                            .split("T")[0]
                            .replaceAll("-", "/"),
                        gender: item.pupil_gender,
                    };
                });
                setStudent(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const TableClasses = ({ students }) => {
        const classItem = students.map((item) => (
            <tr key={item.key}>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
            </tr>
        ));

        let headerClass;
        if (!headerClass) {
            headerClass = (
                <tr>
                    <th>Name</th>
                    <th>DateOfBirth</th>
                    <th>Gender</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead>{headerClass}</thead>
                <tbody>{classItem}</tbody>
            </table>
        );
    };

    return (
        <div className="show-student-form">
            <header>
                <div>
                    <h3>
                        List Students Of Class
                    </h3>
                </div>
            </header>
            <div className="table-content">
                <TableClasses students={student} />
            </div>
        </div>
    );
};

export default ViewClass;