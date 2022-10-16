const express = require("express")
const router = express.Router()
const Subject = require("../model/Subject")
const multer = require("multer")
const upload = multer().any()

// @route GET api/subject
// @desc Get subject
// @access Private
router.get("/", async(req,res) => {
    try{
        const allSubject = await Subject.find()
            .select([
                "subject_id",
                "subject_name"
            ])
        res.json({ success: true, allSubject })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route POST api/subject
// @desc post subject
// @access Private
router.post("/",multer().single(), async(req,res) =>{
    const {subject_name} = req.body
    if (!subject_name)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    try {
        const subjectValidate = await Subject.findOne({ subject_name })
        if (subjectValidate)
            return res
                .status(400)
                .json({ success: false, message: "Subject is already existed." })
        const newSubject = new Subject({
            subject_name,
        })
        await newSubject.save()
        res.json({
            success: true,
            message: "Create subject successfully.",
            newSubject,
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/subject
// @desc put subject
// @access Private
router.put("/:subjectID",multer().single(), async(req,res) =>{
    const {subject_name} = req.body
    if (!subject_name)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    try {
        const subject = await Subject.findById(req.params.subjectID)
        if (!subject)
            return res
                .status(400)
                .json({ success: false, message: "Subject is not existed." })
        const subjectValidate = await Subject.findOne({ subject_name })
        if (subjectValidate)
            return res
                .status(400)
                .json({ success: false, message: "Subject is already existed." })
        let updateSubject = {
            subject_name,
        }
        const postUpdateSubject = { _id: req.params.subjectID }
        updatedSubject = await Subject.findOneAndUpdate(
            postUpdateSubject,
            updateSubject,
            { new: true }
        )      
        res.json({
            success: true,
            message: "Update subject successfully.",
            updated_subject: updateSubject
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route DELETE api/subject
// @desc delete subject
// @access Private
router.delete("/:subjectID", async (req, res) => {
    try {
        const deletedSubject = await Subject.findOneAndDelete(
            {_id: req.params.subjectID}
        )

        res.json({ success: true, message: "Deleted subject successfully!", subject: deletedSubject })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router