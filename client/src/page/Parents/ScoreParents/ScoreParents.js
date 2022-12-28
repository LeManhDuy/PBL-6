import React, { useEffect, useState } from "react";
import "./ScoreParents.css";
import StudentService from "../../../config/service/StudentService";
import ScoreService from "../../../config/service/ScoreService";
import CommentService from "../../../config/service/CommentService";
import Loading from "../../../lib/Loading/Loading";

const ScoreParents = () => {
    const [students, setStudents] = useState([]);
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getSubjectAndScoreByPupilId();
    }, [state]);

    const getSubjectAndScoreByPupilId = async () => {
        let studentsInfo = [];
        setIsLoading(true);
        await StudentService.getPupilByParentId(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                studentsInfo = response.getPupilInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        name: item.pupil_name,
                        dateofbirth: new Date(
                            item.pupil_dateofbirth
                        ).toLocaleDateString(),
                        gender: item.pupil_gender,
                        class: item.class_id
                            ? item.class_id.class_name
                            : "Empty",
                        teacher: item.class_id
                            ? item.class_id.homeroom_teacher_id.person_id
                                  .person_fullname
                            : "Empty",
                        grade: item.class_id
                            ? item.class_id.grade_id
                                ? item.class_id.grade_id.grade_name
                                : "Empty"
                            : "Empty",
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
        let dataNew = [];
        for (let item of studentsInfo) {
            let checkSubject = false;
            let dataSources = [];
            let detail = {};
            let summary = {
                id: "",
                content: "",
            };
            await ScoreService.getSubjectByPupilID(item.id)
                .then((res) => {
                    if (!res.success) {
                        checkSubject = true;
                    }
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
                })
                .catch((error) => {
                    console.log(error);
                });
            if (!checkSubject) {
                await CommentService.getCommentByPupilID(item.id)
                    .then((res) => {
                        summary = {
                            id: res.pupilComment[0]
                                ? res.pupilComment[0]._id
                                : "",
                            content: res.pupilComment[0]
                                ? res.pupilComment[0].comment_content
                                : "-",
                            behavior: res.pupilComment[0]
                                ? res.pupilComment[0].comment_content ===
                                      "Excellent" ||
                                  res.pupilComment[0].comment_content === "Good"
                                    ? "Good"
                                    : res.pupilComment[0].comment_content ===
                                      "Passed"
                                    ? "Passed"
                                    : "Need to try more."
                                : "-",
                        };
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                detail = {
                    key: item.key,
                    student: item,
                    score: dataSources,
                    summary: summary,
                    check: checkSubject,
                };
            } else {
                detail = {
                    key: item.key,
                    student: item,
                    check: checkSubject,
                };
            }
            dataNew.push(detail);
        }
        setStudents(dataNew);
        setIsLoading(false);
    };

    const TableAccounts = ({ students }) =>
        students.map((item) => (
            <div
                className="score-item-parent"
                data-key={item.student.id}
                key={item.student.key}
            >
                <div className="flex-container">
                    <div className="score-parent">
                        <header className="header-content">
                            <h3>Full Name : {item.student.name}</h3>
                        </header>
                        <header className="header-content">
                            <h5>Class : {item.student.class}</h5>
                        </header>
                        <header className="header-content">
                            <h5>
                                Teacher's Name : {`${item.student.teacher}`}
                            </h5>
                        </header>
                    </div>
                    <div className="table-content-edit">
                        <table id="table">
                            <thead>
                                <tr>
                                    <th className="th-content">Behavior</th>
                                    <th className="th-content">Perfomance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!item.summary ? (
                                    <tr>
                                        <td className="th-content">
                                            {item.summary.behavior}
                                        </td>
                                        <td className="th-content">
                                            {item.summary.content}
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
                </div>

                {item.check ? (
                    <div className="text-center-error">
                        This pupil currently has no subjects.
                    </div>
                ) : null}
                <div className="table-content">
                    <table id="table">
                        <thead>
                            <tr>
                                <th className="th-content">Subject's Name</th>
                                <th className="th-content">Midterm Score</th>
                                <th className="th-content">Final Score</th>
                                <th className="th-content">Average</th>
                                <th className="th-content">Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!item.score
                                ? item.score.map((item) => (
                                      <tr key={item.key}>
                                          <td className="th-content">
                                              {item.name}
                                          </td>
                                          <td className="th-content">
                                              <input
                                                  className="table-content-cell"
                                                  disabled={true}
                                                  value={item.midterm_score}
                                              ></input>
                                          </td>
                                          <td className="th-content">
                                              <input
                                                  className="table-content-cell"
                                                  disabled={true}
                                                  value={item.final_score}
                                              ></input>
                                          </td>
                                          <td className="table-body-cell mid">
                                              <input
                                                  className="table-comment-cell"
                                                  disabled={true}
                                                  value={item.result}
                                              ></input>
                                          </td>
                                          <td className="table-body-cell mid">
                                              <input
                                                  className="table-update-cell"
                                                  disabled={true}
                                                  value={item.last_update}
                                              ></input>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>
        ));

    return (
        <div className="main-container-edit">
            <div>
                <h3>Student's Score</h3>
            </div>
            <TableAccounts students={students} />
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ScoreParents;
