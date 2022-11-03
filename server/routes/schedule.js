const express = require("express")
const router = express.Router()
const Schedule = require("../model/Schedule")
const Period = require("../model/Period")
const Subject = require("../model/Subject")
const Teacher = require("../model/Teacher")
const Person = require("../model/Person")
const Class = require("../model/class")
const Subject_Teacher = require("../model/SubjectTeacher")
const multer = require("multer")
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

// @route POST api/schedule
// @desc Create Schedule using excel file
// @access Private
router.post("/", multer().single('scheduleFile'), async (req, res) => {
        try{
            let scheduleFile = null
            // Validation
            // return res.status(400).json({ success: false, message: " A File does not exist!" , body:[req.file]})
            if (req.file){
                scheduleFile = Buffer.from(req.file.buffer)
            }
            else{
                return res.status(400).json({ success: false, message: "File does not exist!" , body:req.file})
            }
            const schedule = excelToJson({
                source: scheduleFile,
                header:{
                    rows: 1
                },
                columnToKey: {
                    '*': '{{columnHeader}}'
                },
                range: 'A2:H11',
                sheetStubs: true
            });
            //Get class name and rename it
            let classes = Object.keys(schedule)
            let class_name = []
            classes.forEach(c => {
                let new_class_name = c.replace('_','/')
                //change in schedule
                schedule[new_class_name] = schedule[c] 
                delete schedule[c]
                //new name list
                class_name.push(new_class_name)
            })

            //validate classes exist in database
            const existedClass = await Class.find({ class_name: { $in: class_name }})
            let existed_class_name = {}
            existedClass.forEach(c =>{
                existed_class_name[c.class_name] = c._id
            })
            let msg = ""
            class_name.every(c => {
                if (!Object.keys(existed_class_name).includes(c)){
                    msg += "Class name "+c+" doesn't exist!"
                    return false
                }
                else{
                    return true
                }
            })
            if(msg!==""){
                return res.status(400).json({success: false, message: msg})
            }
            //get subject teacher info
            let classes_teachers = {}
            let periods = {}
            for(let c of class_name){
                classes_teachers[c] = {}
                periods[c] = []
                let week_day = schedule[c]
                for(let o of week_day){
                    if(!o['Subject'] || !o['Teacher Email']){
                        msg += "Invalid input file! Please don't change the original format."
                        break
                    }
                    const existed_subject = await Subject.findOne({subject_name: o['Subject']})
                    if (!existed_subject){
                        msg += "Subject "+o['Subject']+" doesn't exist!"
                        break
                    }
                    if(o['Teacher Email']!=='X'){
                        const existed_person = await Person.findOne({person_email: o['Teacher Email']})
                        if (!existed_person){
                            msg += "Teacher email "+o['Teacher Email']+" doesn't exist!"
                            break
                        }
                        const existed_teacher = await Teacher.findOne({person_id:existed_person._id})
                        if (!existed_teacher){
                            msg += "Teacher email "+o['Teacher Email']+" doesn't exist!"
                            break
                        }
                        const existed_subject_teacher = await Subject_Teacher
                            .findOne({subject_id:existed_subject['_id'],teacher_id:existed_teacher['_id']})
                        // validate subject teacher exist
                        if (!existed_subject_teacher){
                            msg += o['Subject']+" isn't taugh by teacher with email "+o['Teacher Email']
                            break
                        }
                        // let v = {}
                        // v[] 
                        classes_teachers[c][existed_subject.subject_name] = existed_subject_teacher._id
                    }else{
                        classes_teachers[c][existed_subject.subject_name] = null
                    }
                }
                //add period into list and validate
                let date_of_week = ['Mon','Tue','Wed','Thu','Fri']
                for(let o of week_day){
                    date_of_week.every(day=>{
                        if(o[day]!=null){
                            if(classes_teachers[c][o[day]]==null){
                                msg+= "Class "+c+": Subject "+o[day]+" at "+day+" P"+o['Period']+" doesn't have an assign teacher for this class!"
                                return false
                            }
                            periods[c].push({
                                period_date: day,
                                period_number: o['Period'],
                                subject_teacher_id: classes_teachers[c][o[day]]
                            })
                            return true
                        }
                        return true   
                    })
                    if(msg!==""){
                        break
                    }
                }
                if(msg!==""){
                    break
                }
            }
          
            if (msg!==""){
                return res.status(400).json({success: false, message: msg})
            } 
            else{
                for(let c of class_name){
                    //delete existed schedule to replace    
                    const existed_schedule = await Schedule.findOne({class_id:existed_class_name[c]})
                    // return res.status(200).json({ success: true, existed_schedule})
                    if(existed_schedule){
                        // const existed_periods = Period.find({schedule_id:existed_schedule._id})
                        await Period.deleteMany({schedule_id:existed_schedule._id})
                        await Schedule.deleteOne(existed_schedule[0])
                    }

                    let new_schedule = new Schedule({
                        class_id: existed_class_name[c]
                    })
                    await new_schedule.save()
                    for(let period of periods[c]){
                        let new_period = new Period({
                            period_date: period.period_date,
                            period_number: period.period_number,
                            subject_teacher_id: period.subject_teacher_id,
                            schedule_id: new_schedule._id
                        })
                        await new_period.save()
                    }
                }
                
                return res.status(200).json({ success: true, message:"Add schedule successfully", 
                    forClasses:existed_class_name,periods,classes_teachers})
            }
        }catch(error){
            return res.status(500).json({success: false, message: "Something's wrong: " + error})
        }
        
    })


//
//
//
router.get("/",multer().single(), async (req,res) =>{
    try{
        const schedule = await Schedule.find().select()
            .populate({
                path:'class_id',
                model: 'Class',
                select: ['class_name']
            })
        let schedules = []
        for(let s of schedule){
            const periods = await Period.find({schedule_id:s._id}).select()
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
            schedules.push({schedule:s,periods})
        }
        return res.status(200).json({success:true, message:"Get Schedule successfully!", 
        schedules})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})
router.get("/class/:classId",multer().single(), async (req,res) => {
    //validate classID
    try{
        const existed_class = await Class.findOne({_id: req.params.classId})
        if(!existed_class){
            return res.status(400).json({success:false, message: "Class id doesn't exist!"})
        }
        
        const existed_schedule = await Schedule.findOne({class_id: existed_class._id})
        if(!existed_schedule){
            return res.status(400).json({success:false, message: "No Schedule for this class exist!"})
        }
        const existed_period = await Period.find({schedule_id: existed_schedule._id})
        return res.status(200).json({success:true, message:"Get Schedule successfully!", 
            class: existed_class, schedule: existed_schedule, existed_period})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.get("/teacher/:teacherId",multer().single(), async (req,res) => {
    //validate teacherID
    try{
        const existed_teacher = await Teacher.find({_id: req.params.teacherId})
        if(!existed_teacher){
            return res.status(500).json({success:false, message: "Teacher id doesn't exist!"})
        }
        const existed_subject_teachers = await Subject_Teacher.find({teacher_id: existed_teacher[0]._id}).select(["_id"])

        const existed_periods = await Period.find({subject_teacher_id:{$in: existed_subject_teachers}})
        let date_of_week = ['Mon','Tue','Wed','Thu','Fri']
        existed_periods.sort((a,b)=>{
                return date_of_week.indexOf(a.period_date) - date_of_week.indexOf(b.period_date) ||
                    a.period_number - b.period_number
        })
        return res.status(200).json({success:true, message:"Get Schedule successfully!", 
            teacher: existed_teacher, existed_periods})
    }
    catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
})

router.delete("/:scheduleId",multer().single(), async (req,res) =>{
    try{
        await Period.deleteMany({schedule_id:req.params.scheduleId})
        await Schedule.deleteOne({_id:req.params.scheduleId})
        return res.status(200).json({success:true, message:"Delete successfully!"})
    }catch(error){
        return res.status(500).json({success: false, message: "" + error})
    }
} )

module.exports = router
