const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Schedule = require("../model/Schedule");
const Period = require("../model/Period");
const SubjectTeacher = require("../model/SubjectTeacher");
const Subject = require("../model/Subject");
const ScoreController = require("../controllers/score");
const verifyJWT = require("../middleware/verifyJWTAdmin");

// Create score for a subject
router.post("/:subjectID", verifyJWT, ScoreController.createSubjectScore);

// Get score by pupilID
router.get("/get-score/:studentID", verifyJWT, ScoreController.getScoreByPupilId);

// Update score by scoreID
router.put("/:scoreID", verifyJWT, ScoreController.updateScore);

// Get all subject by pupilID
router.get("/:studentID", verifyJWT, ScoreController.getAllSubjectByPupilId);

// Get score by ID
router.get("/get-detail-score/:scoreID", verifyJWT, ScoreController.getScoreById);

// Get all score by classID
router.get("/get-all-score/:classID", verifyJWT, ScoreController.getAllScoreByClassID);

// Get all subject by classID
router.get("/get-all-subject/:classID", verifyJWT, ScoreController.getSubjectByClassId);

module.exports = router;
