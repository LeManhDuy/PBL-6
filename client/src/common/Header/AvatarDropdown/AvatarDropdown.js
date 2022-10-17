import React from "react";
import "./AvatarDropdown.css";

const AvatarDropdown = (props) => {
    return (
        <div className="dropdown-avatar">
            <button onClick={props.HandleLogout}>
                <i class="fa-solid fa-right-from-bracket"></i>
                Logout
            </button>
        </div>
    );
};

export default AvatarDropdown;
