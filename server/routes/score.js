const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Schedule = require("../model/Schedule");
const Period = require("../model/Period");
const SubjectTeacher = require("../model/SubjectTeacher");
const Subject = require("../model/Subject");
const ScoreController = require("../controllers/score");
const multer = require("multer");

// Create score for a subject
router.post("/:subjectID", ScoreController.createSubjectScore);

// Get score by pupilID
router.get("/get-score/:studentID", ScoreController.getScoreByPupilId);

// Update score by scoreID
router.put("/:scoreID", ScoreController.updateScore);

// Get all subject by pupilID
router.get("/:studentID", ScoreController.getAllSubjectByPupilId);

// Get score by ID
router.get("/get-detail-score/:scoreID", ScoreController.getScoreById);

// Get all score by classID
router.get("/get-all-score/:classID", ScoreController.getAllScoreByClassID);

// Get all subject by classID
router.get("/get-all-subject/:classID", ScoreController.getSubjectByClassId);

// Add score by excel
router.post(
    "/add-score-excel/:classID",
    multer().single("file"),
    ScoreController.addScoreExcel
);

module.exports = router;
