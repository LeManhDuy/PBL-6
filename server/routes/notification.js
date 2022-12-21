require("dotenv").config();
const express = require("express");
const router = express.Router();
const Account = require("../model/Account");
const Person = require("../model/Person");
const NotificationController = require("../controllers/notification.js");
const verifyJWT = require("../middleware/verifyJWTAdmin");

//Create public notification
router.post("/", verifyJWT, NotificationController.createPublicNotification);

//Get all public notification
router.get("/", NotificationController.getAllPublicNotification);

//Get public notification by ID
router.get(
    "/:notificationID",
    NotificationController.getPublicNotificationById
);

//Edit public notification
router.put("/:notificationID", verifyJWT, NotificationController.updatePublicNotification);

//Delete public notification
router.delete(
    "/:notificationID",
    verifyJWT,
    NotificationController.deletePublicNotification
);

//private notification
//create private notification
router.post("/private/", verifyJWT, NotificationController.createPrivateNotification);

//get private notification for teacher
router.get(
    "/private/:teacherID",
    verifyJWT,
    NotificationController.getPrivateNotificationForTeacher
);

//get private notification for parents
router.get(
    "/private/parents/:parentsID",
    verifyJWT,
    NotificationController.getPrivateNotificationForParents
);

//get private notification by ID
router.get(
    "/private/get-by-id/:notificationID",
    verifyJWT,
    NotificationController.getPrivateNotificationById
);

//update private notification
router.put(
    "/private/:notificationID",
    verifyJWT,
    NotificationController.updatePrivateNotification
);

//delete private notification
router.delete(
    "/private/:notificationID",
    verifyJWT,
    NotificationController.deletePrivateNotification
);

module.exports = router;
