import React, { useEffect, useState } from "react";
import "./StatisticAdmin.css";
import { Bar, Doughnut } from 'react-chartjs-2';
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ChooseStatistic from "../../../lib/ModalInput/ChooseStatistic/ChooseStatistic";
import StatisticService from "../../../config/service/StatisticService";

import {
    Chart,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
Chart.register(CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend);

const StatisticAdmin = (props) => {
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [legend, setLegend] = useState("");

    const option = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
            title: {
                display: true,
                text: legend,
                font: {
                    size: 24
                }
            },

        },
    }

    const dataScore = {
        labels: label,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
            },
        ],
    };

    const Statistics = () => {
        return (
            <div className="father-chart">
                <div className="chart">
                    <Doughnut options={option} data={dataScore} />
                </div>
            </div>
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
    const handleShowScore = (dropValueGrade, dropValueClass, dropValueSubject) => {
        if (dropValueGrade && dropValueClass.value != "0" && dropValueSubject.value == "0") {
            StatisticService.getCommentByClassId(dropValueClass.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of all subjects of class " + dropValueClass.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value != "0" && dropValueSubject.value != "0") {
            StatisticService.getScoreByClassSubjectId(dropValueClass.value, dropValueSubject.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of " + dropValueSubject.label + " of class " + dropValueClass.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value == "0" && dropValueSubject.value == "0") {
            StatisticService.getCommentByGradeId(dropValueGrade.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of all subjects of grade " + dropValueGrade.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value == "0" && dropValueSubject.value != "0") {
            StatisticService.getCommentByGradeSubjectId(dropValueGrade.value, dropValueSubject.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of " + dropValueSubject.label + " of grade " + dropValueGrade.label)
            })
        }
        setAddState(false)
    }

    const handleShowFee = (dropValueGrade, dropValueClass, dropValueFee) => {
        if (dropValueGrade.value != "0" && dropValueClass.value != "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryAndClassId(dropValueFee.value, dropValueClass.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status: " + dropValueFee.label + " of class " + dropValueClass.label)
            })
        }
        if (dropValueGrade.value != "0" && dropValueClass.value != "0" && dropValueFee.value == "0") {
            StatisticService.getFeeByClassId(dropValueClass.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status of class:" + dropValueClass.label)
            })
        }
        if (dropValueGrade.value != "0" && dropValueClass.value == "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryAndGradeId(dropValueFee.value, dropValueGrade.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status: " + dropValueFee.label + " of grade " + dropValueGrade.label)
            })
        }
        if (dropValueGrade.value != "0" && dropValueClass.value == "0" && dropValueFee.value == "0") {
            StatisticService.getFeeByGradeId(dropValueGrade.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status of grade:" + dropValueGrade.label)
            })
        }
        if (dropValueGrade.value == "0" && dropValueClass.value == "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryId(dropValueFee.value).then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical status of fee:" + dropValueFee.label)
            })
        }
        if (dropValueGrade.value == "0" && dropValueClass.value == "0" && dropValueFee.value == "0") {
            StatisticService.getFee().then((response) => {
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status of all school")
            })
        }
        setAddState(false)
    }
    const DivStatistic = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <ChooseStatistic
                    handleShowScore={handleShowScore}
                    handleShowFee={handleShowFee}
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
            {legend ? <Statistics /> : null}
            {addState ? DivStatistic : null}
        </div>
    )

};

export default StatisticAdmin;