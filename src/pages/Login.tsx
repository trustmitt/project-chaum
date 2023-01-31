import { useState, useEffect } from "react";
import KakaoLogin from "react-kakao-login";

import { onAuthStateChanged, signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase-config";

import { Link } from "react-router-dom";

import logoImg from "../assets/img/main-img.png";
import "../styles/style.css";
import styled from "styled-components";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const [getUid, setGetUid] = useState("");

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (currentUser: any) => {
            setUser(currentUser);
            setGetUid(currentUser.uid);
        });
    }, []);

    const handleGoogleLogin = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((data) => {
                setUser(data.user);
                console.log(data);
                localStorage.setItem("uid", getUid);
                document.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const login = async () => {
        try {
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            localStorage.setItem("uid", getUid);
            document.location.href = "/";
        } catch (error) {
            console.log("error");
        }
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <img className="main-img-con" src={logoImg} alt="채움" />
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
                        autoComplete="on"
                    />
                    <div className="login-btn-con">
                        <button type="submit" className="login-btn" onClick={login}>
                            로그인
                        </button>
                        <button className="google-login-btn" onClick={handleGoogleLogin}>
                            Google 로그인
                        </button>
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

export default Login;
