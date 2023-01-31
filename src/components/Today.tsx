import { useEffect, useState, useCallback } from "react";

import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

import ModalRecord from "./ModalRecord";

const Today = () => {
    let [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);

    const lockScroll = useCallback(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const openModal = () => {
        lockScroll();
        setShowModal(true);
    };

    const uid = localStorage.getItem("uid");
    const q = query(collection(db, "user"), where("id", "==", uid));

    useEffect(() => {
        handleWaterFill();
    });

    useEffect(() => {
        const querySnapshot = async () => {
            const data = await getDocs(q);
            setUsers(
                data.docs.map((doc) => ({
                    ...doc.data(),
                }))
            );
        };
        querySnapshot();
    }, []);

    const resetWaterFill = async () => {
        await updateDoc(doc(db, "user", uid), { drink: 0 });
        window.location.reload();
    };

    const userName = users.map((value) => value.name)[0];
    const userGoal = users.map((value) => value.goal)[0];
    const userDrink = users.map((value) => value.drink)[0];

    const todayGoal = ((userDrink / userGoal) * 100).toFixed(0);
    const moreDrink = userGoal - userDrink;

    const handleWaterFill = () => {
        const waterGoalSpan = document.querySelector(".goal-title #today-goal-number").textContent;
        const waterFill = 280 - parseInt(waterGoalSpan) * 2.0;
        document.documentElement.style.setProperty("--water-proof", waterFill + "%");
    };

    return (
        <>
            <div className="title-container">
                <div className="hello">{userName !== null ? userName : "채움"} 님,</div>
                <div className="goal-title">
                    오늘의 목표를<span id="today-goal-number">{todayGoal}</span>
                    <span id="percent">%</span> 달성했어요!
                </div>
            </div>
            <div className="water-container">
                <div className="water-inner">
                    <div className="circle" onClick={openModal}>
                        <div className="wave"></div>
                    </div>
                </div>
                <div className="reset-btn-area">
                    <button className="reset-btn" onClick={resetWaterFill}>
                        RESET
                    </button>
                </div>
            </div>
            <div className="goal-bottom-con">
                <div className="today-report">
                    <div className="today-report-title">오늘의 섭취량</div>
                    <div className="today-report-water">
                        <p>{userDrink}</p>mL
                    </div>
                </div>
                <div className="more-report">
                    <div className="more-report-title">남은 섭취량</div>
                    <div className="more-report-water">{moreDrink}mL</div>
                </div>
            </div>
            {showModal && <ModalRecord setShowModal={setShowModal} />}
        </>
    );
};

export default Today;
