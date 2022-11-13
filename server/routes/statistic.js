const express = require("express")
const router = express.Router()
const Score = require("../model/Score")
const Class = require("../model/class")
const Pupil = require("../model/Pupil")
const Grade = require("../model/Grade")
const Comment = require("../model/Comment")
const multer = require("multer")

// @route GET api/admin/grade
// @desc Get Comment By Class ID
// @access Private
router.get("/get-comment-by-class-id/:classID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        }).select([
            "pupil_name",
        ])
        var Average = 0
        var Good = 0
        var VeryGood = 0
        var Excellent = 0
        for (let item of getPupilsInfor) {
            const getCommentByPupilID = await Comment.find({
                pupil_id: item._id
            })
                .select("comment_content")
            if (getCommentByPupilID[0].comment_content === "Average")
                Average = Average + 1
            if (getCommentByPupilID[0].comment_content === "Good")
                Good = Good + 1
            if (getCommentByPupilID[0].comment_content === "Very Good")
                VeryGood = VeryGood + 1
            if (getCommentByPupilID[0].comment_content === "Excellent")
                Excellent = Excellent + 1
        }
        res.json({ success: true, Average, Good, VeryGood, Excellent })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/grade
// @desc Get score by subject class id
// @access Private
router.get("/get-score-by-subject-class-id/:classID&:subjectID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        }).select([
            "pupil_name",
        ])
        var Average = 0
        var Good = 0
        var VeryGood = 0
        var Excellent = 0
        for (let item of getPupilsInfor) {
            const getScoreByPupilID = await Score.find({
                pupil_id: item._id, subject_id: req.params.subjectID
            })
                .select("result")
            if (getScoreByPupilID[0].result === "Average")
                Average = Average + 1
            if (getScoreByPupilID[0].result === "Good")
                Good = Good + 1
            if (getScoreByPupilID[0].result === "Very Good")
                VeryGood = VeryGood + 1
            if (getScoreByPupilID[0].result === "Excellent")
                Excellent = Excellent + 1
        }
        res.json({ success: true, Average, Good, VeryGood, Excellent })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/grade
// @desc Get Comment By grade ID
// @access Private
router.get("/get-comment-by-grade-id/:gradeID", async (req, res) => {
    try {
        const getClassInfor = await Class.find({ grade_id: req.params.gradeID })
        let data = []
        let comment = []
        let finalData = []
        for (let item of getClassInfor) {
            const getPupilsInfor = await Pupil.find({
                class_id: item._id
            }).select(["pupil_name"])
            for (let item of getPupilsInfor) {
                const getCommentByPupilID = await Comment.find({
                    pupil_id: item._id
                })
                    .select("comment_content")
                comment.push(getCommentByPupilID)
            }
            data.push(comment)
        }
        finalData = data[data.length - 1]
        res.json({ success: true, finalData })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/grade
// @desc Get score by subject class id
// @access Private
router.get("/get-score-by-subject-grade-id/:gradeID&:subjectID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        }).select([
            "pupil_name",
        ])
        var Average = 0
        var Good = 0
        var VeryGood = 0
        var Excellent = 0
        for (let item of getPupilsInfor) {
            const getScoreByPupilID = await Score.find({
                pupil_id: item._id, subject_id: req.params.subjectID
            })
                .select("result")
            if (getScoreByPupilID[0].result === "Average")
                Average = Average + 1
            if (getScoreByPupilID[0].result === "Good")
                Good = Good + 1
            if (getScoreByPupilID[0].result === "Very Good")
                VeryGood = VeryGood + 1
            if (getScoreByPupilID[0].result === "Excellent")
                Excellent = Excellent + 1
        }
        res.json({ success: true, Average, Good, VeryGood, Excellent })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router

