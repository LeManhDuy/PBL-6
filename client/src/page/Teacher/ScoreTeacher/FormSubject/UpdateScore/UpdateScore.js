import React, { useEffect, useState } from "react";
import "./UpdateScore.css";
import ScoreService from "../../../../../config/service/ScoreService";

const UpdateScore = (props) => {
    const [type, setType] = useState("PUT");
    const [score, setScore] = useState({
        name: "",
        midterm_score: "",
        final_score: "",
    });
    const [scoreError, setScoreError] = useState({
        midterm_score: false,
        final_score: false,
    });

    useEffect(() => {
        getScoreByID();
    }, []);

    const getScoreByID = () => {
        if (props.id) {
            ScoreService.getScoreByID(props.id).then((res) => {
                setScore({
                    midterm_score: res.scoreInfor.midterm_score,
                    final_score: res.scoreInfor.final_score,
                    name: res.scoreInfor.subject_id.subject_name,
                });
            });
        } else {
            setType("POST");
        }
    };

    const changeHandler = (e) => {
        setScore({
            ...score,
            [e.target.name]: e.target.value,
        });
    };

    const clickSave = (e) => {
        e.preventDefault();
        let check = false;
        let midterm_score = false;
        let final_score = false;

        if (
            score.midterm_score.length === 0 ||
            Number(score.midterm_score) < 0 ||
            Number(score.midterm_score) > 10
        ) {
            midterm_score = true;
            check = true;
        } else midterm_score = false;

        if (
            score.final_score.length === 0 ||
            Number(score.final_score) < 0 ||
            Number(score.final_score) > 10
        ) {
            final_score = true;
            check = true;
        } else final_score = false;

        setScoreError({
            midterm_score: midterm_score,
            final_score: final_score,
        });

        if (!check) {
            props.handleConfirmUpdateScore(score, type);
        }
    };

    return (
        <div className="form-update-score">
            <div>
                <h6>Subject</h6>
                <h3>{score.name}</h3>
            </div>
            <div>
                <div>
                    <p>Midterm Score</p>
                    <input
                        value={score.midterm_score}
                        type="text"
                        name="midterm_score"
                        placeholder="Mark the point"
                        onChange={changeHandler}
                        required
                    />
                    <label
                        className={
                            "error" +
                            (scoreError.midterm_score
                                ? " error-show"
                                : " error-hidden")
                        }
                    >
                        You enter wrong.
                    </label>
                </div>
                <div>
                    <p>Final Score</p>
                    <input
                        value={score.final_score}
                        type="text"
                        name="final_score"
                        placeholder="Mark the point"
                        onChange={changeHandler}
                        required
                    />
                    <label
                        className={
                            "error" +
                            (scoreError.final_score
                                ? " error-show"
                                : " error-hidden")
                        }
                    >
                        You enter wrong.
                    </label>
                </div>
            </div>
            <div className="btn-handle-change">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );
};

export default UpdateScore;
