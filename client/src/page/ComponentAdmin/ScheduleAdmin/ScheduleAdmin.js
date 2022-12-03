import React, { useEffect, useState } from "react";
import "./ScheduleAdmin.css";
import ScheduleService from "../../../config/service/ScheduleService";
import ClassService from "../../../config/service/ClassService";
import PeriodService from "../../../config/service/PeriodService";
import AddSchedule from "../../../lib/ModalInput/AddSchedule/AddSchedule";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import Select from "react-select";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import AddPeriod from "../../../lib/ModalInput/AddPeriod/AddPeriod";
import UpdatePeriod from "../../../lib/ModalInput/UpdatePeriod/UpdatePeriod";
import Loading from "../../../lib/Loading/Loading";

const ScheduleAdmin = () => {
    const [state, setState] = useState(false);
    const [allSchedule, setAllSchedule] = useState([]);
    const [classes, setClasses] = useState();
    const [dropValueClass, setDropValueClass] = useState({
        value: 0,
        label: 0,
    });
    const [tableContent, setTableContent] = useState({
        key: "",
        id: "",
        class_id: "",
        class_name: "",
        periods: "",
    });
    const [addScheduleState, setAddScheduleState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [addPeriodState, setAddPeriodState] = useState(false);
    const [updatePeriodState, setUpdatePeriodState] = useState(false);
    const [targetDate, setTargetDate] = useState();
    const [targetNum, setTargetNum] = useState();
    const [targetPeriod, setTargetPeriod] = useState();
    const [message, setMessage] = useState("");

    useEffect(() => {
        getSchedule();
        getClass();
    }, [state]);

    const getSchedule = () => {
        setIsLoading(true);
        ScheduleService.getSchedule()
            .then((response) => {
                const dataSources = response.schedules.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item.schedule._id,
                        class_id: item.schedule.class_id._id,
                        class_name: item.schedule.class_id.class_name,
                        periods: item.periods,
                    };
                });
                // console.log(dataSources)
                setAllSchedule(dataSources);
                setTableContent(dataSources[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getClass = () => {
        ClassService.getClass()
            .then((response) => {
                const dataSources = response.allClass.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        class_name: item.class_name ? item.class_name : "Empty",
                        grade_name: item.grade_id
                            ? item.grade_id.grade_name
                            : "Empty",
                        value: item._id,
                        label: item.class_name,
                    };
                });

                setClasses(dataSources);
                setDropValueClass(dataSources[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleAddUpdatePeriod = (e) => {
        setErrorMessage("");
        console.log(
            e.target.textContent + "-" + e.target.id + "-" + e.target.name
        );
        setTargetDate(e.target.name.split("-")[0]);
        setTargetNum(e.target.name.split("-")[1]);
        if (e.target.textContent === "+") {
            setAddPeriodState(true);
        } else {
            setTargetPeriod(e.target.id);
            setUpdatePeriodState(true);
        }
    };
    const handleConfirmAddPeriod = (subject_teacher_id) => {
        const schedule_id = allSchedule.find(
            (x) => x.class_id === dropValueClass.value
        ).id;

        PeriodService.addPeriod({
            period_date: targetDate,
            period_number: targetNum,
            schedule_id: schedule_id,
            subject_teacher_id: subject_teacher_id,
        }).then((res) => {
            console.log(res);
            if (res.success) {
                setErrorServer(false);
                setState(!state);
                setIsLoading(false);
                setAddPeriodState(false);
            } else {
                setErrorServer(true);
                setIsLoading(false);
            }
        });
    };
    const PeriodCell = ({ date, handleClick, period, pnumber }) => {
        if (period) {
            const p = period.find((x) => x.period_date === date);
            return (
                <button
                    type="button"
                    className="btn btn-light"
                    style={{ width: "50%" }}
                    onClick={handleClick}
                    id={p ? p._id : ""}
                    name={date + "-" + pnumber}
                >
                    {p ? p.subject_teacher_id.subject_id.subject_name : "+"}
                </button>
            );
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
                                        handleClick={handleAddUpdatePeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Tue"}
                                        handleClick={handleAddUpdatePeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Wed"}
                                        handleClick={handleAddUpdatePeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Thu"}
                                        handleClick={handleAddUpdatePeriod}
                                        period={period}
                                    />
                                </td>
                                <td>
                                    <PeriodCell
                                        pnumber={index + 1}
                                        date={"Fri"}
                                        handleClick={handleAddUpdatePeriod}
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

    const handleChangeClass = (event) => {
        // console.log(event.value+ '---'+dropValueTeacher.value)
        setDropValueClass(event);
        const filtered = allSchedule.find((x) => x.class_id === event.value);
        setTableContent(filtered);
        setDeleteMessage(false);
    };

    const handleAddSchedule = () => {
        setAddScheduleState(true);
        setErrorServer(false);
        setErrorMessage("");
        setDeleteMessage(false);
    };

    const handleDelete = () => {
        let deleting_schedule = allSchedule.find(
            (x) => x.class_id === dropValueClass.value
        );
        if (deleting_schedule) {
            // console.log(schedule_tode)
            ScheduleService.DeleteScheduleById(deleting_schedule.id).then(
                (res) => {
                    if (res.success) {
                        setState(!state);
                        setDeleteMessage(!deleteMessage);
                    }
                }
            );
        }
        setIsDelete(false);
    };

    const handleDeleteSchedule = (e) => {
        setIsDelete(true);
        setErrorMessage("");
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
        setErrorMessage("");
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={
                        `Do you want to delete this schedule for this class: ` +
                        dropValueClass.label
                    }
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const handleConfirmAddSchedule = (props) => {
        // console.log(props.scheduleFile)
        setIsLoading(true);
        let scheduleFile = props.scheduleFile;
        // console.log(scheduleFile)
        setAddScheduleState(false);
        ScheduleService.AddScheduleByFile(scheduleFile).then((res) => {
            console.log(res);
            if (res.success) {
                setErrorServer(false);
                setState(!state);
                setIsLoading(false);
                setErrorMessage("");
            } else {
                setErrorMessage(res.message);
                setErrorServer(true);
                setIsLoading(false);
            }
        });
    };

    const handleConfirmUpdatePeriod = (props) => {
        console.log(props);
        PeriodService.updatePeriod(props.id, props.params).then((res) => {
            console.log(res);
            if (res.success) {
                setErrorServer(false);
                setState(!state);
                setIsLoading(false);
                setUpdatePeriodState(false);
            } else {
                setErrorServer(true);
                setIsLoading(false);
                setUpdatePeriodState(false);
            }
        });
    };

    const handleConfirmDeletePeriod = (props) => {
        console.log(props);
        PeriodService.deletePeriod(props).then((res) => {
            console.log(res);
            if (res.success) {
                setErrorServer(false);
                setState(!state);
                setIsLoading(false);
                setUpdatePeriodState(false);
            } else {
                setErrorServer(true);
                setIsLoading(false);
                setUpdatePeriodState(false);
            }
        });
    };

    const TableSchedule = ({ isLoading, tableContent }) => {
        // console.log(isLoading)

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
        setAddPeriodState(false);
        setUpdatePeriodState(false);
        setAddScheduleState(false);
        setErrorServer(false);
        setErrorMessage("");
    };

    const DivAddSchedule = (
        <ModalInput
            show={addScheduleState}
            handleInputCustom={handleInputCustom}
            content={
                <AddSchedule
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddSchedule={handleConfirmAddSchedule}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivAddPeriod = (
        <ModalInput
            show={addPeriodState}
            handleInputCustom={handleInputCustom}
            content={
                <AddPeriod
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddPeriod={handleConfirmAddPeriod}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivUpdatePeriod = (
        <ModalInput
            show={updatePeriodState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdatePeriod
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdatePeriod={handleConfirmUpdatePeriod}
                    handleConfirmDeletePeriod={handleConfirmDeletePeriod}
                    period_id={targetPeriod}
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
                    <h3>Manage Schedule</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddSchedule}>
                        Add Schedule
                    </button>
                    <button className="btn-dark" onClick={handleDeleteSchedule}>
                        Delete Schedule
                    </button>
                    <label style={{ width: 300 }}>
                        <Select
                            className="dropdown-class"
                            classNamePrefix="select"
                            options={classes}
                            // isMulti
                            value={dropValueClass}
                            onChange={handleChangeClass}
                            maxMenuHeight={200}
                            isSearchable={true}
                        />
                    </label>
                </div>
            </header>
            {errorMessage !== "" ? (
                <label style={{ color: "red" }}>{errorMessage}</label>
            ) : null}
            {deleteMessage ? (
                <label style={{ color: "red" }}>Delete Successfully!</label>
            ) : null}
            <div className="table-content">
                <TableSchedule
                    isLoading={isLoading}
                    tableContent={tableContent}
                />
            </div>
            {addScheduleState ? DivAddSchedule : null}
            {addPeriodState ? DivAddPeriod : null}
            {updatePeriodState ? DivUpdatePeriod : null}
            {isDelete ? ConfirmDelete : null}
            <footer>
                <hr></hr>
            </footer>
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ScheduleAdmin;
