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

module.exports = router;
