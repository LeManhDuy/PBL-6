import React, { useEffect, useState } from "react";
import "./ScheduleTeacher.css";
import ScheduleService from "../../../config/service/ScheduleService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ShowPeriod from "../../../lib/ModalInput/ShowPeriod/ShowPeriod";
import Loading from "../../../lib/Loading/Loading";

const ScheduleTeacher = () => {
    const [state, setState] = useState(false);
    const [tableContent, setTableContent] = useState({
        key: "",
        id: "",
        class_id: "",
        class_name: "",
        periods: "",
    });
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPeriodState, setShowPeriodState] = useState(false);
    const [targetPeriod, setTargetPeriod] = useState();

    useEffect(() => {
        getScheduleByHomeRoomTeacher();
    }, [state]);

    const getScheduleByHomeRoomTeacher = () => {
        setIsLoading(true);
        const personID = JSON.parse(localStorage.getItem("@Login")).AccountId;
        ScheduleService.getScheduleByHomeRoomTeacher(personID)
            .then((response) => {
                if (!response.success) {
                    setIsLoading(false);
                    setTableContent(null);
                    return;
                }
                const dataSources = response.schedules.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item.schedule._id,
                        class_id: item.schedule.class_id._id,
                        class_name: item.schedule.class_id.class_name,
                        periods: item.periods,
                    };
                });
                setTableContent(dataSources[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleShowPeriod = (e) => {
        setErrorMessage("");
        setTargetPeriod(e.target.id);
        setShowPeriodState(true);
    };

    const PeriodCell = ({ date, handleClick, period, pnumber }) => {
        if (period) {
            const p = period.find((x) => x.period_date === date);
            if (!p) {
                return (
                    <button
                        disabled
                        type="button"
                        className="btn btn-light"
                        style={{ width: "50%" }}
                    >
                        X
                    </button>
                );
            } else {
                return (
                    <button
                        type="button"
                        className="btn btn-light"
                        style={{ width: "50%" }}
                        onClick={handleClick}
                        id={p ? p._id : ""}
                        name={date + "-" + pnumber}
                    >
                        {p.subject_teacher_id.subject_id.subject_name}
                    </button>
                );
            }
        }
    };
    const ScheduleItem = ({ hidden, tableContent }) => {
        if (tableContent) {
            let period_number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const content_by_period = [];
            for (let n of period_number) {
                let filtered = tableContent.filter((x) => {
                    return x.period_number === n;
                });
                content_by_period.push(filtered);
            }
            return (
                <tbody hidden={hidden}>
                    {content_by_period.map((period, index) => {
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Mon"}
                                        handleClick={handleShowPeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Tue"}
                                        handleClick={handleShowPeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Wed"}
                                        handleClick={handleShowPeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Thu"}
                                        handleClick={handleShowPeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Fri"}
                                        handleClick={handleShowPeriod}
                                        period={period}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            );
        }
    };

    const TableSchedule = ({ isLoading, tableContent }) => {
        const headerSchedule = (
            <tr>
                <th></th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
            </tr>
        );
        if (tableContent) {
            return (
                <div>
                    <h4 hidden={!isLoading} style={{ color: "red" }}>
                        Loading...
                    </h4>
                    <table id="table">
                        <thead>{headerSchedule}</thead>
                        <ScheduleItem
                            hidden={isLoading}
                            tableContent={tableContent.periods}
                        />
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <h4 hidden={!isLoading} style={{ color: "red" }}>
                        Loading...
                    </h4>
                    <label hidden={isLoading} className={"error error-show"}>
                        No Schedule set for this class!
                    </label>
                    <table id="table">
                        <thead>{headerSchedule}</thead>
                    </table>
                </div>
            );
        }
    };

    const handleInputCustom = () => {
        setShowPeriodState(false);
        setErrorServer(false);
        setErrorMessage("");
    };

    const DivShowPeriod = (
        <ModalInput
            show={showPeriodState}
            handleInputCustom={handleInputCustom}
            content={
                <ShowPeriod
                    handleInputCustom={handleInputCustom}
                    period_id={targetPeriod}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    return (
        <div className="main-teacher-container">
            <header>
                <div>
                    <h3>
                        Show Schedule{" "}
                        {tableContent ? tableContent.class_name : ""}{" "}
                    </h3>
                </div>
            </header>
            {errorMessage !== "" ? (
                <label style={{ color: "red" }}>{errorMessage}</label>
            ) : null}
            <div className="table-content">
                <TableSchedule
                    isLoading={isLoading}
                    tableContent={tableContent}
                />
            </div>
            {showPeriodState ? DivShowPeriod : null}
            <footer>
                <hr></hr>
            </footer>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ScheduleTeacher;
