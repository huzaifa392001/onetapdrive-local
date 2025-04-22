import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/Components/FormGroup";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/Services/AuthService/AuthService";
import Spinner from "@/Components/Spinner/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Login({ setModal }) {
    const router = useRouter();

    const fields = [
        {
            type: "input",
            name: "email",
            placeholder: "Enter your Email Address",
            label: "Email Address",
            inputtype: "email",
            req: true,
            colWidth: "col_md_6" // verify this based on your CSS framework
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

    const schema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required")
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Login Successfully!");
            // router.push("/user/dashboard");
            setModal()
        },
        onError: (error) => {
            toast.error(error?.message || "Login failed! Please try again.");
        }
    });

    const onSubmit = (data) => {
        const body = {
            identifier: data?.email,
            password: data?.password
        };
        loginMutation.mutate(body);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button className={`themeBtn ${!isValid ? "disabled" : ""}`} type="submit" disabled={!isValid}>
                    {loginMutation.isPending ? <Spinner /> : "Login"}
                </button>
            </div>
        </form>
    );
}

export default Login;
