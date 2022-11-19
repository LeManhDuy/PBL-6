const express = require("express")
const Fee = require("../model/Fee")
const router = express.Router()
const FeeCategory = require("../model/FeeCategory")

// @route GET api/FeeCategory
// @desc Get FeeCategory
// @access Private
router.get("/", async (req, res, next) => {
    try {
        const allFeeCategory = await FeeCategory.find()
        res.json({ success: true, allFeeCategory })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route GET api/FeeCategory
// @desc GET FeeCategory by Id
// @access Private Only Admin
router.get("/:feeCategoryID", async (req, res, next) => {
    try {
        // Return token
        const getFeeCategoryInfor = await FeeCategory.find({ _id: req.params.feeCategoryID })
        res.json({ success: true, getFeeCategoryInfor })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route POST api/FeeCategory
// @desc post FeeCategory
// @access Private
router.post("/", async (req, res, next) => {
    const { start_date, end_date, fee_name, fee_amount } = req.body
    if (!start_date || !end_date || !fee_name || !fee_amount)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const feeCategoryValidate = await FeeCategory.findOne({ fee_name })
        if (feeCategoryValidate)
            return res
                .status(400)
                .json({ success: false, message: "Fee Category is already existed." })
        const newFeeCategory = new FeeCategory({
            start_date,
            end_date,
            fee_name,
            fee_amount,
        })
        await newFeeCategory.save()
        res.json({
            success: true,
            message: "Create Fee Category successfully.",
            newFeeCategory,
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route PUT api/admin/grade
// @desc put grade
// @access Private
router.put("/:feeCategoryId", async (req, res, next) => {
    const { start_date, end_date, fee_name, fee_amount } = req.body
    if (!start_date || !end_date || !fee_name || !fee_amount)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        const feeCategory = await FeeCategory.findById(req.params.feeCategoryId)
        if (!feeCategory)
            return res
                .status(400)
                .json({ success: false, message: "Fee category is not existed." })
        // const feeCategoryValidate = await FeeCategory.findOne({ fee_name })
        // if (feeCategoryValidate)
        //     return res
        //         .status(400)
        //         .json({ success: false, message: "Fee Category is already existed." })
        let updateFeeCategory = {
            start_date,
            end_date,
            fee_name,
            fee_amount,
        }
        const postUpdateFeeCategory = { _id: req.params.feeCategoryId }
        updateFeeCategory = await FeeCategory.findOneAndUpdate(
            postUpdateFeeCategory,
            updateFeeCategory,
            { new: true }
        )
        res.json({
            success: true,
            message: "Update Fee Category successfully.",
            updateFeeCategory: updateFeeCategory
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route DELETE api/FeeCategory
// @desc delete FeeCategory
// @access Private
router.delete("/:feeCategoryId", async (req, res, next) => {
    try {
        const deletedFeeCategory = await FeeCategory.findOneAndDelete(
            { _id: req.params.feeCategoryId }
        )
        const feeValidate = await Fee.find({ fee_category_id: req.params.feeCategoryId })
        if (feeValidate) {
            feeValidate.map((item) => {
                item.fee_category_id = undefined;
                item.save()
            })
        }
        res.json({ success: true, message: "Deleted Fee Category successfully!", feeCategory: deletedFeeCategory })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

module.exports = router

