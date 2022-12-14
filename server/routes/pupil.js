const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Pupil = require("../model/Pupil");
const multer = require("multer");
const Parent = require("../model/Parent");
const Person = require("../model/Person");
const Classroom = require("../model/Class");
const FirebaseStorage = require("multer-firebase-storage");
const excelToJson = require('convert-excel-to-json');
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

// @route POST api/admin/pupil
// @desc Create pupil
// @access Private
router.post(
    "/:classID&:parentID",
    upload.single("pupil_image"),
    async (req, res, next) => {
        const { pupil_name, pupil_dateofbirth, pupil_gender } = req.body;
        const { classID, parentID } = req.params;
        // Validation
        let pupil_image = null;
        if (req.file) {
            pupil_image = req.file.publicUrl;
        }
        if (!pupil_name || !pupil_dateofbirth || !pupil_gender) {
            return res.status(400).json({
                success: false,
                message: "Please fill in complete information.",
            });
        }
        try {
            // check for existing user
            const pupilValidate = await Pupil.findOne({
                pupil_name,
                pupil_dateofbirth,
                pupil_gender,
            });
            if (pupilValidate)
                return res
                    .status(400)
                    .json({ success: false, message: "Pupil is existing." });
            //create pupil information
            const newPupil = new Pupil({
                pupil_name,
                pupil_dateofbirth,
                pupil_gender,
                pupil_image: pupil_image,
                parent_id: parentID,
                class_id: classID,
            });
            await newPupil.save();

            //return token
            res.json({
                success: true,
                message: "Create pupil successfully",
                studentFullName: newPupil,
            });
        } catch (error) {
            const err = new Error('Internal Server Error');
            err.status = 500;
            next(err)
            return res.status(500).json({ success: false, message: "" + error });  
        }
    }
);

// @route POST api/schedule
// @desc Create Schedule using excel file
// @access Private
router.post("/add-multi-pupil", multer().single('file'), async (req, res, next) => {
    try {
        let pupilFile = null
        if (req.file) {
            pupilFile = Buffer.from(req.file.buffer)
        }
        else {
            return res.status(400).json({ success: false, message: "File does not exist!", body: req.file })
        }
        const pupil = excelToJson({
            source: pupilFile,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            },
            sheetStubs: true
        });
        for (let c of pupil["Sheet1"]) {
            const classValidate = await Classroom.findOne({ class_name: c["Class Name"] })
            if (!classValidate) {
                return res
                    .status(400)
                    .json({ success: false, message: "Class does not exist." })
            }
            const emailValidate = await Person.findOne({ person_email: c["Parent's Email"] });
            if (!emailValidate) {
                return res.status(400).json({
                    success: false,
                    message: "Email does not exist.",
                });
            }
            const emailParentValidate = await Parent.findOne({ person_id: emailValidate._id })
            if (!emailParentValidate) {
                return res.status(400).json({
                    success: false,
                    message: "Email Parent does not exist.",
                });
            }
            if (c["Gender"] != "Male" && c["Gender"] != "Female") {
                return res.status(400).json({
                    success: false,
                    message: "Gender dont correct format.",
                });
            }
            try {
                DateOfBirth = Date.parse(c["Date Of Birth"])
            } catch (error) {
                return res.status(500).json({ success: false, message: "Date format error: " + error })
            }
            let newPupil = new Pupil({
                pupil_name: c["Full Name"],
                pupil_dateofbirth: Date.parse(c["Date Of Birth"]),
                pupil_gender: c["Gender"] == "Male" ? true : false,
                pupil_image: c["Image"],
                parent_id: emailParentValidate._id,
                class_id: classValidate._id,
            });
            newPupil.save()
        }
        //return token
        res.json({
            success: true,
            message: "Create pupil successfully",
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });  
    }

})


// // @route GET api/admin/parent
// // @desc GET parent
// // @access Private Only Admin
router.get("/", async (req, res, next) => {
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
                        select: ["person_fullname", "person_phonenumber"],
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
                        select: ["_id"],
                        populate: [
                            {
                                path: "person_id",
                                model: "Person",
                                select: ["person_fullname"],
                            },
                        ],
                    },
                ],
            });
        res.json({ success: true, getPuilInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// // @route GET api/admin/pupil
// // @desc GET pupil by Id
// // @access Private Only Admin
router.get("/:pupilID", async (req, res, next) => {
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
                        select: ["_id"],
                        populate: [
                            {
                                path: "person_id",
                                model: "Person",
                                select: ["person_fullname"],
                            },
                        ],
                    },
                ],
            });
        res.json({ success: true, getPupilInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// // @route GET api/admin/pupil
// // @desc GET pupil by teacher Id
// // @access Private Only Admin
router.get("/get-pupil-by-teacher-id/:teacherID", async (req, res, next) => {
    try {
        // Return token
        const getClassId = await Classroom.find({ homeroom_teacher_id: req.params.teacherID })
        const studentsInfor = await Pupil.find({ class_id: getClassId })
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
                    select: ["person_fullname", "person_phonenumber"],
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });  
    }
});
// // @route GET api/admin/pupil
// // @desc GET pupil by grade Id
// // @access Private Only Admin
router.get("/get-pupil-by-grade-id/:gradeID", async (req, res) => {
    try {
        // Return token
        const getClassId = await Classroom.find({ grade_id: req.params.gradeID })
        const studentsInfor = await Pupil.find({ class_id: getClassId })
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
                    select: ["person_fullname", "person_phonenumber"],
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
});

// // @route PUT api/admin/parent
// // @desc PUT parent
// // @access Private Only Admin
router.put("/:pupilID", upload.single("pupil_image"), async (req, res, next) => {
    const { pupil_name, pupil_dateofbirth, pupil_gender, parent_id, class_id } =
        req.body;
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
        });
    }
    let pupil_image = null;
    if (req.file) {
        pupil_image = req.file.publicUrl;
    }
    try {
        const pupil = await Pupil.findById(req.params.pupilID);
        if (pupil.pupil_image) {
            if (pupil_image === null) {
                pupil_image = pupil.pupil_image;
            }
        }
        //update Pupil Information
        let updatePupil = { pupil_name, pupil_dateofbirth, pupil_gender, pupil_image, parent_id, class_id }
        const postUpdatePupil = { _id: req.params.pupilID.toString() }
        updatedPupil = await Pupil.findOneAndUpdate(
            postUpdatePupil,
            updatePupil,
            { new: true }
        );
        if (!updatePupil)
            return res
                .status(401)
                .json({ success: false, message: "Pupil does not found." });
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
                        select: ["_id"],
                        populate: [
                            {
                                path: "person_id",
                                model: "Person",
                                select: ["person_fullname"],
                            },
                        ],
                    },
                ],
            });
        res.json({
            success: true,
            message: "Update pupil information successfully!",
            person: getPupilInfor,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

// // @route PUT api/admin/parent
// // @desc DELETE parent
// // @access Private Only Admin
router.delete("/:pupilID", async (req, res, next) => {
    try {
        //const pupil = await Pupil.findById(req.params.pupilID)
        //delete Pupil
        const postDeletePupil = {
            _id: req.params.pupilID,
        };
        const deletedPupil = await Pupil.findOneAndDelete(postDeletePupil);
        if (!deletedPupil)
            return res
                .status(401)
                .json({ success: false, message: "Pupil does not found ." });
        res.json({
            success: true,
            message: "Deleted pupil successfully!",
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});
//delete multip pupil
router.post("/multi/delete", async (req, res, next) => {
    const { pupil_list } = req.body
    if (!pupil_list)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        for (const [key] of Object.entries(pupil_list)) {
            const deletedPupil = await Pupil.findOneAndDelete(
                { _id: key }
            )
        }
        res.json({ success: true, message: "Deleted Fee Successfully!" })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})
//Get pupul by ParentID
router.get("/get-pupil-by-parent/:personID", async (req, res, next) => {
    try {
        // Return token
        const getParentsInfor = await Parent.find({
            person_id: req.params.personID,
        });
        const getPupilInfor = await Pupil.find({
            parent_id: getParentsInfor[0]._id.toString(),
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
                        select: ["_id"],
                        populate: [
                            {
                                path: "person_id",
                                model: "Person",
                                select: ["person_fullname"],
                            },
                        ],
                    },
                ],
            });
        res.json({ success: true, getPupilInfor });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
});

module.exports = router;
