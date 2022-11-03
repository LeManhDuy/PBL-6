import React, { useEffect, useState } from "react";
import "./FormAddNotificationParents.css";
import NotificationService from "../../../../config/service/NotificationService";
import StudentService from "../../../../config/service/StudentService";
import Select from "react-select";

const FormAddNotificationParents = (props) => {
    const [privateNotification, setPrivateNotification] = useState({
        title: "",
        content: "",
        parent: JSON.parse(localStorage.getItem("@Login")).AccountId,
        teacher: "",
        sender: true,
    });

    const [options, setOptions] = useState([]);
    const [dropValue, setDropValue] = useState("");

    useEffect(() => {
        if (props.isUpdate) {
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

    const getStudents = async () => {
        await StudentService.getPupilByParentId(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                const dataSources = response.getPupilInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,
                            name: item.pupil_name,
                            class: item.class_id
                                ? item.class_id.class_name
                                : "Empty",
                            teacherId: item.class_id
                                ? item.class_id.homeroom_teacher_id._id
                                : null,
                            teacher: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_fullname
                                : "Empty",
                            teacher_phone: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_phonenumber
                                : "Empty",
                            value: item._id,
                            label: item.class_id
                                ? item.class_id.homeroom_teacher_id.person_id
                                      .person_fullname
                                : null,
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.name > b.name ? 1 : -1
                );
                setOptions(dataSourcesSorted);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clickSave = (e) => {
        e.preventDefault();
        if (props.isCreate || props.isUpdate) {
            props.handleConfirmAddAccount(privateNotification, dropValue);
        }
    };

    const handleChange = (event) => {
        console.log(event.teacherId);
        setDropValue(event);
        setPrivateNotification({
            ...privateNotification,
            teacher: event.teacherId,
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
                        placeholder="Name"
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
        <div className="main-formAddNotification">{AddPrivateNotification}</div>
    );
};

export default FormAddNotificationParents;
