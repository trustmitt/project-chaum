import { Link } from "react-router-dom";

import logoImg from "../assets/img/main-img.png";
import settingsIcon from "../assets/img/settings.png";

import "../styles/style.css";

const Header = () => {
    return (
        <div className="top-bar">
            <div className="top-title">
                <Link to="/">
                    <img className="logo-img" alt="채움" src={logoImg} />
                    <div className="title-text">채움</div>
                </Link>
            </div>
            <Link to="/settings">
                <img className="set-up-btn" alt="설정" src={settingsIcon} />
            </Link>
        </div>
    );
};

export default Header;
