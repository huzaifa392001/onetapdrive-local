"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SecHeading from "@/Components/SecHeading/SecHeading";
import { pageName } from "@/Utils/Utils";
import FormGroup from "@/Components/FormGroup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { requiredValidation } from "@/Utils/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "@/Components/Spinner/Spinner";
import { addBodyType } from "@/Services/AdminServices/AdminBodyTypes";

function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState(new FormData());
    const init = {
        bodyTypeImage: null,
        bodyTypeTitle: ""
    };

    const schema = yup
        .object({
            bodyTypeImage: yup.string().required(requiredValidation),
            bodyTypeTitle: yup.string().required(requiredValidation)
        })
        .required();

    const bodyTypeMutation = useMutation({
        mutationFn: addBodyType,
        onSuccess: (res) => {
            toast.success(res?.message);
            router.push("/admin/body-type");
        },
        onError: (error) => {
            toast.error(`Failed to add bodyType: ${error}`);
        }
    });

    const fields = [
        {
            type: "file",
            name: "bodyTypeImage",
            multiple: false,
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": []
            },
            uploadLabel: "Upload Body Type Image"
        },
        {
            type: "input",
            name: "bodyTypeTitle",
            placeholder: "Enter Body Type Title",
            label: "Body Type Title",
            inputtype: "text",
            req: true
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

    const formValues = watch();

    useEffect(() => {
        if (formValues.bodyTypeImage && formValues.bodyTypeImage instanceof File) {
            const updatedFormData = new FormData();
            updatedFormData.append("file", formValues.bodyTypeImage);
            setFormData(updatedFormData);
        }
    }, [formValues.bodyTypeImage]);

    const onSubmit = async (data) => {
        // Append other fields
        formData.append("name", data.bodyTypeTitle);
        formData.append("titles", data.bodyTypeTitle);
        formData.append("description", data.bodyTypeTitle);

        bodyTypeMutation.mutate(formData);
    };

    return (
        <>
            <div className="formWrapper">
                <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
                    <div className="headingCont">
                        <SecHeading heading={`${pageName()}`} />
                    </div>
                    {fields?.map((item, i) => (
                        <FormGroup key={i} item={item} control={control} errors={errors} />
                    ))}

                    <div className="inputCont btnCont">
                        <button
                            disabled={!isValid || bodyTypeMutation.isPending}
                            type="submit"
                            className={`themeBtn ${!isValid ? "disabled" : ""} ${
                                bodyTypeMutation.isPending ? "disabled" : ""
                            }`}
                        >
                            {bodyTypeMutation.isPending ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Page;
