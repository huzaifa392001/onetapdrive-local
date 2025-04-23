import { SET_OTP_MODAL_STATUS } from "@/Redux/Slices/General";
import { store } from "@/Redux/Store";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./OtpModal.scss";
import { useMutation } from "@tanstack/react-query";
import { sendOtp, verifyOtp } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";

function OtpModal() {
    const visibility = useSelector((state) => state.general.otpModalStatus);
    const [step, setStep] = useState(0);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpInputs = useRef([]); // Array of refs for OTP inputs
    const user = useSelector((state) => state.auth.userDetails);

    const handleModalVisible = () => {
        store.dispatch(SET_OTP_MODAL_STATUS(false));
    };

    const sendOtpMutation = useMutation({
        mutationFn: sendOtp,
        onSuccess: () => {
            setStep(2);
            toast.success("OTP Sent");
        },
        onError: () => {
            toast.error("Failed to send OTP");
        }
    });

    const verifyOtpMutation = useMutation({
        mutationFn: verifyOtp,
        onSuccess: () => {
            handleModalVisible();
            toast.success("Thank you for Verification");
        },
        onError: () => {
            toast.error("Failed to Verify OTP");
        }
    });

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
        const body = {
            otp: parseInt(enteredOTP)
        };
        verifyOtpMutation.mutate(body);
    };

    const handleOTPPaste = (e, index) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        const values = pasteData.split("");
        const newOtp = [...otp];

        values.forEach((val, i) => {
            if (index + i < otp.length) {
                newOtp[index + i] = val;
            }
        });

        setOtp(newOtp);

        const nextIndex = Math.min(index + values.length, otp.length - 1);
        otpInputs.current[nextIndex]?.focus();
    };

    return (
        <div className={`otpModal ${visibility == true ? "visible" : ""}`}>
            <div className="modalBackdrop" onClick={handleModalVisible} />
            <div className="modalWrap">
                <div className="modalHeader">
                    <h3>Send OTP</h3>
                    <button className="closeBtn" onClick={handleModalVisible}>
                        <i className="fas fa-times" />
                    </button>
                </div>
                <div className="modalBody">
                    <div className="otpCont">
                        <h2>Verification Code</h2>
                        {step === 0 ? (
                            <div className="otpBtnCont">
                                <button
                                    onClick={() => sendOtpMutation.mutate()}
                                    className={`themeBtn full ${sendOtpMutation?.isPending ? "disabled" : ""}`}
                                >
                                    Send OTP
                                </button>
                            </div>
                        ) : (
                            <>
                                <h6>
                                    {`We’ve sent a verification code to the email address you provided.`}
                                    <br />
                                    Please check your inbox {` `}
                                    <span>{user?.email}</span>
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
                                                required
                                                key={index}
                                                ref={(el) => (otpInputs.current[index] = el)}
                                                type="number"
                                                inputMode="numeric"
                                                value={digit}
                                                maxLength={1}
                                                onChange={(e) => handleOTPChange(e.target.value, index)}
                                                onPaste={(e) => handleOTPPaste(e, index)}
                                            />
                                        ))}
                                    </div>
                                    <div class="btnWrapper">
                                        <button
                                            disabled={verifyOtpMutation.isPending}
                                            className={`themeBtn full ${
                                                verifyOtpMutation?.isPending ? "disabled" : ""
                                            }`}
                                            type="submit"
                                        >
                                            {verifyOtpMutation ? <Spinner /> : "Verify"}
                                        </button>
                                    </div>
                                    <div className="inputWrap">
                                        <p className="notRcv">
                                            Haven&apos;t Received? <button>Resend</button>
                                        </p>
                                    </div>
                                </form>
                                <p className="small">
                                    In case you don&apos;t find our email in your inbox, please check your Spam folder.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpModal;
