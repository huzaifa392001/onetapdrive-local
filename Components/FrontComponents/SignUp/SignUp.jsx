import FormGroup from "@/Components/FormGroup";
import Spinner from "@/Components/Spinner/Spinner";
import { userSignUp } from "@/Services/AuthService/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

function SignUp({ setStatus }) {
    const init = {
        firstName: "",
        email: "",
        phoneNumber: "",
        password: ""
    };

    const schema = yup
        .object({
            firstName: yup.string().required("Full Name is required"),
            email: yup.string().email("Invalid email format").required("Email is required"),
            phoneNumber: yup
                .string()
                .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
                .required("Phone Number is required"),
            password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
        })
        .required();

    const signUpFields = [
        {
            type: "input",
            name: "firstName",
            placeholder: "Enter your Full Name",
            label: "Full Name",
            inputtype: "text",
            req: true,
            colWidth: "col_md_6"
        },
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
            name: "phoneNumber",
            placeholder: "Enter your Phone Number",
            label: "Phone Number",
            inputtype: "tel",
            req: true
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

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init,
        mode: "onChange"
    });

    const signupMutation = useMutation({
        mutationFn: userSignUp,
        onSuccess: () => {
            setStatus(1);
            toast.success("User Signup Successfully!");
        },
        onError: () => {
            toast.error("Error while Signup");
        }
    });

    const onSubmit = (data) => {
        console.log("data =>", data);
        signupMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {signUpFields?.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button
                    className={`themeBtn ${!isValid || signupMutation?.isPending ? "disabled" : ""}`}
                    type="submit"
                    disabled={!isValid || signupMutation?.isPending}
                >
                    {signupMutation?.isPending ? <Spinner /> : " Sign Up"}
                </button>
            </div>
        </form>
    );
}

export default SignUp;
