import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import "../assets/css/style.css";

const SignUpContainer = () => {
    const [registerName, setRegisterName] = useState<string>("");
    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    // const [confirmPassword, setConfirmPassword] = useState<string>("");

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: registerName });
            }
        } catch (error) {
            console.log("error");
        }
    };

    // const onSubmit = () => {
    //     if (registerPassword !== confirmPassword) {
    //         return alert("비밀번호가 일치하지 않습니다.");
    //     }
    // };

    return (
        <>
            <div className="container">
                <img className="main-img-con" src="img/main-img.png" alt="채움" />
                <div className="sign-up-con">
                    <form>
                        <input type="text" placeholder="이름" onChange={(e) => setRegisterName(e.target.value)} required />
                        <input type="email" placeholder="이메일" onChange={(e) => setRegisterEmail(e.target.value)} required />
                        <input type="password" placeholder="비밀번호" onChange={(e) => setRegisterPassword(e.target.value)} required />
                        <button type="submit" onClick={register}>
                            회원가입
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpContainer;
