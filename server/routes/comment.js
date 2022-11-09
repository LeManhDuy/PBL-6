const express = require("express");
const router = express.Router();
const Pupil = require("../model/Pupil");
const Subject = require("../model/Subject");
const CommentController = require("../controllers/comment");

// Create score for a subject
router.post("/:pupilID", CommentController.createComment);

// Get comment by pupilID
router.get("/:pupilID", CommentController.getCommentByPupilID);

module.exports = router;
