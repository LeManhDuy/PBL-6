import React, { useEffect, useState } from "react";
import "./FormSubject.css";
import ScoreService from "../../../../config/service/ScoreService";
import ModalInput from "../../../../lib/ModalInput/ModalInput";
import UpdateScore from "./UpdateScore/UpdateScore";
import CommentService from "../../../../config/service/CommentService";

const FormSubject = (props) => {
    const [subject, setSubject] = useState([]);
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [state, setState] = useState(false);
    const [subjectID, setSubjectID] = useState("");
    const [summary, setSummary] = useState({
        id: "",
        content: "",
        pupil_id: "",
    });
    const [notHaveSchedule, setNotHaveSchedule] = useState("false");

    useEffect(() => {
        getSubjectByPupilID();
    }, [state]);

    const getSubjectByPupilID = async () => {
        let dataSources = [];
        let scoreSources = [];
        await ScoreService.getSubjectByPupilID(props.id)
            .then((res) => {
                if (!res.success) {
                    setNotHaveSchedule("true");
                } else {
                    dataSources = res.result.map((item, index) => {
                        return {
                            key: index + 1,
                            subject_id: item.subject_id ? item.subject_id : "",
                            name: item.subject_name ? item.subject_name : "",
                            score_id: item._id ? item._id : "",
                            midterm_score: item.midterm_score
                                ? item.midterm_score
                                : "",
                            final_score: item.final_score
                                ? item.final_score
                                : "",
                            result: item.result ? item.result : "",
                            last_update: item.last_update
                                ? item.last_update.split("T")[0]
                                : "YYYY-MM-DD",
                        };
                    });
                }
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
        await CommentService.createPupilComment(props.id).then((res) => {
            setSummary({
                id: res.commentBefore[0]._id,
                content: res.commentBefore[0].comment_content,
                pupil_id: res.commentBefore[0].pupil_id,
            });
        });
    };

    const TableSubject = ({ subjects }) => {
        let subjectItem;
        if (notHaveSchedule === "false") {
            subjectItem = subjects.map((item) => (
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
                    <td>{item.last_update}</td>
                    <td>
                        <i
                            onClick={click}
                            className="fa-regular fa-pen-to-square btn-edit"
                        ></i>
                    </td>
                </tr>
            ));
        }
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
                    <th>Last Update</th>
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
                    console.log(res);
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
                    <h3>List Subjects Of Pupil</h3>
                </div>
            </header>
            <div className="table-content">
                {notHaveSchedule === "true" ? (
                    <div className="text-center-error">
                        This student does not have any subject.
                    </div>
                ) : null}
                <TableSubject subjects={subject} />
            </div>
            <div className="table-content-edit-teacher">
                <table id="table">
                    <thead>
                        <tr>
                            <th className="th-content">Behavior</th>
                            <th className="th-content">Perfomance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!summary ? (
                            <tr>
                                <td className="th-content">
                                    {summary.content}
                                </td>
                                <td className="th-content">
                                    {summary.content}
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className="th-content">-</td>
                                <td className="th-content">-</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isUpdate ? DivUpdateScoreTeacher : null}
        </div>
    );
};

export default FormSubject;
