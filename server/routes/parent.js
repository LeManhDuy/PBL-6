require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Account = require("../model/Account");
const Person = require("../model/Person");
const Parent = require("../model/Parent");
const Pupil = require("../model/Pupil");
const argon2 = require("argon2");
const validator = require("email-validator");
const multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const fs = require("fs");
const verifyJWT = require("../middleware/verifyJWTAdmin");

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

// @route POST api/admin/parent
// @desc Create parent user
// @access Private
router.post("/", verifyJWT, upload.single("person_image"), async (req, res, next) => {
    const {
        account_username,
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
        parent_job,
        parent_relationship,
        is_in_association,
        parent_job_address,
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
        !parent_job ||
        !parent_relationship ||
        !parent_job_address
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
            account_role: process.env.ROLE_PARENT,
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

        //create parents
        const newParent = new Parent({
            person_id: newPerson._id,
            parent_job,
            parent_relationship,
            is_in_association,
            parent_job_address,
        });
        await newParent.save();

        //return token
        const accessToken = jwt.sign(
            { principalId: newAccount._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Create parent successfully.",
            accessToken,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/admin/parent
// @desc GET parent
// @access Private Only Admin
router.get("/", verifyJWT, async (req, res, next) => {
    try {
        const getParentsInfor = await Parent.find()
            .select([
                "parent_job",
                "parent_relationship",
                "is_in_association",
                "parent_job_address",
            ])
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
        res.json({ success: true, getParentsInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route GET api/admin/parent
// @desc GET parent by Id
// @access Private Only Admin
router.get("/:parentID", verifyJWT, async (req, res, next) => {
    try {
        // Return token
        const getParentInfor = await Parent.find({
            _id: req.params.parentID,
        })
            .select([
                "parent_job",
                "parent_relationship",
                "is_in_association",
                "parent_job_address",
            ])
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
        res.json({ success: true, getParentInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/parent
// @desc PUT parent
// @access Private Only Admin
router.put("/:parentID", verifyJWT, upload.single("person_image"), async (req, res, next) => {
    const {
        account_username,
        // account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
        parent_job,
        parent_relationship,
        is_in_association,
        parent_job_address,
    } = req.body;
    // Validation
    if (
        !account_username ||
        // !account_password ||
        !person_fullname ||
        !person_dateofbirth ||
        !person_email ||
        !person_gender ||
        !person_phonenumber ||
        !person_address ||
        !parent_job ||
        !parent_relationship ||
        !parent_job_address
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
    const parentInfor = await Parent.findById(req.params.parentID)
        .populate("person_id", ["person_id"])
    if (phoneValidate)
        if (phoneValidate._id.toString() !== parentInfor.person_id._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be unique.",
            });
        }
    const emailValidate = await Person.findOne({ person_email: person_email })
    if (emailValidate)
        if (emailValidate._id.toString() !== parentInfor.person_id._id.toString()) {
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
        const parent = await Parent.findById(req.params.parentID);
        const person = await Person.findById(parent.person_id.toString());
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
        const postUpdatePerson = { _id: parent.person_id.toString() };
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
        // update Parent Information
        let updateParent = {
            parent_job,
            parent_relationship,
            is_in_association,
            parent_job_address,
        };
        const postUpdateParent = { _id: req.params.parentID };
        updatedParent = await Parent.findOneAndUpdate(
            postUpdateParent,
            updateParent,
            { new: true }
        );
        // if (!updatePerson || !updateParent || !updateAccount)
        if (!updatePerson || !updateParent)

            return res
                .status(401)
                .json({ success: false, message: "Parent does not found." });
        const getParentInfor = await Parent.find({
            _id: req.params.parentID,
        })
            .select([
                "parent_job",
                "parent_relationship",
                "is_in_association",
                "parent_job_address",
            ])
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
        res.json({
            success: true,
            message: "Update parent information successfully!",
            person: getParentInfor,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// @route PUT api/admin/parent
// @desc DELETE parent
// @access Private Only Admin
router.delete("/:parentID", verifyJWT, async (req, res, next) => {
    try {
        const parent = await Parent.findById(req.params.parentID);
        const person = await Person.findById(parent.person_id.toString());
        //delete Parent
        const postDeleteParent = {
            _id: req.params.parentID,
        };
        const deletedParent = await Parent.findOneAndDelete(postDeleteParent);

        const postDeletePerson = {
            _id: person._id,
        };
        const deletedPerson = await Person.findOneAndDelete(postDeletePerson);

        const postDeleteAccount = {
            _id: person.account_id,
        };
        const deletedAccount = await Account.findOneAndDelete(
            postDeleteAccount
        );

        //delete parentID in student
        const pupils = await Pupil.find({ parent_id: req.params.parentID });
        if (pupils) {
            pupils.map((item) => {
                item.parent_id = null;
                item.save();
            });
        }

        if (!deletedParent || !deletedPerson || !deletedAccount)
            return res
                .status(401)
                .json({ success: false, message: "Parent does not found." });
        res.json({
            success: true,
            message: "Deleted parent successfully!",
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.get("/get-parents-info/:personID", verifyJWT, async (req, res, next) => {
    try {
        // Return token
        const personInfor = await Person.findById(req.params.personID);
        const getParentInfor = await Parent.find({
            person_id: personInfor._id.toString(),
        })
            .select([
                "parent_job",
                "parent_relationship",
                "is_in_association",
                "parent_job_address",
            ])
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
        res.json({ success: true, getParentInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.get("/change-is-association/:parentID", verifyJWT, async (req, res, next) => {
    try {
        const parentInfor = await Parent.findById(req.params.parentID);
        parentInfor.is_in_association = !parentInfor.is_in_association;
        parentInfor.save();
        res.json({ success: true, message: 'Change is association success' });
        // res.json({ success: true, message: "Change is Association Success" });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
