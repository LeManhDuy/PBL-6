const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Schedule = require("../model/Schedule");
const Period = require("../model/Period");
const SubjectTeacher = require("../model/SubjectTeacher");
const Subject = require("../model/Subject");
const ScoreController = require("../controllers/score");

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

module.exports = router;
