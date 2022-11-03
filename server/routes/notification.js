require("dotenv").config();
const express = require("express");
const router = express.Router();
const Account = require("../model/Account");
const Person = require("../model/Person");
const NotificationController = require("../controllers/notification.js");

//Create public notification
router.post("/", NotificationController.createPublicNotification);

//Get all public notification
router.get("/", NotificationController.getAllPublicNotification);

//Get public notification by ID
router.get(
    "/:notificationID",
    NotificationController.getPublicNotificationById
);

//Edit public notification
router.put("/:notificationID", NotificationController.updatePublicNotification);

//Delete public notification
router.delete(
    "/:notificationID",
    NotificationController.deletePublicNotification
);

//private notification
//create private notification
router.post("/private/", NotificationController.createPrivateNotification);

//get private notification for teacher
router.get(
    "/private/:teacherID",
    NotificationController.getPrivateNotificationForTeacher
);

//get private notification for parents
router.get(
    "/private/parents/:parentsID",
    NotificationController.getPrivateNotificationForParents
);

//get private notification by ID
router.get(
    "/private/get-by-id/:notificationID",
    NotificationController.getPrivateNotificationById
);

//update private notification
router.put(
    "/private/:notificationID",
    NotificationController.updatePrivateNotification
);

//delete private notification
router.delete(
    "/private/:notificationID",
    NotificationController.deletePrivateNotification
);

module.exports = router;
