const Class = require("../model/Class");
const Pupil = require("../model/Pupil");
const Teacher = require("../model/Teacher");
const Parent = require("../model/Parent");
const Person = require("../model/Person");
const PublicNotification = require("../model/PublicNotification");
const { now } = require("mongoose");
const PrivateNotification = require("../model/privateNotification");

const createPublicNotification = async (req, res, next) => {
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getAllPublicNotification = async (req, res, next) => {
    try {
        const publicNotifications = await PublicNotification.find({});
        res.status(200).json({
            success: true,
            publicNotifications,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getPublicNotificationById = async (req, res, next) => {
    try {
        const publicNotification = await PublicNotification.findById(
            req.params.notificationID
        );
        res.status(200).json({
            success: true,
            publicNotification,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const updatePublicNotification = async (req, res, next) => {
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const deletePublicNotification = async (req, res, next) => {
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

// Private Notification
const createPrivateNotification = async (req, res, next) => {
    let { title, content, parent_id, teacher_id, teacher_send, parents_send } =
        req.body;
    let date = now().toString();
    //Validation
    if (!title || !content || !parent_id || !teacher_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        });
    const teacherInfor = await Teacher.findById(teacher_id);
    if (!teacherInfor) {
        const teacherInfor = await Teacher.find({ person_id: teacher_id });
        teacher_id = teacherInfor[0]._id;
    } else {
        const parentsInfor = await Parent.find({ person_id: parent_id });
        parent_id = parentsInfor[0]._id;
    }
    try {
        const privateNotification = new PrivateNotification({
            title,
            content,
            date,
            parent_id,
            teacher_id,
            teacher_send,
            parents_send,
        });
        await privateNotification.save();
        res.status(200).json({
            success: true,
            message: "Seding successfully!",
            privateNotification,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getPrivateNotificationForTeacher = async (req, res, next) => {
    const teacherInfor = await Teacher.find({
        person_id: req.params.teacherID,
    });
    if (!teacherInfor[0]) {
        res.status(404).json({
            success: false,
            message: "Teacher not found!",
        });
    }
    try {
        const privateNotifications = await PrivateNotification.find({
            teacher_id: teacherInfor[0]._id,
        }).populate({
            path: "parent_id",
            model: "Parent",
            populate: [
                {
                    path: "person_id",
                    model: "Person",
                },
            ],
        });
        res.status(200).json({
            success: true,
            privateNotifications,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getPrivateNotificationForParents = async (req, res, next) => {
    const parentsInfor = await Parent.find({
        person_id: req.params.parentsID,
    });
    if (!parentsInfor[0]) {
        res.status(404).json({
            success: false,
            message: "Parents not found!",
        });
    }
    try {
        const privateNotifications = await PrivateNotification.find({
            parent_id: parentsInfor[0]._id,
        }).populate({
            path: "teacher_id",
            model: "Teacher",
            populate: [
                {
                    path: "person_id",
                    model: "Person",
                },
            ],
        });
        res.status(200).json({
            success: true,
            privateNotifications,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const getPrivateNotificationById = async (req, res, next) => {
    try {
        const privateNotification = await PrivateNotification.findById(
            req.params.notificationID
        );
        res.status(200).json({
            success: true,
            privateNotification,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const updatePrivateNotification = async (req, res, next) => {
    let { title, content } = req.body;
    let date = now().toString();
    if (!title || !content)
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
        const updateNotification = await PrivateNotification.findByIdAndUpdate(
            req.params.notificationID,
            updatedNoti,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            updateNotification,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

const deletePrivateNotification = async (req, res, next) => {
    const notificationInfo = await PrivateNotification.findById(
        req.params.notificationID
    );
    if (!notificationInfo)
        return res.status(404).json({
            success: false,
            message: "Notification not found!",
        });
    try {
        const deletedNoti = await PrivateNotification.findByIdAndDelete(
            req.params.notificationID
        );
        res.status(200).json({
            success: true,
            message: "Deleted!",
            deletedNoti,
        });
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
};

module.exports = {
    //public notification
    createPublicNotification,
    getAllPublicNotification,
    getPublicNotificationById,
    updatePublicNotification,
    deletePublicNotification,
    //private notification
    createPrivateNotification,
    getPrivateNotificationForTeacher,
    getPrivateNotificationForParents,
    getPrivateNotificationById,
    updatePrivateNotification,
    deletePrivateNotification,
};
