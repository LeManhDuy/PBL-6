import React, { useEffect, useState } from "react";
import "./ShowAllScore.css";
import ScoreService from "../../../../config/service/ScoreService";

const ShowAllScore = (props) => {
    const [record, setRecord] = useState([]);
    const [subject, setSubject] = useState([]);

    useEffect(() => {
        getRecord();
    }, []);

    const getRecord = async () => {
        await ScoreService.getSubjectByClassID(props.classID)
            .then((res) => {
                const dataSources = res.subjects.map((item, index) => {
                    return {
                        key: index + 1,
                        subject_id: item._id,
                        name: item.subject_name,
                    };
                });
                setSubject(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });

        await ScoreService.getAllScoreOfPupilByClassID(props.classID)
            .then((res) => {
                const dataSources = res.data.map((item, index) => {
                    return {
                        key: index + 1,
                        pupil_id: item.item._id,
                        name: item.item.pupil_name,
                        score: item.scores,
                    };
                });
                setRecord(dataSources);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ScoreItem = ({ records, subjects }) => {
        let arraySubject = [];
        let newScore = [];
        for (let item of subjects) {
            arraySubject.push(item.subject_id);
            newScore.push({
                _id: "",
                midterm_score: "",
                final_score: "",
                subject_id: {
                    _id: item.subject_id,
                    subject_name: "",
                },
            });
        }
        console.log(arraySubject);
        console.log(newScore);
        console.log(records.score);
        // console.log(arraySubject);

        if (records.score.length !== 0) {
            for (let item of records.score) {
                for (let data of newScore) {
                    if (item.subject_id._id === data.subject_id._id) {
                        data._id = item._id;
                        data.final_score = item.final_score;
                        data.midterm_score = item.midterm_score;
                        data.subject_id.subject_name =
                            item.subject_id.subject_name;
                    }
                }
            }
        }

        console.log("New ne");
        console.log(newScore);

        // if (records.score.length !== 0) {
        //     if (arraySubject.length !== records.score.length) {
        //         for (let [index, value] of arraySubject.entries()) {
        //             // console.log(value === records.score[index].subject_id._id);
        //             if (value === records.score[index].subject_id._id) {
        //             } else {
        //                 records.score.splice(index, 0, {
        //                     _id: "",
        //                     midterm_score: "X",
        //                     final_score: "X",
        //                     subject_id: {
        //                         _id: value,
        //                     },
        //                 });
        //                 // console.log(records.score.length);
        //             }
        //         }
        //         // console.log(records.score);
        //     }
        // }

        const scoreItem = newScore.map((item) => {
            if (arraySubject.includes(item.subject_id._id)) {
                return (
                    <td>
                        {item.midterm_score} - {item.final_score}
                    </td>
                    // <td>X - X</td>
                );
            } else {
                return <td>X - X</td>;
            }

            // {
            //     arraySubject.includes(item.subject_id._id) ? (
            //         <td>
            //             {item.midterm_score} -{item.final_score}
            //         </td>
            //     ) : (
            //         <td></td>
            //     );
            // }

            // <td>
            //     {item.subject_id.subject_name}: {item.midterm_score} -{" "}
            //     {item.final_score}
            // </td>
        });
        return scoreItem;
    };

    const TableScores = ({ records, subjects }) => {
        const header = subjects.map((item) => <th>{item.name}</th>);

        const classItem = records.map((item) => (
            // <tr key={item.key}>
            //     <td>{item.name}</td>
            // </tr>
            <tr key={item.key}>
                <td>{item.name}</td>
                {/* {scoreItem} */}
                <ScoreItem records={item} subjects={subjects} />
            </tr>
        ));

        return (
            <table id="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        {header}
                    </tr>
                </thead>
                <tbody>{classItem}</tbody>
            </table>
        );
    };

    return (
        <div className="show-student-form">
            <header>
                <div>
                    <h3>Show all score</h3>
                </div>
            </header>
            <div className="table-content">
                {/* <table id="table"> */}
                {/* <Header subjects={subject} /> */}
                <TableScores records={record} subjects={subject} />
                {/* </table> */}
            </div>
        </div>
    );
};

export default ShowAllScore;
