import './AddSchedule.css'
import React, { useEffect, useState } from "react";
// import ScheduleService from "../../../config/service/ScheduleService";

const AddSchedule = (props) => {
    const [file, setFile] = useState();
    const [error, setError] = useState(false)
    const [fileName, setFileName] = useState("")

    
    const handleAddSchedule = () => {
        let has_error = false;
        // console.log(file)
        if(!file) {
            has_error = true
            setError(true)
        }
        if (!has_error) {
            props.handleConfirmAddSchedule({scheduleFile:file});
        }
    }

    const clickSave = (e) => {
        e.preventDefault();
        handleAddSchedule();
    }

    const handleChangeFile = (e) => {
        let name = e.target.files[0].name
        setFileName(name)
        let ext = name.split(".")[name.split(".").length-1]
        if ( ext === 'xlsx'){
            // console.log(e.target.files[0])
            setFile(e.target.files[0])
            setError(false)
        }
        else{
            console.log('error')
            setError(true)
        }
    }

    const FormAddSchedule = (
        <>
           
            <div className="form-teacher-content">
                <div className='teacher-content-left'>
                    <label className="file" >
                        <label htmlFor='file' className='fileLabel'>
                            Select File
                        </label>
                        <input type="file" id="file" hidden onChange={handleChangeFile} />
                    </label>
                    <label hidden={fileName===""}>
                            Selected File: {fileName}
                    </label>
                    <label
                        className={
                            "error" +
                            (error
                                ? " error-show"
                                : " error-hidden")
                        }
                        >
                            The selected file is not valid
                    </label>
                </div>
            </div>
        </>
    );

    return (
        <div className="add-account-form">
            <div className="form-add-account">
                <h3>Add Schedule</h3>
                <h4>Intructions</h4>
                <a href='https://firebasestorage.googleapis.com/v0/b/pbl-6-88c5f.appspot.com/o/Example.xlsx?alt=media&token=8d2bf9f0-b2fe-4d2b-a29f-d76dd36e4621' download>
                    Example.xlsx
                    </a>
                {FormAddSchedule}
                
                <button onClick={props.handleInputCustom} className="btn-cancel">
                    Cancel
                </button>
                <button type="submit"
                    disabled={error}
                    onClick={clickSave} 
                    className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );


}

export default AddSchedule
