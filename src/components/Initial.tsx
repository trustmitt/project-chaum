import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

import "../styles/style.css";

const Initial = () => {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState(2000);

    const uid = localStorage.getItem("uid");
    const createUser = async () => {
        if (name !== "") await setDoc(doc(db, "user", uid), { id: uid, name: name, goal: goal, drink: 0 });
    };

    return (
        <div className="init-set-container">
            <div className="init-hello-inner">
                <div className="init-hello">
                    <h2>처음 오셨군요 XD</h2>
                </div>
                <div className="init-hello">
                    <h3>약간의 추가 정보가 필요해요.</h3>
                </div>
            </div>
            <form className="init-form">
                <div>
                    <label htmlFor="init-set-name">
                        <div>이름을 알려 주세요!</div>
                    </label>
                    <input
                        type="text"
                        className="init-set-name"
                        required
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        minLength={3}
                        maxLength={10}
                        placeholder="3~10글자 입력하세요."
                    />
                </div>
                <div>
                    <label htmlFor="init-set-goal">
                        <div>하루에 물을 얼마나 마실까요?</div>
                        <span className="init-set-goal-desc">입력하지 않으면 2000mL로 자동 설정돼요.</span>
                    </label>
                    <input name="number" className="init-set-goal" required autoComplete="off" onChange={(e) => setGoal(+e.target.value)} placeholder="단위는 mL입니다." />
                </div>
                <button onClick={createUser}>확인</button>
            </form>
        </div>
    );
};

export default Initial;
