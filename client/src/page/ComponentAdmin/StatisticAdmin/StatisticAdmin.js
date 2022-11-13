import React, { useEffect, useState } from "react";
import "./StatisticAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from 'react-chartjs-2';
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
    const Dropdown2 = () => {
        return (
            <label>
                Class
                <select
                    className="dropdown-account"
                >
                    <option key="1" value="Grade 1">
                        All
                    </option>
                    <option key="1" value="Grade 1">
                        Class 1
                    </option>
                    <option key="1" value="Grade 2">
                        Class 2
                    </option>
                    <option key="1" value="Grade 3">
                        Class 3
                    </option>
                </select>
            </label>
        );
    };
    const Dropdown3 = () => {
        return (
            <label>
                Subject
                <select
                    className="dropdown-account"
                >
                    <option key="1" value="Grade 1">
                        Subject 1
                    </option>
                    <option key="1" value="Grade 2">
                        Subject 2
                    </option>
                    <option key="1" value="Grade 3">
                        Subject 3
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

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Statistics</h3>
                </div>
            </header>
            <div className="table-content">
                <Statistics />
            </div>
        </div>
    )

};

export default StatisticAdmin;