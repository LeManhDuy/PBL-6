require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Account = require("../model/Account");
const Person = require("../model/Person");
const validator = require("email-validator");
const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const fs = require("fs");
  
// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, "./uploads/affairs")
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     },
// })

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

// @route POST api/admin/affair
// @desc Create affairs user
// @access Private
router.post("/", upload.single("person_image"), async (req, res, next) => {
    const {
        account_username,
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
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
        !person_address
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
            account_role: process.env.ROLE_STAFF,
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

        //return token
        const accessToken = jwt.sign(
            { affairId: newAccount._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Create Staff successfully.",
            accessToken,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/admin/affair
// @desc GET affair
// @access Private Only Admin
router.get("/", async (req, res, next) => {
    try {
        // Return token
        const allAffair = await Account.find({
            account_role: process.env.ROLE_STAFF,
        });
        const arrAffairId = [];
        allAffair.map((item) => {
            arrAffairId.push(item._id);
        });
        const getAffairInfor = await Person.find({ account_id: arrAffairId })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"]);
        res.json({ success: true, getAffairInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/admin/affair
// @desc GET affair by Id
// @access Private Only Admin
router.get("/:personID", async (req, res, next) => {
    try {
        // Return token
        const getAffairInfor = await Person.find({ _id: req.params.personID })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"]);
        res.json({ success: true, getAffairInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/affair
// @desc PUT affair
// @access Private Only Admin
router.put("/:personID", upload.single("person_image"), async (req, res, next) => {
    const {
        // account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
    } = req.body;
    // Validation
    if (
        // !account_password ||
        !person_fullname ||
        !person_dateofbirth ||
        !person_email ||
        !person_gender ||
        !person_phonenumber ||
        !person_address
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing information. Please fill in!",
        });
    }
    let person_image = null;
    if (req.file) {
        person_image = req.file.publicUrl;
    }
    const phoneValidate = await Person.findOne({ person_phonenumber: person_phonenumber })
    if (phoneValidate)
        if (phoneValidate._id.toString() !== req.params.personID) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be unique.",
            });
        }
    const emailValidate = await Person.findOne({ person_email: person_email })
    if (emailValidate)
        if (emailValidate._id.toString() !== req.params.personID) {
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
    // if (account_password.length < 6) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Password must have at least 6 characters.",
    //     });
    // }
    try {
        const person = await Person.findById(req.params.personID);
        if (person.person_image) {
            if (person_image === null) {
                person_image = person.person_image;
            }
        }
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
        const postUpdatePerson = { _id: req.params.personID };
        updatedPerson = await Person.findOneAndUpdate(
            postUpdatePerson,
            updatePerson,
            { new: true }
        );
        //update Account Information
        // const hashPassword = await argon2.hash(account_password);
        // let updateAccount = {
        //     account_password: hashPassword,
        // };
        // const postUpdateAccount = { _id: person.account_id };
        // updatedAcccount = await Account.findOneAndUpdate(
        //     postUpdateAccount,
        //     updateAccount,
        //     { new: true }
        // );
        // if (!updatePerson || !updateAccount)
        if (!updatePerson)
            return res
                .status(401)
                .json({ success: false, message: "Person does not found." });
        const getAffairInfor = await Person.find({ _id: req.params.personID })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"]);
        res.json({
            success: true,
            message: "Update person information successfully!",
            personInformation: getAffairInfor,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/affair
// @desc DELETE affair
// @access Private Only Admin
router.delete("/:personID", async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.personID);
        const postDeletePerson = {
            _id: req.params.personID,
        };
        const deletedPerson = await Person.findOneAndDelete(postDeletePerson);

        const postDeleteAccount = {
            _id: person.account_id,
        };
        const deletedAccount = await Account.findOneAndDelete(
            postDeleteAccount
        );
        if (!deletedPerson || !deletedAccount)
            return res
                .status(401)
                .json({ success: false, message: "Person does not found." });
        res.json({
            success: true,
            message: "Deleted person successfully!",
            person: deletedPerson,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
