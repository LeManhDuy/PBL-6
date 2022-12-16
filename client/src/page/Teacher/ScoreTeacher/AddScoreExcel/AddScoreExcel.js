import React, { useEffect, useState } from "react";
import "./AddScoreExcel.css";

const AddScoreExcel = (props) => {
    const [file, setFile] = useState();
    const [error, setError] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleAddScoreExcel = () => {
        let has_error = false;
        if (!file) {
            has_error = true;
            setError(true);
        }
        if (!has_error) {
            props.handleConfirmAddExcel({ scoreFile: file });
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleAddScoreExcel();
    };

    const handleChangeFile = (e) => {
        let name = e.target.files[0].name;
        setFileName(name);
        let ext = name.split(".")[name.split(".").length - 1];
        if (ext === "xlsx") {
            setFile(e.target.files[0]);
            setError(false);
        } else {
            console.log("error");
            setError(true);
        }
    };

    const FormAddScoreExcel = (
        <>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <label className="file">
                        <label htmlFor="file" className="fileLabel">
                            Select File
                        </label>
                        <input
                            type="file"
                            id="file"
                            hidden
                            onChange={handleChangeFile}
                        />
                    </label>
                    <label hidden={fileName === ""}>
                        Selected File: {fileName}
                    </label>
                    <label
                        className={
                            "error" + (error ? " error-show" : " error-hidden")
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
                <h3>Add Score Excel</h3>
                <h4>Intructions</h4>
                <label
                    className={
                        "error" +
                        (props.errorServer ? " error-show" : " error-hidden")
                    }
                >
                    {props.errorMessage}
                </label>
                <a
                    href="https://firebasestorage.googleapis.com/v0/b/pbl-6-88c5f.appspot.com/o/Example_Score.xlsx?alt=media&token=1c195b31-ad3c-4826-9005-d649bdf11519"
                    download
                >
                    Example_Score.xlsx
                </a>
                {FormAddScoreExcel}
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={error}
                    onClick={clickSave}
                    className="btn-ok"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddScoreExcel;
