import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormGroup from "@/Components/FormGroup";

function Login() {
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

    const onSubmit = (data) => {
        console.log("Login form data =>", data);
        // handle login API call here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields?.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button className="themeBtn" type="submit" disabled={!isValid}>
                    Login
                </button>
            </div>
        </form>
    );
}

export default Login;
