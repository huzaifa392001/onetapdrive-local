import FormGroup from "@/Components/FormGroup";
import Spinner from "@/Components/Spinner/Spinner";
import { SET_ACCESS_TOKEN, SET_IS_USER, SET_USER_DETAILS } from "@/Redux/Slices/Auth";
import { store } from "@/Redux/Store";
import { userSignUp } from "@/Services/AuthService/AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

function SignUp({ setModal }) {
    const router = useRouter();
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
            type: "tel",
            name: "phoneNumber",
            placeholder: "Enter your Phone Number",
            label: "Phone Number",
            inputtype: "tel",
            req: true,
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
        onSuccess: (res) => {
            store.dispatch(SET_ACCESS_TOKEN(res?.data?.access_token));
            store.dispatch(SET_USER_DETAILS(res?.data?.user_details));
            store.dispatch(SET_IS_USER(true));
            toast.success("User Signup Successfully!");

            setModal();
        },
        onError: (error) => {
            const res = error?.response?.data;

            const errorMsg =
                res?.errors?.[0]?.email || // First specific error
                res?.message || // General message fallback
                "Error while Signup"; // Final fallback

            toast.error(errorMsg);
        }
    });

    const onSubmit = (data) => {
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
