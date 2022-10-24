import React from "react";
import "./AffairLayout.css";
import AffairSideBar from "../../common/AffairSideBar/AffairSideBar";

const AffairLayout = (props) => {
    return (
        <div>
            <div className="div-container">
                <div className="main-content">
                    <AffairSideBar />
                    {props.component}
                </div>
            </div>
        </div>
    );
};

export default AffairLayout;
