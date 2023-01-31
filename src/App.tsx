import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";

function App() {
    const loginUser = localStorage.getItem("uid");
    const loginUserKakao = localStorage.getItem("kakao");

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={loginUser || loginUserKakao ? <Home /> : <Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/settings" element={<SettingsPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
