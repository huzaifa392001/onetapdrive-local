import React, { useState, useRef } from "react";
import "./LoginModal.scss";
import CustomInput from "@/Components/CustomInput/CustomInput";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { store } from "@/Redux/Store";
import { SET_USER_MODAL_STATUS } from "@/Redux/Slices/General";
import { useRouter } from "next/navigation";
import { SET_IS_USER } from "@/Redux/Slices/Auth";

function LoginModal() {
    const visibility = useSelector((state) => state.general.userModalStatus)
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const otpInputs = useRef([]); // Array of refs for OTP inputs
    const router = useRouter()

    const handleSendOTP = () => {
        if (email) {
            // Simulate OTP send logic here
            console.log(`Sending OTP to ${email}`);
            setStep(2);
        } else {
            alert("Please enter a valid email.");
        }
    };

    const handleOTPChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus on the next input if a value is entered
        if (value && index < otp.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join("");
        if (enteredOTP === "1234") {
            alert("OTP verified successfully!");
            router.push("/user/dashboard")
            store.dispatch(SET_USER_MODAL_STATUS(false))
            store.dispatch(SET_IS_USER(true))
            // Add logic to handle successful verification
        } else {
            alert("Invalid OTP. Please try again.");
        }
    };

    const handleModalVisible = () => {
        store.dispatch(SET_USER_MODAL_STATUS(false))
    }

    return (
        <div className={`modal ${visibility == true ? "visible" : ""}`}>
            <div className="modalBackdrop" onClick={handleModalVisible} />
            <div className="modalWrap">
                <div className="modalHeader">
                    <h3>Sign up / Login to OneTapDrive</h3>
                    <button className="closeBtn" onClick={handleModalVisible}>
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="modalBody">
                    <div className="content">
                        <figure>
                            <Image
                                src={"/images/login-img.webp"}
                                width={400}
                                height={400}
                                alt="login thumb img"
                            />
                        </figure>
                        <h6>
                            Ease your car rental search across the world Access exclusive
                            features with a free account View saved cars, contacted listings
                            and more
                        </h6>
                    </div>
                    <div className="formWrap">
                        {step === 1 && (
                            <>
                                <button className="themeBtn googleBtn">
                                    <i className="fab fa-google" />
                                    Sign in with Google
                                </button>
                                <div className="or">
                                    <span>OR</span>
                                </div>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendOTP();
                                    }}
                                >
                                    <div className="inputWrap">
                                        <CustomInput
                                            placeholder="Email"
                                            inputType="email"
                                            leftIcon="fa-envelope"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                    </div>
                                    <div className="inputWrap checkbox">
                                        <div className="checkboxWrap">
                                            <input type="checkbox" required />
                                            <i className="fas fa-check" />
                                        </div>
                                        <label>
                                            By continuing, you agree to our{" "}
                                            <Link href="">Terms Of Service</Link> and{" "}
                                            <Link href={""}>Privacy Policy</Link>.
                                        </label>
                                    </div>
                                    <div className="inputWrap">
                                        <button className="themeBtn" type="submit">
                                            Send OTP
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {step === 2 && (
                            <div className="otpCont">
                                <div>
                                    <h2>Verification Code</h2>
                                    <h6>
                                        An OTP is sent to <span>{email}</span>
                                    </h6>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleVerifyOTP();
                                        }}
                                    >
                                        <label htmlFor="">Enter 4 Digit code</label>
                                        <div className="inputWrap otp">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) => (otpInputs.current[index] = el)} // Assigning ref to each input
                                                    type="number"
                                                    value={digit}
                                                    maxLength={1}
                                                    onChange={(e) =>
                                                        handleOTPChange(e.target.value, index)
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="inputWrap">
                                            <button className="themeBtn" type="submit">
                                                Verify
                                            </button>
                                            <p className="notRcv">
                                                Haven&apos;t Received? <button>Resend</button>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                                <p className="small">
                                    In case you don&apos;t find our email in your inbox,
                                    <br />
                                    please check your Spam folder.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
