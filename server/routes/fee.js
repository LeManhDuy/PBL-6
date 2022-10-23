const express = require("express")
const router = express.Router()
const Fee = require("../model/Fee")
const FeeCategory = require("../model/FeeCategory")

// @route GET api/fee
// @desc Get fee
// @access Private
router.get("/", async (req, res) => {
    try {
        const allFee = await Fee.find()
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
        res.json({ success: true, getfeeInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// // @route POST api/fee
// // @desc post fee
// // @access Private
router.post("/", async (req, res) => {
    const { state_date, end_date, paid_date, fee_category_id, pupil_id } = req.body
    if (!state_date || !end_date || !fee_category_id || !pupil_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const feeValidate = await Fee.findOne({ fee_category_id, pupil_id })
        if (feeValidate)
            return res
                .status(400)
                .json({ success: false, message: "Fee for this pupil is already existed." })
        let checkStatus = false
        if (paid_date)
            checkStatus = true
        const newFee = new Fee({
            fee_status: checkStatus,
            state_date,
            end_date,
            paid_date,
            fee_category_id,
            pupil_id
        })
        await newFee.save()
        res.json({
            success: true,
            message: "Create Fee Successfully.",
            newfee,
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
    const { state_date, end_date, paid_date, fee_category_id, pupil_id } = req.body
    if (!state_date || !end_date || !fee_category_id || !pupil_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const fee = await Fee.findById(req.params.feeId)
        if (!fee)
            return res
                .status(400)
                .json({ success: false, message: "Fee is not existed." })
        let checkStatus = false
        if (paid_date)
            checkStatus = true
        let updateFee = {
            fee_status: checkStatus,
            state_date,
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

