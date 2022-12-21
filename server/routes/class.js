const classController = require("../controllers/class")
const express = require("express")
const router = express.Router()
const multer = require("multer")
const verifyJWT = require("../middleware/verifyJWTAdmin");

// @route Post api/class
// @desc Post class
// Create Class
router.post("/", verifyJWT, multer().single(), classController.createClass);

// @route get api/class
// @desc get class
// Get Classes
router.get("/", verifyJWT, multer().single(), classController.getClass);

// @route GET api/pupil/
// @desc GET student by ID
// GET student by ID
router.get("/get-pupil-by-class/:classID", verifyJWT, multer().single(), classController.getStudentByClassID);

// @route Post api/class
// @desc Post class
// Get Class by ID
router.get("/:classID", verifyJWT, multer().single(), classController.getClassByID);


// @route put api/class
// @desc put class
// Update Class by ID
router.put("/:classID", verifyJWT, multer().single(), classController.updateClassByID);

// @route Delete api/class
// @desc Delete class
// Delete Class by ID
router.delete("/:classID", verifyJWT, multer().single(), classController.deleteClass);




router.get("/get-parent-associations/:personID", classController.getParentAssociations);


router.get("/get-pupil-at-teacher-role/:personID", classController.getStudentByTeacherIdAtTeacherRole);

module.exports = router