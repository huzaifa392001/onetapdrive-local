import React, { useEffect, useState } from "react";
import "./LoginModal.scss";
import { useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { SET_USER_MODAL_STATUS } from "@/Redux/Slices/General";
import SignUp from "../SignUp/SignUp";
import Login from "./Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Image from "next/image";

function LoginModal() {
    // const visibility = true;
    const visibility = useSelector((state) => state.general.userModalStatus);
    const [showState, setShowState] = useState(1);

    const handleModalVisible = () => {
        store.dispatch(SET_USER_MODAL_STATUS(false));
    };

    useEffect(() => {
        return () => {
            store.dispatch(SET_USER_MODAL_STATUS(false));
        };
    }, []);

    return (
        <div data-lenis-prevent className={`modal ${visibility == true ? "visible" : ""}`}>
            <div className="modalBackdrop" onClick={handleModalVisible} />
            <div className="modalWrap">
                <div className="modalHeader">
                    <h3>{showState === 0 ? "Sign up" : "Login"} to OneTapDrive</h3>
                    <button className="closeBtn" onClick={handleModalVisible}>
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="modalBody">
                    <div className="content">
                        <figure>
                            <Image src={"/images/login-img.webp"} width={400} height={400} alt="login thumb img" />
                        </figure>
                        <h6>
                            Ease your car rental search across the world Access exclusive features with a free account
                            View saved cars, contacted listings and more
                        </h6>
                    </div>
                    {showState === 1 && (
                        <div className="formWrap">
                            <h4>Login</h4>
                            <Login setModal={handleModalVisible} />
                            <p onClick={() => setShowState(0)}>
                                New here? <span>Signup Now</span>
                            </p>
                            <p onClick={() => setShowState(2)}>
                                <span>Forgot Password?</span>
                            </p>
                        </div>
                    )}
                    {showState === 0 && (
                        <div className="formWrap">
                            <h4>Sign Up</h4>
                            <SignUp setModal={handleModalVisible} />
                            <p onClick={() => setShowState(1)}>
                                Already a User? <span>Login Now</span>
                            </p>
                        </div>
                    )}
                    {showState === 2 && (
                        <div className="formWrap">
                            <h4>Forgot Password</h4>
                            <ForgotPassword setModal={handleModalVisible} />
                            <p onClick={() => setShowState(1)}>
                                <span>Back to Login</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
