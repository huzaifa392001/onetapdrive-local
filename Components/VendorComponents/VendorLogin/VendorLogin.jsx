import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import "./VendorLogin.scss";
import Image from "next/image";
import Link from "next/link";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { VendorServices } from "@/Services/VendorServices/VendorServices";

function VendorLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = (data) => {
        VendorServices.login(data);
    };

    return (
        <section
            className="vendorLoginSec"
            style={{ backgroundImage: "url(/images/login/login_bg_blur.jpg)" }}
        >
            <div className="login-container">
                <SecHeading heading="Login" className="text-center" />
                <div className="loginRow">
                    <div className="image-side">
                        <figure>
                            <Image
                                quality={100}
                                loading="eager"
                                src={"/images/login/login-img.webp"}
                                alt="Home Banner"
                                width={330}
                                height={200}
                            />
                        </figure>
                        <p>
                            Expand your reach with OneTapDrive and get a steady stream of
                            leads to grow your business like never before.
                        </p>
                    </div>
                    <div className="formSide">
                        <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
                            <div className="inputCont">
                                <div className={errors.email ? "inputWrap errorInput" : "inputWrap"}>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    <i className="fas fa-envelope" />
                                </div>
                                {errors.email && <p className="errorText">{errors.email.message}</p>}
                            </div>
                            <div className="inputCont">
                                <div className={errors.password ? "inputWrap errorInput" : "inputWrap"}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                    />
                                    <i className="fas fa-lock" />
                                    <button type="button" className="showPassBtn" onClick={togglePasswordVisibility}>
                                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                                    </button>
                                </div>
                                {errors.password && <p className="errorText">{errors.password.message}</p>}
                            </div>
                            <Link href={""} className="forget_pass">
                                Forgot Password?
                            </Link>

                            <div className="btnCont">
                                <button type="submit" className="themeBtn">
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <p className="signup_link">
                            {`Don't have an account?`} {""}
                            <Link href={"/list-your-rental-cars"} className="forget_pass">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(VendorLogin);