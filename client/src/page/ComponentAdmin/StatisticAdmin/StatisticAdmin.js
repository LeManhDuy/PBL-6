import React, { useEffect, useState, useRef } from "react";
import "./StatisticAdmin.css";
import { Bar, Doughnut, getElementsAtEvent } from 'react-chartjs-2';
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
    const [detailState, setDetailState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [legend, setLegend] = useState("");
    const [labelTitleListRs, setLabelTitleListRs] = useState("");

    const [grade, setGrade] = useState("")
    const [classroom, setClass] = useState("")
    const [subject, setSubject] = useState("")
    const [fee, setFee] = useState("")
    const [students, setStudents] = useState([])

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

    const scoreLabes = ["Average(0-4)", "Good(5-6)", "VeryGood(7-8)", "Excellent(9-10)"];
    const feeLabes = ["Paided", "UnPaid"];

    const printDatasetAtEvent = (item) => {
        if (!item.length) return;
        const datasetIndex = item[0].index;

        return dataScore.labels[datasetIndex];
    };

    const chartRef = useRef();
    const onClick = (event) => {
        var label = printDatasetAtEvent(getElementsAtEvent(chartRef.current, event))
        console.log(label);
        console.log("grade: " + grade);
        console.log("classroom: " + classroom);
        console.log("subject: " + subject);
        console.log("fee: " + fee);
        if (scoreLabes.includes(label)) {
            if (grade == "" && classroom != "" && subject == "") {
                StatisticService.getStaticCommentPupilByClassId(classroom, label)
                    .then((response) => {
                        const dataSources = response.statisticPupils.map((item, index) => {
                            return {
                                key: index + 1,
                                id: item.pupil_id._id,
                                name: item.pupil_id.pupil_name,
                                date: item.pupil_id.pupil_dateofbirth,
                                gender: item.pupil_id.pupil_gender
                            };
                        });
                        setLabelTitleListRs(label);
                        setStudents(dataSources);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (grade == "" && classroom != "" && subject != "") {
                StatisticService.getScorePupilByClassSubjectId(classroom, subject, label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade != "" && classroom == "" && subject == "") {
                StatisticService.getCommentPupilByGradeId(grade, label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade != "" && classroom == "" && subject != "") {
                StatisticService.getCommentPupilByGradeSubjectId(grade, subject,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            setDetailState(true);

        } else if (feeLabes.includes(label)) {
            if (grade == "" && classroom != "" && fee != "") {
                StatisticService.getFeePupilByFeeCategoryAndClassId(fee, classroom,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade == "" && classroom != "" && fee == "") {
                StatisticService.getFeePupilByClassId(classroom,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade != "" && classroom == "" && fee != "") {
                StatisticService.getFeePupilByFeeCategoryAndGradeId(fee, grade,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade != "" && classroom == "" && fee == "") {
                StatisticService.getFeePupilByGradeId(grade,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade == "" && classroom == "" && fee != "") {
                StatisticService.getFeePupilByFeeCategoryId(fee,label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if (grade == "" && classroom == "" && fee == "") {
                StatisticService.getFeePupil(label)
                .then((response) => {
                    const dataSources = response.statisticPupils.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.pupil_id._id,
                            name: item.pupil_id.pupil_name,
                            date: item.pupil_id.pupil_dateofbirth,
                            gender: item.pupil_id.pupil_gender
                        };
                    });
                    setLabelTitleListRs(label);
                    setStudents(dataSources);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            setDetailState(true);
        }

    }

    const Statistics = () => {
        return (
            <div className="father-chart">
                <div className="chart">
                    <Doughnut
                        ref={chartRef}
                        options={option}
                        data={dataScore}
                        onClick={onClick}
                    />
                </div>
                {detailState ? <DetailView /> : null}
            </div>
        );
    };

    const handleInputCustom = () => {
        setStudents([]);
        setDetailState(false);
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
                setSubject("");
                setGrade("");
                setClass(dropValueClass.value);
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of all subjects of class " + dropValueClass.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value != "0" && dropValueSubject.value != "0") {
            StatisticService.getScoreByClassSubjectId(dropValueClass.value, dropValueSubject.value).then((response) => {
                setGrade("");
                setClass(dropValueClass.value)
                setSubject(dropValueSubject.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of " + dropValueSubject.label + " of class " + dropValueClass.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value == "0" && dropValueSubject.value == "0") {
            StatisticService.getCommentByGradeId(dropValueGrade.value).then((response) => {
                setClass("")
                setSubject("")
                setGrade(dropValueGrade.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of all subjects of grade " + dropValueGrade.label)
            })
        }
        else if (dropValueGrade && dropValueClass.value == "0" && dropValueSubject.value != "0") {
            StatisticService.getCommentByGradeSubjectId(dropValueGrade.value, dropValueSubject.value).then((response) => {
                setClass("")
                setGrade(dropValueGrade.value)
                setSubject(dropValueSubject.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical results of " + dropValueSubject.label + " of grade " + dropValueGrade.label)
            })
        }
        setAddState(false)
    }

    const handleShowFee = (dropValueGrade, dropValueClass, dropValueFee) => {
        if (dropValueGrade.value && dropValueClass.value != "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryAndClassId(dropValueFee.value, dropValueClass.value).then((response) => {
                console.log('1');
                setGrade("")
                setSubject("")
                setFee(dropValueFee.value)
                setClass(dropValueClass.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status: " + dropValueFee.label + " of class " + dropValueClass.label)
            })
        }
        if (dropValueGrade.value && dropValueClass.value != "0" && dropValueFee.value == "0") {
            StatisticService.getFeeByClassId(dropValueClass.value).then((response) => {
                console.log('2');
                setGrade("")
                setFee("")
                setSubject("")
                setClass(dropValueClass.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status of class:" + dropValueClass.label)
            })
        }
        if (dropValueGrade.value != "0" && dropValueClass.value == "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryAndGradeId(dropValueFee.value, dropValueGrade.value).then((response) => {
                console.log('3');
                setClass("")
                setSubject("")
                setGrade(dropValueGrade.value)
                setFee(dropValueFee.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status: " + dropValueFee.label + " of grade " + dropValueGrade.label)
            })
        }
        if (dropValueGrade.value != "0" && dropValueClass.value == "0" && dropValueFee.value == "0") {
            StatisticService.getFeeByGradeId(dropValueGrade.value).then((response) => {
                console.log('4');
                setClass("")
                setSubject("")
                setFee("")
                setGrade(dropValueGrade.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical fee status of grade:" + dropValueGrade.label)
            })
        }
        if (dropValueGrade.value == "0" && dropValueClass.value == "0" && dropValueFee.value != "0") {
            StatisticService.getFeeByFeeCategoryId(dropValueFee.value).then((response) => {
                console.log('5');
                setClass("")
                setSubject("")
                setFee("")
                setGrade("")
                setFee(dropValueFee.value)
                setLabel(Object.keys(response))
                setData(Object.values(response))
                setLegend("Statistical status of fee:" + dropValueFee.label)
            })
        }
        if (dropValueGrade.value == "0" && dropValueClass.value == "0" && dropValueFee.value == "0") {
            StatisticService.getFee().then((response) => {
                console.log('6');
                setClass("")
                setSubject("")
                setFee("")
                setGrade("")
                setFee("")
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

    const DetailView = () => {
        const TableClasses = ({ students }) => {
            const classItem = students.map((item) => (
                <tr key={item.key}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.gender ? "Male" : "Female"}</td>
                </tr>
            ));

            let headerClass;
            if (!headerClass) {
                headerClass = (
                    <tr>
                        <th>Name</th>
                        <th>DateOfBirth</th>
                        <th>Gender</th>
                    </tr>
                );
            }
            return (
                <table id="table">
                    <thead>{headerClass}</thead>
                    <tbody>{classItem}</tbody>
                </table>
            );
        };

        return (
            <div className="show-student-form">
                <header>
                    <div>
                        <h3>
                            List Result {legend} ({labelTitleListRs})
                        </h3>
                    </div>
                </header>
                <div className="table-content">
                    <TableClasses students={students} />
                </div>
            </div>
        );
    };


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