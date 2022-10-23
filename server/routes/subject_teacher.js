const express = require("express")
const router = express.Router()
const Subject_Teacher = require("../model/SubjectTeacher")
const multer = require("multer")
const Teacher = require("../model/Teacher")
const Subject = require("../model/Subject")
const upload = multer().any()

// @route GET api/subject
// @desc Get subject
// @access Private
router.get("/", async(req,res) => {
    try{
        const allSubjectTeacher = await Subject_Teacher.find()
            .select()
            .populate({
                path: "subject_id",
                model: "Subject",
            })
            .populate({
                path: "teacher_id",
                model: "Teacher",
                populate:[{
                    path: "person_id",
                    model: "Person",
                }]
            })
        res.json({ success: true, allSubjectTeacher })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// router.get("/:subjectTeacherID", async (req, res) => {
//     try {
//         // Return token
//         const getSubjectTeacherInfor = await Subject_Teacher.find({ _id: req.params.subjectTeacherID })
//             .select()
//             .populate({
//                 path: "subject_id",
//                 model: "Subject",
//             })
//             .populate({
//                 path: "teacher_id",
//                 model: "Teacher",
//                 populate:[{
//                     path: "person_id",
//                     model: "Person",
//                 }]
//             })
//         res.json({ success: true, getSubjectTeacherInfor })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "" + error })
//     }
// })

router.get("/search", async (req, res) => {
    try {
        // Return token
        let match = {}
        if (req.query.subject_teacher_id) match['_id'] = req.query.subject_teacher_id
        if (req.query.subject_id) match['subject_id'] = req.query.subject_id
        if (req.query.teacher_id) match['teacher_id'] = req.query.teacher_id
        // res.json({ success: true, match })
        const getSubjectTeacherInfor = await Subject_Teacher.find(match)
            .select()
            .populate({
                path: "subject_id",
                model: "Subject",
            })
            .populate({
                path: "teacher_id",
                model: "Teacher",
                populate:[{
                    path: "person_id",
                    model: "Person",
                }]
            })
        res.json({ success: true, getSubjectTeacherInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route POST api/subject
// @desc post subject
// @access Private
router.post("/",multer().single(), async(req,res) =>{
    const {subject_id, teacher_id} = req.body
    if (!subject_id || !teacher_id)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    try {
        const subjectTeacherValidate = await Subject_Teacher.findOne({ subject_id:subject_id, teacher_id:teacher_id })
        if (subjectTeacherValidate)
            return res
                .status(400)
                .json({ success: false, message: "Subject Teacher is already existed." })
        const newSubjectTeacher = new Subject_Teacher({
            subject_id,
            teacher_id
        })
        await newSubjectTeacher.save()
        res.json({
            success: true,
            message: "Create subject-teacher successfully.",
            newSubjectTeacher,
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/subject
// @desc put subject
// @access Private
router.put("/:subjectTeacherID",multer().single(), async(req,res) =>{
    const {subject_id, teacher_id} = req.body
    if (!subject_id || !teacher_id)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    try {
        const subjectTeacher = await Subject_Teacher.findById(req.params.subjectTeacherID)
        if (!subjectTeacher)
            return res
                .status(400)
                .json({ success: false, message: "Subject Teacher is not existed." })
        const subject = await Subject.findById(subject_id)
        if (!subject)
            return res
                .status(400)
                .json({ success: false, message: "Subject is not existed." })
        const teacher = await Teacher.findById(teacher_id)
        if (!teacher)
            return res
                .status(400)
                .json({ success: false, message: "Teacher is not existed." })
        // const subjectValidate = await Subject.findOne({ subject_name })
        // if (subjectValidate)
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "Subject is already existed." })
        let updateSubjectTeacher = {
            subject_id,
            teacher_id
        }
        const postUpdateSubjectTeacher = { _id: req.params.subjectTeacherID }
        updatedSubjectTeacher = await Subject_Teacher.findOneAndUpdate(
            postUpdateSubjectTeacher,
            updateSubjectTeacher,
            { new: true }
        )      
        res.json({
            success: true,
            message: "Update subject teacher successfully.",
            updateSubjectTeacher: updateSubjectTeacher
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route DELETE api/subject
// @desc delete subject
// @access Private
router.delete("/:subjectTeacherID", async (req, res) => {
    try {
        const deletedSubjectTeacher = await Subject_Teacher.findOneAndDelete(
            {_id: req.params.subjectTeacherID}
        )

        res.json({ success: true, message: "Deleted subject successfully!", subjectTeacher: deletedSubjectTeacher })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router