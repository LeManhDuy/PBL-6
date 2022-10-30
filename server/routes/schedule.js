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
            if (req.file){
                scheduleFile = Buffer.from(req.file.buffer)
            }
            else{
                return res.status(500).json({ success: false, message: "File does not exist!" })
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
                return res.status(500).json({success: false, message: msg})
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
                return res.status(500).json({success: false, message: msg})
            } 
            else{
                for(let c of class_name){
                    //delete existed schedule to replace
                    const existed_schedule = Schedule.findOne({class_id:existed_class_name[c]})
                    if(existed_schedule){
                        // const existed_periods = Period.find({schedule_id:existed_schedule._id})
                        await Period.deleteMany({schedule_id:existed_schedule._id})
                        await Schedule.deleteOne(existed_schedule)
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
            return res.status(500).json({success: false, message: "Something's wrong: " + error+ " "+msg})
        }
        
    })


module.exports = router
