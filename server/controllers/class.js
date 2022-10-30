const Class = require("../model/class")
const Pupil = require("../model/Pupil")
const Teacher = require("../model/Teacher")
const Parent = require("../model/Parent")

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
    const classValidate = await Class.findOne({ class_name, grade_id: grade_id })
    if (classValidate)
        return res
            .status(400)
            .json({ success: false, message: "Class is already existed." })

    const teacherValidate = await Class.findOne({ homeroom_teacher_id: homeroom_teacher_id });
    if (teacherValidate)
        return res
            .status(400)
            .json({ success: false, message: "Teacher has class." })

    try {
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
    try {
        const allClass = await Class.find()
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
                //select: ["graduated_school"]
                populate: [{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"],
                }]
            })
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
            .populate({
                path: "grade_id",
                model: "Grade",
                select: ["grade_name"],
            })
            .populate({
                path: "homeroom_teacher_id",
                model: "Teacher",
                //select: ["graduated_school"]
                populate: [{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"],
                }]
            })
        res.json({ success: true, getClassInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const getStudentByClassID = async (req, res) => {
    try {
        const studentsInfor = await Pupil.find({ class_id: req.params.classID })
            .select([
                "pupil_name",
                "pupil_gender",
                "pupil_dateofbirth",
                "parent_id",
            ])
            .populate({
                path: "parent_id",
                model: "Parent",
                populate: [{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"],
                }]
            })
            .populate({
                path: "class_id",
                model: "Class",
                populate: [
                    {
                        path: "grade_id",
                        model: "Grade",
                        select: ["grade_name"],
                    },
                ],
            })
            .populate({
                path: "class_id",
                model: "Class",
                populate: [
                    {
                        path: "homeroom_teacher_id",
                        model: "Teacher",
                        select: ["_id"],
                        populate: [{
                            path: "person_id",
                            model: "Person",
                            select: ["person_fullname"],
                        }]
                    },
                ],
            })
        res.json({ success: true, studentsInfor })
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

    //Check Class And Teacher is in DB
    const classItem = await Class.findById(req.params.classID)
    if (!classItem)
        return res
            .status(400)
            .json({ success: false, message: "This class does not existed." })

    const classAndGradeValidate = await Class.findOne({ class_name: class_name, grade_id: grade_id })
    if (classAndGradeValidate)
        if (classAndGradeValidate._id.toString() !== req.params.classID) {
            return res.status(400).json({
                success: false,
                message: "This class and grade already existed.",
            });
        }
    const teacherCheckValidate = await Class.findOne({ homeroom_teacher_id: homeroom_teacher_id })
    if (teacherCheckValidate)
        if (teacherCheckValidate._id.toString() !== req.params.classID) {
            return res.status(400).json({
                success: false,
                message: "This teacher already have a class.",
            });
        }

    try {
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
            { _id: req.params.classID }
        )

        res.json({ success: true, message: "Deleted class successfully!", grade: deletedClass })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
}

const getParentAssociations = async (req, res) => {
    try {
        const classInfor = await Class.find({
            homeroom_teacher_id: req.params.teacherID
        })
        const parentId = await Pupil.find({
            class_id: classInfor[0]._id.toString()
        }).select('parent_id')

        let parentArray = []
        parentId.forEach(element => {
            parentArray.push(element.parent_id)
        });
        const parentInfor = await Parent.find().where('_id').in(parentArray)
        res.json({ success: true, parentInfor });
        // // Return token
        // const personInfor = await Class.findById(req.params.classID);
        // const getParentInfor = await Parent.find({
        //     person_id: personInfor._id.toString(),
        // })
        //     .select([
        //         "parent_job",
        //         "parent_relationship",
        //         "is_in_association",
        //         "parent_job_address",
        //     ])
        //     .populate({
        //         path: "person_id",
        //         model: "Person",
        //         populate: [
        //             {
        //                 path: "account_id",
        //                 model: "Account",
        //                 select: ["account_username", "account_role"],
        //             },
        //         ],
        //     });
        // res.json({ success: true, getParentInfor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

module.exports = { 
    createClass, 
    getClass, 
    getClassByID, 
    updateClassByID, 
    deleteClass, 
    getStudentByClassID,
    getParentAssociations
 };
