const express = require("express");
const Pupil = require("../model/Pupil");
const Schedule = require("../model/Schedule");
const Period = require("../model/Period");
const SubjectTeacher = require("../model/SubjectTeacher");
const Subject = require("../model/Subject");
const Score = require("../model/Score");

const createSubjectScore = async (req, res, next) => {
    let { midterm_score, final_score, pupil_id } = req.body;
    //Validation
    let date = Date.now();
    if (!midterm_score) {
        return res.status(400).json({
            success: false,
            message: "Please fill in the score.",
        });
    }
    if (midterm_score < 0 || midterm_score > 10)
        return res.status(400).json({
            success: false,
            message: "midterm_score:invalid format",
        });
    if (final_score < 0 || final_score > 10)
        return res.status(400).json({
            success: false,
            message: "final_score:invalid format",
        });

    const existed_student = await Pupil.findById(pupil_id);
    if (!existed_student) {
        return res
            .status(400)
            .json({ success: false, message: "Pupil does not found." });
    }

    const existed_subject = await Subject.findById(req.params.subjectID);

    if (!existed_subject) {
        return res
            .status(400)
            .json({ success: false, message: "Subject does not found!" });
    }

    const existed_score = await Score.find({
        subject_id: req.params.subjectID,
        pupil_id: pupil_id,
    });

    if (existed_score[0]) {
        return res.status(400).json({
            success: false,
            message: "This subject already has point.",
        });
    }

    //all good
    try {
        let result = "";
        if (final_score) {
            if (final_score >= 9) {
                result = "Excellent";
            } else if (final_score >= 7 && final_score < 9) {
                result = "Very Good";
            } else if (final_score >= 5 && final_score < 7) {
                result = "Good";
            } else {
                result = "Average";
            }
        }
        const newSubjectScore = new Score({
            midterm_score,
            final_score,
            result,
            pupil_id,
            subject_id: req.params.subjectID,
            last_update: date,
        });
        await newSubjectScore.save();
        res.status(200).json({
            success: true,
            message: "Create subject score successfully.",
            newSubjectScore,
        });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getScoreByPupilId = async (req, res, next) => {
    const existed_student = await Pupil.findOne({ _id: req.params.studentID });

    if (!existed_student) {
        return res
            .status(400)
            .json({ success: false, message: "Pupil does not found." });
    }

    //all good
    try {
        const pupilScore = await Score.find({
            pupil_id: req.params.studentID,
        })
            .select(["midterm_score", "final_score", "result"], ["last_update"])
            .populate({ path: "subject_id", model: "Subject" });
        res.status(200).json({
            success: true,
            pupilScore,
        });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getScoreById = async (req, res, next) => {
    //Validation
    try {
        const scoreInfor = await Score.findById(req.params.scoreID).populate({
            path: "subject_id",
            model: "Subject",
        });
        if (!scoreInfor) {
            res.status(400).json({
                success: false,
                message: "Score does not found!",
            });
        }
        res.status(200).json({
            success: true,
            scoreInfor,
        });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const updateScore = async (req, res, next) => {
    //Validation
    let { midterm_score, final_score } = req.body;
    let date = Date.now();
    if (!final_score) {
        final_score = "";
    }
    if (!midterm_score) {
        return res.status(400).json({
            success: false,
            message: "Please fill in the score.",
        });
    }
    if (midterm_score < 0 || midterm_score > 10)
        return res.status(400).json({
            success: false,
            message: "midterm_score:invalid format",
        });
    if (final_score < 0 || final_score > 10)
        return res.status(400).json({
            success: false,
            message: "final_score:invalid format",
        });
    const existed_score = await Score.findById(req.params.scoreID);

    if (!existed_score) {
        return res
            .status(400)
            .json({ success: false, message: "Score does not found." });
    }

    //all good
    try {
        let result = "";
        if (final_score) {
            if (final_score >= 9) {
                result = "Excellent";
            } else if (final_score >= 7 && final_score < 9) {
                result = "Very Good";
            } else if (final_score >= 5 && final_score < 7) {
                result = "Good";
            } else {
                result = "Average";
            }
        }
        const updateScore = {
            midterm_score,
            final_score,
            result,
            last_update: date,
        };
        const updatedScore = await Score.findByIdAndUpdate(
            req.params.scoreID,
            updateScore,
            { new: true }
        );
        res.status(200).json({
            success: true,
            updatedScore,
        });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getAllSubjectByPupilId = async (req, res, next) => {
    try {
        let result = [];
        const student_id = req.params.studentID;
        //validate student
        const existed_student = await Pupil.findOne({ _id: student_id });

        if (!existed_student) {
            return res
                .status(400)
                .json({ success: false, message: "Pupil does not found." });
        }

        const schedule = await Schedule.findOne({
            class_id: existed_student.class_id,
        });
        if (!schedule) {
            return res.status(400).json({
                success: false,
                message: "Schedule not found!",
                result,
            });
        }

        const periods = await Period.find({ schedule_id: schedule._id });
        if (periods.length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Period not found!" });
        }

        let subject_teachers = [];
        for (let period of periods) {
            const st_id = period.subject_teacher_id.toString();
            subject_teachers.push(st_id);
        }
        let uniqueST = subject_teachers.filter((c, index) => {
            return subject_teachers.indexOf(c) === index;
        });
        let subjects = [];
        for (let st of uniqueST) {
            const existed_subject_teacher = await SubjectTeacher.findOne({
                _id: st,
            });
            if (!existed_subject_teacher) {
                return res.status(400).json({ success: false, message: "ST" });
            }
            const subject = await Subject.findOne({
                _id: existed_subject_teacher.subject_id,
            }).select();
            subjects.push(subject);
        }

        //todo
        for (let item of subjects) {
            let detail;
            const scoreSubjectPupil = await Score.find({
                subject_id: item._id,
                pupil_id: student_id,
            });
            if (scoreSubjectPupil[0]) {
                detail = scoreSubjectPupil[0].set(
                    "subject_name",
                    item.subject_name,
                    { strict: false }
                );
            } else {
                detail = {
                    subject_id: item._id,
                    subject_name: item.subject_name,
                    _id: "",
                    midterm_score: "",
                    final_score: "",
                    result: "",
                };
            }
            result.push(detail);
        }
        res.json({ success: true, result });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
};

module.exports = {
    createSubjectScore,
    getScoreByPupilId,
    updateScore,
    getAllSubjectByPupilId,
    getScoreById,
};
