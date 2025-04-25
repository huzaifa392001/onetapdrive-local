"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/Components/FormGroup";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import "./resetPassword.scss";

const ResetPassword = ({ params }) => {

    const {token} = params;
    const router = useRouter()

    const fields = [
        {
            type: "input",
            name: "password",
            placeholder: "Enter new password",
            label: "Password",
            inputtype: "password",
            req: true,
            eye: true,
            colWidth: "col_md_6"
        },
        {
            type: "input",
            name: "confirmPassword",
            placeholder: "Confirm password",
            label: "Confirm Password",
            inputtype: "password",
            req: true,
            eye: true,
            colWidth: "col_md_6"
        }
    ];

    const schema = yup.object({
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm password is required")
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const resetMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success("Password reset successfully!");
            router.back();           
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to reset password");
        }
    });

    const onSubmit = (data) => {
        const body = {
            password: data.password,
            token: token 
        };
        resetMutation.mutate(body);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="resetPassword">
            {fields.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button className={`themeBtn ${!isValid ? "disabled" : ""}`} type="submit" disabled={!isValid}>
                    {resetMutation.isPending ? <Spinner /> : "Reset Password"}
                </button>
            </div>
        </form>
    );
};

export default ResetPassword;
