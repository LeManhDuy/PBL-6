import React from "react";
import "./AdminLayout.css";
import SideBar from "../../common/SideBar/SideBar";

function AdminLayout(props) {
    return (
        <div>
            <div className="div-container">
                <div className="main-content">
                    <SideBar />
                    {props.component}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
