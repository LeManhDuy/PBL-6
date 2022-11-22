const express = require("express")
const router = express.Router()
const Score = require("../model/Score")
const Class = require("../model/Class")
const Pupil = require("../model/Pupil")
const Comment = require("../model/Comment")
const FeeCategory = require("../model/FeeCategory")
const Fee = require("../model/Fee")

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
        res.status(200).json({ "Average(0-4)": Average, "Good(5-6)": Good, "VeryGood(7-8)": VeryGood, "Excellent(9-10)": Excellent })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/grade
// @desc Get score by subject class id
// @access Private
router.get("/get-score-by-class-subject-id/:classID&:subjectID", async (req, res) => {
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
        res.status(200).json({ "Average(0-4)": Average, "Good(5-6)": Good, "VeryGood(7-8)": VeryGood, "Excellent(9-10)": Excellent })
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
        finalData = (data[data.length - 1]).flat()
        var Average = 0
        var Good = 0
        var VeryGood = 0
        var Excellent = 0
        for (let item of finalData) {
            if (item.comment_content === "Average")
                Average = Average + 1
            if (item.comment_content === "Good")
                Good = Good + 1
            if (item.comment_content === "Very Good")
                VeryGood = VeryGood + 1
            if (item.comment_content === "Excellent")
                Excellent = Excellent + 1
        }
        res.status(200).json({ "Average(0-4)": Average, "Good(5-6)": Good, "VeryGood(7-8)": VeryGood, "Excellent(9-10)": Excellent })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/grade
// @desc Get score by subject class id
// @access Private
router.get("/get-score-by-grade-subjcet-id/:gradeID&:subjectID", async (req, res) => {
    try {
        const getClassInfor = await Class.find({ grade_id: req.params.gradeID })
        let data = []
        let score = []
        let finalData = []
        for (let item of getClassInfor) {
            const getPupilsInfor = await Pupil.find({
                class_id: item._id
            }).select(["pupil_name"])
            for (let item of getPupilsInfor) {
                const getScoreByPupilID = await Score.find({
                    pupil_id: item._id, subject_id: req.params.subjectID
                })
                    .select("result")
                score.push(getScoreByPupilID)
            }
            data.push(score)
        }
        finalData = (data[data.length - 1]).flat()
        console.log(finalData);
        var Average = 0
        var Good = 0
        var VeryGood = 0
        var Excellent = 0
        for (let item of finalData) {
            if (item.result === "Average")
                Average = Average + 1
            if (item.result === "Good")
                Good = Good + 1
            if (item.result === "Very Good")
                VeryGood = VeryGood + 1
            if (item.result === "Excellent")
                Excellent = Excellent + 1
        }
        res.status(200).json({ "Average(0-4)": Average, "Good(5-6)": Good, "VeryGood(7-8)": VeryGood, "Excellent(9-10)": Excellent })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

//FEE
// @route GET api/admin/statistic
// @desc get-fee-by-fee-category-id
// @access Private
router.get("/get-fee-by-fee-category-and-class-id/:feeCategoryID&:classID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        }).select([
            "_id",
        ])
        var Paided = 0
        var UnPaid = 0
        for (let item of getPupilsInfor) {
            const getFeeByPupilID = await Fee.find({
                pupil_id: item._id, fee_category_id: req.params.feeCategoryID
            })
                .select("paid_date")
            if (getFeeByPupilID[0].paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/statistic
// @desc get-fee-by-class-id
// @access Private
router.get("/get-fee-by-class-id/:classID", async (req, res) => {
    try {
        const getPupilsInfor = await Pupil.find({
            class_id: req.params.classID
        })
            .select([
                "_id",
            ])
        let pupilArray = []
        getPupilsInfor.forEach(element => {
            pupilArray.push(element._id)
        });
        const feeInfor = await Fee.find().where('pupil_id').in(pupilArray).select("paid_date")
        var Paided = 0
        var UnPaid = 0
        for (let item of feeInfor) {
            if (item.paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})
// @route GET api/admin/statistic
// @desc get-fee-by-class-id
// @access Private
router.get("/get-fee-by-fee-category-and-grade-id/:feeCategoryID&:gradeID", async (req, res) => {
    try {
        const getClassInfor = await Class.find({ grade_id: req.params.gradeID })
        let finalData = []
        for (let item of getClassInfor) {
            const getPupilsInfor = await Pupil.find({
                class_id: item._id
            }).select(["pupil_name"])
            finalData.push(getPupilsInfor)
        }
        let pupilArray = []
        finalData.flat().forEach(element => {
            pupilArray.push(element._id)
        });
        const feeInfor = await Fee.find({ fee_category_id: req.params.feeCategoryID }).where('pupil_id').in(pupilArray).select("paid_date")
        var Paided = 0
        var UnPaid = 0
        for (let item of feeInfor) {
            if (item.paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})
// @route GET api/admin/statistic
// @desc get-fee-by-grade-id
// @access Private
router.get("/get-fee-by-grade-id/:gradeID", async (req, res) => {
    try {
        const getClassInfor = await Class.find({ grade_id: req.params.gradeID })
        let finalData = []
        for (let item of getClassInfor) {
            const getPupilsInfor = await Pupil.find({
                class_id: item._id
            }).select(["pupil_name"])
            finalData.push(getPupilsInfor)
        }
        let pupilArray = []
        finalData.flat().forEach(element => {
            pupilArray.push(element._id)
        });
        const feeInfor = await Fee.find().where('pupil_id').in(pupilArray).select("paid_date")
        var Paided = 0
        var UnPaid = 0
        for (let item of feeInfor) {
            if (item.paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})
// @route GET api/admin/statistic
// @desc get-fee-by-grade-id
// @access Private
router.get("/get-fee-by-fee-category-id/:feeCategoryID", async (req, res) => {
    try {
        const feeInfor = await Fee.find({ fee_category_id: req.params.feeCategoryID }).select("paid_date")
        var Paided = 0
        var UnPaid = 0
        for (let item of feeInfor) {
            if (item.paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})
// @route GET api/admin/statistic
// @desc get-fee
// @access Private
router.get("/get-fee", async (req, res) => {
    try {
        const feeInfor = await Fee.find().select("paid_date")
        var Paided = 0
        var UnPaid = 0
        for (let item of feeInfor) {
            if (item.paid_date) {
                Paided = Paided + 1
            }
            else {
                UnPaid = UnPaid + 1
            }
        }
        res.status(200).json({ Paided, UnPaid })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})


module.exports = router

