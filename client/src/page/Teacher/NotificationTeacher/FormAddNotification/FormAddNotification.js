import React, { useEffect, useState } from "react";
import "./FormAddNotification.css";
import NotificationService from "../../../../config/service/NotificationService";
import StudentService from "../../../../config/service/StudentService";
import Select from "react-select";

const FormAddNotification = (props) => {
    const [publicNotification, setPublicNotification] = useState({
        title: "",
        content: "",
        date: new Date(),
    });

    const [privateNotification, setPrivateNotification] = useState({
        title: "",
        content: "",
        parent: "",
        teacher: JSON.parse(localStorage.getItem("@Login")).AccountId,
        sender: true,
    });

    const [options, setOptions] = useState([]);
    const [dropValue, setDropValue] = useState("");

    useEffect(() => {
        if (props.isPublic && props.isUpdate) {
            NotificationService.getNotificationsById(props.id).then((res) => {
                setPublicNotification({
                    title: res.publicNotification.title,
                    content: res.publicNotification.content,
                });
            });
        } else if (!props.isPublic && props.isUpdate) {
            NotificationService.getPrivateNotificationsById(props.id).then(
                (res) => {
                    setPrivateNotification({
                        title: res.privateNotification.title,
                        content: res.privateNotification.content,
                        parent: res.privateNotification.parent_id,
                        teacher: res.privateNotification.teacher_id,
                    });
                }
            );
        }
        getStudents();
    }, [dropValue]);

    const getStudents = () => {
        StudentService.getStudentByTeacherIdAtTeacherRole(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                let dataSources = response.getPupilsInfor.map((item, index) => {
                    return {
                        key: index + 1,
                        id: item._id,
                        student_name: item.pupil_name,
                        parentsId: item.parent_id ? item.parent_id._id : "",
                        parent_name: item.parent_id
                            ? item.parent_id.person_id.person_fullname
                            : "Empty",
                        parent_phone: item.parent_id
                            ? item.parent_id.person_id.person_phonenumber
                            : "Empty",
                        value: item._id,
                        label:
                            item.parent_id.person_id.person_fullname +
                            " - " +
                            item.parent_id.person_id.person_phonenumber,
                    };
                });
                dataSources = dataSources.reduce((acc, current) => {
                    const x = acc.find(
                        (item) => item.parentsId === current.parentsId
                    );
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
                if (dataSources.length > 0 && !dropValue) {
                    setDropValue(dataSources[0].parentsId);
                }
                setOptions(dataSources);
            })
            .catch((error) => console.log("error", error));
    };

    const changeHandler = (e) => {
        setPublicNotification({
            ...publicNotification,
            [e.target.name]: e.target.value,
        });
    };

    const clickSave = (e) => {
        e.preventDefault();
        if (
            (props.isCreate && props.isPublic) ||
            (props.isUpdate && props.isPublic)
        ) {
            props.handleConfirmAddAccount(publicNotification, dropValue);
        } else if (
            (props.isCreate && !props.isPublic) ||
            (props.isUpdate && !props.isPublic)
        ) {
            props.handleConfirmAddAccount(privateNotification, dropValue);
        }
    };

    const AddPublicNotification = (
        <div className="add-public-notification">
            {props.errorService ? (
                <p className="error">You have entered missing information</p>
            ) : null}
            {props.isPublic && props.isCreate ? (
                <h4>Add Public Notification</h4>
            ) : (
                <h4>Update Public Notification</h4>
            )}
            <div className="content-formNotification">
                <input
                    className="input-text-area"
                    value={publicNotification.title}
                    id="input-password-confirm"
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={changeHandler}
                />
                <textarea
                    className="content-text-area"
                    name="content"
                    value={publicNotification.content}
                    onChange={changeHandler}
                    placeholder="Enter Content"
                />
            </div>
            <div className="btn-handle-change">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );

    const Dropdown = ({ value, options, onChange }) => {
        return (
            <label>
                Parent
                <select
                    className="dropdown-account"
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option.key} value={option.parentsId}>
                            {`${option.parent_name} - ${option.parent_phone}`}
                        </option>
                    ))}
                </select>
            </label>
        );
    };

    const handleChange = (event) => {
        setDropValue(event);
        setPrivateNotification({
            ...privateNotification,
            parent: event.parentsId,
        });
    };

    const changeHandlerPrivate = (e) => {
        setPrivateNotification({
            ...privateNotification,
            [e.target.name]: e.target.value,
        });
        // e.target.focus;
    };

    const AddPrivateNotification = (
        <div className="add-public-notification">
            {props.errorService || options.length === 0 ? (
                <p className="error">
                    You entered missing information or the parent does not exist
                </p>
            ) : null}
            {!props.isPublic && props.isCreate ? (
                <h4>Add Private Notification</h4>
            ) : (
                <h4>Update Private Notification</h4>
            )}
            <div className="content-formNotification">
                {props.isCreate ? (
                    <Select
                        className="dropdown"
                        value={dropValue}
                        options={options}
                        onChange={handleChange}
                        placeholder="Name - Phone Number"
                        maxMenuHeight={150}
                    />
                ) : // <Dropdown
                //     options={options}
                //     value={dropValue}
                //     onChange={handleChange}
                // />
                null}
                <input
                    className="input-text-area"
                    value={privateNotification.title}
                    id="input-password-confirm"
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={changeHandlerPrivate}
                />
                <textarea
                    className="content-text-area"
                    name="content"
                    value={privateNotification.content}
                    onChange={changeHandlerPrivate}
                    placeholder="Enter Content"
                />
            </div>
            <div className="btn-handle-change">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                >
                    Cancel
                </button>
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Save
                </button>
            </div>
        </div>
    );

    return (
        <div className="main-formAddNotification">
            {props.isPublic ? AddPublicNotification : AddPrivateNotification}
        </div>
    );
};

export default FormAddNotification;
