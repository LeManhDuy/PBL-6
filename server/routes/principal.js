require("dotenv").config()
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Account = require("../model/Account")
const Person = require("../model/Person")
const argon2 = require("argon2")
const validator = require("email-validator")
const multer = require("multer")
const FirebaseStorage = require('multer-firebase-storage')
const fs = require("fs")

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        return cb(new Error('Wrong extension type.'))
    }
}
const upload = multer({
    storage: FirebaseStorage({
        bucketName: process.env.FB_BUCKET_NAME,
        credentials: {
            "client_email": process.env.FB_CLIENT_EMAIL,
            "private_key": process.env.FB_PRIVATE_KEY,
            "project_id": process.env.FB_PROJECT_ID
        },
        nameSuffix: "_hashcode_",
        unique: true,
        public: true
    }),
    fileFilter: fileFilter,
})

// @route POST api/admin/principal
// @desc Create principal user
// @access Private
router.post("/", upload.single('person_image'), async (req, res) => {
    const {
        account_username,
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
    } = req.body
    // Validation
    let person_image = null
    if (req.file) {
        person_image = req.file.publicUrl
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
        })
    if (person_phonenumber.length != 10) {
        return res.status(400).json({
            success: false,
            message: "Phone number must have 10 numbers.",
        })
    }
    const emailValidate = await Person.findOne({ person_email })
    if (!validator.validate(person_email) || emailValidate) {
        return res.status(400).json({
            success: false,
            message: "Email must be unquie and correct address form.",
        })
    }
    if (account_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        })
    }
    try {
        // check for existing user
        const accountValidate = await Account.findOne({ account_username })
        if (accountValidate)
            return res
                .status(400)
                .json({ success: false, message: "Username is existing." })
        // all good
        const hashPassword = await argon2.hash(account_password)

        //create account information
        const newAccount = new Account({
            account_username,
            account_password: hashPassword,
            account_role: process.env.ROLE_PRINCIPLE,
        })
        await newAccount.save()

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
        })
        await newPerson.save()

        //return token
        const accessToken = jwt.sign(
            { principalId: newAccount._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: "Create principal successfully.",
            accessToken,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/principle
// @desc GET principal
// @access Private Only Admin
router.get("/", async (req, res) => {
    try {
        // Return token
        const allPrinciple = await Account.find({ account_role: "Principal" })
        const arrPrincipleId = []
        allPrinciple.map((item) => {
            arrPrincipleId.push(item._id)
        })
        const getPrincipleInfor = await Person.find({
            account_id: arrPrincipleId,
        })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"])
        res.json({ success: true, getPrincipleInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/principle
// @desc GET principal by Id
// @access Private Only Admin
router.get("/:personID", async (req, res) => {
    try {
        // Return token
        const getPrincipleInfor = await Person.find({
            _id: req.params.personID,
        })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"])
        res.json({ success: true, getPrincipleInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/admin/principle
// @desc PUT principle
// @access Private Only Admin
router.put("/:personID", upload.single("person_image"), async (req, res) => {
    const {
        account_password,
        person_fullname,
        person_dateofbirth,
        person_email,
        person_gender,
        person_phonenumber,
        person_address,
    } = req.body
    // Validation
    if (
        !account_password ||
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
        })
    }
    let person_image = null
    if (req.file) {
        person_image = req.file.publicUrl
    }
    if (person_phonenumber.length != 10) {
        return res.status(400).json({
            success: false,
            message: "Phone number must have 10 numbers.",
        })
    }
    if (!validator.validate(person_email)) {
        return res.status(400).json({
            success: false,
            message: "Email must correct address form.",
        })
    }
    if (account_password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must have at least 6 characters.",
        })
    }
    try {
        const person = await Person.findById(req.params.personID)
        // if (person.person_image) {
        //     if (person_image === null) {
        //         person_image = person.person_image
        //     }
        // else {
        //     fs.unlink("./" + person.person_image, (err) => {
        //         if (err)
        //             res.status(400).json({
        //                 success: false,
        //                 message: "Image error: " + err,
        //             })
        //     })
        // }
        // }
        //update Person Information
        let updatePerson = {
            person_fullname,
            person_dateofbirth,
            person_email,
            person_gender,
            person_phonenumber,
            person_address,
            person_image,
        }
        const postUpdatePerson = { _id: req.params.personID }
        updatedPerson = await Person.findOneAndUpdate(
            postUpdatePerson,
            updatePerson,
            { new: true }
        )
        //update Account Information
        const hashPassword = await argon2.hash(account_password)
        let updateAccount = {
            account_password: hashPassword,
        }
        const postUpdateAccount = { _id: person.account_id }
        updatedAcccount = await Account.findOneAndUpdate(
            postUpdateAccount,
            updateAccount,
            { new: true }
        )
        if (!updatePerson || !updateAccount)
            return res
                .status(401)
                .json({ success: false, message: "Person does not found." })
        const getPrincipleInfor = await Person.find({
            _id: req.params.personID,
        })
            .select([
                "person_fullname",
                "person_dateofbirth",
                "person_email",
                "person_gender",
                "person_phonenumber",
                "person_address",
                "person_image",
            ])
            .populate("account_id", ["account_username", "account_role"])
        res.json({
            success: true,
            message: "Update person information successfully!",
            person: getPrincipleInfor,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/admin/principle
// @desc DELETE principle
// @access Private Only Admin
router.delete("/:personID", async (req, res) => {
    try {
        const person = await Person.findById(req.params.personID)
        if (person.person_image) {
            fs.unlink("./" + person.person_image, (err) => {
                if (err)
                    res.status(400).json({
                        success: false,
                        message: "Image error: " + err,
                    })
            })
        }
        const postDeletePerson = {
            _id: req.params.personID,
        }
        const deletedPerson = await Person.findOneAndDelete(postDeletePerson)

        const postDeleteAccount = {
            _id: person.account_id,
        }
        const deletedAccount = await Account.findOneAndDelete(
            postDeleteAccount
        )
        if (!deletedPerson || !deletedAccount)
            return res
                .status(401)
                .json({ success: false, message: "Person does not found." })
        res.json({
            success: true,
            message: "Deleted person successfully!",
            person: deletedPerson,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router
