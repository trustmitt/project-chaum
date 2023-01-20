import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import SetupPage from "./pages/SetupPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/signup" element={<SignUpPage />}></Route>
                    <Route path="/setup" element={<SetupPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
