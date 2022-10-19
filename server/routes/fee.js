const express = require("express")
const router = express.Router()
const Fee = require("../model/Fee")

// @route GET api/Fee
// @desc Get Fee
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

// @route GET api/Fee
// @desc GET Fee by Id
// @access Private Only Admin
router.get("/:feeID", async (req, res) => {
    try {
        // Return token
        const getFeeInfor = await Fee.find({ _id: req.params.feeID })
        res.json({ success: true, getFeeInfor })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route POST api/Fee
// @desc post Fee
// @access Private
router.post("/:pupil_id&:fee_category_id", async (req, res) => {
    const { fee_status, state_date, end_date, paid_date } = req.body
    if (!fee_status || !state_date || !end_date || !paid_date)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const feeValidate = await Fee.findOne({ fee_name })
        if (feeValidate)
            return res
                .status(400)
                .json({ success: false, message: "Fee  is already existed." })
        const newFee = new Fee({
            fee_name,
            fee_amount,
        })
        await newFee.save()
        res.json({
            success: true,
            message: "Create Fee  successfully.",
            newFee,
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route PUT api/admin/grade
// @desc put grade
// @access Private
router.put("/:feeId", async (req, res) => {
    const { fee_name, fee_amount } = req.body
    if (!fee_name || !fee_amount)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const fee = await Fee.findById(req.params.feeId)
        if (!fee)
            return res
                .status(400)
                .json({ success: false, message: "Fee  is not existed." })
        // const feeValidate = await Fee.findOne({ fee_name })
        // if (feeValidate)
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "Fee  is already existed." })
        let updateFee = {
            fee_name,
            fee_amount,
        }
        const postUpdateFee = { _id: req.params.feeId }
        updateFee = await Fee.findOneAndUpdate(
            postUpdateFee,
            updateFee,
            { new: true }
        )
        res.json({
            success: true,
            message: "Update Fee  successfully.",
            updateFee: updateFee
        })
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

// @route DELETE api/Fee
// @desc delete Fee
// @access Private
router.delete("/:feeId", async (req, res) => {
    try {
        const deletedFee = await Fee.findOneAndDelete(
            { _id: req.params.feeId }
        )

        res.json({ success: true, message: "Deleted Fee  successfully!", fee: deletedFee })
    } catch (error) {
        return res.status(500).json({ success: false, message: "" + error })
    }
})

module.exports = router

