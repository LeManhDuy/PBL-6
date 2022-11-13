import React, { useEffect, useState } from "react";
import "./StatisticAdmin.css";
import { Bar } from 'react-chartjs-2';
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ChooseStatistic from "../../../lib/ModalInput/ChooseStatistic/ChooseStatistic";

import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
Chart.register(CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);

const StatisticAdmin = () => {
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const options = [
        { key: 1, label: "Admin", value: "principal" },
        { key: 2, label: "Parent", value: "parents" },
        { key: 3, label: "Teacher", value: "teacher" },
        { key: 4, label: "Staff", value: "affair" },
    ];
    const Dropdown1 = () => {
        return (
            <label>
                Grade
                <select
                    className="dropdown-account"
                >
                    <option key="1" value="Grade 1">
                        Grade 1
                    </option>
                    <option key="1" value="Grade 2">
                        Grade 1
                    </option>
                    <option key="1" value="Grade 3">
                        Grade 1
                    </option>
                </select>
            </label>
        );
    };

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const Statistics = () => {
        return (
            <table id="table">
                {/* <thead>{headerClass}</thead>
                <tbody>{classItem}</tbody> */}
                <Bar data={data} />
            </table>
        );
    };

    const handleInputCustom = () => {
        setAddState(false);
        setErrorServer(false);
        setErrorMessage("");
    };
    const handleStatistic = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };
    const DivStatistic = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <ChooseStatistic
                    handleInputCustom={handleInputCustom}
                    handleStatistic={handleStatistic}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Statistics</h3>
                </div>
            </header>
            <div className="right-header">
                <button className="btn-account" onClick={handleStatistic}>
                    Choose Type Statistic
                </button>
            </div>

            {/* <Statistics /> */}
            {addState ? DivStatistic : null}
        </div>
    )

};

export default StatisticAdmin;