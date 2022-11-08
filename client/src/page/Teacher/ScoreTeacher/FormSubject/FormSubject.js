import React, { useEffect, useState } from "react";
import "./FormSubject.css";
import ScoreService from "../../../../config/service/ScoreService";
import ModalInput from "../../../../lib/ModalInput/ModalInput";
import UpdateScore from "./UpdateScore/UpdateScore";

const FormSubject = (props) => {
    const [subject, setSubject] = useState([]);
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [state, setState] = useState(false);
    const [subjectID, setSubjectID] = useState("");

    useEffect(() => {
        getSubjectByPupilID();
    }, [state]);

    const getSubjectByPupilID = async () => {
        let dataSources = [];
        let scoreSources = [];
        await ScoreService.getSubjectByPupilID(props.id)
            .then((res) => {
                dataSources = res.subjects.map((item, index) => {
                    return {
                        key: index + 1,
                        subject_id: item._id,
                        name: item.subject_name,
                        score_id: "",
                        midterm_score: "",
                        final_score: "",
                        result: "",
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
        await ScoreService.getAllScoreByPupilID(props.id)
            .then((res) => {
                scoreSources = res.pupilScore.map((item) => {
                    return {
                        _id: item._id,
                        midterm_score: item.midterm_score,
                        final_score: item.final_score,
                        result: item.result,
                        subject_id: item.subject_id._id,
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
        for (let item of scoreSources) {
            for (let subject of dataSources) {
                if (subject.subject_id === item.subject_id) {
                    subject.score_id = item._id;
                    subject.midterm_score = item.midterm_score;
                    subject.final_score = item.final_score;
                    subject.result = item.result;
                }
            }
        }
        setSubject(dataSources);
    };

    const TableSubject = ({ subjects }) => {
        const subjectItem = subjects.map((item) => (
            <tr
                key={item.key}
                data-key={item.score_id}
                data-sub={item.subject_id}
            >
                <td>{item.name}</td>
                <td className="th-content">
                    <input
                        type="number"
                        min="0"
                        max="10"
                        disabled={true}
                        value={item.midterm_score}
                    ></input>
                </td>
                <td className="th-content">
                    <input
                        type="number"
                        min="0"
                        max="10"
                        disabled={true}
                        value={item.final_score}
                    ></input>
                </td>
                <td>{item.result}</td>
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
            const subject =
                e.target.parentElement.parentElement.getAttribute("data-sub");
            if (e.target.className.includes("btn-edit")) {
                setIsUpdate(true);
                setId(id);
                setSubjectID(subject);
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

    const handleInputCustom = () => {
        setIsUpdate(false);
    };

    const handleConfirmUpdateScore = (score, type) => {
        if (type === "PUT") {
            ScoreService.updateScoreByID(id, {
                midterm_score: score.midterm_score,
                final_score: score.final_score,
            })
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setIsUpdate(false);
                    } else {
                        setIsUpdate(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            ScoreService.createSubjectScore(subjectID, {
                midterm_score: score.midterm_score,
                final_score: score.final_score,
                pupil_id: props.id,
            })
                .then((res) => {
                    if (res.success) {
                        setState(!state);
                        setIsUpdate(false);
                    } else {
                        setIsUpdate(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const DivUpdateScoreTeacher = (
        <ModalInput
            show={isUpdate ? true : false}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateScore
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateScore={handleConfirmUpdateScore}
                    id={id}
                />
            }
        />
    );

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
            {isUpdate ? DivUpdateScoreTeacher : null}
        </div>
    );
};

export default FormSubject;
