import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

import { Link } from "react-router-dom";
import KakaoLogin from "react-kakao-login";

import "../assets/css/style.css";
import styled from "styled-components";

const LoginContainer = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
        });
    }, []);
    console.log(user);

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            document.location.href = "/home";
        } catch (error) {
            console.log("error");
        }
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
    };

    const buttonBlock = {
        border: "none",
        borderRadius: "9px",
        fontSize: "17px",
        width: "120px",
        fontWeight: "600",
        height: "32px",
        cursor: "pointer",
        background: "#f7e600",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        padding: "4px 0px",
    };
    const ButtoninnerText = styled.div`
        margin: 0;
        font-size: 14px;
        color: #3a1d1d;
    `;

    return (
        <div className="container">
            <img className="main-img-con" src="img/main-img.png" alt="채움" />
            <div className="main-text-con">물 마시는 습관 기르기</div>
            <div className="main-text-con-bold">채움에 오신 걸 환영해요 👋</div>
            <div className="login-container">
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder="이메일"
                        className="login-id"
                        onChange={(e) => {
                            setLoginEmail(e.target.value);
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="login-pw"
                        onChange={(e) => {
                            setLoginPassword(e.target.value);
                        }}
                        required
                    />
                    <div className="login-btn-con">
                        <button type="submit" className="login-btn" onClick={login}>
                            로그인
                        </button>
                        <KakaoLogin token="0b55b88f1ec8bd96972b452dc70b030e" onSuccess={console.log} onFail={console.error} onLogout={console.info} style={buttonBlock}>
                            <ButtoninnerText>카카오로 시작</ButtoninnerText>
                        </KakaoLogin>
                    </div>
                </form>
            </div>
            <div className="go-to-sign-up">
                <div className="sign-up-text">채움이 처음이신가요?</div>
                <Link to="/signup">
                    <div className="sign-up-btn">회원가입</div>
                </Link>
            </div>
        </div>
    );
};

export default LoginContainer;
