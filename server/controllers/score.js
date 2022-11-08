const express = require("express");
const Pupil = require("../model/Pupil");
const Schedule = require("../model/Schedule");
const Period = require("../model/Period");
const SubjectTeacher = require("../model/SubjectTeacher");
const Subject = require("../model/Subject");
const Score = require("../model/Score");

const createSubjectScore = async (req, res) => {
    let { midterm_score, final_score, pupil_id } = req.body;
    //Validation

    if (!midterm_score || !final_score) {
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
        if (final_score >= 9) {
            result = "Excellent";
        } else if (final_score >= 7 && final_score < 9) {
            result = "Very good";
        } else if (final_score >= 5 && final_score < 7) {
            result = "Good";
        } else {
            result = "Average";
        }
        const newSubjectScore = new Score({
            midterm_score,
            final_score,
            result,
            pupil_id,
            subject_id: req.params.subjectID,
        });
        await newSubjectScore.save();
        res.status(200).json({
            success: true,
            message: "Create subject score successfully.",
            newSubjectScore,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getScoreByPupilId = async (req, res) => {
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
            .select(["midterm_score", "final_score", "result"])
            .populate({ path: "subject_id", model: "Subject" });
        res.status(200).json({
            success: true,
            pupilScore,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getScoreById = async (req, res) => {
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
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const updateScore = async (req, res) => {
    //Validation
    let { midterm_score, final_score } = req.body;
    if (!midterm_score || !final_score) {
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
        if (final_score >= 9) {
            result = "Excellent";
        } else if (final_score >= 7 && final_score < 9) {
            result = "Very good";
        } else if (final_score >= 5 && final_score < 7) {
            result = "Good";
        } else {
            result = "Average";
        }
        const updateScore = {
            midterm_score,
            final_score,
            result,
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
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getAllSubjectByPupilId = async (req, res) => {
    try {
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
            return res.status(400).json({ success: false, message: "Sc" });
        }

        const periods = await Period.find({ schedule_id: schedule._id });
        if (periods.length === 0) {
            return res.status(400).json({ success: false, message: "P" });
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

        res.json({ success: true, subjects });
    } catch (error) {
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
