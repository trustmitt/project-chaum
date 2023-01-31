import { useState, useCallback } from "react";

import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

import "../styles/style.css";

function ModalRecord(props: any) {
    let [showModal, setShowModal] = [props.showModal, props.setShowModal];
    let [slideValue, setSlideValue] = useState("500");

    const openScroll = useCallback(() => {
        document.body.style.removeProperty("overflow");
    }, []);

    const closeModal = () => {
        openScroll();
        setShowModal(false);
    };

    const handleOninput = () => {
        const sliderValue = document.querySelector("#sliderNum") as HTMLElement;
        const inputSlider = document.querySelector("#input-value") as HTMLInputElement;
        const resultValue = document.querySelector("#result-value") as HTMLElement;

        let value = inputSlider.value;
        sliderValue.classList.add("show");
        sliderValue.textContent = value;
        resultValue.innerText = value;
        sliderValue.style.left = parseInt(value) / 48 + "%";
    };

    const handleOnblur = () => {
        const sliderValue = document.querySelector("#sliderNum") as HTMLElement;
        sliderValue.classList.remove("show");
    };

    const uid = localStorage.getItem("uid");
    const userInputRef = doc(db, "user", uid);

    const updateUserDoc = async () => {
        const currentValue = document.querySelector(".today-report-water p").textContent;
        await updateDoc(userInputRef, {
            drink: parseInt(currentValue) + parseInt(slideValue),
        });
        window.location.reload();
        openScroll();
        setShowModal(false);
    };

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}>
                    ✖
                </button>
                <div className="modal-title">얼마나 마셨나요?</div>
                <div className="range">
                    <div className="sliderValue">
                        <span id="sliderNum">500</span>
                    </div>
                    <div className="field">
                        <div className="value left">0mL</div>
                        <input id="input-value" type="range" min="0" max="2000" defaultValue="500" onInput={handleOninput} onBlur={handleOnblur} onChange={(e) => setSlideValue(e.target.value)} />
                        <div className="value right">2000mL</div>
                    </div>
                </div>
                <div className="result-modal">
                    <div id="result-value">500</div>
                    mL를 기록할까요?
                    <button className="modal-result-btn" onClick={updateUserDoc}>
                        기록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalRecord;
