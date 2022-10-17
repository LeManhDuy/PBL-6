import React from "react";
import "./ConfirmAlert.css";

const ConfirmAlert = (props) => {
    return (
        <div className="confirm-alert">
            <p>{props.title}</p>
            <button className="btn-ok" onClick={props.handleDelete}>
                Ok
            </button>
            <button
                className="btn-cancel"
                onClick={props.handleCloseModalCustom}
            >
                Cancel
            </button>
        </div>
    );
};

export default ConfirmAlert;
