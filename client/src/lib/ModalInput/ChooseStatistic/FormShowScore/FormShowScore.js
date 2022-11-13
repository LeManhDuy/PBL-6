import React, { useState, useEffect } from "react";
import "./FormShowScore.css";

const FormShowScore = (props) => {
    const clickSave = (e) => {
    };
    return (
        <div className="form-add-account">
            score dsads
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Back
            </button>
            <button onClick={clickSave} className="btn-ok">
                Show
            </button>
        </div>

    );
};

export default FormShowScore;
