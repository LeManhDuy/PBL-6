import React from "react";
import "./ModalCustom.css";

function ModalCustom(props) {
    const handClickOutsideModal = (e) => {
        if (e.target.className === "modal-custom-container") {
            props.handleCloseModalCustom();
        }
    };

    return (
        <div
            className={
                "modal-custom-wrapper " + (props.show ? "show" : "hidden")
            }
        >
            <div
                id="modal-custom"
                className="modal-custom-container"
                onClick={handClickOutsideModal}
            >
                {props.content}
            </div>
        </div>
    );
}

export default ModalCustom;
