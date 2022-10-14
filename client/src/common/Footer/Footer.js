import React from "react";
import "./Footer.css";
import {
    faLocationDot,
    faPhone,
    faEnvelope,
    faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagramSquare,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="contact">
                    <p>Contact us</p>
                    <div className="contact-item">
                        <FontAwesomeIcon
                            className="icon"
                            icon={faLocationDot}
                        />
                        <p>54 Nguyen Luong Bang</p>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon className="icon" icon={faPhone} />
                        <p>023244574954</p>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon className="icon" icon={faEnvelope} />
                        <p>blueschool@gmail.com</p>
                    </div>
                </div>
                <div className="copyright-info">
                    <div>
                        <p>Copyright</p>
                        <FontAwesomeIcon
                            className="icon-c"
                            icon={faCopyright}
                        />
                        <p>2022, Blue Team</p>
                    </div>

                    <div className="info">
                        <FontAwesomeIcon
                            className="icon-info facebook"
                            icon={faFacebook}
                        />
                        <FontAwesomeIcon
                            className="icon-info instagram"
                            icon={faInstagramSquare}
                        />
                        <FontAwesomeIcon
                            className="icon-info youtube"
                            icon={faYoutube}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
