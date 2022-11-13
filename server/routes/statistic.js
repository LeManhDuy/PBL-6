const express = require("express")
const router = express.Router()
const Score = require("../model/Score")
const Class = require("../model/class")
const Pupil = require("../model/Pupil")
const Grade = require("../model/Grade")
const Comment = require("../model/Comment")
const multer = require("multer")

// @route GET api/admin/grade
// @desc Get Score
// @access Private
router.get("/:classID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        }).select([
            "pupil_name",
        ])
        let data = [];

        for (let item of getPupilsInfor) {
            const getCommentByPupilID = await Comment.find({
                pupil_id: item._id
            })
                .select("comment_content")
            data.push(getCommentByPupilID)
            // const getScore = await Score.find({
            //     pupil_id: item._id
            // })
            //     .populate({ path: "subject_id", model: "Subject" })
            //     .populate({ path: "pupil_id", model: "Pupil", select: "pupil_name" })
            // data.push(getScore)
        }

        res.json({ success: true, data })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router

