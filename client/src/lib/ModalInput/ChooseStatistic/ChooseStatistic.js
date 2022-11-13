import React, { useState, useEffect } from "react";
import "./ChooseStatistic.css";
import FormShowScore from "../../../lib/ModalInput/ChooseStatistic/FormShowScore/FormShowScore";
import FormShowFee from "../../../lib/ModalInput/ChooseStatistic/FormShowFee/FormShowFee";


const ChooseStatistic = (props) => {
    const [dropValue, setDropValue] = useState("score");
    const [isShowScore, setIsShowScore] = useState(false);
    const [isShowFee, setIsShowFee] = useState(false);
    const [isShowType, setIsShowType] = useState(true);
    const options = [
        { key: 1, label: "Score", value: "score" },
        { key: 2, label: "Fee", value: "fee" },
    ];
    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Type of statistic
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option.key} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    };
    const handleChange = (event) => {
        setDropValue(event.target.value);
    };

    const clickSave = (e) => {
        e.preventDefault();
        if (dropValue === "score") {
            setIsShowScore(true);
            setIsShowType(false);
        }
        else if (dropValue === "fee") {
            setIsShowFee(true);
            setIsShowType(false);
        }
    };
    const handleInputCustom = () => {
        setIsShowType(true);
        setIsShowScore(false);
        setIsShowFee(false);
    };
    const FormShowTypeStatistic = (
        <div className="choose-account">
            <h5>Please select the type of statistic you want to show!</h5>
            <Dropdown
                options={options}
                value={dropValue}
                onChange={handleChange}
            />
            <button onClick={props.handleInputCustom} className="btn-cancel">
                Cancel
            </button>
            <button onClick={clickSave} className="btn-ok">
                Ok
            </button>
        </div>
    );
    return (
        <div className="add-account-form">
            {isShowType ? FormShowTypeStatistic : null}
            {isShowScore ? <FormShowScore handleInputCustom={handleInputCustom} /> : null}
            {isShowFee ? <FormShowFee handleInputCustom={handleInputCustom} /> : null}
        </div>
    );
};

export default ChooseStatistic;
