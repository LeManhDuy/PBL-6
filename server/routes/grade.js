const express = require("express")
const router = express.Router()
const Grade = require("../model/Grade")
const multer = require("multer")

// @route GET api/admin/grade
// @desc Get subject
// @access Private
router.get("/", async(req,res) => {
    try{
        const allGrade = await Grade.find()
            .select([
                "grade_id",
                "grade_name"
            ])
        res.json({ success: true, allGrade })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/principle
// @desc GET principal by Id
// @access Private Only Admin
router.get("/:gradeID", async (req, res) => {
    try {
        // Return token
        const getGradeInfor = await Grade.find({ _id: req.params.gradeID })
            .select([
                "grade_name",
            ])
        res.json({ success: true, getGradeInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route POST api/admin/grade
// @desc post subject
// @access Private
router.post("/",multer().single(), async(req,res) =>{
    const {grade_name} = req.body
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
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/admin/grade
// @desc put grade
// @access Private
router.put("/:gradeID",multer().single(), async(req,res) =>{
    const {grade_name} = req.body
    if (!grade_name)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
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
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route DELETE api/subject
// @desc delete subject
// @access Private
router.delete("/:gradeID", async (req, res) => {
    try {
        const deletedGrade = await Grade.findOneAndDelete(
            {_id: req.params.gradeID}
        )

        res.json({ success: true, message: "Deleted grade successfully!", grade: deletedGrade })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router

