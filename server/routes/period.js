const express = require("express")
const router = express.Router()
const Schedule = require("../model/Schedule")
const Period = require("../model/Period")
const Subject = require("../model/Subject")
const Teacher = require("../model/Teacher")
const Person = require("../model/Person")
const Class = require("../model/Class")
const Subject_Teacher = require("../model/SubjectTeacher")
const multer = require("multer")
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

router.get("/",multer().single(), async (req,res) => {
    try{
        const periods = await Period.find().select()
        .populate({
            path: 'subject_teacher_id',
            model: 'SubjectTeacher',
            populate: [{
                path: "subject_id",
                model: "Subject",
                select: ["subject_name"]
            },{
                path: "teacher_id",
                model: "Teacher",
                select: ["person_id"],
                populate:[{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"]
                }]
            }]
        })
        let date_of_week = ['Mon','Tue','Wed','Thu','Fri']
        periods.sort((a,b)=>{
            return date_of_week.indexOf(a.period_date) - date_of_week.indexOf(b.period_date) ||
                a.period_number - b.period_number
        })
        return res.status(200).json({success:true, message:"Get Schedule successfully!", 
            n: periods.length, periods})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.get("/:periodId",multer().single(), async (req,res) => {
    try{
        const period = await Period.findOne({_id:req.params.periodId}).select()
        .populate({
            path: 'subject_teacher_id',
            model: 'SubjectTeacher',
            populate: [{
                path: "subject_id",
                model: "Subject",
                select: ["subject_name"]
            },{
                path: "teacher_id",
                model: "Teacher",
                select: ["person_id"],
                populate:[{
                    path: "person_id",
                    model: "Person",
                    select: ["person_fullname"]
                }]
            }]
        })
        return res.status(200).json({success:true, message:"Get Period successfully!", period})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.post("/",multer().single(), async (req,res) => {
    const {period_date, period_number, subject_teacher_id, schedule_id} = req.body
    //validate
    if (!period_date || !period_number || !subject_teacher_id || !schedule_id)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    let date_of_week = ['Mon','Tue','Wed','Thu','Fri']
    if(!date_of_week.includes(period_date)){
        return res.status(400).json({
            success: false,
            message: "Period date must be in form of 3 letters, capitalize the first character.",
        })
    }
    if(period_number<1 || period_number>10){
        return res.status(400).json({
            success: false,
            message: "Period numnber must be in range of 1 and 10",
        })
    }
    try{
        //validate id
        const existed_subject_teacher = await Subject_Teacher.findOne({_id:subject_teacher_id})
        if(!existed_subject_teacher){
            return res.status(400).json({
                success: false,
                message: "Subject Teacher ID doesn't exist!",
            })
        }
        const existed_schedule = await Schedule.findOne({_id:schedule_id})
        if(!existed_schedule){
            return res.status(400).json({
                success: false,
                message: "Schedule doesn't exist!",
            })
        }
        const existed_period = await Period.findOne({period_date, 
                        period_number, subject_teacher_id, schedule_id})
        if(existed_period){
            return res.status(400).json({
                success: false,
                message: "Period is already existed!",
            })
        }
        const new_period = new Period({
            period_date,
            period_number,
            subject_teacher_id,
            schedule_id
        })
        await new_period.save();
        return res.status(200).json({success:true, message:"Add period successfully!", new_period})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.put("/:periodId",multer().single(), async (req,res)=>{
    const {period_date, period_number, subject_teacher_id, schedule_id} = req.body
    //validate
    if (!period_date || !period_number || !subject_teacher_id || !schedule_id)
    return res.status(400).json({
        success: false,
        message: "Please fill in complete information.",
    })
    let date_of_week = ['Mon','Tue','Wed','Thu','Fri']
    if(!date_of_week.includes(period_date)){
        return res.status(400).json({
            success: false,
            message: "Period date must be in form of 3 letters, capitalize the first character.",
        })
    }
    if(period_number<1 || period_number>10){
        return res.status(400).json({
            success: false,
            message: "Period numnber must be in range of 1 and 10",
        })
    }
    try{
        //validate id
        const existed_subject_teacher = await Subject_Teacher.findOne({_id:subject_teacher_id})
        if(!existed_subject_teacher){
            return res.status(400).json({
                success: false,
                message: "Subject Teacher ID doesn't exist!",
            })
        }
        const existed_schedule = await Schedule.findOne({_id:schedule_id})
        if(!existed_schedule){
            return res.status(400).json({
                success: false,
                message: "Schedule doesn't exist!",
            })
        }
        const existed_period = await Period.findOne({_id:req.params.periodId})
        if(!existed_period){
            return res.status(400).json({
                success: false,
                message: "Period doesn't exist!",
            })
        }
        const update_period ={
            period_date,
            period_number,
            subject_teacher_id,
            schedule_id
        }
        const updatedPeriod = await Period.findOneAndUpdate(
            {_id: req.params.periodId},
            update_period,
            {new: true}
        )
        return res.status(200).json({success:true, message:"Update period successfully!", updatedPeriod})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.delete("/schedule/:scheduleId",multer().single(), async (req,res) => {
    try{
        const schedule_id = req.params.scheduleId
        // const periods = await Period.find()
        await Period.deleteMany({schedule_id: schedule_id})
        return res.status(200).json({success:true, message:"Delete successfully!"})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.delete("/:periodId",multer().single(), async (req,res) => {
    try{
        // const schedule_id = req.params.scheduleId
        // const periods = await Period.find()
        await Period.findByIdAndRemove({_id:req.params.periodId})
        return res.status(200).json({success:true, message:"Delete successfully!"})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})



module.exports = router