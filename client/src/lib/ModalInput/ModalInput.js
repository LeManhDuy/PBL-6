import React from "react";
import "./ModalInput.css";

const ModalInput = (props) => {
    const handClickCancelModal = (e) => {
        props.handleInputCustom();
    };

    return (
        <div
            className={
                "modal-input-wrapper " + (props.show ? "show" : "hidden")
            }
        >
            <i
                onClick={handClickCancelModal}
                className="btnCancel fa-solid fa-xmark"
            ></i>
            <div className="modal-input-container">{props.content}</div>
        </div>
    );
};

export default ModalInput;
