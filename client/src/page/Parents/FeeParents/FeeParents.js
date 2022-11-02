import React, { useEffect, useState } from "react";
import FeeService from "../../../config/service/FeeService";
import Logo from "../../../assets/image/Logo.png";
import "./FeeParents.css";


const FeeParents = () => {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        getFee();
    }, []);

    const getFee = async () => {
        await FeeService.getFeeInforByParentId(
            JSON.parse(localStorage.getItem("@Login")).AccountId
        )
            .then((response) => {
                const dataSources = response.getFeeInfor.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item._id,

                            name: item.pupil_id.pupil_name,
                            class: item.pupil_id
                                ? item.pupil_id.class_id
                                    ? item.pupil_id.class_id.class_name
                                    : "Empty"
                                : "Empty",
                            grade: item.pupil_id
                                ? item.pupil_id.class_id
                                    ? item.pupil_id.class_id.grade_id
                                        ? item.pupil_id.class_id.grade_id.grade_name
                                        : "Empty"
                                    : "Empty"
                                : "Empty",
                            image: item.pupil_id ? item.pupil_id.pupil_image : Logo,


                            fee_name: item.fee_category_id
                                ? item.fee_category_id.fee_name
                                : "Empty",
                            fee_amount: item.fee_category_id
                                ? item.fee_category_id.fee_amount
                                : "Empty",
                            fee_status: item.fee_status ? "Paid" : "UnPaid",

                            start_date: new Date(
                                item.start_date
                            ).toLocaleDateString(),
                            end_date: new Date(
                                item.end_date
                            ).toLocaleDateString(),
                            paid_date: item.paid_date ?
                                new Date(item.paid_date).toLocaleDateString()
                                : "Empty",
                        };
                    }
                );
                const dataSourcesSorted = [...dataSources].sort((a, b) => a.name > b.name ? 1 : -1,);
                setFees(dataSourcesSorted);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const FeeInfo = ({ fees }) =>
        fees.map((item) => (
            <div className="student-item">
                <div className="left-student-content">
                    <img src={item.image} alt="studentImage" />
                </div>

                <div className="between-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i className="fas fa-child"></i>
                            <div className="detail-item-content">
                                <h4>Full Name</h4>
                                <p>{item.name}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-people-roof"></i>
                            <div className="detail-item-content">
                                <h4>Class</h4>
                                <p>{`${item.class}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-school"></i>
                            <div className="detail-item-content">
                                <h4>Grade</h4>
                                <p>{`${item.grade}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i class="fa fa-solid fa-magnifying-glass"></i>
                            <div className="detail-item-content">
                                <h4>Fee Name</h4>
                                <p>{`${item.fee_name}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-money-check"></i>
                            <div className="detail-item-content">
                                <h4>Fee Ammount</h4>
                                <p>{`${item.fee_amount}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-solid fa-check-to-slot"></i>
                            <div className="detail-item-content">
                                <h4>Fee Status</h4>
                                <p>{`${item.fee_status}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-student-content">
                    <div className="student-info-parents">
                        <div className="item-content">
                            <i class="fa fa-regular fa-calendar-days"></i>
                            <div className="detail-item-content">
                                <h4>Start Date</h4>
                                <p>{`${item.start_date}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-regular fa-calendar-days"></i>
                            <div className="detail-item-content">
                                <h4>End Date</h4>
                                <p>{`${item.end_date}`}</p>
                            </div>
                        </div>
                        <div className="item-content">
                            <i class="fa fa-regular fa-calendar-days"></i>
                            <div className="detail-item-content">
                                <h4>Paid Date</h4>
                                <p>{`${item.paid_date}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="main-student-container">
            <div className="header-title">
                <h3>FEE MANAGEMENT</h3>
            </div>
            <div className="detail-content">
                <FeeInfo fees={fees} />
            </div>
        </div>
    );
};

export default FeeParents;
