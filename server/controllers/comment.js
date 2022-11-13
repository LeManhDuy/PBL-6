const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Subject = require("../model/Subject");
const Comment = require("../model/Comment");
const Score = require("../model/Score");

const createComment = async (req, res) => {
    const existed_student = await Pupil.findOne({ _id: req.params.pupilID });

    if (!existed_student) {
        return res
            .status(400)
            .json({ success: false, message: "Pupil does not found." });
    }

    //all good
    try {
        let check = "Excellent";
        let none = false;
        const pupilScore = await Score.find({
            pupil_id: req.params.pupilID,
        })
            .select(["midterm_score", "final_score", "result"])
            .populate({ path: "subject_id", model: "Subject" });
        if (pupilScore[0]) {
            pupilScore.map((item) => {
                if (item.final_score === null) {
                    none = true;
                }
                if (item.final_score < 5) {
                    check = "Average";
                }
                if (item.final_score < 7 && item.final_score >= 5) {
                    check = "Good";
                }
                if (item.final_score >= 7 && item.final_score < 9) {
                    check = "Very Good";
                }
            });
        } else {
            check = "-";
        }
        if (none) {
            check = "-";
        }
        //Validate
        const commentBefore = await Comment.find({
            pupil_id: req.params.pupilID,
        });
        //console.log(commentBefore[0]);
        if (commentBefore[0]) {
            commentBefore[0].comment_content = check;
            await commentBefore[0].save();
            res.status(200).json({
                success: true,
                commentBefore,
            });
        } else {
            const newComment = new Comment({
                comment_content: check,
                pupil_id: req.params.pupilID,
            });
            await newComment.save();
            res.status(200).json({
                success: true,
                newComment,
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getCommentByPupilID = async (req, res) => {
    const existed_student = await Pupil.findOne({ _id: req.params.pupilID });

    if (!existed_student) {
        return res
            .status(400)
            .json({ success: false, message: "Pupil does not found." });
    }

    try {
        const pupilComment = await Comment.find({
            pupil_id: req.params.pupilID,
        });
        return res.status(200).json({
            success: true,
            pupilComment,
        });
    } catch (error) { }
};

module.exports = {
    createComment,
    getCommentByPupilID,
};
