const express = require("express")
const router = express.Router()
const Fee = require("../model/Fee")
const Pupil = require("../model/Pupil")
const Parent = require("../model/Parent")
const FeeCategory = require("../model/FeeCategory")

// @route GET api/fee
// @desc Get fee
// @access Private
router.get("/", async (req, res, next) => {
    try {
        const allFee = await Fee.find()
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount", "start_date", "end_date"],
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
                    },
                ],
            })
        res.json({ success: true, allFee })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// // @route GET api/fee
// // @desc GET fee by Id
// // @access Private Only Admin
router.get("/:feeID", async (req, res, next) => {
    try {
        // Return token
        const getfeeInfor = await Fee.find({ _id: req.params.feeID })
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount", "start_date", "end_date"],
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})
router.get("/get-fee-by-category-id/:feeCategoryID", async (req, res, next) => {
    try {
        // Return token
        const getfeeInfor = await Fee.find({ fee_category_id: req.params.feeCategoryID })
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount", "start_date", "end_date"],
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})
// // @route GET api/fee
// // @desc GET fee by Id
// // @access Private Only Admin
router.get("/get-fee-status/:feeStatus", async (req, res, next) => {
    try {
        // Return token
        const getfeeInfor = await Fee.find({ fee_status: req.params.feeStatus })
            .populate({
                path: "fee_category_id",
                model: "FeeCategory",
                select: ["fee_name", "fee_amount", "start_date", "end_date"],
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// @route GET api/fee
// @desc GET fee by Id
// @access Private Only Admin
router.get("/get-fee-infor-by-parent-id/:personID", async (req, res, next) => {
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
                select: ["fee_name", "fee_amount", "start_date", "end_date"],
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// // @route POST api/fee
// // @desc post fee
// // @access Private
router.post("/", async (req, res, next) => {
    const { list_pupil, paid_date, fee_category_id } = req.body
    if (!list_pupil || !fee_category_id)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        for (const [key, value] of Object.entries(list_pupil)) {
            if (value == true) {
                const feeValidate = await Fee.findOne({ fee_category_id, pupil_id: key })
                    .populate({
                        path: "pupil_id",
                        model: "Pupil",
                        select: ["pupil_name"],
                    })
                if (feeValidate)
                    return res
                        .status(400)
                        .json({ success: false, message: "Fee for " + feeValidate.pupil_id.pupil_name + " is already existed " })
                let checkStatus = false
                if (paid_date)
                    checkStatus = true
                //validate fee id
                const existed_puil = await Pupil.findOne({ _id: key })
                if (!existed_puil) {
                    return res.status(400).json({
                        success: false,
                        message: "Pupil dont exist",
                    })
                }
                let newFee = new Fee({
                    fee_status: checkStatus,
                    paid_date,
                    fee_category_id,
                    pupil_id: key
                })
                await newFee.save()
            }
        }
        return res.status(200).json({
            success: true, message: "Update Fee Status Successfully!",
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// // @route PUT api/admin/grade
// // @desc put grade
// // @access Private
router.put("/:feeId", async (req, res, next) => {
    const { paid_date, fee_category_id, pupil_id } = req.body
    if (!fee_category_id || !pupil_id)
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
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})


router.post("/multi", async (req, res, next) => {
    const { fee_list } = req.body
    if (!fee_list)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        //validate teacher id
        // const existed_fee = await Fee.findOne({ _id: fee_id })
        // if (!existed_fee) {
        //     return res.status(400).json({ success: false, message: "Fee Id doesn't exist!" })
        // }
        for (const [key, value] of Object.entries(fee_list)) {
            //validate fee id
            const existed_fee = await Fee.findOne({ _id: key })
            if (!existed_fee) {
                return res.status(400).json({
                    success: false,
                    message: "Fee dont exist",
                })
            }
            let new_fee = {
                //...existed_fee,
                // start_date: existed_fee.start_date,
                // end_date: existed_fee.end_date,
                paid_date: !existed_fee.fee_status ? Date.now() : null,
                fee_category_id: existed_fee.fee_category_id,
                pupil_id: existed_fee.pupil_id,
                fee_status: !existed_fee.fee_status
            }

            const updateFee = await Fee.findOneAndUpdate({ _id: existed_fee._id }, new_fee, { new: true })
            // if (existed_fee && value == true) {
            //     const updateFee = await Fee.findByIdAndUpdate({ fee_status: value })
            // } else if (existed_subject && value == false) {
            //     const updateFee = await Fee.findByIdAndUpdate({ fee_status: value })
            // }
        }
        return res.status(200).json({
            success: true, message: "Update Fee Status Successfully!",
        })
    }
    catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

// // @route DELETE api/fee
// // @desc delete fee
// // @access Private
router.delete("/:feeId", async (req, res, next) => {
    try {
        const deletedFee = await Fee.findOneAndDelete(
            { _id: req.params.feeId }
        )
        res.json({ success: true, message: "Deleted Fee Successfully!", fee: deletedFee })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})
router.post("/multi/delete", async (req, res, next) => {
    const { fee_list } = req.body
    if (!fee_list)
        return res.status(400).json({
            success: false,
            message: "Please fill in complete information.",
        })
    try {
        for (const [key] of Object.entries(fee_list)) {
            const deletedFee = await Fee.findOneAndDelete(
                { _id: key }
            )
        }
        res.json({ success: true, message: "Deleted Fee Successfully!" })
    } catch (error) {
        const err = new Error('Internal Server Error');
        err.status = 500;
        next(err)
        return res.status(500).json({ success: false, message: "" + error });
    }
})

module.exports = router

