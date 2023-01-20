import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassWater, faMugHot, faWineBottle } from "@fortawesome/free-solid-svg-icons";

const MainComponent = () => {
    return (
        <>
            <div className="title-container">
                <div className="hello">주경 님, 반갑습니다. 🧙</div>
                <div className="goal-title">
                    오늘의 목표를<span>00%</span>달성했어요!
                </div>
            </div>
            <div className="water-container">
                <div className="water-inner">
                    <div className="circle">
                        <div className="wave"></div>
                    </div>
                </div>
                <div className="water-inner-btn-area">
                    <button className="water-inner-btn">
                        <FontAwesomeIcon icon={faGlassWater} className="button-icon water" />
                    </button>
                    <button className="water-inner-btn">
                        <FontAwesomeIcon icon={faMugHot} className="button-icon mug" />
                    </button>
                    <button className="water-inner-btn">
                        <FontAwesomeIcon icon={faWineBottle} className="button-icon bottle" />
                    </button>
                </div>
            </div>
            <div className="goal-bottom-con">
                <div className="today-report">
                    <div className="today-report-title">오늘의 섭취량</div>
                    <div className="today-report-water">00mL</div>
                </div>
                <div className="more-report">
                    <div className="more-report-title">남은 섭취량</div>
                    <div className="more-report-water">00mL</div>
                </div>
            </div>
        </>
    );
};

export default MainComponent;
