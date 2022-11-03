const express = require("express")
const router = express.Router()
const Fee = require("../model/Fee")
const Pupil = require("../model/Pupil")
const Parent = require("../model/Parent")
const FeeCategory = require("../model/FeeCategory")

// @route GET api/fee
// @desc Get fee
// @access Private
router.get("/", async (req, res) => {
    try {
        const allFee = await Fee.find()
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount"],
            })
            .populate({
                path: "pupil_id",
                model: "Pupil",
                select: ["pupil_name"],
            })
        res.json({ success: true, allFee })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route GET api/fee
// // @desc GET fee by Id
// // @access Private Only Admin
router.get("/:feeID", async (req, res) => {
    try {
        // Return token
        const getfeeInfor = await Fee.find({ _id: req.params.feeID })
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount"],
            })
            .populate({
                path: "pupil_id",
                model: "Pupil",
                select: ["pupil_name"],
                populate: [
                    {
                        path: "class_id",
                        model: "Class",
                        select: ["class_name"],
                        populate: [
                            {
                                path: "grade_id",
                                model: "Grade",
                                select: ["grade_name"],
                            }
                        ]
                    },
                ],
            })
        res.json({ success: true, getfeeInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route GET api/fee
// @desc GET fee by Id
// @access Private Only Admin
router.get("/get-fee-infor-by-parent-id/:personID", async (req, res) => {
    try {
        // Return token
        const getParentsID = await Parent.find({
            person_id: req.params.personID,
        });
        const getStudentID = await Pupil.find({ parent_id: getParentsID })
        console.log("student", getStudentID);
        const getFeeInfor = await Fee.find({ pupil_id: getStudentID })
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount"],
            })
            .populate({
                path: "pupil_id",
                model: "Pupil",
                select: ["pupil_name", "pupil_image"],
                populate: [
                    {
                        path: "class_id",
                        model: "Class",
                        select: ["class_name"],
                        populate: [
                            {
                                path: "grade_id",
                                model: "Grade",
                                select: ["grade_name"],
                            }
                        ]
                    },
                ],
            })
        res.json({ success: true, getFeeInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route POST api/fee
// // @desc post fee
// // @access Private
router.post("/", async (req, res) => {
    const { start_date, end_date, paid_date, fee_category_id, pupil_id } = req.body
    if (!start_date || !end_date || !fee_category_id || !pupil_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    const feeValidate = await Fee.findOne({ fee_category_id, pupil_id })
    if (feeValidate)
        return res
            .status(400)
            .json({ success: false, message: "Fee for this pupil is already existed." })



    try {
        let checkStatus = false
        if (paid_date)
            checkStatus = true
        const newFee = new Fee({
            fee_status: checkStatus,
            start_date,
            end_date,
            paid_date,
            fee_category_id,
            pupil_id
        })
        await newFee.save()
        res.json({
            success: true,
            message: "Create Fee Successfully.",
            newFee,
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route PUT api/admin/grade
// // @desc put grade
// // @access Private
router.put("/:feeId", async (req, res) => {
    const { start_date, end_date, paid_date, fee_category_id, pupil_id } = req.body
    if (!start_date || !end_date || !fee_category_id || !pupil_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    const feeCategoryValidate = await FeeCategory.findById(fee_category_id)
    if (!feeCategoryValidate)
        return res
            .status(400)
            .json({ success: false, message: "Fee is not existed." })

    const pupilValidate = await Fee.findOne({ fee_category_id: fee_category_id, pupil_id: pupil_id })
    if (pupilValidate)
        if (pupilValidate._id.toString() !== req.params.feeId) {
            return res.status(400).json({
                success: false,
                message: "This pupil already have a fee",
            });
        }

    try {
        let checkStatus = false
        if (paid_date)
            checkStatus = true
        let updateFee = {
            fee_status: checkStatus,
            start_date,
            end_date,
            paid_date,
            fee_category_id,
            pupil_id
        }
        const postUpdateFee = { _id: req.params.feeId }
        updatedFee = await Fee.findOneAndUpdate(
            postUpdateFee,
            updateFee,
            { new: true }
        )
        res.json({
            success: true,
            message: "Update Fee successfully.",
            updatedFee: updatedFee
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route DELETE api/fee
// // @desc delete fee
// // @access Private
router.delete("/:feeId", async (req, res) => {
    try {
        const deletedFee = await Fee.findOneAndDelete(
            { _id: req.params.feeId }
        )
        res.json({ success: true, message: "Deleted Fee Successfully!", fee: deletedFee })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router

