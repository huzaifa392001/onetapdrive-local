import React, { useState } from "react";
import "./LoginModal.scss";
import { useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { SET_USER_MODAL_STATUS } from "@/Redux/Slices/General";
import SignUp from "../SignUp/SignUp";
import Login from "./Login/Login";
import Image from "next/image";

function LoginModal() {
    // const visibility = true;
    const visibility = useSelector((state) => state.general.userModalStatus);
    const [showState, setShowState] = useState(0);

    const handleModalVisible = () => {
        store.dispatch(SET_USER_MODAL_STATUS(false));
    };

    return (
        <div className={`modal ${visibility == true ? "visible" : ""}`}>
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
                    {showState === 0 && (
                        <div class="formWrap">
                            <h4>Sign Up</h4>
                            <SignUp setStatus={setShowState} />
                            <p onClick={() => setShowState(1)}>
                                Already a User? <span>Login Now</span>
                            </p>
                        </div>
                    )}
                    {showState === 1 && (
                        <div className="formWrap">
                            <h4>Login</h4>
                            <Login />
                            <p onClick={() => setShowState(0)}>
                                Already a User? <span>Signup Now</span>
                            </p>
                            {/* {step === 1 && (
                            <>
                                <button className="themeBtn googleBtn">
                                    <i className="fab fa-google" />
                                    Sign in with Google
                                </button>
                                <div className="or">
                                    <span>OR</span>
                                </div>
                                
                            </>
                        )}

                        {step === 2 && (
                           
                        )} */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
