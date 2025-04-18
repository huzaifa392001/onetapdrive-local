"use client";

import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminLogin.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import * as yup from "yup";
import { login } from "@/Services/AuthService/AuthService";
import FormGroup from "@/Components/FormGroup";
import { requiredValidation } from "@/Utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { SET_IS_ADMIN } from "@/Redux/Slices/Auth";
import { store } from "@/Redux/Store";
function AdminLogin() {
    const { isAdmin } = useSelector((state) => state.auth.isAdmin);
    const [admin, setAdmin] = useState(isAdmin);
    const router = useRouter();

    const init = {
        email: "",
        password: ""
    };

    const fields = [
        {
            type: "input",
            name: "email",
            placeholder: "Enter your Email Address",
            label: "Email Address",
            inputtype: "email",
            req: true,
            colWidth: "col_md_6"
        },
        {
            type: "input",
            name: "password",
            placeholder: "Enter your password",
            label: "Password",
            inputtype: "password",
            req: true,
            eye: true
        }
    ];

    const schema = yup
        .object({
            email: yup.string().email().required(requiredValidation),
            password: yup.string().required(requiredValidation)
        })
        .required();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            toast.success("Login Successfully!");
            store.dispatch(SET_ADMIN_DETAILS(res?.data?.user_details));
            store.dispatch(SET_ACCESS_TOKEN(res?.data?.access_token));
            store.dispatch(SET_IS_ADMINN(true));
            router.push("/admin");
        },
        onError: (error) => {
            toast.error(error.message || "Login failed! Please try again.");
        }
    });

    const onSubmit = async (val) => {
        const body = {
            identifier: val?.email,
            password: val?.password
        };
        loginMutation.mutate(body);
    };

    useEffect(() => {
        setAdmin(isAdmin);
    }, [isAdmin]);

    useEffect(() => {
        console.log("admin=> ", admin);
        if (admin) {
            router.push("/admin");
        }
    }, [admin]);

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
                    {fields?.map((item, i) => (
                        <FormGroup key={i} item={item} control={control} errors={errors} />
                    ))}
                    <div className="btnCont">
                        <button type="submit" className="themeBtn full">
                            {loginMutation.isPending ? <Spinner /> : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default memo(AdminLogin);
