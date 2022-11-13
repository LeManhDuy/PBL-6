import React, { useState, useEffect } from "react";
import "./FormShowFee.css";

const FormShowFee = (props) => {
    const clickSave = (e) => {
    };
    return (
        <div className="form-add-account">
            fee dsads
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Back
            </button>
            <button onClick={clickSave} className="btn-ok">
                Show
            </button>
        </div>

    );
};

export default FormShowFee;
