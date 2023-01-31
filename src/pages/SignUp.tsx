import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail, removeWhitespace } from "../utils/regex";

import logoImg from "../assets/img/main-img.png";
import "../styles/style.css";

const SignUp = () => {
    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [disabled, setDisabled] = useState(false);

    const submitRegister = async (e: any) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            return submitBtn();
        } catch (error) {
            alert("error");
        }
    };

    const submitBtn = () => {
        document.location.href = "/";
    };

    const handleEmailChange = (email: string) => {
        const changedEmail = removeWhitespace(email);
        setRegisterEmail(changedEmail);
        setErrorMessage(validateEmail(changedEmail) ? "" : "🙅 이메일을 확인해 주세요.");
    };

    const handlePasswordChange = (password: string) => {
        setRegisterPassword(removeWhitespace(password));
    };

    useEffect(() => {
        setDisabled(!(registerEmail && registerPassword && !errorMessage));
    }, [registerEmail, registerPassword, errorMessage]);

    return (
        <>
            <div className="container">
                <img className="main-img-con" src={logoImg} alt="채움" />
                <div className="main-text-con">물 마시는 습관 기르기</div>
                <div className="main-text-con-bold">채움에 오신 걸 환영해요 👋</div>
                <div className="sign-up-con">
                    <form>
                        <input type="email" placeholder="이메일" onChange={(e) => handleEmailChange(e.target.value)} />
                        <input type="password" placeholder="비밀번호" autoComplete="on" minLength={6} onChange={(e) => handlePasswordChange(e.target.value)} />
                        <div className="error-msg">{errorMessage}</div>
                        <button type="submit" onClick={submitRegister} disabled={disabled}>
                            회원가입
                        </button>
                    </form>
                </div>
                <div className="go-to-sign-up">
                    <div className="sign-up-text">이미 계정이 있으신가요?</div>
                    <Link to="/">
                        <div className="sign-up-btn">로그인</div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignUp;
