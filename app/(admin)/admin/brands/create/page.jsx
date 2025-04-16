'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SecHeading from '@/Components/SecHeading/SecHeading';
import { pageName } from '@/Utils/Utils';
import FormGroup from '@/Components/FormGroup';
import { useMutation } from '@tanstack/react-query';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { requiredValidation } from '@/Utils/validation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Spinner from '@/Components/Spinner/Spinner';
import { addBrand } from '@/Services/AdminServices/AdminBrand';

function Page() {
    const router = useRouter()
    const [formData, setFormData] = useState(new FormData());
    const init = {
        brandImage: null,
        brandTitle: "",
    };


    const schema = yup
        .object({
            brandImage: yup.string().required(requiredValidation),
            brandTitle: yup.string().required(requiredValidation),
        })
        .required();

    const brandMutation = useMutation({
        mutationFn: addBrand,
        onSuccess: (res) => {
            if (res?.success === false) {
                toast.error(res?.message || 'Failed to add Brand');
                return;
            }
            toast.success(res?.message)
            router.push("/admin/brands")
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to add Brand';
            toast.error(errorMessage);
        }
    })

    const fields = [
        {
            type: "file",
            name: "brandImage",
            multiple: false,
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": [],
            },
            uploadLabel: "Upload brand Image",
        },
        {
            type: "input",
            name: "brandTitle",
            placeholder: "Enter brand Title",
            label: "brand Title",
            inputtype: "text",
            req: true,
        },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: init,
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.brandImage && formValues.brandImage instanceof File) {
            const updatedFormData = new FormData();
            updatedFormData.append("file", formValues.brandImage);
            setFormData(updatedFormData);
        }
    }, [formValues.brandImage]);

    const onSubmit = async (data) => {

        // Append other fields
        formData.append("name", data.brandTitle);
        formData.append("title", data.brandTitle);
        formData.append("description", data.brandTitle);

        console.log("Submitting Data: ", Object.fromEntries(formData.entries()));
        brandMutation.mutate(formData);
    };

    return (
        <>
            <div className="formWrapper">
                <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
                    <div className="headingCont">
                        <SecHeading heading={`${pageName()}`} />
                    </div>
                    {fields?.map((item, i) => (
                        <FormGroup
                            key={i}
                            item={item}
                            control={control}
                            errors={errors}
                        />
                    ))}

                    <div className="inputCont btnCont">
                        <button disabled={!isValid || brandMutation.isPending} type="submit" className={`themeBtn ${!isValid ? "disabled" : ""} ${brandMutation.isPending ? "disabled" : ""}`}>
                            {brandMutation.isPending ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Page;