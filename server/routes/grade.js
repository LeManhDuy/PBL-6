const express = require("express")
const router = express.Router()
const Grade = require("../model/Grade")
const Class = require("../model/Class")
const multer = require("multer")
const verifyJWT = require("../middleware/verifyJWTAdmin");

// @route GET api/admin/grade
// @desc Get subject
// @access Private
router.get("/", verifyJWT, async (req, res, next) => {
    try {
        const allGrade = await Grade.find()
            .select([
                "grade_id",
                "grade_name"
            ])
        res.json({ success: true, allGrade })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route GET api/admin/principle
// @desc GET principal by Id
// @access Private Only Admin
router.get("/:gradeID", verifyJWT, async (req, res, next) => {
    try {
        // Return token
        const getGradeInfor = await Grade.find({ _id: req.params.gradeID })
            .select([
                "grade_name",
            ])
        res.json({ success: true, getGradeInfor })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route GET api/admin/principle
// @desc GET class in grade
// @access Private Only Admin
router.get("/get-class-by-grade-id/:gradeID", verifyJWT, async (req, res, next) => {
    try {
        // Return token
        const getClassByGradeId = await Class.find({ grade_id: req.params.gradeID })
            .select([
                "class_id",
                "class_name",
                "grade_id",
                "homeroom_teacher_id"
            ])
            .populate({
                path: "grade_id",
                model: "Grade",
                select: ["grade_name"],
            })
            .populate({
                path: "homeroom_teacher_id",
                model: "Teacher",
                populate: [{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"],
                }]
            })
        res.json({ success: true, getClassByGradeId })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route POST api/admin/grade
// @desc post subject
// @access Private
router.post("/", verifyJWT, multer().single(), async (req, res, next) => {
    const { grade_name } = req.body
    if (!grade_name)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const gradeValidate = await Grade.findOne({ grade_name })
        if (gradeValidate)
            return res
                .status(400)
                .json({ success: false, message: "Grade is already existed." })
        const newGrade = new Grade({
            grade_name,
        })
        await newGrade.save()
        res.json({
            success: true,
            message: "Create grade successfully.",
            newGrade,
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route PUT api/admin/grade
// @desc put grade
// @access Private
router.put("/:gradeID", verifyJWT, multer().single(), async (req, res, next) => {
    const { grade_name } = req.body
    if (!grade_name) {
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    }
    try {
        const grade = await Grade.findById(req.params.gradeID)
        if (!grade)
            return res
                .status(400)
                .json({ success: false, message: "Grade is not existed." })
        const gradeValidate = await Grade.findOne({ grade_name })
        if (gradeValidate)
            return res
                .status(400)
                .json({ success: false, message: "Grade is already existed." })
        let updateGrade = {
            grade_name,
        }
        const postUpdateGrade = { _id: req.params.gradeID }
        updatedGrade = await Grade.findOneAndUpdate(
            postUpdateGrade,
            updateGrade,
            { new: true }
        )
        res.json({
            success: true,
            message: "Update grade successfully.",
            updated_grade: updateGrade
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route DELETE api/subject
// @desc delete subject
// @access Private
router.delete("/:gradeID", verifyJWT, async (req, res, next) => {
    try {
        const deletedGrade = await Grade.findOneAndDelete(
            { _id: req.params.gradeID }
        )
        const classValidate = await Class.find({ grade_id: req.params.gradeID })
        if (classValidate) {
            classValidate.map((item) => {
                item.gradeID = undefined;
                item.save()
            })
        }
        res.json({ success: true, message: "Deleted grade successfully!", grade: deletedGrade })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

module.exports = router

