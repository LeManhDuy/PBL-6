import React from "react";
import "./AffairLayout.css";
import SideBar from "../../common/SideBar/SideBar";

const AffairLayout = (props) => {
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
};

export default AffairLayout;
