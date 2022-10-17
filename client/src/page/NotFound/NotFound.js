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
            <div className="common">
                <div className="img_not_found">
                    <img src={PictureNotFound} alt="picturenotfound" />
                </div>
                <div className="body_not_found">
                    <img src={Picture404} alt="404" />
                    <h2>Hmm...</h2>
                    <p>
                        Look like the page you were looking for is no longer
                        here. 😪
                    </p>
                    <button className="btnBack" onClick={HandleBackToHome}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
