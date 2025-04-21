import FormGroup from "@/Components/FormGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function SignUp() {
    const init = {
        email: "",
        password: ""
    };

    const schema = yup
        .object({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        .required();

    const signUpFields = [
        {
            type: "input",
            name: "firstName",
            placeholder: "Enter your Full Name",
            label: "Full Name",
            inputtype: "email",
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
        formState: { errors, isValid },
        watch
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init
    });

    return (
        <form>
            {signUpFields?.map((item, i) => (
                <FormGroup key={i} item={item} control={control} errors={errors} />
            ))}
            <div className="inputWrap">
                <button className={`themeBtn ${!isValid ? "disabled" : null}`} type="submit" disabled={!isValid}>
                    Sign Up
                </button>
            </div>
        </form>
    );
}

export default SignUp;
