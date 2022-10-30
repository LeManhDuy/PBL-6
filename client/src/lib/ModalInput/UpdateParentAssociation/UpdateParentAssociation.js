import React, { useState, useEffect } from "react";
import "./UpdateParentAssociation.css";
import Logo from "../../../assets/image/Logo.png";
import AccountService from "../../../config/service/AccountService";

const UpdateParentAssociation = (props) => {
    const [allValuesParents, setAllValuesParents] = useState({
        name: "",
        username: "",
        dateOfBirth: `${date.split("/")[2]}-${date.split("/")[0] < 10
            ? "0" + date.split("/")[0]
            : date.split("/")[0]
            }-${date.split("/")[1] < 10
                ? "0" + date.split("/")[1]
                : date.split("/")[1]
            }`,
        email: "",
        gender: null,
        phone: "",
        img: null,
        address: "",
        job: "",
        relationship: "",
        association: null,
        jobAddress: "",
    });

    // Set default Avatar
    const [avatar, setAvatar] = useState(Logo);

    useEffect(() => {
        AccountService.getAccountsParentsById(props.AccountId).then(
            (res) => {
                !!res.getParentInfor[0].person_id.person_image
                    ? setAvatar(
                        res.getParentInfor[0].person_id.person_image
                    )
                    : setAvatar(Logo);
                setAllValuesParents({
                    name: res.getParentInfor[0].person_id.person_fullname,
                    username:
                        res.getParentInfor[0].person_id.account_id
                            .account_username,
                    dateOfBirth:
                        res.getParentInfor[0].person_id.person_dateofbirth.split(
                            "T"
                        )[0],
                    email: res.getParentInfor[0].person_id.person_email,
                    gender: `${res.getParentInfor[0].person_id.person_gender}`,
                    phone: res.getParentInfor[0].person_id
                        .person_phonenumber,
                    address: res.getParentInfor[0].person_id.person_address,
                    job: res.getParentInfor[0].parent_job,
                    relationship: res.getParentInfor[0].parent_relationship,
                    association: `${res.getParentInfor[0].is_in_association}`,
                    jobAddress: res.getParentInfor[0].parent_job_address,
                });
            }
        );
    }, []);


}

