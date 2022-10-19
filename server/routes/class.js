const classController = require("../controllers/class")
const express = require("express")
const router = express.Router()
const multer = require("multer")

// @route Post api/admin/class
// @desc Post class
// Create Class
router.post("/", multer().single(), classController.createClass);

// @route get api/admin/class
// @desc get class
// Get Classes
router.get("/", multer().single(), classController.getClass);

// @route Post api/admin/class
// @desc Post class
// Get Class by ID
router.get("/:classID", multer().single(), classController.getClassByID);


// @route put api/admin/class
// @desc put class
// Update Class by ID
router.put("/:classID", multer().single(), classController.updateClassByID);

// @route Delete api/admin/class
// @desc Delete class
// Delete Class by ID
router.delete("/:classID", multer().single(), classController.deleteClass);



module.exports = router