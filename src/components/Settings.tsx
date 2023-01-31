import { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, updateDoc, getDocs, query, collection, where } from "firebase/firestore";

const Settings = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState("");
    const [userGoal, setUserGoal] = useState(0);

    const logoutEvent = () => {
        localStorage.clear();
        document.location.href = "/";
    };

    const secessionEvent = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            await deleteUser(user);
            alert("안녕히 가세요 😢");
            localStorage.clear();
            document.location.href = "/";
        } catch ({ code, message }) {
            alert("다시 시도해 보세요.");
        }
    };

    const uid = localStorage.getItem("uid");
    const userInputRef = doc(db, "user", uid);

    const q = query(collection(db, "user"), where("id", "==", uid));

    useEffect(() => {
        const querySnapshot = async () => {
            const data = await getDocs(q);
            setUsers(
                data.docs.map((doc) => ({
                    ...doc.data(),
                }))
            );
            console.log(data);
        };
        querySnapshot();
    }, []);

    const updateUserName = async () => {
        await updateDoc(userInputRef, {
            name: userName,
        });
        document.location.href = "/";
    };

    const updateUserGoal = async () => {
        await updateDoc(userInputRef, {
            goal: userGoal,
        });
        document.location.href = "/";
    };

    return (
        <>
            <div className="set-up-user-info">
                <div className="set-up-info-name">
                    <div className="info-name-title">닉네임을 변경합니다.</div>
                    <input type="text" placeholder="닉네임을 입력하세요." onChange={(e) => setUserName(e.target.value)} />
                    <button onClick={updateUserName}>변경</button>
                </div>
                <div className="set-up-info-goal">
                    <div className="info-goal-title">하루 물 마시기 목표를 설정합니다.</div>
                    <input type="number" placeholder="단위는 mL입니다." onChange={(e) => setUserGoal(parseInt(e.target.value))} />
                    <button onClick={updateUserGoal}>설정</button>
                </div>
            </div>

            <div className="logout-container">
                <div className="logout-inner">채움에서 로그아웃하시겠습니까?</div>
                <button className="logout-btn" onClick={logoutEvent}>
                    로그아웃
                </button>
            </div>

            <div className="drop-out-container">
                <div className="drop-out-inner">회원 탈퇴 신청을 하시겠습니까?</div>
                <button className="drop-out-btn" onClick={secessionEvent}>
                    계정 삭제
                </button>
            </div>
        </>
    );
};

export default Settings;
