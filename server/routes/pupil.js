const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Pupil = require("../model/Pupil")
const multer = require("multer")
const FirebaseStorage = require("multer-firebase-storage")
const fs = require("fs")

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        return cb(new Error("Wrong extension type."))
    }
}

const upload = multer({
    storage: FirebaseStorage({
        bucketName: process.env.FB_BUCKET_NAME,
        credentials: {
            client_email: process.env.FB_CLIENT_EMAIL,
            private_key: process.env.FB_PRIVATE_KEY,
            project_id: process.env.FB_PROJECT_ID,
        },
        nameSuffix: "_hashcode_",
        unique: true,
        public: true,
    }),
    fileFilter: fileFilter,
})

// @route POST api/admin/pupil
// @desc Create pupil
// @access Private
router.post("/:classID&:parentID",
    upload.single("pupil_image"),
    async (req, res) => {
        const { pupil_name, pupil_dateofbirth, pupil_gender } = req.body
        const { classID, parentID } = req.params
        // Validation
        let pupil_image = null
        if (req.file) {
            pupil_image = req.file.publicUrl
        }
        if (
            !pupil_name ||
            !pupil_dateofbirth ||
            !pupil_gender
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in complete information.",
            })
        }
        try {
            // check for existing user
            const pupilValidate = await Pupil.findOne({ pupil_name, pupil_dateofbirth, pupil_gender })
            if (pupilValidate)
                return res
                    .status(400)
                    .json({ success: false, message: "Pupil is existing." })
            //create pupil information
            const newPupil = new Pupil({
                pupil_name,
                pupil_dateofbirth,
                pupil_gender,
                pupil_image: pupil_image,
                parent_id: parentID,
                class_id: classID,
            })
            await newPupil.save()

            //return token
            res.json({
                success: true,
                message: "Create pupil successfully",
                studentFullName: newPupil,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: "" + error })
        }
    })

// // @route GET api/admin/parent
// // @desc GET parent
// // @access Private Only Admin
router.get("/", async (req, res) => {
    try {
        const getPuilInfor = await Pupil.find()
            .select([
                "pupil_name",
                "pupil_dateofbirth",
                "pupil_gender",
                "pupil_image",
            ])
            .populate({
                path: "parent_id",
                model: "Parent",
                populate: [
                    {
                        path: "person_id",
                        model: "Person",
                        select: ["person_fullname"],
                    },
                ],
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
                        //select: ["graduated_school"]
                        populate: [{
                            path: "person_id",
                            model: "Person",
                            select: ["person_fullname"],
                        }]
                    },
                ],
            })
        res.json({ success: true, getPuilInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route GET api/admin/pupil
// // @desc GET pupil by Id
// // @access Private Only Admin
router.get("/:pupilID", async (req, res) => {
    try {
        // Return token
        const getPupilInfor = await Pupil.find({
            _id: req.params.pupilID,
        })
            .select([
                "pupil_name",
                "pupil_dateofbirth",
                "pupil_gender",
                "pupil_image",
            ])
            .populate({
                path: "parent_id",
                model: "Parent",
                populate: [
                    {
                        path: "person_id",
                        model: "Person",
                        select: ["person_fullname"],
                    },
                ],
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
                        //select: ["graduated_school"]
                        populate: [{
                            path: "person_id",
                            model: "Person",
                            select: ["person_fullname"],
                        }]
                    },
                ],
            })
        res.json({ success: true, getPupilInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route PUT api/admin/parent
// // @desc PUT parent
// // @access Private Only Admin
router.put("/:pupilID", upload.single("pupil_image"), async (req, res) => {
    const { pupil_name, pupil_dateofbirth, pupil_gender, parent_id, class_id } = req.body
    // Validation
    if (
        !pupil_name ||
        !pupil_dateofbirth ||
        !pupil_gender ||
        !parent_id ||
        !class_id
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing information. Please fill in!",
        })
    }
    let pupil_image = null
    if (req.file) {
        pupil_image = req.file.publicUrl
    }
    try {
        const pupil = await Pupil.findById(req.params.pupilID)
        if (pupil.pupil_image) {
            if (pupil_image === null) {
                pupil_image = pupil.pupil_image
            }
        }
        //update Pupil Information
        let updatePupil = { pupil_name, pupil_dateofbirth, pupil_gender, parent_id, class_id }
        const postUpdatePupil = { _id: req.params.pupilID.toString() }
        updatedPupil = await Pupil.findOneAndUpdate(
            postUpdatePupil,
            updatePupil,
            { new: true }
        )
        if (!updatePupil)
            return res
                .status(401)
                .json({ success: false, message: "Pupil does not found." })
        const getPupilInfor = await Pupil.find({
            _id: req.params.pupilID,
        })
            .select([
                "pupil_name",
                "pupil_dateofbirth",
                "pupil_gender",
                "pupil_image",
            ])
            .populate({
                path: "parent_id",
                model: "Parent",
                populate: [
                    {
                        path: "person_id",
                        model: "Person",
                        select: ["person_fullname"],
                    },
                ],
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
                        //select: ["graduated_school"]
                        populate: [{
                            path: "person_id",
                            model: "Person",
                            select: ["person_fullname"],
                        }]
                    },
                ],
            })
        res.json({
            success: true,
            message: "Update pupil information successfully!",
            person: getPupilInfor,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route PUT api/admin/parent
// // @desc DELETE parent
// // @access Private Only Admin
router.delete("/:pupilID", async (req, res) => {
    try {
        //const pupil = await Pupil.findById(req.params.pupilID)
        //delete Pupil
        const postDeletePupil = {
            _id: req.params.pupilID,
        }
        const deletedPupil = await Pupil.findOneAndDelete(postDeletePupil)
        if (!deletedPupil)
            return res
                .status(401)
                .json({ success: false, message: "Pupil does not found." })
        res.json({
            success: true,
            message: "Deleted pupil successfully!",
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router
