const Class = require("../model/class");
const Pupil = require("../model/Pupil");
const Teacher = require("../model/Teacher");
const Parent = require("../model/Parent");
const Person = require("../model/Person");
const PublicNotification = require("../model/PublicNotification");
const { now } = require("mongoose");

const createPublicNotification = async (req, res) => {
    let { title, content } = req.body;
    //Validation
    if (!title && !content)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        });
    try {
        let date = now().toString();
        const newPublicNotification = new PublicNotification({
            title: title,
            content: content,
            date: date,
        });
        await newPublicNotification.save();
        res.status(200).json({
            success: true,
            message: "Create notification successfully.",
            newPublicNotification,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getAllPublicNotification = async (req, res) => {
    try {
        const publicNotifications = await PublicNotification.find({});
        res.status(200).json({
            success: true,
            publicNotifications,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getPublicNotificationById = async (req, res) => {
    try {
        const publicNotification = await PublicNotification.findById(
            req.params.notificationID
        );
        res.status(200).json({
            success: true,
            publicNotification,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const updatePublicNotification = async (req, res) => {
    let { title, content } = req.body;
    let date = now().toString();
    //Validation
    if (!title && !content)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        });
    try {
        let updatedNoti = {
            title,
            content,
            date,
        };
        const updatedNotification = await PublicNotification.findByIdAndUpdate(
            req.params.notificationID,
            updatedNoti,
            { new: true }
        );
        res.status(200).json({ success: true, updatedNotification });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const deletePublicNotification = async (req, res) => {
    try {
        const deleteNotification = await PublicNotification.findByIdAndDelete(
            req.params.notificationID
        );
        res.status(200).json({
            success: true,
            message: "Notification has been deleted!",
            deleteNotification,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error });
    }
};

module.exports = {
    createPublicNotification,
    getAllPublicNotification,
    getPublicNotificationById,
    updatePublicNotification,
    deletePublicNotification,
};
