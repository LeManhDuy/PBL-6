const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Subject = require("../model/Subject");
const CommentController = require("../controllers/comment");
const verifyJWT = require("../middleware/verifyJWTAdmin");

// Create score for a subject
router.post("/:pupilID", verifyJWT, CommentController.createComment);

// Get comment by pupilID
router.get("/:pupilID", verifyJWT, CommentController.getCommentByPupilID);

module.exports = router;
