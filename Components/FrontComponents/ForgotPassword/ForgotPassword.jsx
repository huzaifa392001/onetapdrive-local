import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/Components/FormGroup";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/Services/AuthService/AuthService";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner/Spinner";

const ForgotPassword = ({ setModal }) => {
    const fields = [
        {
            type: "input",
            name: "email",
            placeholder: "Enter your Email Address",
            label: "Email Address",
            inputtype: "email",
            req: true,
            colWidth: "col_md_6"
        }
    ];

    const schema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required")
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: ""
        }
    });

    const forgotMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success("Check your email for reset instructions.");
            setTimeout(() => {
                setModal(); 
            }, 1500); // optional delay for UX
        },
        onError: (error) => {
            toast.error(error?.message || "Something went wrong. Please try again.");
        }
    });

    const onSubmit = (data) => {
        const body = {
            email: data?.email
        };
        forgotMutation.mutate(body);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button className={`themeBtn ${!isValid ? "disabled" : ""}`} type="submit" disabled={!isValid}>
                    {forgotMutation.isPending ? <Spinner /> : "Send Email"}
                </button>
            </div>
        </form>
    );
};

export default ForgotPassword;
