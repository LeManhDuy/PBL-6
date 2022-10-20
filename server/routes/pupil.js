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
            const pupilValidate = await Pupil.findOne({ pupil_name, pupil_dateofbirth })
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
        res.json({ success: true, getPuilInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route GET api/admin/parent
// // @desc GET parent by Id
// // @access Private Only Admin
// router.get("/:parentID", async (req, res) => {
//     try {
//         // Return token
//         const getParentInfor = await Parent.find({
//             _id: req.params.parentID,
//         })
//             .select([
//                 "parent_job",
//                 "parent_relationship",
//                 "is_in_association",
//                 "parent_job_address",
//             ])
//             .populate({
//                 path: "person_id",
//                 model: "Person",
//                 populate: [
//                     {
//                         path: "account_id",
//                         model: "Account",
//                         select: ["account_username", "account_role"],
//                     },
//                 ],
//             })
//         res.json({ success: true, getParentInfor })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "" + error })
//     }
// })

// // @route PUT api/admin/parent
// // @desc PUT parent
// // @access Private Only Admin
// router.put("/:parentID", upload.single("person_image"), async (req, res) => {
//     const {
//         account_username,
//         account_password,
//         person_fullname,
//         person_dateofbirth,
//         person_email,
//         person_gender,
//         person_phonenumber,
//         person_address,
//         parent_job,
//         parent_relationship,
//         is_in_association,
//         parent_job_address,
//     } = req.body
//     // Validation
//     if (
//         !account_username ||
//         !account_password ||
//         !person_fullname ||
//         !person_dateofbirth ||
//         !person_email ||
//         !person_gender ||
//         !person_phonenumber ||
//         !person_address ||
//         !parent_job ||
//         !parent_relationship ||
//         !parent_job_address
//     ) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing information. Please fill in!",
//         })
//     }
//     let person_image = null
//     if (req.file) {
//         person_image = req.file.publicUrl
//     }
//     if (person_phonenumber.length != 10) {
//         return res.status(400).json({
//             success: false,
//             message: "Phone number must have 10 numbers.",
//         })
//     }
//     if (!validator.validate(person_email)) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid Email.",
//         })
//     }
//     if (account_password.length < 6) {
//         return res.status(400).json({
//             success: false,
//             message: "Password must have at least 6 characters.",
//         })
//     }
//     try {
//         const parent = await Parent.findById(req.params.parentID)
//         const person = await Person.findById(parent.person_id.toString())
//         if (person.person_image) {
//             if (person_image === null) {
//                 person_image = person.person_image
//             }
//         }
//         //update Person Information
//         let updatePerson = {
//             person_fullname,
//             person_dateofbirth,
//             person_email,
//             person_gender,
//             person_phonenumber,
//             person_address,
//             person_image,
//         }
//         const postUpdatePerson = { _id: parent.person_id.toString() }
//         updatedPerson = await Person.findOneAndUpdate(
//             postUpdatePerson,
//             updatePerson,
//             { new: true }
//         )
//         //update Account Information
//         const hashPassword = await argon2.hash(account_password)
//         let updateAccount = {
//             account_password: hashPassword,
//         }
//         const postUpdateAccount = { _id: person.account_id }
//         updatedAcccount = await Account.findOneAndUpdate(
//             postUpdateAccount,
//             updateAccount,
//             { new: true }
//         )
//         // update Parent Information
//         let updateParent = {
//             parent_job,
//             parent_relationship,
//             is_in_association,
//             parent_job_address,
//         }
//         const postUpdateParent = { _id: req.params.parentID }
//         updatedParent = await Parent.findOneAndUpdate(
//             postUpdateParent,
//             updateParent,
//             { new: true }
//         )
//         if (!updatePerson || !updateParent || !updateAccount)
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Parent does not found." })
//         const getParentInfor = await Parent.find({
//             _id: req.params.parentID,
//         })
//             .select([
//                 "parent_job",
//                 "parent_relationship",
//                 "is_in_association",
//                 "parent_job_address",
//             ])
//             .populate({
//                 path: "person_id",
//                 model: "Person",
//                 populate: [
//                     {
//                         path: "account_id",
//                         model: "Account",
//                         select: ["account_username", "account_role"],
//                     },
//                 ],
//             })
//         res.json({
//             success: true,
//             message: "Update parent information successfully!",
//             person: getParentInfor,
//         })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "" + error })
//     }
// })

// // @route PUT api/admin/parent
// // @desc DELETE parent
// // @access Private Only Admin
// router.delete("/:parentID", async (req, res) => {
//     try {
//         const parent = await Parent.findById(req.params.parentID)
//         const person = await Person.findById(parent.person_id.toString())
//         //delete Parent
//         const postDeleteParent = {
//             _id: req.params.parentID,
//         }
//         const deletedParent = await Parent.findOneAndDelete(postDeleteParent)

//         const postDeletePerson = {
//             _id: person._id,
//         }
//         const deletedPerson = await Person.findOneAndDelete(postDeletePerson)

//         const postDeleteAccount = {
//             _id: person.account_id,
//         }
//         const deletedAccount = await Account.findOneAndDelete(
//             postDeleteAccount
//         )
//         if (!deletedParent || !deletedPerson || !deletedAccount)
//             return res
//                 .status(401)
//                 .json({ success: false, message: "Parent does not found." })
//         res.json({
//             success: true,
//             message: "Deleted parent successfully!",
//         })
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "" + error })
//     }
// })

module.exports = router
