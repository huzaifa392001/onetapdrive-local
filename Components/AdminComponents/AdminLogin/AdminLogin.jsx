import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminLogin.scss";
import { AdminServices } from "@/Services/AdminServices/AdminServices";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { login } from "@/Services/AuthService/AuthService";

function AdminLogin() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login Successfully!");
            router.push("/admin");
        },
        onError: (error) => {
            toast.error(error.message || "Login failed! Please try again.");
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onSubmit = async (data) => {
        loginMutation.mutate(data);
    };

    return (
        <section className="adminLoginSec">
            <div className="animated-background">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
                <div className="gradient-sphere sphere-3"></div>
                <div className="particles" id="particles"></div>
            </div>

            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome</h1>
                    <p>Sign in to continue your journey</p>
                </div>

                <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputCont">
                        <div
                            className={
                                errors.email
                                    ? "inputWrap errorInput"
                                    : "inputWrap"
                            }
                        >
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("identifier", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            <i className="fas fa-envelope" />
                        </div>
                        {errors.email && (
                            <p className="errorText">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="inputCont">
                        <div
                            className={
                                errors.password
                                    ? "inputWrap errorInput"
                                    : "inputWrap"
                            }
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <i className="fas fa-lock" />
                            <button
                                type="button"
                                className="showPassBtn"
                                onClick={togglePasswordVisibility}
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "fas fa-eye-slash"
                                            : "fas fa-eye"
                                    }
                                />
                            </button>
                        </div>
                        {errors.password && (
                            <p className="errorText">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="btnCont">
                        <button type="submit" className="themeBtn">
                            {loginMutation.isPending ? <Spinner /> : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default memo(AdminLogin);
