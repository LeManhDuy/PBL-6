import React, { useEffect, useState } from "react";
import "./FormSubject.css";
import ScoreService from "../../../../config/service/ScoreService";

const FormSubject = (props) => {
    const [subject, setSubject] = useState([]);
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        getSubjectByPupilID();
    }, []);

    const getSubjectByPupilID = async () => {
        let dataSources = [];
        await ScoreService.getSubjectByPupilID(props.id)
            .then((res) => {
                dataSources = res.subjects.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.subject_name,
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
        let dataNew = [];
        for (let itemOutside of dataSources) {
            await ScoreService.getAllScoreByPupilID(props.id).then((res) => {
                const detail = res.pupilScore.map((item) => {
                    return {
                        _id:
                            item.subject_id._id === itemOutside.id
                                ? item._id
                                : "",
                        midterm_score:
                            item.subject_id._id === itemOutside.id
                                ? item.midterm_score
                                : "",
                        final_score:
                            item.subject_id._id === itemOutside.id
                                ? item.final_score
                                : "",
                    };
                });
                let subject = {
                    key: itemOutside.key,
                    id: itemOutside.id,
                    name: itemOutside.name,
                    detail: detail,
                };
                dataNew.push(subject);
            });
        }
        setSubject(dataNew);
    };

    const TableSubject = ({ subjects }) => {
        const subjectItem = subjects.map((item) => (
            <tr key={item.key} data-key={item.detail[0]._id}>
                <td>{item.name}</td>
                <td className="th-content">
                    <input
                        type="number"
                        min="0"
                        max="10"
                        disabled={true}
                        value={
                            !!item.detail[0].midterm_score
                                ? item.detail[0].midterm_score.toString()
                                : ""
                        }
                    ></input>
                </td>
                <td className="th-content">
                    <input
                        type="number"
                        min="0"
                        max="10"
                        disabled={true}
                        value={
                            !!item.detail[0].final_score
                                ? item.detail[0].final_score.toString()
                                : ""
                        }
                    ></input>
                </td>
                <td>A</td>
                <td>
                    <i
                        onClick={click}
                        className="fa-regular fa-pen-to-square btn-edit"
                    ></i>
                </td>
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.getAttribute("data-key");
            if (e.target.className.includes("btn-edit")) {
                setIsUpdate(true);
                setId(id);
            }
        }

        let headerSubject;
        if (!headerSubject) {
            headerSubject = (
                <tr>
                    <th>Subject</th>
                    <th>Mid-term</th>
                    <th>Final</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
            );
        }
        return (
            <table id="table">
                <thead>{headerSubject}</thead>
                <tbody>{subjectItem}</tbody>
            </table>
        );
    };

    return (
        <div className="show-student-form">
            <header>
                <div>
                    <h3>List Students Of Class</h3>
                </div>
            </header>
            <div className="table-content">
                <TableSubject subjects={subject} />
            </div>
        </div>
    );
};

export default FormSubject;
