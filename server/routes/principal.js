const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const Account = require("../model/Account")
const Person = require("../model/Person")
const argon2 = require("argon2")
const multer = require("multer")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/principals")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

// @route POST api/admin/principal
// @desc Create principal user
// @access Private
router.post("/", upload.single("person_image"), async (req, res) => {
    const { account_username, account_password, person_fullname,
        person_dateofbirth, person_email, person_gender, person_phonenumber,
        person_address } = req.body
    // Validation
    let person_image = null
    if (req.file) {
        person_image = req.file.path
    }
    if (!account_username || !account_password || !person_fullname
        || !person_dateofbirth || !person_email || !person_gender || !person_phonenumber
        || !person_address)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    if (person_phonenumber.length != 10) {
        return res.status(400).json({
            success: false,
            message: "Phone number must have 10 numbers",
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
                .json({ success: false, message: "Account username is existing" })
        // all good
        const hashPassword = await argon2.hash(account_password)

        //create account information
        const newAccount = new Account({
            account_username,
            account_password: hashPassword,
            account_role: 'Principal'
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
            account_id: newAccount._id
        })
        await newPerson.save()

        //return token
        const accessToken = jwt.sign(
            { principalId: newAccount._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: "Create principal successfully",
            accessToken,
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/admin/principle
// @desc GET parents
// @access Private Only Admin
router.get("/", async (req, res) => {
    try {
        // Return token
        const allPrinciple = await Account.find({ account_role: "Principal" })
        const arrPrincipleId = [];
        allPrinciple.map((item) => {
            arrPrincipleId.push(item._id)
        });
        const getPrincipleInfor = await Person.find({ account_id: arrPrincipleId })
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


module.exports = router