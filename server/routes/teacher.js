require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Account = require("../model/Account");
const Person = require("../model/Person");
const Teacher = require("../model/Teacher");
const argon2 = require("argon2");
const validator = require("email-validator");
const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        return cb(new Error("Wrong extension type."));
    }
};
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
});

// @route POST api/teacher
// @desc Create teacher user
// @access Private
router.post("/", upload.single("person_image"), async (req, res) => {
    const {
        account_username,
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
        graduated_school,
        working_since,
        certificate,
    } = req.body;
    // Validation
    let person_image = null;
    if (req.file) {
        person_image = req.file.publicUrl;
    }
    if (
        !account_username ||
        !account_password ||
        !person_fullname ||
        !person_dateofbirth ||
        !person_email ||
        !person_gender ||
        !person_phonenumber ||
        !person_address ||
        !graduated_school ||
        !working_since ||
        !certificate
    )
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        });
    if (person_phonenumber.length != 10) {
        return res.status(400).json({
            success: false,
            message: "Phone number must have 10 numbers.",
        });
    }
    const phoneValidate = await Person.findOne({ person_phonenumber });
    if (phoneValidate)
        return res
            .status(400)
            .json({ success: false, message: "Phone number must be unique." });
    const emailValidate = await Person.findOne({ person_email });
    if (!validator.validate(person_email) || emailValidate) {
        return res.status(400).json({
            success: false,
            message: "Email must be unquie and correct address form.",
        });
    }
    if (account_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        });
    }
    try {
        // check for existing user
        const accountValidate = await Account.findOne({ account_username });
        if (accountValidate)
            return res
                .status(400)
                .json({ success: false, message: "Username is existing." });
        // all good
        const hashPassword = await argon2.hash(account_password);

        //create account information
        const newAccount = new Account({
            account_username,
            account_password: hashPassword,
            account_role: process.env.ROLE_TEACHER,
        });
        await newAccount.save();

        //create person information
        const newPerson = new Person({
            person_fullname,
            person_dateofbirth,
            person_email,
            person_gender,
            person_phonenumber,
            person_address,
            person_image,
            account_id: newAccount._id,
        });
        await newPerson.save();

        //create new teacher information
        const newTeacher = new Teacher({
            graduated_school,
            working_since,
            certificate,
            person_id: newPerson._id,
        });

        await newTeacher.save();

        //return token
        const accessToken = jwt.sign(
            { principalId: newAccount._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Create teacher successfully.",
            accessToken,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/teacher
// @desc GET teacher
// @access Private Only Admin
router.get("/", async (req, res) => {
    try {
        const getTeacherInfor = await Teacher.find()
            .select(["graduated_school", "working_since", "certificate"])
            .populate({
                path: "person_id",
                model: "Person",
                populate: [
                    {
                        path: "account_id",
                        model: "Account",
                        select: ["account_username", "account_role"],
                    },
                ],
            });

        res.json({ success: true, getTeacherInfor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/teacher/id
// @desc GET teacher by ID
// @access Private Only Admin
router.get("/:teacherID", async (req, res) => {
    try {
        // Return token
        const getTeacherInfor = await Teacher.find({
            _id: req.params.teacherID,
        })
            .select(["graduated_school", "working_since", "certificate"])
            .populate({
                path: "person_id",
                model: "Person",
                populate: [
                    {
                        path: "account_id",
                        model: "Account",
                        select: ["account_username", "account_role"],
                    },
                ],
            });

        res.json({ success: true, getTeacherInfor });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/teacher
// @desc PUT teacher
// @access Private Only Admin
router.put("/:teacherID", upload.single("person_image"), async (req, res) => {
    const {
        account_username,
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
        graduated_school,
        working_since,
        certificate,
    } = req.body;
    // Validation
    if (
        !account_username ||
        !account_password ||
        !person_fullname ||
        !person_dateofbirth ||
        !person_email ||
        !person_gender ||
        !person_phonenumber ||
        !person_address ||
        !graduated_school ||
        !working_since ||
        !certificate
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing information. Please fill in!",
        });
    }
    let person_image = null;
    if (req.file) {
        person_image = req.file.path;
    }
    const teacherInfor = await Teacher.findById(req.params.teacherID)
        .populate("person_id", ["person_id"])
    
    const phoneValidate = await Person.findOne({ person_phonenumber: person_phonenumber })
    console.log(phoneValidate._id.toString());
    if (phoneValidate)
        if (phoneValidate._id.toString() !== teacherInfor.person_id._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be unique.",
            });
        }
    const emailValidate = await Person.findOne({ person_email: person_email })
    if (emailValidate)
        if (emailValidate._id.toString() !== teacherInfor.person_id._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Email must be unquie.",
            });
        }
    if (person_phonenumber.length != 10) {
        return res.status(400).json({
            success: false,
            message: "Phone number must have 10 numbers.",
        });
    }
    if (!validator.validate(person_email)) {
        return res.status(400).json({
            success: false,
            message: "Email must be in the correct format.",
        });
    }
    if (account_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        });
    }
    try {
        const teacher = await Teacher.findById(req.params.teacherID);
        const person = await Person.findById(teacher.person_id);
        // if (person.person_image) {
        //     if (person_image === null) {
        //         person_image = person.person_image
        //     } else {
        //         fs.unlink("./" + person.person_image, (err) => {
        //             if (err)
        //                 res.status(400).json({
        //                     success: false,
        //                     message: "Image error: " + err,
        //                 })
        //         })
        //     }
        // }
        //update Teacher Information
        let updateTeacher = {
            graduated_school,
            working_since,
            certificate,
        };
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { _id: req.params.teacherID },
            updateTeacher,
            { new: true }
        );

        //update Person Information
        let updatePerson = {
            person_fullname,
            person_dateofbirth,
            person_email,
            person_gender,
            person_phonenumber,
            person_address,
            person_image,
        };
        const postUpdatePerson = { _id: teacher.person_id };
        const updatedPerson = await Person.findOneAndUpdate(
            postUpdatePerson,
            updatePerson,
            { new: true }
        );
        //update Account Information
        const hashPassword = await argon2.hash(account_password);
        let updateAccount = {
            account_username,
            account_password: hashPassword,
        };
        const postUpdateAccount = { _id: person.account_id };
        const updatedAcccount = await Account.findOneAndUpdate(
            postUpdateAccount,
            updateAccount,
            { new: true }
        );
        if (!updatedTeacher || !updatedPerson || !updatedAcccount)
            return res
                .status(401)
                .json({ success: false, message: "Update failed." });
        res.json({
            success: true,
            message: "Update teacher information successfully!",
            updated_info: [
                updatePerson,
                updateTeacher,
                { account_username: updateAccount.account_username },
            ],
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/principle
// @desc DELETE principle
// @access Private Only Admin
router.delete("/:teacherID", async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.teacherID);
        const person = await Person.findById(teacher.person_id);
        // if (person.person_image) {
        //     fs.unlink("./" + person.person_image, (err) => {
        //         if (err)
        //             res.status(400).json({
        //                 success: false,
        //                 message: "Image error: " + err,
        //             })
        //     })
        // }
        const deletedTeacher = await Teacher.findByIdAndDelete({
            _id: teacher._id,
        });
        const deletedPerson = await Person.findOneAndDelete({
            _id: person._id,
        });
        const deletedAccount = await Account.findOneAndDelete({
            _id: person.account_id,
        });
        if (!deletedTeacher || !deletedPerson || !deletedAccount)
            return res
                .status(401)
                .json({ success: false, message: "Deleted Failed" });
        res.json({
            success: true,
            message: "Deleted successfully!",
            teacherID: deletedTeacher._id,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
