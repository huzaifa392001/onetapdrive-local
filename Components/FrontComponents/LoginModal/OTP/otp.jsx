// import React from "react";

// function otp() {
//     const [step, setStep] = useState(1);
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState(["", "", "", ""]);
//     const otpInputs = useRef([]); // Array of refs for OTP inputs
//     const router = useRouter();
//     const handleSendOTP = () => {
//         if (email) {
//             // Simulate OTP send logic here
//             console.log(`Sending OTP to ${email}`);
//             setStep(2);
//         } else {
//             alert("Please enter a valid email.");
//         }
//     };

//     const handleOTPChange = (value, index) => {
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         // Focus on the next input if a value is entered
//         if (value && index < otp.length - 1) {
//             otpInputs.current[index + 1]?.focus();
//         }
//     };

//     const handleVerifyOTP = () => {
//         const enteredOTP = otp.join("");
//         if (enteredOTP === "1234") {
//             alert("OTP verified successfully!");
//             router.push("/user/dashboard");
//             store.dispatch(SET_USER_MODAL_STATUS(false));
//             store.dispatch(SET_IS_USER(true));
//             // Add logic to handle successful verification
//         } else {
//             alert("Invalid OTP. Please try again.");
//         }
//     };
//     return (
//         <div className="otpCont">
//             <div>
//                 <h2>Verification Code</h2>
//                 <h6>
//                     An OTP is sent to <span>{email}</span>
//                 </h6>
//                 <form
//                     onSubmit={(e) => {
//                         e.preventDefault();
//                         handleVerifyOTP();
//                     }}
//                 >
//                     <label htmlFor="">Enter 4 Digit code</label>
//                     <div className="inputWrap otp">
//                         {otp.map((digit, index) => (
//                             <input
//                                 key={index}
//                                 ref={(el) => (otpInputs.current[index] = el)} // Assigning ref to each input
//                                 type="number"
//                                 value={digit}
//                                 maxLength={1}
//                                 onChange={(e) => handleOTPChange(e.target.value, index)}
//                             />
//                         ))}
//                     </div>
//                     <div className="inputWrap">
//                         <button className="themeBtn" type="submit">
//                             Verify
//                         </button>
//                         <p className="notRcv">
//                             Haven&apos;t Received? <button>Resend</button>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//             <p className="small">
//                 In case you don&apos;t find our email in your inbox,
//                 <br />
//                 please check your Spam folder.
//             </p>
//         </div>
//     );
// }

// export default otp;
