const express = require("express");
const router = express.Router();
const Person = require("../model/Person");
const argon2 = require("argon2");
const Account = require("../model/Account");
const multer = require("multer");
const validator = require("email-validator");
const FirebaseStorage = require("multer-firebase-storage");

const fileFilter = (req, file, cb) => {
    // reject a fileee
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

router.get("/:personID", async (req, res, next) => {
    try {
        const personInfor = await Person.findById(req.params.personID).populate(
            {
                path: "account_id",
                model: "Account",
                select: ["account_username"],
            }
        );
        res.json({ success: true, personInfor });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
});

router.put(
    "/:personID",
    upload.single("person_image"),
    async (req, res, next) => {
        const {
            person_fullname,
            person_dateofbirth,
            person_email,
            person_gender,
            person_phonenumber,
            person_address,
        } = req.body;
        // Validation
        if (
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
        const phoneValidate = await Person.findOne({
            person_phonenumber: person_phonenumber,
        });
        const personInfor = await Person.findById(req.params.personID);
        if (phoneValidate)
            if (phoneValidate._id.toString() !== personInfor._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number must be unique.",
                });
            }
        const emailValidate = await Person.findOne({
            person_email: person_email,
        });
        if (emailValidate)
            if (emailValidate._id.toString() !== personInfor._id.toString()) {
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
        try {
            if (personInfor.person_image) {
                if (person_image === null) {
                    person_image = personInfor.person_image;
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
            if (!updatePerson)
                return res.status(401).json({
                    success: false,
                    message: "Person does not found.",
                });
            const getParentInfor = await Person.findById(
                req.params.personID
            ).populate({
                path: "account_id",
                model: "Account",
                select: ["account_username", "account_role"],
            });
            res.json({
                success: true,
                message: "Update person information successfully!",
                person: getParentInfor,
            });
        } catch (error) {
            const err = new Error("Internal Server Error");
            err.status = 500;
            next(err);
            return res
                .status(500)
                .json({ success: false, message: "" + error });
        }
    }
);

router.post("/reset-password/:accountID", async (req, res, next) => {
    try {
        let resetPassword = "123456";
        const hashPassword = await argon2.hash(resetPassword);
        let updateAccount = {
            account_password: hashPassword,
        };
        const account = await Account.findById(req.params.accountID);
        account.account_password = hashPassword;
        await account.save();
        res.json({
            success: true,
            message: "Your password has been reset.",
        });
    } catch (error) {
        const err = new Error("Internal Server Error");
        err.status = 500;
        next(err);
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
