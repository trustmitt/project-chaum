import "../assets/css/style.css";
import { Link } from "react-router-dom";

const HeaderBar = () => {
    return (
        <div className="top-bar">
            <div className="top-title">
                <Link to="/home">
                    <img className="logo-img" alt="채움" src="img/main-img.png" />
                </Link>
                <div className="title-text">채움</div>
            </div>
            <Link to="/setup">
                <img className="set-up-btn" alt="설정" src="img/settings.png" />
            </Link>
        </div>
    );
};

export default HeaderBar;
