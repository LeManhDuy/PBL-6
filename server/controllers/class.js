const Class = require("../model/class")


const createClass = async (req, res) => {
    const {
        class_name,
        grade_id,
        homeroom_teacher_id
    } = req.body

    if (
        !class_name ||
        !grade_id ||
        !homeroom_teacher_id
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    }

    try {
        const classValidate = await Class.findOne({ class_name })
        if (classValidate)
            return res
                .status(400)
                .json({ success: false, message: "Class is already existed." })
        const newclass = new Class({
            class_name,
            grade_id,
            homeroom_teacher_id
        })
        await newclass.save()
        res.json({
            success: true,
            message: "Create class successfully.",
            newclass,
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const getClass = async (req, res) => {
    try{
        const allClass = await Class.find()
            .select([
                "class_id",
                "class_name",
                "grade_id",
                "homeroom_teacher_id"
            ])
        res.json({ success: true, allClass })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const getClassByID = async (req, res) => {
    try {
        // Return token
        const getClassInfor = await Class.find({ _id: req.params.classID })
            .select([
                "class_id",
                "class_name",
                "grade_id",
                "homeroom_teacher_id"
            ])
        res.json({ success: true, getClassInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const updateClassByID = async (req, res) => {
    const {
        class_name,
        grade_id,
        homeroom_teacher_id
    } = req.body

    if (
        !class_name ||
        !grade_id ||
        !homeroom_teacher_id
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    }

    try {
        const classItem = await Class.findById(req.params.classID)
        if (!classItem)
            return res
                .status(400)
                .json({ success: false, message: "Class is not existed." })
        const classValidate = await Class.findOne({ class_name })
        if (classValidate)
            return res
                .status(400)
                .json({ success: false, message: "Class is already existed." })
        let updateClass = {
            class_name,
            grade_id,
            homeroom_teacher_id
        }
        const postUpdateClass = { _id: req.params.classID }
        updatedClass = await Class.findOneAndUpdate(
            postUpdateClass,
            updateClass,
            { new: true }
        ).select([
            "class_id",
            "class_name",
            "grade_id",
            "homeroom_teacher_id"
        ])      
        res.json({
            success: true,
            message: "Update Class successfully.",
            updated_class: updatedClass
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class.findOneAndDelete(
            {_id: req.params.classID}
        )

        res.json({ success: true, message: "Deleted class successfully!", grade: deletedClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

module.exports = {createClass, getClass, getClassByID, updateClassByID, deleteClass};
