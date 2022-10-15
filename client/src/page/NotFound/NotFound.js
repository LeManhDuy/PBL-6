import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";
import Picture404 from "../../assets/image/404.png";
import PictureNotFound from "../../assets/image/not_found_page_1.png";

function NotFound() {
    const history = useHistory();
    const HandleBackToHome = () => {
        history.goBack();
    };
    return (
        <div>
            <div class="common">
                <div class="img_not_found">
                    <img src={PictureNotFound} />
                </div>
                <div class="body_not_found">
                    <img src={Picture404} />
                    <h2>Hmm...</h2>
                    <p>
                        Look like the page you were looking for is no longer
                        here. 😪
                    </p>
                    <button class="btnBack" onClick={HandleBackToHome}>
                        <i class="fa-solid fa-arrow-left"></i>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
